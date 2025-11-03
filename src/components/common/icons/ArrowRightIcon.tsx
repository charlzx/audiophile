import IconArrowRight from "@/assets/shared/desktop/icon-arrow-right.svg";
import { IconProps } from "@/types";
import Image from "next/image";

export default function ArrowRightIcon({ className }: IconProps) {
  return (
    <Image
      className={className}
      src={IconArrowRight}
      alt=""
      width="8"
      height="12"
    />
  );
}
