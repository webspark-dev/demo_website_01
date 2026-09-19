// Replace image URLs here without changing the layout or JavaScript behavior.
const backgroundAssets = {
  hero: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=75',
  story: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=75'
};

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85', alt: 'Warmly lit restaurant interior', label: 'The dining room' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Chicken_Biryani_4.jpg', alt: 'Chicken biryani with saffron rice', label: 'Biryani ritual' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Chicken-Tikka.jpg', alt: 'Charred chicken tikka', label: 'From the tandoor' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Butter_Chicken%2C_Goa.jpg', alt: 'Butter chicken in a brass bowl', label: 'Royal gravies' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Chicken_Chow_Mein.JPG', alt: 'Chicken chow mein', label: 'The wok' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Gulab_Jamun_1.jpg', alt: 'Gulab jamun dessert', label: 'A sweet ending' },
  { src: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85', alt: 'Mango lassi in a glass', label: 'Cool sips' }
];

document.documentElement.style.setProperty('--hero-image', `url("${backgroundAssets.hero}")`);
document.querySelector('.hero-image').style.backgroundImage = `url("${backgroundAssets.hero}")`;
document.querySelector('.hero-image').style.backgroundPosition = 'center 58%';
document.querySelector('.hero-overlay').style.background = 'linear-gradient(90deg, rgba(22, 13, 8, .88) 0%, rgba(48, 25, 12, .58) 48%, rgba(24, 13, 7, .2) 100%), linear-gradient(0deg, rgba(73, 35, 13, .3), transparent 55%)';
document.querySelector('[data-bg="story"]').src = backgroundAssets.story;
document.querySelectorAll('.food-image-wrap img, .featured-item img, .gallery-grid img').forEach(image => {
  image.style.filter = 'saturate(1.08) contrast(1.05) brightness(.96)';
});