/**
 * NewsCard Component
 * This is a "Functional Component" that returns a string of HTML.
 * We use Template Literals (backticks) to inject dynamic data directly into the HTML.
 */
import { formatDate } from '../utils/dateFormatter.js';
import { store } from '../state/store.js';

/**
 * NewsCard: Creates the HTML structure for a single news article card.
 * @param {Object} article - The article data from the API.
 */
export const NewsCard = (article) => {
    // Check if this specific article is already in the user's bookmarks
    const { bookmarks } = store.getState();
    const isBookmarked = bookmarks.some(b => b.url === article.url);

    return `
        <article class="card fade-in-up">
            <div class="card-img-wrapper">
                <!-- 
                  Image Handling: 
                  If the API provides no image, we use a high-quality fallback URL 
                  from Unsplash so the UI never looks empty.
                -->
                <img class="card-img" src="${article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000'}" alt="${article.title}" loading="lazy">
                
                <!-- Bookmark Toggle Button -->
                <button class="bookmark-btn card-bookmark-btn tap-effect" data-id="${article.url}">
                    <!-- Dynamic Lucide Icon: If bookmarked, it fills with color -->
                    <i data-lucide="bookmark" style="width: 16px; height: 16px; ${isBookmarked ? 'fill: var(--primary); stroke: var(--primary);' : 'color: var(--text-muted);'}"></i>
                </button>
            </div>

            <div class="card-content">
                <h3 class="card-title">
                    <a href="${article.url}" target="_blank">${article.title}</a>
                </h3>
                
                <!-- Description with a fallback -->
                <p class="card-desc">${article.description || 'No description available for this article.'}</p>
                
                <div class="card-footer">
                    <div class="source-info">
                        <!-- Optional Chaining (?.) prevents errors if source is null -->
                        <strong>${article.source?.name || 'News'}</strong>
                        <span>•</span>
                        <span>${formatDate(article.publishedAt)}</span>
                    </div>
                </div>
            </div>
        </article>
    `;
};

/**
 * renderNewsGrid: Takes an array of articles and renders them into the DOM.
 * @param {Array} articles - Array of article objects.
 */
export const renderNewsGrid = (articles) => {
    const root = document.getElementById('news-grid-root');
    
    /**
     * Map & Join:
     * We loop through the array, transform each object into an HTML string using NewsCard(),
     * and then join them into one giant string to inject into the innerHTML.
     */
    root.innerHTML = articles.map(article => NewsCard(article)).join('');

    /**
     * Event Handling (Bookmark Toggle)
     * We select all bookmark buttons and attach click listeners to them.
     */
    root.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Get the unique identifier (URL) from the data attribute we set earlier
            const url = btn.dataset.id;
            const article = articles.find(a => a.url === url);
            
            if (article) {
                // Update the central store
                store.toggleBookmark(article);
                // Re-render the grid so the bookmark icon changes color immediately
                renderNewsGrid(articles); 
            }
        });
    });
};
