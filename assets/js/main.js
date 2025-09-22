// Данные о товарах
const products = [
    // Станки
    { name: 'Токарный станок JET', price: 35000, category: 'Станки' },
    { name: 'Ленточная пила Holzmann', price: 44900, category: 'Станки' },
    { name: 'Сверлильный станок СТ-350', price: 17800, category: 'Станки' },
    { name: 'Фрезерный станок Makita', price: 48700, category: 'Станки' },
    { name: 'Станок лазерной резки Bluecut', price: 125000, category: 'Станки' },
    { name: 'Шлифовальный станок Bosch', price: 28500, category: 'Станки' },
    { name: 'Форматно-раскроечный станок SCM', price: 89900, category: 'Станки' },
    { name: 'Фуговальный станок Jet', price: 42300, category: 'Станки' },
    { name: 'Рейсмусовый станок DeWalt', price: 67800, category: 'Станки' },
    { name: 'Комбинированный станок Festool', price: 94500, category: 'Станки' },
    
    // Стройматериалы
    { name: 'Цемент М500 (мешок 50кг)', price: 520, category: 'Стройматериалы' },
    { name: 'Кирпич красный (1 шт)', price: 22, category: 'Стройматериалы' },
    { name: 'Арматура d12 (1 м)', price: 74, category: 'Стройматериалы' },
    { name: 'Доска обрезная (1 м³)', price: 13500, category: 'Стройматериалы' },
    { name: 'Гипсокартон (1 лист)', price: 390, category: 'Стройматериалы' },
    { name: 'Утеплитель (рулон)', price: 1200, category: 'Стройматериалы' },
    { name: 'Профиль металлический (шт)', price: 280, category: 'Стройматериалы' },
    { name: 'Шпаклевка (25 кг)', price: 750, category: 'Стройматериалы' },
    { name: 'Пеноблок (1 шт)', price: 165, category: 'Стройматериалы' },
    { name: 'Керамогранит (м²)', price: 890, category: 'Стройматериалы' }
];

// Функция для форматирования цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Функция для отображения товаров
function renderProducts(filteredProducts) {
    const grid = document.querySelector('.products-grid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card button';
        card.innerHTML = `
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
            <div class="product-card-footer">
                <span class="category-badge">${product.category}</span>
                <i class="material-icons">arrow_forward</i>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Функция для переключения страниц
function showPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показываем нужную страницу
    document.getElementById(pageId).classList.add('active');

    // Управляем видимостью кнопок в шапке
    const navButtons = document.querySelector('.nav-buttons');
    navButtons.style.display = pageId === 'main' ? 'flex' : 'none';

    // Если открываем страницу товаров, отображаем все товары
    if (pageId === 'products') {
        renderProducts(products);
    }
}

// Живой поиск
document.querySelector('.search-bar input')?.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchText)
    );
    renderProducts(filteredProducts);
});

// Фильтрация по категориям
let filterMenuVisible = false;

document.querySelector('.menu-button')?.addEventListener('click', () => {
    const filterMenu = document.querySelector('.filter-menu');
    filterMenuVisible = !filterMenuVisible;
    filterMenu.style.display = filterMenuVisible ? 'block' : 'none';
});

// Обработка выбора фильтра
function filterProducts(category) {
    const filteredProducts = category === 'Все' 
        ? products 
        : products.filter(product => product.category === category);
    renderProducts(filteredProducts);
    
    // Скрываем меню фильтров
    document.querySelector('.filter-menu').style.display = 'none';
    filterMenuVisible = false;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Показываем главную страницу по умолчанию
    showPage('main');
});