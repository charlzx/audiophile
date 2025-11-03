import AudioGearSection from "@/components/common/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/common/CategorySection/CategorySection";
import Container from "@/components/common/Container";
import GoBackButton from "@/components/products/GoBackButton/GoBackButton";
import ProductFeaturesSection from "@/components/products/ProductFeaturesSection/ProductFeaturesSection";
import ProductGallerySection from "@/components/products/ProductGallerySection/ProductGallerySection";
import Product from "@/components/products/ProductSection/ProductList/Product/Product";
import ProductsYouMayAlsoLikeSection from "@/components/products/ProductsYouMayAlsoLikeSection/ProductsYouMayAlsoLikeSection";
import { Product as ProductType } from "@/types";
import { getProductBySlug, getProductList } from "@/utils/products";
import Head from "next/head";

type ProductDetailsProps = {
  product: ProductType;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      <Head>
        <title>{`${product.name} | Audiophile E-commerce`}</title>
      </Head>

      <main className="pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
        <Container>
          <GoBackButton>Go Back</GoBackButton>
        </Container>
        <section className="mt-[1.5rem] xl:mt-[3.5rem]">
          <Container>
            <Product product={product} showAddToCart />
          </Container>
        </section>
        <ProductFeaturesSection
          className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
          features={product.features}
          includes={product.includes}
        />
        <ProductGallerySection
          productName={product.name}
          gallery={product.gallery}
          className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
        />
        <ProductsYouMayAlsoLikeSection
          otherProducts={product.others}
          className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
        />
        <CategorySection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
        <AudioGearSection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const products = getProductList();
  const paths = products.map((product) => ({
    params: {
      categorySlug: product.category,
      productSlug: product.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const product = getProductBySlug(params.productSlug);

  return {
    props: {
      product,
    },
  };
}
