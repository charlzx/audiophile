import { Product as ProductType } from "@/types";
import Product from "./Product/Product";

type ProductListProps = {
  products: ProductType[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul
      className={
        "flex flex-col items-center justify-center gap-[7.5rem] xl:gap-[10rem]"
      }
    >
      {products.map((product: ProductType, index: number) => (
        <Product
          key={product.id}
          product={product}
          reverseOrder={index % 2 !== 0}
          priority={index === 0}
        />
      ))}
    </ul>
  );
}
