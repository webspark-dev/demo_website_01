// UPDATE HERO AND STORY PHOTOS HERE. Use local paths from assets/images/ for faster loading.
const backgroundAssets = {
  hero: 'assets/images/hero.jpg',
  story: 'assets/images/story.jpg'
};

// UPDATE GALLERY PHOTOS HERE: src, alt text and the label shown on each image.
const galleryImages = [
  { src: 'assets/images/dining-room.jpg', alt: 'Warmly lit restaurant interior', label: 'The dining room' },
  { src: 'assets/images/chicken_biryani_4.jpg', alt: 'Chicken biryani with saffron rice', label: 'Biryani ritual' },
  { src: 'assets/images/chicken-tikka.jpg', alt: 'Charred chicken tikka', label: 'From the tandoor' },
  { src: 'assets/images/butter_chicken-2c_goa.jpg', alt: 'Butter chicken in a brass bowl', label: 'Royal gravies' },
  { src: 'assets/images/chicken_chow_mein.jpg', alt: 'Chicken chow mein', label: 'The wok' },
  { src: 'assets/images/gulab_jamun_1.jpg', alt: 'Gulab jamun dessert', label: 'A sweet ending' },
  { src: 'assets/images/mango-lassi.jpg', alt: 'Mango lassi in a glass', label: 'Cool sips' }
];

document.documentElement.style.setProperty('--hero-image', `url("${backgroundAssets.hero}")`);
document.querySelector('.hero-image').style.backgroundImage = `url("${backgroundAssets.hero}")`;
document.querySelector('.hero-image').style.backgroundPosition = 'center 58%';
document.querySelector('.hero-overlay').style.background = 'linear-gradient(90deg, rgba(22, 13, 8, .88) 0%, rgba(48, 25, 12, .58) 48%, rgba(24, 13, 7, .2) 100%), linear-gradient(0deg, rgba(73, 35, 13, .3), transparent 55%)';
document.querySelector('[data-bg="story"]').src = backgroundAssets.story;
document.querySelectorAll('.food-image-wrap img, .featured-item img, .gallery-grid img').forEach(image => {
  image.style.filter = 'saturate(1.08) contrast(1.05) brightness(.96)';
});