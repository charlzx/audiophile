import Button from "@/components/common/Button/Button";

import yx1EarphonesDesktop from "@/assets/home/desktop/image-earphones-yx1.jpg";
import yx1EarphonesMobile from "@/assets/home/mobile/image-earphones-yx1.jpg";
import yx1EarphonesTablet from "@/assets/home/tablet/image-earphones-yx1.jpg";
import Container from "@/components/common/Container";

type Yx1EarphonesSectionProps = {
  className?: string;
};

export default function Yx1EarphonesSection({
  className,
}: Yx1EarphonesSectionProps) {
  return (
    <section className={className}>
      <Container className="flex flex-col gap-[1.5rem] md:gap-[0.6875rem] lg:flex-row lg:gap-[1.875rem]">
        <div className="overflow-hidden rounded-lg lg:w-1/2">
          <picture>
            <source
              media="(min-width: 1024px)"
              width={540}
              height={320}
              srcSet={yx1EarphonesDesktop.src}
            />
            <source
              media="(min-width: 640px)"
              width={678}
              height={640}
              srcSet={yx1EarphonesTablet.src}
            />
            <img
              width={654}
              height={400}
              className="h-full max-h-[12.5rem] min-h-[12.5rem] w-full object-cover lg:max-h-[20rem] lg:min-h-[20rem]"
              loading="lazy"
              src={yx1EarphonesMobile.src}
              alt="YX1 Earphones"
            />
          </picture>
        </div>
        <div className="flex h-full max-h-[12.5rem] min-h-[12.5rem] w-full flex-col items-start justify-center gap-8 overflow-hidden rounded-lg bg-neutral-400 p-6 lg:max-h-[20rem] lg:min-h-[20rem] lg:w-1/2 lg:p-[2.56rem] xl:p-[5.94rem]">
          <h2 className="text-2xl font-bold uppercase text-neutral-900">
            Yx1 earphones
          </h2>
          <Button href="/products/earphones/yx1-earphones" intent="secondary">
            See product
          </Button>
        </div>
      </Container>
    </section>
  );
}
