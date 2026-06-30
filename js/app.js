/**
 * App Entry Point
 * This is the main orchestrator of the application.
 * It uses a class-based structure to manage the lifecycle of the app.
 */
import { store } from './state/store.js';
import { newsAPI } from './api/newsAPI.js';
import { initHeader } from './components/Header.js';
import { initHero } from './components/Hero.js';
import { initCategories } from './components/Categories.js';
import { renderBreakingNews } from './components/BreakingNews.js';
import { renderNewsGrid } from './components/NewsCard.js';
import { renderLoader } from './components/Loader.js';
import { renderError, renderEmpty, clearStatus } from './components/Error.js';
import { initBookmarks } from './components/Bookmarks.js';

class App {
    constructor() {
        /**
         * The constructor runs immediately when 'new App()' is called.
         * We trigger the initialization process here.
         */
        this.init();
    }

    /**
     * init: Sets up the initial state of the application.
     */
    async init() {
        // 1. Theme Management
        // We get the saved theme (light/dark) from the store and apply it to the HTML root.
        document.documentElement.setAttribute('data-theme', store.getState().theme);

        // 2. Component Initialization
        // We call the init functions for each UI part. These functions attach event listeners 
        // (like click handlers) and perform the first render of those components.
        initHeader();
        initHero();
        initCategories();
        initBookmarks();

        /**
         * 3. Reactive State Management (The "Subscribe" Pattern)
         * Every time the central data (store) changes, this callback runs.
         * If the user clicks a new category or searches for something, the store updates,
         * and we automatically re-fetch and re-render the news.
         */
        store.subscribe((state) => {
            const prevState = this.prevState || {};
            // We only re-fetch news if the category or search query actually changed
            if (state.currentCategory !== prevState.currentCategory || state.searchQuery !== prevState.searchQuery) {
                this.loadNews();
            }
            // Keep track of the previous state for comparison next time
            this.prevState = { ...state };
        });

        // 4. Initial Load
        // Fetch the first set of news when the page loads for the first time.
        await this.loadNews();
    }

    /**
     * loadNews: Coordinates fetching news from the API and updating the UI.
     */
    async loadNews() {
        // Get the current search parameters from our central store
        const { currentCategory, searchQuery } = store.getState();
        
        // Show the loading spinner and remove any previous status messages
        clearStatus();
        renderLoader();

        try {
            // Asynchronously fetch news from the API module
            const data = await newsAPI.fetchNews({ 
                category: currentCategory, 
                query: searchQuery 
            });

            // Handle the "No Results" case gracefully
            if (!data.articles || data.articles.length === 0) {
                renderEmpty();
                return;
            }

            /**
             * 5. UI Rendering logic
             * We split the articles:
             * - The very first article (breaking) goes into the "Featured" hero slot.
             * - All other articles (...others) go into the standard grid.
             */
            const [breaking, ...others] = data.articles;
            
            renderBreakingNews(breaking);
            renderNewsGrid(others);
            
            /**
             * 6. Lucide Icons Refresher
             * Since we just injected new HTML into the page, we need to tell Lucide 
             * to search for any new <i> tags and replace them with SVG icons.
             */
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
        } catch (error) {
            /**
             * Error handling: 
             * If the API is down or the network fails, we catch the error 
             * and display a user-friendly error message on the screen.
             */
            renderError(error.message);
        }
    }
}

/**
 * Execution:
 * We wait for the browser to finish parsing the HTML (DOMContentLoaded).
 * Then we bootstrap the application.
 */
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
