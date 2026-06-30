import { store } from '../state/store.js';

export const BookmarkItem = (article) => `
    <div class="bookmark-item">
        <img class="bookmark-item-img" src="${article.image}" alt="">
        <div class="bookmark-item-content">
            <h4 class="bookmark-item-title">
                <a href="${article.url}" target="_blank">${article.title}</a>
            </h4>
            <div class="bookmark-item-footer">
                <span class="bookmark-item-source">${article.source?.name || 'News'}</span>
                <button class="remove-bookmark remove-bookmark-btn" data-id="${article.url}">Remove</button>
            </div>
        </div>
    </div>
`;

export const BookmarksDrawer = () => {
    const { bookmarks } = store.getState();

    return `
        <div class="bookmarks-drawer" id="bookmarks-drawer">
            <div class="bookmarks-header">
                <h3>Saved Articles</h3>
                <button id="close-bookmarks" class="btn-icon">✕</button>
            </div>

            <div id="bookmarks-list">
                ${bookmarks.length > 0 
                    ? bookmarks.map(b => BookmarkItem(b)).join('')
                    : '<p class="bookmarks-empty-text">No saved articles yet.</p>'
                }
            </div>
        </div>
    `;
};

export const initBookmarks = () => {
    const root = document.getElementById('bookmarks-root');
    const overlay = document.getElementById('overlay');

    const update = () => {
        const wasActive = document.getElementById('bookmarks-drawer')?.classList.contains('active');
        root.innerHTML = BookmarksDrawer();
        if (wasActive) {
            document.getElementById('bookmarks-drawer').classList.add('active');
        }
        
        // Re-attach listeners
        document.getElementById('close-bookmarks')?.addEventListener('click', close);
        document.querySelectorAll('.remove-bookmark').forEach(btn => {
            btn.addEventListener('click', () => {
                const article = store.getState().bookmarks.find(b => b.url === btn.dataset.id);
                if (article) store.toggleBookmark(article);
            });
        });
    };

    const close = () => {
        root.querySelector('.bookmarks-drawer')?.classList.remove('active');
        overlay.classList.remove('active');
    };

    overlay.addEventListener('click', close);

    store.subscribe(update);
    update();
};
