export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  flavor: string[];
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const categories = [
  "All",
  "Single Origin",
  "Blend",
  "Espresso",
  "Decaf",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 24.99,
    weight: "250g",
    roast: "Light",
    flavor: ["Blueberry", "Jasmine", "Citrus"],
    description:
      "A stunning single origin from the birthplace of coffee. Grown at elevations above 1,800 meters in the Yirgacheffe region, this natural-process coffee delivers an extraordinary cup with vibrant berry notes, delicate floral aromatics, and a bright citrus finish. Each sip reveals layers of complexity that make this one of the world's most celebrated coffees.",
    image: "🫘",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 21.99,
    weight: "250g",
    roast: "Medium",
    flavor: ["Caramel", "Nutty", "Chocolate"],
    description:
      "Sourced from small farms in the Huila region of Colombia, this Supremo grade coffee is a masterclass in balance. Washed processing preserves the clean, sweet character while developing rich caramel undertones. The medium roast brings out nutty warmth and a smooth chocolate finish that makes this an ideal everyday coffee.",
    image: "☕",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Guatemala",
    category: "Blend",
    price: 19.99,
    weight: "250g",
    roast: "Dark",
    flavor: ["Dark Chocolate", "Smoky", "Molasses"],
    description:
      "Our signature dark roast blend combines the deep, full-bodied character of Brazilian Santos with the rich complexity of Guatemalan Antigua beans. Dark-roasted to develop intense flavors of dark chocolate, subtle smokiness, and a lingering molasses sweetness. Perfect for those who appreciate a bold, assertive cup with remarkable depth.",
    image: "🌑",
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 4,
    name: "Morning Ritual Espresso",
    origin: "Multi-Origin",
    category: "Espresso",
    price: 22.99,
    weight: "250g",
    roast: "Medium-Dark",
    flavor: ["Hazelnut", "Toffee", "Red Apple"],
    description:
      "Crafted specifically for espresso extraction, this blend harmonizes beans from three origins to create a shot with incredible crema, balanced acidity, and a sweet, lingering finish. Notes of toasted hazelnut and buttery toffee meld with a subtle red apple brightness. Grind fine and pull a double shot for the perfect morning ritual.",
    image: "⚡",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 5,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    price: 23.99,
    weight: "250g",
    roast: "Medium-Dark",
    flavor: ["Earthy", "Cedar", "Dark Cocoa"],
    description:
      "From the volcanic highlands of northern Sumatra, this wet-hulled coffee offers a uniquely full-bodied experience. The traditional Giling Basah processing method creates the signature earthy, complex profile with notes of aromatic cedar, dried herbs, and dark cocoa. A coffee of remarkable character that rewards slow, mindful drinking.",
    image: "🌿",
    rating: 4.5,
    reviews: 74,
  },
  {
    id: 6,
    name: "Swiss Water Decaf",
    origin: "Mexico",
    category: "Decaf",
    price: 20.99,
    weight: "250g",
    roast: "Medium",
    flavor: ["Milk Chocolate", "Almond", "Honey"],
    description:
      "Proof that decaf doesn't mean flavorless. This Mexican coffee is decaffeinated using the chemical-free Swiss Water Process, preserving the bean's natural sweetness and complexity. The result is a smooth, approachable cup with gentle notes of milk chocolate, toasted almond, and a delicate honey finish. Enjoy any time of day.",
    image: "🍯",
    rating: 4.4,
    reviews: 62,
  },
];
