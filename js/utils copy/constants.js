/**
 * Constants and Configuration
 * This file acts as the global settings for our application.
 * Centralizing these values makes the code easier to maintain and update.
 */

export const API_CONFIG = {
    /**
     * API_KEY: Your unique identifier for the News API service.
     * In a production app, we would hide this, but for this project, 
     * it's here for easy setup.
     */
    API_KEY: 'ce95587b0d204f6cb28730881e728688',
    BASE_URL: 'https://newsapi.org/v2',
    DEFAULT_LANG: 'en',
    DEFAULT_COUNTRY: 'us',
};

/**
 * CATEGORIES: The list of supported news topics.
 * These are used to generate the navigation chips in the UI.
 * They must match the ones supported by the NewsAPI service.
 */
export const CATEGORIES = [
    'general',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health'
];

/**
 * UI_STRINGS: All human-readable text in the app.
 * Keeping these in one place makes it easy to change the "brand name" 
 * or translate the app later.
 */
export const UI_STRINGS = {
    APP_NAME: 'NewsPulse',
    TAGLINE: 'Stay Ahead. Stay Informed.',
    SEARCH_PLACEHOLDER: 'Search for news topics...',
    ERROR_MESSAGE: "We couldn't fetch today's headlines. Please try again.",
    EMPTY_STATE: "No news found for your search.",
};

// const NEWS_API_KEY = "ce95587b0d204f6cb28730881e728688";
// const NEWS_API_BASE = "https://newsapi.org/v2/everything";

// class NewsService {
//   async getArticles(category, city) {
//     if (!NEWS_API_KEY) {
//       return this.getFallback(category, city);
//     }

//     try {
//       return await this.fetchNews(category, city);
//     } catch (error) {
//       console.warn("NewsAPI unavailable, using fallback:", error.message);
//       return this.getFallback(category, city);
//     }
//   }

//   async fetchNews(category, city) {
//     const location = city.split(",")[0].trim();

//     // Combine city + category for locally relevant results
//     const query = `${location} ${category}`;

//     const url =
//       `${NEWS_API_BASE}` +
//       `?apiKey=${NEWS_API_KEY}` +
//       `&q=${encodeURIComponent(query)}` +
//       `&language=en` +
//       `&sortBy=publishedAt` +
//       `&pageSize=3`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (!response.ok || data.status === "error") {
//       throw new Error(data.message || "News could not be loaded.");
//     }

//     // If city+category returns nothing, broaden to category only
//     if (!data.articles || data.articles.length === 0) {
//       return this.fetchCategoryOnly(category, city);
//     }

//     return this.normalizeArticles(data.articles, category, location);
//   }

//   async fetchCategoryOnly(category, city) {
//     const location = city.split(",")[0].trim();

//     const url =
//       `${NEWS_API_BASE}` +
//       `?apiKey=${NEWS_API_KEY}` +
//       `&q=${encodeURIComponent(category)}` +
//       `&language=en` +
//       `&sortBy=publishedAt` +
//       `&pageSize=3`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (!response.ok || data.status === "error") {
//       throw new Error(data.message || "News could not be loaded.");
//     }

//     return this.normalizeArticles(data.articles || [], category, location);
//   }

//   normalizeArticles(articles, category, location) {
//     return articles
//       .filter((a) => a.title && a.title !== "[Removed]")
//       .slice(0, 3)
//       .map((article, index) => ({
//         id: `${category}-${index}`,
//         category,
//         title: index === 0 && location ? `${location}: ${article.title}` : article.title,
//         description: article.description || "No description available.",
//         source: article.source?.name || "Unknown",
//         publishedAt: this.formatDate(article.publishedAt),
//         url: article.url || `https://news.google.com/search?q=${encodeURIComponent(article.title)}`,
//       }));
//   }

//   getFallback(category, city) {
//     return new Promise((resolve) => {
//       window.setTimeout(() => {
//         const articles = fallbackNews[category] || [];
//         const location = city.split(",")[0];
//         resolve(
//           articles.map((article, index) => ({
//             ...article,
//             id: `${category}-${index}`,
//             category,
//             title: index === 0 ? `${location}: ${article.title}` : article.title,
//           })),
//         );
//       }, 350);
//     });
//   }

//   formatDate(isoString) {
//     if (!isoString) return "Recently";
//     try {
//       const date = new Date(isoString);
//       const now = new Date();
//       const diffMs = now - date;
//       const diffMins = Math.floor(diffMs / 60000);
//       const diffHours = Math.floor(diffMs / 3600000);
//       const diffDays = Math.floor(diffMs / 86400000);

//       if (diffMins < 60) return `${diffMins} min ago`;
//       if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
//       if (diffDays === 1) return "Yesterday";
//       if (diffDays < 7) return `${diffDays} days ago`;
//       return date.toLocaleDateString("en", { day: "numeric", month: "short" });
//     } catch {
//       return "Recently";
//     }
//   }
// }

// window.NewsService = NewsService;