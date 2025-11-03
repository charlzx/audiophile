import Button from "@/components/common/Button/Button";
import ArrowRightIcon from "@/components/common/icons/ArrowRightIcon";
import Image from "next/image";

type CategoryProps = {
  name: string;
  href: string;
  thumbnail: string;
  onClick?: () => void;
};

export default function Category({
  name,
  href,
  thumbnail,
  onClick,
}: CategoryProps) {
  return (
    <li className="relative flex w-full flex-col items-center justify-center rounded-lg bg-neutral-400 px-4 py-6 lg:py-7">
      <div className="flex w-full flex-col items-center justify-center">
        <Image
          className="absolute top-[-26%] h-[9rem] w-auto xl:h-[10rem]"
          src={thumbnail}
          alt={`${name} Thumbnail`}
          width={256}
          height={256}
        />
        <h2 className="pt-[4.5rem] text-center text-base font-bold uppercase tracking-[0.06694rem] text-neutral-900 xl:text-lg">
          {name}
        </h2>
        <Button
          intent="simple"
          className="pt-2 before:absolute before:inset-0 before:block"
          onClick={onClick}
          href={href}
        >
          Shop
          <ArrowRightIcon />
        </Button>
      </div>
    </li>
  );
}
