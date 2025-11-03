import CartIcon from "@/assets/shared/desktop/icon-cart.svg";
import Image from "next/image";

type CartButtonProps = {
  handleCartButtonClick: () => void;
  className?: string;
};

export default function CartButton({
  handleCartButtonClick,
  className,
}: CartButtonProps) {
  return (
    <button onClick={handleCartButtonClick} className={className}>
      <span className="sr-only">Open navigation menu</span>
      <Image src={CartIcon} width="23" height="20" alt="Cart Icon" priority />
    </button>
  );
}
