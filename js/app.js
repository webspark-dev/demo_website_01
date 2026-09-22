const body = document.body;
const siteHeader = document.querySelector('.site-header');
const mobileToggle = document.querySelector('#mobileToggle');
const navMenu = document.querySelector('#navMenu');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function setFontSize(size) {
  body.dataset.fontSize = size;
  localStorage.setItem('royal-spice-font-size', size);
  document.querySelectorAll('.font-size-btn').forEach(button => button.classList.toggle('active', button.dataset.size === size));
}

mobileToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  mobileToggle.setAttribute('aria-expanded', isOpen);
  mobileToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('#navMenu a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('is-open');
  mobileToggle.textContent = '☰';
  mobileToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.font-size-btn').forEach(button => button.addEventListener('click', () => setFontSize(button.dataset.size)));

document.querySelector('#year').textContent = new Date().getFullYear();
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
document.querySelector('#phoneLink').href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
document.querySelector('#whatsappLink').href = `https://wa.me/${restaurant.whatsapp}`;
document.querySelectorAll('[data-maps-link]').forEach(link => {
  if (isLocalHost) {
    link.href = '#contact';
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    return;
  }
  link.href = restaurant.mapsUrl;
});
document.querySelector('#addressText').textContent = restaurant.address;
document.querySelector('#hoursText').textContent = restaurant.hours;
// The QR always opens the live menu URL; new menu content appears after each deployment.
const menuPageUrl = restaurant.menuUrl || `${window.location.origin}${window.location.pathname}#menu`;
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&format=png&data=${encodeURIComponent(menuPageUrl)}`;
const menuQr = document.querySelector('#menuQr');
const downloadQr = document.querySelector('#downloadQr');

if (isLocalHost) {
  const placeholderSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="#f5efe4"/>
      <rect x="70" y="70" width="460" height="460" fill="#fff"/>
      <g fill="#211a13" font-family="Arial, sans-serif" text-anchor="middle">
        <text x="300" y="275" font-size="42">Live QR</text>
        <text x="300" y="335" font-size="28">after deploy</text>
      </g>
      <rect x="170" y="170" width="260" height="150" fill="none" stroke="#c19a5b" stroke-width="4" rx="8"/>
      <path d="M210 230h180M210 260h90M210 290h120" stroke="#c19a5b" stroke-width="6" stroke-linecap="round" fill="none"/>
    </svg>
  `;
  menuQr.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(placeholderSvg)}`;
  downloadQr.href = '#';
  downloadQr.setAttribute('aria-disabled', 'true');
  downloadQr.textContent = 'QR after deploy';
  downloadQr.addEventListener('click', event => {
    event.preventDefault();
  });
} else {
  menuQr.src = qrUrl;
  downloadQr.href = qrUrl;
  downloadQr.addEventListener('click', async event => {
    event.preventDefault();
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'the-royal-spice-menu-qr.png';
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch {
      window.open(qrUrl, '_blank', 'noopener');
    }
  });
}

document.querySelector('#featuredGrid').innerHTML = menuItems.filter(item => item.featured).slice(0, 4).map(item => `
  <article class="featured-item" data-featured-id="${item.id}">
    <img src="${item.image}" alt="${item.name}" loading="lazy">
    <div><span>${item.category}</span><h3>${item.name}</h3><strong>₹${item.price.toLocaleString('en-IN')}</strong></div>
  </article>`).join('');

document.querySelector('#featuredGrid').addEventListener('click', event => {
  const item = event.target.closest('[data-featured-id]');
  if (!item) return;
  document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
  const menuItem = menuItems.find(entry => entry.id === Number(item.dataset.featuredId));
  if (menuItem) {
    setTimeout(() => {
      document.querySelector('#menuSearch').value = menuItem.name;
      document.querySelector('#menuSearch').dispatchEvent(new Event('input'));
    }, 500);
  }
});

document.querySelector('#galleryGrid').innerHTML = galleryImages.map(image => `<figure><img src="${image.src}" alt="${image.alt}" loading="lazy"><figcaption>${image.label}</figcaption></figure>`).join('');

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
window.addEventListener('scroll', () => siteHeader.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

setFontSize(localStorage.getItem('royal-spice-font-size') || 'normal');