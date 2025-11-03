import AudioGearSection from "@/components/common/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/common/CategorySection/CategorySection";
import ProductSection from "@/components/products/ProductSection/ProductSection";
import { Product, Products } from "@/types";
import { getProductList, getProductListByCategory } from "@/utils/products";
import { titleCase } from "@/utils/titleCase";
import Head from "next/head";

type CategoryProps = {
  products: Product[];
};

export default function Category({ products }: CategoryProps) {
  return (
    <>
      <Head>
        <title>
          {`${titleCase(products[0].category)} | Audiophile E-commerce`}
        </title>
      </Head>

      <div className="bg-neutral-800 pb-[2rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6.125rem] md:pt-[calc(6.125rem+var(--navigation-height))]">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-center text-2xl font-bold uppercase leading-normal text-neutral-100 md:text-4xl md:leading-[2.75rem]">
            {products[0].category}
          </h1>
        </div>
      </div>
      <main className="pb-[7.5rem] md:pb-[6rem] xl:pb-[10rem]">
        <ProductSection
          products={products}
          className="pt-[4rem] md:pt-[7.5rem] xl:pt-[10rem]"
        />
        <CategorySection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
        <AudioGearSection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
      </main>
    </>
  );
}

const getUniqueCategoriesFromProducts = (products: Products) => {
  const uniqueCategories = new Set(products.map((product) => product.category));
  const productCategories = Array.from(uniqueCategories).map((category) => ({
    params: { categorySlug: category },
  }));

  return productCategories;
};

export async function getStaticPaths() {
  const products = getProductList();
  const paths = getUniqueCategoriesFromProducts(products);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const products = getProductListByCategory(params.categorySlug);
  products.sort((_a, b) => (b.new ? 1 : -1));

  return {
    props: {
      products,
    },
  };
}
