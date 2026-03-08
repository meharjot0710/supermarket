export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  unit: string;
  minOrder: string;
  description?: string;
}

export const shopCategories = [
  "All",
  "Beverages",
  "Pantry & Condiments",
  "Cleaning & Household",
  "Snacks & Confectionery",
  "Pet Care",
  "Health & Wellness",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Rosella Tomato Sauce 500ml",
    category: "Pantry & Condiments",
    brand: "Rosella",
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 12",
    minOrder: "2 cases",
    description: "Australian-made tomato sauce, ideal for retail and food service. Consistent quality and shelf appeal.",
  },
  {
    id: "2",
    name: "Capi Sparkling Mineral Water 750ml",
    category: "Beverages",
    brand: "Capi",
    image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 12",
    minOrder: "3 cases",
    description: "Premium Australian sparkling mineral water. Popular with retailers and venues.",
  },
  {
    id: "3",
    name: "Scrub Daddy Original Sponge",
    category: "Cleaning & Household",
    brand: "Scrub Daddy",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=600&auto=format&fit=crop",
    unit: "Pack of 6",
    minOrder: "4 packs",
    description: "Durable cleaning sponge with smile design. Changes texture in warm water for versatile cleaning.",
  },
  {
    id: "4",
    name: "Coco Coast Coconut Water 1L",
    category: "Beverages",
    brand: "Coco Coast",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 6",
    minOrder: "3 cases",
    description: "Natural coconut water, no added sugar. Strong performer in health and convenience channels.",
  },
  {
    id: "5",
    name: "The Pink Stuff Cleaning Paste 500g",
    category: "Cleaning & Household",
    brand: "Pink Stuff",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 12",
    minOrder: "2 cases",
    description: "Multi-purpose cleaning paste for tough stains. Retail and commercial demand.",
  },
  {
    id: "6",
    name: "Buderim Ginger Beer 375ml",
    category: "Beverages",
    brand: "Buderim",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 24",
    minOrder: "2 cases",
    description: "Australian ginger beer with real ginger. Great for independents and on-premise.",
  },
  {
    id: "7",
    name: "G-Fresh Ground Black Pepper 100g",
    category: "Pantry & Condiments",
    brand: "G-Fresh",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
    unit: "Pack of 12",
    minOrder: "3 packs",
    description: "Quality ground black pepper for pantry and kitchen. Consistent seller in FMCG.",
  },
  {
    id: "8",
    name: "Bow Wow Premium Dog Treats 200g",
    category: "Pet Care",
    brand: "Bow Wow",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=600&auto=format&fit=crop",
    unit: "Pack of 8",
    minOrder: "4 packs",
    description: "Premium dog treats, natural ingredients. Growing pet care category.",
  },
  {
    id: "9",
    name: "Rosella Fruit Chutney 250ml",
    category: "Pantry & Condiments",
    brand: "Rosella",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 12",
    minOrder: "2 cases",
    description: "Classic Australian fruit chutney. Staple for deli and pantry sections.",
  },
  {
    id: "10",
    name: "Capi Tonic Water 250ml 4-pack",
    category: "Beverages",
    brand: "Capi",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop",
    unit: "Case of 6",
    minOrder: "3 cases",
    description: "Premium tonic water for mixers and soft drink. Strong brand recognition.",
  },
  {
    id: "11",
    name: "Scrub Daddy Power Paste Kit",
    category: "Cleaning & Household",
    brand: "Scrub Daddy",
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=600&auto=format&fit=crop",
    unit: "Pack of 4",
    minOrder: "6 packs",
    description: "Cleaning paste and applicator kit. Ideal for retail and B2B.",
  },
  {
    id: "12",
    name: "Bow Wow Dental Sticks 7-pack",
    category: "Pet Care",
    brand: "Bow Wow",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=600&auto=format&fit=crop",
    unit: "Pack of 10",
    minOrder: "3 packs",
    description: "Dental care sticks for dogs. Supports oral health, popular with pet owners.",
  },
];
