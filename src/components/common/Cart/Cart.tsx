import { CartProduct } from "@/types";
import {
  convertToCartProduct,
  getCartFromLocalStorage,
  getFormattedPrice,
  getShortenedProductName,
} from "@/utils/cart";
import { getProductList } from "@/utils/products";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import Button from "../Button/Button";
import Container from "../Container";

type CartProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  className?: string;
};

export default function Cart({
  isCartOpen,
  setIsCartOpen,
  className,
}: CartProps) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();

  const handleClickOutside = () => {
    setIsCartOpen(false);
  };

  const handleRemoveAllFromCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleAdjustCartItemQuantity = (id: number, quantity: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newItemQuantity = item.quantity + quantity;

          if (newItemQuantity >= 0) {
            return {
              ...item,
              quantity: newItemQuantity,
            };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  useEffect(() => {
    if (isCartOpen) {
      const cartData = getCartFromLocalStorage();
      const products = getProductList();

      const cartProducts = cartData.reduce((acc, cartProduct) => {
        const product = products.find(
          (product) => product.id === cartProduct.id,
        );
        if (product) {
          acc.push(convertToCartProduct(product, cartProduct.quantity));
        }
        return acc;
      }, [] as CartProduct[]);

      setCart(cartProducts);
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const cartData = getCartFromLocalStorage();
    const products = getProductList();

    const cartProducts = cartData.reduce((acc, cartProduct) => {
      const product = products.find((product) => product.id === cartProduct.id);
      if (product) {
        acc.push(convertToCartProduct(product, cartProduct.quantity));
      }
      return acc;
    }, [] as CartProduct[]);

    setCart(cartProducts);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    const calculateCartTotal = () => {
      setCartTotal(
        cart.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0),
      );
    };

    calculateCartTotal();
  }, [cart]);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      const documentHasScrollbar = html.scrollHeight > html.clientHeight;

      const classesToToggle = [
        "overflow-hidden",
        documentHasScrollbar ? "overflow-y-scroll" : "overflow-y-hidden",
        "fixed",
        "inset-0",
      ];

      classesToToggle.forEach((classesToToggle) => {
        html.classList.toggle(classesToToggle, isCartOpen);
      });
    }
  }, [isCartOpen]);

  useEffect(() => {
    const handleEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapePressed);

    return () => {
      document.removeEventListener("keydown", handleEscapePressed);
    };
  }, [setIsCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div
      onClick={handleClickOutside}
      className={twJoin(
        "fixed bottom-0 left-0 z-[5] h-[calc(100%-var(--navigation-height))] w-full",
        className,
      )}
    >
      <div className="fixed bottom-0 left-0 h-[calc(100%-var(--navigation-height))] w-full bg-neutral-900/40"></div>
      <div className="fixed top-[calc(2rem+var(--navigation-height))] w-full">
        <Container>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full overflow-hidden rounded-lg bg-neutral-100 p-[2rem] lg:ml-auto lg:w-fit"
          >
            <div className="flex justify-between gap-1">
              <p className="text-lg font-bold uppercase text-neutral-900">
                Cart ({cart.length})
              </p>
              {cart.length > 0 && (
                <button
                  onClick={handleRemoveAllFromCart}
                  className="text-base text-neutral-900/50 underline hover:text-orange focus:text-orange"
                >
                  Remove all
                </button>
              )}
            </div>
            <div
              className={twMerge(
                "mt-[2rem] space-y-[1.5rem]",
                cart.length === 0 && "mt-[1.5rem]",
              )}
            >
              {cart.length === 0 ? (
                <p className="text-sm font-bold leading-[1.5625rem] tracking-normal text-neutral-900/50">
                  Your cart is empty
                </p>
              ) : (
                <ul className="space-y-[1.5rem] overflow-y-auto">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center  gap-[1rem]">
                      <Image
                        width="64"
                        height="64"
                        src={item.image}
                        alt={item.name}
                        className="rounded-lg"
                      />
                      <div className="mr-auto flex flex-col items-start ">
                        <span className="text-base font-bold">
                          {getShortenedProductName(item.name)}
                        </span>
                        <span className="whitespace-nowrap text-sm font-bold leading-[1.5625rem] tracking-normal text-neutral-900/50">
                          $ {getFormattedPrice(item.price)}
                        </span>
                      </div>
                      <div className="flex h-[2rem] w-[6rem] flex-shrink-0 items-center justify-between bg-neutral-400 text-[0.8125rem] font-bold lg:ml-[4rem]">
                        <button
                          onClick={() =>
                            handleAdjustCartItemQuantity(item.id, -1)
                          }
                          className="h-full basis-1/3 text-[1rem] text-neutral-900/25 transition duration-300 ease-in-out hover:text-orange"
                        >
                          -
                        </button>
                        <span className="text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleAdjustCartItemQuantity(item.id, +1)
                          }
                          className="h-full basis-1/3 text-[1rem] text-neutral-900/25 transition duration-300 ease-in-out hover:text-orange"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="mt-[2rem] flex justify-between">
                <span className="text-base uppercase text-neutral-900/50">
                  Total
                </span>
                <span className="text-lg text-neutral-900">
                  $ {getFormattedPrice(cartTotal)}
                </span>
              </div>
            )}
            <Button
              onClick={() => {
                if (cart.length === 0) {
                } else {
                  router.push("/checkout");
                }
                setIsCartOpen(false);
              }}
              className="mt-[1.5rem]"
              fullWidth
              intent="primary"
            >
              {cart.length === 0 ? "Continue shopping" : "Checkout"}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
