import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container";
import { twJoin } from "tailwind-merge";

import heroDesktop from "@/assets/home/desktop/image-hero.jpg";
import heroMobile from "@/assets/home/mobile/image-header.jpg";
import heroTablet from "@/assets/home/tablet/image-header.jpg";

type HeroSectionProps = {
  className?: string;
};

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={twJoin("relative", className)}>
      <picture>
        <source
          media="(min-width: 1024px)"
          width={2880}
          height={1458}
          srcSet={heroDesktop.src}
        />
        <source
          media="(min-width: 640px)"
          width={1536}
          height={1458}
          srcSet={heroTablet.src}
        />
        <img
          width={650}
          height={1200}
          className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
          loading="eager"
          src={heroMobile.src}
          alt=""
        />
      </picture>
      <Container>
        <div className="flex flex-col items-center justify-center xl:items-start">
          <span className="text-sm uppercase text-neutral-100 opacity-50">
            New product
          </span>
          <h1 className="mt-[1rem] max-w-[20.5rem] text-center text-[2.25rem] font-bold uppercase leading-[2.5rem] tracking-[0.08038rem] text-neutral-100 lg:mt-[1.5rem] lg:max-w-[28.6875rem] lg:text-[3.5rem] lg:leading-[3.625rem] lg:tracking-[0.125rem] xl:text-left">
            XX99 Mark II Headphones
          </h1>
          <p className="mt-[1rem] max-w-[20.5rem] text-center text-base text-neutral-100 opacity-50 lg:mt-[1.5rem] lg:max-w-[21.8125rem] xl:text-left">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button
            href="/products/headphones/xx99-mark-two-headphones"
            className="mt-[1.75rem] lg:mt-[2.5rem]"
            intent="primary"
          >
            See product
          </Button>
        </div>
      </Container>
    </section>
  );
}
