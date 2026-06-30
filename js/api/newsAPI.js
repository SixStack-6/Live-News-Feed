/**
 * NewsAPI Module
 * This module handles all communication with the external News API service.
 * It uses the 'fetch' API to make asynchronous network requests.
 */

const NEWS_API_KEY=ce95587b0d204f6cb28730881e728688;
const NEWS_API_BASE=https://newsapi.org/v2;

import { API_CONFIG } from '../utils/constants.js';

/**
 * MOCK_DATA represents local fallback data.
 * This is used if the API key is missing or if the network request fails,
 * ensuring the application doesn't appear broken during development.
 */
const MOCK_DATA = [
    {
        title: "The Future of Space Exploration: Mars and Beyond",
        description: "As SpaceX and NASA push boundaries, the dream of becoming a multi-planetary species feels closer than ever.",
        content: "Detailed content about Mars mission...",
        url: "https://example.com/space",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date().toISOString(),
        source: { name: "Science Daily" },
        category: "science"
    },
    {
        title: "Apple Announces New AI-Powered Features for iOS",
        description: "The latest update brings revolutionary on-device intelligence to millions of users worldwide.",
        content: "Apple Intelligence is here...",
        url: "https://example.com/apple",
        image: "https://images.unsplash.com/photo-1510511459019-5dee995ad71d?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        source: { name: "TechCrunch" },
        category: "technology"
    },
    {
        title: "Global Markets Rally Amid Improving Economic Data",
        description: "Investors show optimism as inflation cools down faster than expected in major economies.",
        content: "Stock market updates...",
        url: "https://example.com/business",
        image: "https://images.unsplash.com/photo-1611974717482-411a7667503b?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        source: { name: "Bloomberg" },
        category: "business"
    },
    {
        title: "Revolutionary Clean Energy Source Discovered",
        description: "Scientists claim a breakthrough in fusion energy that could power cities with zero emissions.",
        url: "https://example.com/energy",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        source: { name: "Nature" },
        category: "science"
    },
    {
        title: "New World Record Set in Athletics Championship",
        description: "The young sprinter stunned the crowed with a blistering performance in the 100m final.",
        url: "https://example.com/sports",
        image: "https://images.unsplash.com/photo-1541252260730-0412e3e2107e?auto=format&fit=crop&q=80&w=1000",
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        source: { name: "ESPN" },
        category: "sports"
    }
];

export const newsAPI = {
    /**
     * fetchNews: The primary function to get news articles.
     * @param {Object} options - Contains 'category' and 'query' (search term).
     * @returns {Promise<Object>} - Resolves to an object containing an array of articles.
     */
    async fetchNews({ category = 'general', query = '' }) {
        /**
         * 1. Check for API key. 
         * If no key is found in constants.js, we return MOCK_DATA.
         * We wrap it in a Promise and use setTimeout to simulate real network delay.
         */
        if (!API_CONFIG.API_KEY) {
            console.warn('API Key missing. Using mock data.');
            return new Promise((resolve) => {
                setTimeout(() => {
                    let filtered = MOCK_DATA;
                    // Apply search filtering locally if a query is provided
                    if (query) {
                        filtered = MOCK_DATA.filter(a => 
                            a.title.toLowerCase().includes(query.toLowerCase()) ||
                            a.description.toLowerCase().includes(query.toLowerCase())
                        );
                    } 
                    // Apply category filtering locally
                    else if (category && category !== 'general') {
                        filtered = MOCK_DATA.filter(a => a.category === category);
                    }
                    resolve({ articles: filtered });
                }, 800); // 800ms delay to simulate loading
            });
        }

        /**
         * 2. Determine the correct API endpoint.
         * - 'everything': Used for searching specific keywords.
         * - 'top-headlines': Used for getting current hot news or category-specific news.
         */
        const endpoint = query ? 'everything' : 'top-headlines';

        /**
         * 3. Construct URL Query Parameters.
         * URLSearchParams is a built-in JS utility that helps format URL strings safely.
         */
        const params = new URLSearchParams({
            apiKey: API_CONFIG.API_KEY,
            language: API_CONFIG.DEFAULT_LANG,
            // If searching (query), we use the 'q' parameter.
            // If browsing categories, we use 'category' and 'country'.
            ...(query ? { q: query } : { category, country: API_CONFIG.DEFAULT_COUNTRY })
        });

        // Final URL: BASE_URL + endpoint + query string
        const url = `${API_CONFIG.BASE_URL}/${endpoint}?${params.toString()}`;

        /**
         * 4. Perform the Network Request inside a try-catch block for error handling.
         */
        try {
            // 'fetch' starts the request and returns a promise
            const response = await fetch(url);
            
            // If the response status is not 200-299, something is wrong (e.g., 401 Unauthorized)
            if (!response.ok) throw new Error('API request failed');
            
            // Extract the JSON data from the response body
            const data = await response.json();
            
            /**
             * 5. Data Normalization
             * Different APIs use different property names (e.g., GNews uses 'image' while NewsAPI uses 'urlToImage').
             * By mapping the data here, we ensure our UI components only have to care about one name: 'image'.
             */
            if (data.articles) {
                data.articles = data.articles.map(article => ({
                    ...article,
                    image: article.urlToImage || article.image // Fallback if one doesn't exist
                }));
            }
            
            return data;
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Fetch error:', error);
            // Re-throw so the UI component can show an error message to the user
            throw error;
        }
    }
};
