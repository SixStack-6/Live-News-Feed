/**
 * Central State Management (Store)
 * This is a mini version of a state management library (like Redux or Pinia).
 * It follows the "Observer Pattern" - where parts of the app can "subscribe" 
 * to changes and get notified automatically.
 */
import { storage } from '../storage/localStorage.js';

class Store {
    constructor() {
        /**
         * The 'state' object is the "Single Source of Truth".
         * All important data for the app lives here in one place.
         */
        this.state = {
            articles: [],
            totalArticles: 0,
            currentCategory: 'general',
            searchQuery: '',
            isLoading: false,
            error: null,
            // We fetch the initial bookmarks and theme from LocalStorage so 
            // the user's preferences are saved even after page refresh.
            bookmarks: storage.getBookmarks(),
            theme: storage.getTheme()
        };
        
        /**
         * 'listeners' is an array of functions that want to be informed 
         * whenever the state changes.
         */
        this.listeners = [];
    }

    /**
     * getState: Simple getter to access the current values.
     */
    getState() {
        return this.state;
    }

    /**
     * setState: The ONLY way to update the state.
     * It uses the spread operator (...) to merge the old state with the new changes.
     * After updating, it triggers 'notify()' to tell everyone something changed.
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    /**
     * subscribe: Allows components (like the Header or NewsGrid) to register 
     * a callback function that runs whenever the store updates.
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Returns an "unsubscribe" function in case we want to stop listening.
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * notify: Loops through all registered listeners and calls them 
     * with the latest state. This is the core of the "Reactive" feel.
     */
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    /**
     * ACTIONS
     * These are specific methods to modify the state in a controlled way.
     */
    setArticles(articles) {
        this.setState({ articles, isLoading: false, error: null });
    }

    setCategory(category) {
        this.setState({ currentCategory: category, searchQuery: '', isLoading: true });
    }

    setSearchQuery(query) {
        this.setState({ searchQuery: query, currentCategory: 'general', isLoading: true });
    }

    setLoading(isLoading) {
        this.setState({ isLoading });
    }

    setError(error) {
        this.setState({ error, isLoading: false });
    }

    /**
     * toggleTheme: Handles light/dark mode switching.
     * It updates the state, saves it to disk (LocalStorage), and 
     * updates the HTML attribute for CSS styling.
     */
    toggleTheme() {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.setState({ theme: newTheme });
        storage.setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    /**
     * toggleBookmark: Adds or removes an article from the favorites list.
     */
    toggleBookmark(article) {
        // Find if the article already exists in bookmarks by checking its unique URL
        const isBookmarked = this.state.bookmarks.some(b => b.url === article.url);
        let newBookmarks;
        
        if (isBookmarked) {
            // Remove it
            newBookmarks = this.state.bookmarks.filter(b => b.url !== article.url);
        } else {
            // Add it (using immutable spread pattern)
            newBookmarks = [...this.state.bookmarks, article];
        }

        // Update state and save to LocalStorage
        this.setState({ bookmarks: newBookmarks });
        storage.saveBookmarks(newBookmarks);
    }
}

// Create a singleton instance and export it.
// This ensures that every part of the app is talking to the EXACT SAME store.
export const store = new Store();
