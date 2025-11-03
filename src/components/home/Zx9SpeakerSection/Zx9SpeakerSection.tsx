import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container";
import { twJoin } from "tailwind-merge";

import speakerImageDesktop from "@/assets/home/desktop/image-speaker-zx9.png";
import speakerImageMobile from "@/assets/home/mobile/image-speaker-zx9.png";
import speakerImageTablet from "@/assets/home/tablet/image-speaker-zx9.png";

type Zx9SpeakerSectionProps = {
  className?: string;
};

export default function Zx9SpeakerSection({
  className,
}: Zx9SpeakerSectionProps) {
  return (
    <section className={twJoin("", className)}>
      <Container>
        <div className="flex flex-col items-center justify-center gap-[2rem] overflow-hidden rounded-lg bg-orange bg-zx9-speaker-pattern bg-cover bg-no-repeat px-[1.5rem] py-[3.44rem] [backgroundPosition:50%_-8.5rem] lg:[backgroundPosition:0rem_-10rem] xl:flex-row xl:justify-end xl:gap-[8.64rem] xl:px-[6.15rem] xl:py-[8rem] xl:[backgroundPosition:-16.5rem_-5rem] xl:[flex:1_1_50%]">
          <div className="relative max-h-[12.9375rem] max-w-[10.7655rem] lg:max-h-[14.8125rem] lg:max-w-[12.32575rem] xl:max-h-[30.8125rem] xl:w-1/2 xl:max-w-[25.63963rem]">
            <picture>
              <source
                media="(min-width: 1024px)"
                width={756}
                height={918}
                srcSet={speakerImageDesktop.src}
              />
              <source
                media="(min-width: 640px)"
                width={366}
                height={444}
                srcSet={speakerImageTablet.src}
              />
              <img
                className="xl:absolute xl:bottom-[-18rem]"
                width={320}
                height={388}
                loading="lazy"
                src={speakerImageMobile.src}
                alt="ZX9 Speaker"
              />
            </picture>
          </div>
          <div className="text-center xl:w-1/2 xl:text-left">
            <h2 className="text-4xl text-[2.25rem] font-bold uppercase leading-[2.5rem] tracking-[0.08038rem] text-neutral-100 xl:text-5xl">
              ZX9 speaker
            </h2>
            <p className="mt-[1.5rem] max-w-[30ch] text-base text-neutral-100/75 xl:max-w-[36ch]">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Button
              href="/products/speakers/zx9-speaker"
              className="mt-[1.5rem]"
              intent="secondary-alt"
            >
              See product
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
