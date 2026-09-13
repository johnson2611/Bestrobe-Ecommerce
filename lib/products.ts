export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; 
  color: string; 
  image?: string;
  description: string;
  sizes: string[];
  featured?: boolean;
  newArrival?: boolean;
};

export const categories = [
  "All",
  "Shirts",
  "Denim",
  "Outerwear",
  "T-Shirts",
  "Trousers",
  "Knitwear",
] as const;

export const products: Product[] = [
  {
    id: "oxford-shirt",
    name: "Oxford Button-Down",
    category: "Shirts",
    price: 18500,
    color: "#E8E2D4",
    image: "Oxford-Button-Down.jpg",
    description:
      "A heavyweight oxford cloth shirt with a soft button-down collar. Built to hold its shape wash after wash, and equally at home tucked in or worn open over a tee.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "straight-jeans",
    name: "Straight-Leg Denim",
    category: "Denim",
    price: 24000,
    color: "#3B4A5A",
    image: "Denim.jpg",
    description:
      "13oz raw denim in a straight-leg cut that breaks in with you over time. No stretch fibers — just cotton denim the way it used to be made.",
    sizes: ["28", "30", "32", "34", "36"],
    featured: true,
    newArrival: true,
  },
  {
    id: "wool-overcoat",
    name: "Wool Overcoat",
    category: "Outerwear",
    price: 62000,
    color: "#4A3B33",
    image: "Wool-Overcoat.jpg",
    description:
      "A full wool-blend overcoat cut for layering over knitwear. Structured shoulders, a clean silhouette, and enough warmth for the coldest evenings.",
    sizes: ["S", "M", "L", "XL"],
    newArrival: true,
  },
  {
    id: "cotton-tee",
    name: "Heavyweight Cotton Tee",
    category: "T-Shirts",
    price: 9500,
    color: "#6E2A38",
    image: "Heavyweight-Cotton-Tee.jpg",
    description:
      "240gsm combed cotton — thick enough to hold its shape, soft enough to wear every day. Garment-dyed for a slightly worn-in look from day one.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
  },
  {
    id: "pleated-trousers",
    name: "Pleated Trousers",
    category: "Trousers",
    price: 21000,
    color: "#8C8272",
    image: "Pleated-Trousers.jpg",
    description:
      "A relaxed, pleated trouser that moves easily between the office and everywhere after. Finished with a soft drape that never looks stiff.",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: "knit-sweater",
    name: "Ribbed Knit Sweater",
    category: "Knitwear",
    price: 27500,
    color: "#DCD3C3",
    image:"Ribbed-Knit-Sweater.jpg",
    description:
      "A ribbed crewneck knit in a mid-weight cotton-wool blend. Layers cleanly under a coat or stands on its own on milder days.",
    sizes: ["S", "M", "L"],
    newArrival: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
