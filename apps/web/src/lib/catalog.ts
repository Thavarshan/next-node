export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

// Local-only fixture. Extend to a real API after passing the caching exercise.
export const products: Product[] = [
  { id: "p1", name: "Mechanical keyboard", description: "Hot-swappable switches", price: 75, image: "⌨️" },
  { id: "p2", name: "USB-C dock", description: "One cable, many ports", price: 59, image: "🔌" },
  { id: "p3", name: "Headphones", description: "Closed-back studio audio", price: 125, image: "🎧" },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}
