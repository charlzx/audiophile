import Container from "@/components/common/Container";
import { Product } from "@/types";
import ProductList from "./ProductList/ProductList";

type ProductSectionProps = {
  className?: string;
  products: Product[];
};

export default function ProductSection({
  products,
  className,
}: ProductSectionProps) {
  return (
    <section className={className}>
      <Container>
        <ProductList products={products} />
      </Container>
    </section>
  );
}
