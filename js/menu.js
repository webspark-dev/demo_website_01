const menuGrid = document.querySelector('#menuGrid');
const categoryList = document.querySelector('#categoryList');
const searchInput = document.querySelector('#menuSearch');
const detailsModal = document.querySelector('#detailsModal');
const detailsContent = document.querySelector('#detailsContent');
let activeCategory = 'All';

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function getFavourites() {
  return JSON.parse(localStorage.getItem('royal-spice-favourites') || '[]');
}

function toggleFavourite(id) {
  const favourites = getFavourites();
  const next = favourites.includes(id) ? favourites.filter(itemId => itemId !== id) : [...favourites, id];
  localStorage.setItem('royal-spice-favourites', JSON.stringify(next));
  renderMenu();
}

function itemCard(item) {
  const isFavourite = getFavourites().includes(item.id);
  const availability = item.available ? '' : 'is-unavailable';
  return `
    <article class="food-card ${availability}">
      <div class="food-image-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="card-badges">
          <span class="type-badge ${item.type === 'Veg' ? 'veg' : 'non-veg'}"><i></i>${item.type}</span>
          ${item.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        <button class="favourite-btn ${isFavourite ? 'is-favourite' : ''}" data-action="favourite" data-id="${item.id}" aria-label="${isFavourite ? 'Remove from favourites' : 'Add to favourites'}">${isFavourite ? '♥' : '♡'}</button>
        ${!item.available ? '<span class="unavailable-label">Currently unavailable</span>' : ''}
      </div>
      <div class="food-card-body">
        <div class="food-title-row"><h3>${item.name}</h3><strong>${formatPrice(item.price)}</strong></div>
        <p>${item.description}</p>
        <div class="food-actions">
          <button class="text-btn" data-action="details" data-id="${item.id}">View details <span>→</span></button>
          <button class="add-btn" data-action="add" data-id="${item.id}" ${!item.available ? 'disabled' : ''}>Add to cart <span>+</span></button>
        </div>
      </div>
    </article>`;
}

function renderMenu() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleItems = menuItems.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const queryMatch = !query || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
  menuGrid.innerHTML = visibleItems.length ? visibleItems.map(itemCard).join('') : '<div class="empty-state"><span>⌕</span><h3>No dishes found</h3><p>Try another dish or category.</p></div>';
  menuGrid.querySelectorAll('.food-image-wrap img').forEach(image => {
    image.style.filter = 'saturate(1.08) contrast(1.05) brightness(.96)';
  });
  document.querySelectorAll('.category-btn').forEach(button => button.classList.toggle('active', button.dataset.category === activeCategory));
}

function openDetails(id) {
  const item = menuItems.find(menuItem => menuItem.id === id);
  if (!item) return;
  detailsContent.innerHTML = `
    <div class="modal-image"><img src="${item.image}" alt="${item.name}"></div>
    <div class="modal-copy">
      <div class="eyebrow">${item.category} · ${item.type}</div>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <div class="modal-price">${formatPrice(item.price)}</div>
      <button class="add-btn modal-add" data-action="add" data-id="${item.id}" ${!item.available ? 'disabled' : ''}>${item.available ? 'Add to cart' : 'Unavailable'} <span>+</span></button>
    </div>`;
  detailsModal.showModal();
}

categoryList.addEventListener('click', event => {
  const button = event.target.closest('.category-btn');
  if (!button) return;
  activeCategory = button.dataset.category;
  if (activeCategory === 'All') searchInput.value = '';
  renderMenu();
});

searchInput.addEventListener('input', renderMenu);
menuGrid.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const id = Number(control.dataset.id);
  if (control.dataset.action === 'favourite') toggleFavourite(id);
  if (control.dataset.action === 'details') openDetails(id);
  if (control.dataset.action === 'add') addToCart(id);
});

detailsContent.addEventListener('click', event => {
  const control = event.target.closest('[data-action="add"]');
  if (control) addToCart(Number(control.dataset.id));
});

document.querySelector('#closeDetails').addEventListener('click', () => detailsModal.close());
detailsModal.addEventListener('click', event => {
  if (event.target === detailsModal) detailsModal.close();
});

renderMenu();