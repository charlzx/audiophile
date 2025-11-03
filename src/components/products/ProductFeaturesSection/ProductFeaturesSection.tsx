import Container from "@/components/common/Container";
import { titleCase } from "@/utils/titleCase";
import { twJoin } from "tailwind-merge";

type ProductFeaturesSectionProps = {
  features: string;
  includes: {
    item: string;
    quantity: number;
  }[];
  className?: string;
};

export default function ProductFeaturesSection({
  features,
  includes,
  className,
}: ProductFeaturesSectionProps) {
  return (
    <section className={twJoin("", className)}>
      <Container>
        <div className="flex flex-col gap-[5.5rem] xl:flex-row xl:gap-[7.81rem]">
          <div className="basis-2/3">
            <h2 className="text-xl uppercase leading-[2.25rem] tracking-[0.05356rem] text-neutral-900 md:text-3xl">
              Features
            </h2>
            <p className="mt-[1.5rem] whitespace-break-spaces text-base text-neutral-900/50 md:mt-[2rem]">
              {features}
            </p>
          </div>
          <div className="flex basis-1/3 flex-col gap-[1.5rem] md:flex-row md:gap-[0] xl:flex-col xl:gap-[2rem]">
            <h2 className="text-xl uppercase leading-[2.25rem] tracking-[0.05356rem] text-neutral-900 md:text-3xl md:max-xl:basis-1/2">
              In the box
            </h2>
            <ul className="md:max-xl:basis-1/2">
              {includes.map((include) => (
                <li key={include.item} className="flex gap-[1.31rem] text-base">
                  <span className="font-bold text-orange">
                    {include.quantity}x
                  </span>
                  <span className="text-neutral-900/50">
                    {titleCase(include.item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
