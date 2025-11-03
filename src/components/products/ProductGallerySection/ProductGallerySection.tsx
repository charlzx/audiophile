import Container from "@/components/common/Container";
import { ImageUrls } from "@/types";

type ProductGallerySectionProps = {
  productName: string;
  gallery: {
    first: ImageUrls;
    second: ImageUrls;
    third: ImageUrls;
  };
  className?: string;
};

export default function ProductGallerySection({
  productName,
  gallery,
  className,
}: ProductGallerySectionProps) {
  return (
    <section className={className}>
      <Container className="grid grid-flow-row gap-[1.25rem] md:gap-[1.12rem] xl:gap-[1.83rem]">
        <div className="overflow-hidden rounded-lg">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={gallery.first.desktop}
            />
            <source media="(min-width: 640px)" srcSet={gallery.first.tablet} />
            <img
              className="h-full w-auto object-cover"
              loading="lazy"
              src={gallery.first.mobile}
              alt={`${productName} gallery image 1`}
            />
          </picture>
        </div>
        <div className="overflow-hidden rounded-lg">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={gallery.second.desktop}
            />
            <source media="(min-width: 640px)" srcSet={gallery.second.tablet} />
            <img
              className="h-full w-auto object-cover"
              loading="lazy"
              src={gallery.second.mobile}
              alt={`${productName} gallery image 2`}
            />
          </picture>
        </div>
        <div className="overflow-hidden rounded-lg md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-3">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={gallery.third.desktop}
            />
            <source media="(min-width: 640px)" srcSet={gallery.third.tablet} />
            <img
              className="h-full w-auto object-cover"
              loading="lazy"
              src={gallery.third.mobile}
              alt={`${productName} gallery image 3`}
            />
          </picture>
        </div>
      </Container>
    </section>
  );
}
