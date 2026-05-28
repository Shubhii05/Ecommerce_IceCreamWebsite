export type Category = "Cones" | "Shakes" | "Sundaes" | "Waffles" | "Seasonal";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  category: Category;
  flavors: string[];
  toppings: string[];
}

export const CATEGORIES: Category[] = ["Cones", "Shakes", "Sundaes", "Waffles", "Seasonal"];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Royal Kesar Pista Cone",
    description: "Two generous scoops of hand-churned saffron-infused milk ice cream nestled in a crispy handmade waffle cone, garnished with premium Kashmiri saffron and crushed pistachios.",
    price: 180.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviews: 124,
    badge: "Festive Special",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80",
    category: "Cones",
    flavors: ["Saffron Kesar", "Pistachio Pista", "Shahi Badam (Almond)"],
    toppings: ["Crushed Pistachios", "Saffron Strands", "Silver Foil (Vark)", "Sliced Almonds"]
  },
  {
    id: "p2",
    name: "Tender Coconut Nariyal Cone",
    description: "Fresh, smooth, hand-churned coconut ice cream made with real tender coconut malai from coastal Karnataka farms. Churned daily to absolute perfection.",
    price: 160.00,
    originalPrice: 180.00,
    rating: 4.8,
    reviews: 98,
    badge: "Summer Classic",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80",
    category: "Cones",
    flavors: ["Tender Coconut", "Sweet Cream", "Nariyal Malai"],
    toppings: ["Toasted Coconut Flakes", "Roasted Cashew Bits", "Wild Honey Drizzle"]
  },
  {
    id: "p3",
    name: "Alphonso Mango Dream Shake",
    description: "Our signature seasonal thick shake made with luscious, premium Alphonso mango pulp, thick milk, and topped with a towering cloud of fresh mango-infused whipped cream.",
    price: 220.00,
    rating: 5.0,
    reviews: 186,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80",
    category: "Shakes",
    flavors: ["Alphonso Mango", "Mango Lassi Blend", "Vanilla Bean"],
    toppings: ["Fresh Mango Dices", "Pistachio Slivers", "Saffron Whipped Cream", "Tutti Frutti"]
  },
  {
    id: "p4",
    name: "Shahi Rajbhog Sundae",
    description: "Three rich scoops (Kesar, Pista, Elaichi) atop warm house-made Mawa cake, drowned in thick saffron rabri syrup, chopped dry fruits, and gold-dusted cherries.",
    price: 250.00,
    originalPrice: 280.00,
    rating: 4.9,
    reviews: 242,
    badge: "Royal Treat",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    category: "Sundaes",
    flavors: ["Royal Rajbhog", "Saffron Kesar", "Cardamom Elaichi"],
    toppings: ["Thick Rabri Drizzle", "Slivered Almonds & Cashews", "Silver Leaf (Vark)", "Golden Tutti Frutti", "Rose Petal Jam"]
  },
  {
    id: "p5",
    name: "Paan Gulkand Bubble Waffle",
    description: "A golden, hot cardamom-infused bubble waffle, loaded with hand-crafted refreshing Meetha Paan & Gulkand (rose petal jam) ice cream.",
    price: 240.00,
    rating: 4.7,
    reviews: 64,
    badge: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    category: "Waffles",
    flavors: ["Meetha Paan", "Rose Gulkand", "Sweet Fennel Saunf"],
    toppings: ["Rose Petal Jam (Gulkand)", "Tutti Frutti", "Sweet Fennel Sprinkles", "Silver Vark"]
  },
  {
    id: "p6",
    name: "Midnight Chocolate Rabri Fudge",
    description: "Velvety rich Belgian dark chocolate ice cream layered with traditional sweet reduced-milk Rabri and swirled with hot chocolate fudge.",
    price: 190.00,
    rating: 4.9,
    reviews: 153,
    badge: "Fusion Special",
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80",
    category: "Seasonal",
    flavors: ["Midnight Chocolate Swirl", "Rabri Cream", "Double Choco Chip"],
    toppings: ["Hot Chocolate Fudge", "Roasted Cashew Bits", "Oreo Crumbs", "Cocoa Powder Dust"]
  },
  {
    id: "p7",
    name: "Jamun Black Plum Sorbet",
    description: "Vibrant, tangy, and intensely refreshing dairy-free sorbet made with ripe handpicked organic Indian Jamun (black plum) and a pinch of black salt. Vegan-friendly.",
    price: 140.00,
    rating: 4.8,
    reviews: 87,
    badge: "Dairy-Free / Vegan",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80",
    category: "Seasonal",
    flavors: ["Tangy Jamun", "Kala Khatta", "Spiced Lemonade"],
    toppings: ["Black Salt Sprinkle", "Fresh Mint Leaves", "Chaat Masala Dust"]
  },
  {
    id: "p8",
    name: "Traditional Malai Kulfi Falooda",
    description: "Classic dense slow-reduced whole milk kulfi infused with cardamom, sliced and served with soft falooda noodles, sweet basil seeds, and rose syrup.",
    price: 170.00,
    rating: 4.9,
    reviews: 210,
    badge: "All-Time Favorite",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "Sundaes",
    flavors: ["Traditional Malai Kulfi", "Kesar Badam Kulfi", "Rose Petal Kulfi"],
    toppings: ["Sweet Rose Syrup", "Falooda Noodles", "Subza (Basil) Seeds", "Pistachio Slivers"]
  }
];
