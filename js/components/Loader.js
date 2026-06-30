export const SkeletonCard = () => `
    <div class="card loader-skeleton-card">
        <div class="skeleton loader-skeleton-img"></div>
        <div class="skeleton loader-skeleton-title-1"></div>
        <div class="skeleton loader-skeleton-title-2"></div>
        <div class="loader-skeleton-meta">
            <div class="skeleton loader-skeleton-meta-item" style="width: 40px;"></div>
            <div class="skeleton loader-skeleton-meta-item" style="width: 80px;"></div>
        </div>
    </div>
`;

export const renderLoader = () => {
    const root = document.getElementById('news-grid-root');
    const breakingRoot = document.getElementById('breaking-news-root');
    
    // Skeleton for breaking news
    breakingRoot.innerHTML = `
        <div class="skeleton breaking-loader-skeleton"></div>
    `;

    // Skeletons for grid
    root.innerHTML = Array(6).fill(SkeletonCard()).join('');
};
