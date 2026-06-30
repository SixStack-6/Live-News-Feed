import { UI_STRINGS } from '../utils/constants.js';
import { store } from '../state/store.js';

export const Hero = () => {
    return `
        <div class="hero-section">
            <h1 class="hero-title fade-in-up">${UI_STRINGS.APP_NAME}</h1>
            <p class="hero-tagline fade-in-up" style="animation-delay: 0.1s;">${UI_STRINGS.TAGLINE}</p>
            
            <div class="search-wrapper fade-in-up" style="animation-delay: 0.2s;">
                <div class="search-input-container">
                    <i data-lucide="search" class="search-icon" style="width: 18px; height: 18px;"></i>
                    <input type="text" id="search-input" class="search-input" placeholder="${UI_STRINGS.SEARCH_PLACEHOLDER}">
                </div>
                <button id="search-btn" class="btn btn-primary">Search</button>
            </div>
        </div>
    `;
};

export const initHero = () => {
    const root = document.getElementById('hero-root');
    root.innerHTML = Hero();
    if (window.lucide) window.lucide.createIcons();

    const input = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const handleSearch = () => {
        const query = input.value.trim();
        if (query) {
            store.setSearchQuery(query);
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    searchBtn.addEventListener('click', handleSearch);
};
