import { Product as ProductType } from "@/types";
import Product from "./Product/Product";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/utils/animations";

type ProductListProps = {
  products: ProductType[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <motion.ul
      className={
        "flex flex-col items-center justify-center gap-[7.5rem] xl:gap-[10rem]"
      }
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {products.map((product: ProductType, index: number) => (
        <motion.div key={product.id} variants={fadeInUp}>
          <Product
            product={product}
            reverseOrder={index % 2 !== 0}
            priority={index === 0}
          />
        </motion.div>
      ))}
    </motion.ul>
  );
}
