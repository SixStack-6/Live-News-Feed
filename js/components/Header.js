import { store } from '../state/store.js';

export const Header = () => {
    const { theme, bookmarks } = store.getState();
    const bookmarkCount = bookmarks.length;

    return `
        <div class="container header-container">
            <a href="/" class="logo logo-link">
                <div class="logo-icon-wrapper">
                    <i data-lucide="newspaper" style="width: 22px; height: 22px;"></i>
                </div>
                <span class="logo-text">News<span>Pulse</span></span>
            </a>

            <div class="header-actions">
                <button id="theme-toggle" class="theme-toggle-btn" title="Toggle Theme">
                    <i data-lucide="${theme === 'light' ? 'moon' : 'sun'}" style="width: 18px; height: 18px;"></i>
                </button>
                <button id="bookmarks-toggle" class="btn btn-primary btn-bookmarks">
                    <i data-lucide="bookmark" style="width: 16px; height: 16px;"></i>
                    <span class="bookmark-text">Saved</span>
                    <span id="bookmark-badge" class="bookmark-badge">${bookmarkCount}</span>
                </button>
            </div>
        </div>
    `;
};

export const initHeader = () => {
    const root = document.getElementById('header-root');
    root.innerHTML = Header();
    if (window.lucide) window.lucide.createIcons();

    root.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle')) {
            store.toggleTheme();
        }
        if (e.target.closest('#bookmarks-toggle')) {
            document.getElementById('bookmarks-drawer').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        }
    });

    store.subscribe((state) => {
        const badge = document.getElementById('bookmark-badge');
        if (badge) badge.textContent = state.bookmarks.length;
        
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = `<i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}" style="width: 18px; height: 18px;"></i>`;
            if (window.lucide) window.lucide.createIcons();
        }
    });
};
