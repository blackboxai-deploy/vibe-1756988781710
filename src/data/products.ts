export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: "latte",
    name: "Classic Latte",
    description: "Rich espresso with perfectly steamed milk and a light layer of foam. A comforting classic that's smooth and aromatic.",
    price: 4.50,
    imageUrl: "https://placehold.co/400x400?text=Steamed+milk+latte+in+a+glass+mug+on+a+minimalist+wooden+surface+with+coffee+beans+scattered",
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
    category: "Classic"
  },
  {
    id: "cappuccino",
    name: "Perfect Cappuccino",
    description: "Bold espresso perfectly balanced with steamed milk and velvety foam. Served in a porcelain cup for optimal temperature.",
    price: 4.75,
    imageUrl: "https://placehold.co/400x400?text=Traditional+cappuccino+in+porcelain+cup+with+perfect+foam+layer+on+marble+counter",
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
    category: "Classic"
  },
  {
    id: "espresso",
    name: "Classic Espresso",
    description: "Double shot of intense, rich espresso with robust flavor and perfect crema. The purest coffee experience.",
    price: 3.25,
    imageUrl: "https://placehold.co/400x400?text=Double+espresso+shot+in+demitasse+cup+with+golden+crema+on+brown+background",
    ingredients: ["Double Espresso Shot"],
    category: "Classic"
  },
  {
    id: "americano",
    name: "Americano",
    description: "Rich espresso diluted with hot water for a lighter, smoother coffee experience. Clean and energizing.",
    price: 3.75,
    imageUrl: "https://placehold.co/400x400?text=Americano+coffee+in+clear+glass+tumbler+steam+rising+minimal+beige+background",
    ingredients: ["Espresso", "Hot Water"],
    category: "Classic"
  },
  {
    id: "mocha",
    name: "Chocolate Mocha",
    description: "Rich espresso combined with chocolate and steamed milk, topped with whipped cream. Decadent and satisfying.",
    price: 5.25,
    imageUrl: "https://placehold.co/400x400?text=Chocolate+mocha+in+tall+glass+cup+with+whipped+cream+and+chocolate+drizzle",
    ingredients: ["Espresso", "Chocolate Syrup", "Steamed Milk", "Whipped Cream"],
    category: "Specialty"
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Silky microfoam steamed milk with espresso, preserving the coffee's intricate flavor notes.",
    price: 4.90,
    imageUrl: "https://placehold.co/400x400?text=Flat+white+coffee+in+porcelain+cup+with+smooth+surface+minimalist+aesthetic",
    ingredients: ["Espresso", "Microfoam Steamed Milk"],
    category: "Classic"
  },
  {
    id: "caramel-latte",
    name: "Caramel Latte",
    description: "Rich espresso with vanilla caramel syrup and steamed milk, topped with caramel drizzle.",
    price: 5.00,
    imageUrl: "https://placehold.co/400x400?text=Caramel+latte+in+tall+coffee+cup+with+caramel+swirls+on+cream",
    ingredients: ["Espresso", "Caramel Syrup", "Vanilla Syrup", "Steamed Milk", "Caramel Drizzle"],
    category: "Specialty"
  },
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    description: "Smooth espresso blended with French vanilla and steamed milk. Subtle sweetness with coffee warmth.",
    price: 4.75,
    imageUrl: "https://placehold.co/400x400?text=Vanilla+latte+in+glass+mug+with+steamed+milk+art+beige+tabletop",
    ingredients: ["Espresso", "French Vanilla Syrup", "Steamed Milk"],
    category: "Specialty"
  }
];