const STORAGE_KEYS = {
    THEME: 'newspulse_theme',
    BOOKMARKS: 'newspulse_bookmarks'
};

export const storage = {
    getTheme() {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    },

    setTheme(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    },

    getBookmarks() {
        const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
        return data ? JSON.parse(data) : [];
    },

    saveBookmarks(bookmarks) {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    }
};
