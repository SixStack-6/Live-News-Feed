import { CATEGORIES } from '../utils/constants.js';
import { store } from '../state/store.js';

export const Categories = () => {
    const { currentCategory } = store.getState();
    
    return `
        <div class="category-list">
            ${CATEGORIES.map(cat => `
                <button class="category-chip ${currentCategory === cat ? 'active' : ''}" data-category="${cat}">
                    ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            `).join('')}
        </div>
    `;
};

export const initCategories = () => {
    const root = document.getElementById('categories-root');
    root.innerHTML = Categories();

    root.addEventListener('click', (e) => {
        const chip = e.target.closest('.category-chip');
        if (chip) {
            const category = chip.dataset.category;
            store.setCategory(category);
            
            // UI Update
            root.querySelectorAll('.category-chip').forEach(btn => btn.classList.remove('active'));
            chip.classList.add('active');
        }
    });
};
