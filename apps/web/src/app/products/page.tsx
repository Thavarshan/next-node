import { getProducts } from "@/lib/catalog";
import { ItemPicker } from "@/components/ItemPicker";

// LAB 01: This disables static caching even though product content rarely changes.
// TODO: Pick an intentional revalidation interval and explain price staleness.
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await getProducts();
  return (
    <>
      <h2>Products</h2>
      <p>Descriptions rarely change; prices may change hourly. Try Lab 01.</p>
      <ul>{items.map((product) => <li key={product.id}>{product.image} {product.name}: ${product.price}</li>)}</ul>
      <h3>Item selection: Lab 02</h3>
      <ItemPicker />
    </>
  );
}
