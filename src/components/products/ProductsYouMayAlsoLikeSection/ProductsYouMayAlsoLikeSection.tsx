import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container";
import { ImageUrls } from "@/types";
import { getCategoryBySlug } from "@/utils/products";

type ProductsYouMayAlsoLikeSectionProps = {
  otherProducts: {
    slug: string;
    name: string;
    image: ImageUrls;
  }[];
  className?: string;
};

export default function ProductsYouMayAlsoLikeSection({
  otherProducts,
  className,
}: ProductsYouMayAlsoLikeSectionProps) {
  return (
    <section className={className}>
      <Container>
        <h2 className="text-center text-xl uppercase leading-[2.25rem] tracking-[0.05356rem] text-neutral-900 md:text-3xl md:max-xl:basis-1/2">
          You may also like
        </h2>
        <ul className="flex flex-col items-center justify-center gap-[3.5rem] pt-[2.5rem] md:pt-[3.5rem] lg:flex-row lg:gap-[0.69rem] xl:gap-[1.88rem] xl:pt-[4rem]">
          {otherProducts.map((product) => (
            <li
              className="flex flex-col items-center justify-center"
              key={product.slug}
            >
              <div className="overflow-hidden rounded-lg">
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    width={700}
                    height={636}
                    srcSet={product.image.desktop}
                  />
                  <source
                    media="(min-width: 768px)"
                    width={446}
                    height={636}
                    srcSet={product.image.tablet}
                  />
                  <img
                    width={654}
                    height={240}
                    className="object-cover"
                    loading="lazy"
                    src={product.image.mobile}
                    alt={product.name}
                  />
                </picture>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="pt-[2rem] text-center text-xl font-bold uppercase leading-normal tracking-[0.06694rem] text-neutral-900 md:pt-[2.5rem] xl:text-lg">
                  {product.name}
                </h3>
                <Button
                  href={`/products/${getCategoryBySlug(product.slug)}/${
                    product.slug
                  }`}
                  className="mt-[2rem]"
                  intent="primary"
                >
                  See product
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
