// src/data/menu.js
// All menu items live here. Components read this array, so a dish is added or changed in one place.

// The filter buttons use this list. "All" shows every dish.
export const categories = ["All", "Starters", "Mains", "Desserts"];

// The array of dishes. Each dish is one object.
export const menuItems = [
  {
    id: 1, // unique number, React uses it as the "key" when listing items
    name: "Burrata & tomatoes", // dish name
    description: "Creamy burrata, heirloom tomatoes, basil oil.", // short description
    price: 9, // number in pounds (formatted with £ in the component)
    category: "Starters", // must match a name in the categories list above
    image: "images/tomato.jpg", // placeholder photo
    alt: "Burrata with tomatoes", // describes the photo for screen readers
  },
  {
    id: 2,
    name: "Arancini",
    description: "Crisp saffron rice balls filled with mozzarella.",
    price: 7,
    category: "Starters",
    image: "images/images.jpeg",
    alt: "Arancini rice balls",
  },
  {
    id: 3,
    name: "Focaccia & olives",
    description: "Baked each morning, with rosemary and sea salt.",
    price: 5,
    category: "Starters",
    image: "images/Focaccia & olives.jpeg",
    alt: "Focaccia with olives",
  },
  {
    id: 4,
    name: "Tagliatelle ragù",
    description: "Slow-cooked beef and pork ragù, parmesan.",
    price: 16,
    category: "Mains",
    image: "images/Tagliatelle.jpg",
    alt: "Tagliatelle with ragù",
  },
  {
    id: 5,
    name: "Pesto gnocchi",
    description: "Potato gnocchi, basil pesto, toasted pine nuts.",
    price: 14,
    category: "Mains",
    image: "images/Pesto gnocchi.jpg",
    alt: "Pesto gnocchi",
  },
  {
    id: 6,
    name: "Chicken milanese",
    description: "Golden breaded chicken, rocket and lemon.",
    price: 18,
    category: "Mains",
    image: "images/Chicken milanese.jpg",
    alt: "Chicken milanese",
  },
  {
    id: 7,
    name: "Tiramisù",
    description: "Espresso-soaked sponge, mascarpone, cocoa.",
    price: 7,
    category: "Desserts",
    image: "images/Tiramisù.jpg",
    alt: "Tiramisù",
  },
  {
    id: 8,
    name: "Panna cotta",
    description: "Vanilla cream with a berry compote.",
    price: 6,
    category: "Desserts",
    image: "images/Panna cotta.jpg",
    alt: "Panna cotta with berries",
  },
  {
    id: 9,
    name: "Affogato",
    description: "Vanilla gelato drowned in hot espresso.",
    price: 6,
    category: "Desserts",
    image: "images/Affogato.jpg",
    alt: "Affogato with gelato",
  },
];