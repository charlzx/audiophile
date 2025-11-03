import Container from "@/components/common/Container";
import { twJoin } from "tailwind-merge";

import bestGearDesktop from "@/assets/shared/desktop/image-best-gear.jpg";
import bestGearMobile from "@/assets/shared/mobile/image-best-gear.jpg";
import bestGearTablet from "@/assets/shared/tablet/image-best-gear.jpg";

type AudioGearSectionProps = {
  className?: string;
};

export default function AudioGearSection({ className }: AudioGearSectionProps) {
  return (
    <section className={twJoin("", className)}>
      <Container className="flex flex-col items-center gap-[2.5rem] lg:gap-[3.9375rem] xl:flex-row-reverse xl:gap-[7.8125rem]">
        <div className="order-1 w-full overflow-hidden rounded-lg xl:w-1/2">
          <picture>
            <source
              media="(min-width: 1024px)"
              width={540}
              height={588}
              srcSet={bestGearDesktop.src}
            />
            <source
              media="(min-width: 640px)"
              width={1378}
              height={600}
              srcSet={bestGearTablet.src}
            />
            <img
              width={654}
              height={600}
              className="h-full max-h-[18.75rem] min-h-[18.75rem] w-full object-cover lg:min-h-[20rem] xl:max-h-[36.75rem]"
              loading="lazy"
              src={bestGearMobile.src}
              alt="Man wearing headphones"
            />
          </picture>
        </div>
        <div className="order-2 text-center lg:max-w-[35.8125rem] xl:w-1/2 xl:text-left">
          <h2 className="text-2xl font-bold uppercase text-neutral-900 lg:text-4xl xl:max-w-[18ch]">
            Bringing you the <span className="text-orange">best</span> audio
            gear
          </h2>
          <p className="mt-[2rem] text-base opacity-50">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </Container>
    </section>
  );
}
