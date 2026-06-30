import { UI_STRINGS } from '../utils/constants.js';

export const ErrorComponent = (message = UI_STRINGS.ERROR_MESSAGE) => `
    <div class="error-box">
        <div class="error-icon-wrapper">
            <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: #ef4444;"></i>
        </div>
        <h3 class="error-title">Oops! Something went wrong</h3>
        <p class="error-desc">${message}</p>
        <button id="retry-btn" class="btn btn-primary">Try Again</button>
    </div>
`;

export const EmptyState = (message = UI_STRINGS.EMPTY_STATE) => `
    <div class="empty-box">
        <div class="empty-icon-wrapper">
            <i data-lucide="search" style="width: 48px; height: 48px; color: var(--text-light);"></i>
        </div>
        <h3 class="empty-title">No matching articles</h3>
        <p class="empty-desc">${message}</p>
    </div>
`;

export const renderError = (message) => {
    const root = document.getElementById('status-root');
    const newsGrid = document.getElementById('news-grid-root');
    const breakingNews = document.getElementById('breaking-news-root');
    
    newsGrid.innerHTML = '';
    breakingNews.innerHTML = '';
    root.innerHTML = ErrorComponent(message);
    if (window.lucide) window.lucide.createIcons();

    document.getElementById('retry-btn')?.addEventListener('click', () => {
        window.location.reload();
    });
};

export const renderEmpty = (message) => {
    const root = document.getElementById('status-root');
    document.getElementById('news-grid-root').innerHTML = '';
    document.getElementById('breaking-news-root').innerHTML = '';
    root.innerHTML = EmptyState(message);
    if (window.lucide) window.lucide.createIcons();
};

export const clearStatus = () => {
    document.getElementById('status-root').innerHTML = '';
};
