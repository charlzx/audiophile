import { Product } from "@/types";
import productData from "../data/products.json";

export const getProductList = () => {
  return productData;
};

export const getProductListByCategory = (category: string) => {
  const productList = productData.filter(
    (product: Product) => product.category === category,
  );

  return productList;
};

export const getProductBySlug = (slug: string) => {
  const product = productData.find((product: Product) => product.slug === slug);

  return product;
};

export const getProductById = (id: number) => {
  const product = productData.find((product: Product) => product.id === id);

  return product;
};

export const getCategoryBySlug = (slug: string) => {
  const product = productData.find((product: Product) => product.slug === slug);

  return product?.category;
};
