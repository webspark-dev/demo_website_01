let cart = JSON.parse(localStorage.getItem('royal-spice-cart') || '[]');
const cartModal = document.querySelector('#cartModal');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const cartCount = document.querySelector('#cartCount');
const floatCart = document.querySelector('#floatCart');
const floatCartText = document.querySelector('#floatCartText');

function saveCart() {
  localStorage.setItem('royal-spice-cart', JSON.stringify(cart));
}

function cartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartAmount() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function addToCart(id) {
  const product = menuItems.find(item => item.id === id);
  if (!product || !product.available) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to your table`);
}

function changeQuantity(id, change) {
  const item = cart.find(cartItem => cartItem.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity < 1) cart = cart.filter(cartItem => cartItem.id !== id);
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty"><span>✦</span><h3>Your table is waiting</h3><p>Add something delicious from the menu.</p></div>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-line">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-line-copy"><h4>${item.name}</h4><strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong><div class="quantity-control"><button data-cart-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-cart-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button></div></div>
        <button class="remove-btn" data-cart-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>
      </div>`).join('');
  }
  cartTotal.textContent = `₹${cartAmount().toLocaleString('en-IN')}`;
}

function updateCartUI() {
  const quantity = cartQuantity();
  cartCount.textContent = quantity;
  floatCartText.textContent = `${quantity} ${quantity === 1 ? 'item' : 'items'} · ₹${cartAmount().toLocaleString('en-IN')}`;
  floatCart.hidden = quantity === 0;
  renderCart();
}

cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-cart-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.cartAction === 'increase') changeQuantity(id, 1);
  if (button.dataset.cartAction === 'decrease') changeQuantity(id, -1);
  if (button.dataset.cartAction === 'remove') removeFromCart(id);
});

document.querySelectorAll('[data-open-cart]').forEach(button => button.addEventListener('click', () => cartModal.showModal()));
document.querySelector('#closeCart').addEventListener('click', () => cartModal.close());
cartModal.addEventListener('click', event => {
  if (event.target === cartModal) cartModal.close();
});
document.querySelector('#reserveBtn').addEventListener('click', () => {
  if (!cart.length) {
    showToast('Your cart is empty');
    return;
  }
  window.location.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
});

updateCartUI();