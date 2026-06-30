import { formatDate } from '../utils/dateFormatter.js';
import { store } from '../state/store.js';

export const BreakingNews = (article) => {
    if (!article) return '';

    return `
        <div class="breaking-news-card fade-in-up">
            <div class="breaking-img-wrapper">
                <img src="${article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000'}" alt="${article.title}">
            </div>
            <div class="breaking-content">
                <div class="breaking-category-badge">
                    <span class="badge badge-tech" style="background: var(--primary); color: white;">Featured</span>
                </div>
                <h2 class="breaking-title">
                    <a href="${article.url}" target="_blank">${article.title}</a>
                </h2>
                <p class="breaking-desc">
                    ${article.description || 'No description available for this breaking news story.'}
                </p>
                <div class="breaking-footer">
                    <div class="breaking-author">
                        <div class="breaking-author-avatar">${(article.source?.name || 'N').charAt(0)}</div>
                        <div class="breaking-author-info">
                            <p class="breaking-author-name">${article.source?.name || 'Unknown Source'}</p>
                            <p class="breaking-date">${formatDate(article.publishedAt)}</p>
                        </div>
                    </div>
                    <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>
    `;
};

export const renderBreakingNews = (article) => {
    const root = document.getElementById('breaking-news-root');
    root.innerHTML = BreakingNews(article);
};
