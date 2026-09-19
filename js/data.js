const restaurant = {
  name: 'The Royal Spice',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  address: '18 Park Street, Kolkata, West Bengal 700016',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=18+Park+Street+Kolkata',
  hours: 'Open daily, 12:00 PM - 11:00 PM',
  menuUrl: ''
};

const menuItems = [
  { id: 1, name: 'Chicken Biryani', category: 'Biryani', price: 360, description: 'Fragrant basmati rice, tender chicken, saffron and royal whole spices.', image: 'assets/images/chicken_biryani_4.jpg', type: 'Non-Veg', available: true, featured: true },
  { id: 2, name: 'Mutton Biryani', category: 'Biryani', price: 460, description: 'Slow-cooked mutton layered with aromatic rice, fried onions and mint.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Mutton_biryani.JPG', type: 'Non-Veg', available: true, featured: true },
  { id: 3, name: 'Egg Biryani', category: 'Biryani', price: 240, description: 'Spiced boiled eggs nestled in fragrant dum-cooked basmati rice.', image: 'assets/images/egg_biryani.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 4, name: 'Veg Biryani', category: 'Biryani', price: 220, description: 'Seasonal vegetables, paneer and saffron rice with a gentle spice finish.', image: 'assets/images/vegetable_biryani_001.jpg', type: 'Veg', available: true, featured: false },
  { id: 5, name: 'Chicken Tikka', category: 'Chicken', price: 340, description: 'Charred yoghurt-marinated chicken with smoked paprika and chaat masala.', image: 'assets/images/chicken-tikka.jpg', type: 'Non-Veg', available: true, featured: true },
  { id: 6, name: 'Butter Chicken', category: 'Chicken', price: 390, description: 'Tandoori chicken in a silky tomato, butter and fenugreek gravy.', image: 'assets/images/butter_chicken-2c_goa.jpg', type: 'Non-Veg', available: true, featured: true },
  { id: 7, name: 'Chicken Kebab', category: 'Chicken', price: 320, description: 'Juicy minced chicken kebabs seasoned with herbs and warm spices.', image: 'assets/images/chicken_hariyali_kebab.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 8, name: 'Mutton Kosha', category: 'Mutton', price: 450, description: 'Bengali-style mutton braised slowly until dark, glossy and deeply spiced.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/BENGALI_MUTTON_KOSHA.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 9, name: 'Mutton Curry', category: 'Mutton', price: 430, description: 'Rustic bone-in mutton curry with potato, tomato and roasted spices.', image: 'assets/images/mutton_curry_1.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 10, name: 'Paneer Tikka', category: 'Vegetarian', price: 290, description: 'Tandoor-charred paneer, peppers and onion with mint coriander chutney.', image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Paneer_Tikka_Kabab.JPG', type: 'Veg', available: true, featured: false },
  { id: 11, name: 'Paneer Butter Masala', category: 'Vegetarian', price: 310, description: 'Soft paneer in a rich, mildly spiced makhani sauce.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Paneer_Butter_Masala_2.jpg', type: 'Veg', available: true, featured: false },
  { id: 12, name: 'Dal Tadka', category: 'Vegetarian', price: 190, description: 'Yellow lentils finished with ghee, cumin, garlic and red chilli.', image: 'assets/images/dal_tadka.jpg', type: 'Veg', available: true, featured: false },
  { id: 13, name: 'Chicken Chowmein', category: 'Chinese', price: 280, description: 'Wok-tossed noodles with chicken, crisp vegetables and soy chilli glaze.', image: 'assets/images/chicken_chow_mein.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 14, name: 'Veg Chowmein', category: 'Chinese', price: 220, description: 'Street-style wok noodles with cabbage, peppers, carrot and spring onion.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Vegetable_Chow_Mein_-_Howrah_2014-03-23_9721.JPG', type: 'Veg', available: true, featured: false },
  { id: 15, name: 'Chicken Fried Rice', category: 'Chinese', price: 260, description: 'Smoky wok-fried rice with chicken, egg, greens and toasted sesame.', image: 'assets/images/chicken_fried_rice.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 16, name: 'Chilli Chicken', category: 'Chinese', price: 300, description: 'Crisp chicken tossed with peppers, onion, ginger and chilli soy sauce.', image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Kolkata_style_Chicken_Chilly.JPG', type: 'Non-Veg', available: true, featured: false },
  { id: 17, name: 'Chilli Paneer', category: 'Chinese', price: 270, description: 'Golden paneer, peppers and onion in a glossy Indo-Chinese chilli sauce.', image: 'assets/images/chilly_paneer_01.jpg', type: 'Veg', available: true, featured: false },
  { id: 18, name: 'Fish Fry', category: 'Starters', price: 340, description: 'Crisp masala-coated fish fillet with lemon, onion and house tartare.', image: 'assets/images/indian_style_fish_fry.jpg', type: 'Non-Veg', available: true, featured: false },
  { id: 19, name: 'French Fries', category: 'Starters', price: 160, description: 'Golden crisp fries with smoked salt and a house spiced dip.', image: 'assets/images/french_fries.jpg', type: 'Veg', available: true, featured: false },
  { id: 20, name: 'Fresh Lime', category: 'Drinks', price: 90, description: 'Brightly squeezed lime, chilled soda and a pinch of black salt.', image: 'assets/images/fresh_lime.jpg', type: 'Veg', available: true, featured: false },
  { id: 21, name: 'Mango Lassi', category: 'Drinks', price: 150, description: 'Thick Alphonso mango blended with chilled yoghurt and cardamom.', image: 'assets/images/mango-lassi.jpg', type: 'Veg', available: true, featured: false },
  { id: 22, name: 'Sweet Lassi', category: 'Drinks', price: 120, description: 'Silky chilled yoghurt drink with rosewater and crushed pistachio.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Lassi%28sweet%29.JPG', type: 'Veg', available: true, featured: false },
  { id: 23, name: 'Ice Cream', category: 'Dessert', price: 130, description: 'A cool scoop of premium vanilla bean ice cream.', image: 'assets/images/ice-cream.jpg', type: 'Veg', available: true, featured: false },
  { id: 24, name: 'Gulab Jamun', category: 'Dessert', price: 140, description: 'Warm saffron-cardamom dumplings soaked in rose sugar syrup.', image: 'assets/images/gulab_jamun_1.jpg', type: 'Veg', available: true, featured: false },
  { id: 25, name: 'Kulfi', category: 'Dessert', price: 160, description: 'Dense traditional malai kulfi with pistachio and saffron.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Kulfi_ice-cream.jpg', type: 'Veg', available: true, featured: false }
];

