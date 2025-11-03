import { CheckoutForm } from "@/components/checkout/CheckoutForm/CheckoutForm";
import { type CheckoutFormData } from "@/components/checkout/CheckoutForm/schema";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary/CheckoutSummary";
import { EmptyCart } from "@/components/checkout/EmptyCart/EmptyCart";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import Container from "@/components/common/Container";
import GoBackButton from "@/components/products/GoBackButton/GoBackButton";
import { CartProduct } from "@/types";
import { convertToCartProduct, getCartFromLocalStorage } from "@/utils/cart";
import { getProductList } from "@/utils/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [displayCart, setDisplayCart] = useState<CartProduct[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [orderData, setOrderData] = useState<CheckoutFormData>();
  const [currentPaymentMethod, setCurrentPaymentMethod] =
    useState<string>("e-Money");
  const router = useRouter();

  const SHIPPING_COST = 50;
  const VAT_RATE = 0.2;

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
    setDisplayCart(cartProducts);
  }, []);

  useEffect(() => {
    const calculateCartTotal = () => {
      setCartTotal(
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      );
    };

    calculateCartTotal();
  }, [cart]);

  const handleCheckout = (data: CheckoutFormData) => {
    setOrderData(data);
    setIsConfirmationOpen(true);
    localStorage.removeItem("cart");
  };

  const handleConfirmationClose = () => {
    setCart([]);
    setIsConfirmationOpen(false);
    router.push("/");
  };

  const calculateVatAmount = () => {
    return (cartTotal * VAT_RATE) / 100;
  };

  const calculateGrandTotal = () => {
    return cartTotal + SHIPPING_COST;
  };

  if (!displayCart || displayCart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
      <Container>
        <GoBackButton>Go Back</GoBackButton>
        <div className="mt-[1.5rem] flex flex-col gap-[2rem] xl:mt-[2rem] xl:flex-row">
          <CheckoutForm
            onSubmit={handleCheckout}
            onPaymentMethodChange={setCurrentPaymentMethod}
          />
          <CheckoutSummary
            cart={displayCart}
            cartTotal={cartTotal}
            shippingCost={SHIPPING_COST}
            vatAmount={calculateVatAmount()}
            grandTotal={calculateGrandTotal()}
            formId="checkout-form"
            paymentMethod={currentPaymentMethod}
          />
        </div>
      </Container>
      {isConfirmationOpen && orderData && (
        <OrderConfirmation
          orderData={orderData}
          cart={displayCart}
          grandTotal={calculateGrandTotal()}
          onClose={handleConfirmationClose}
        />
      )}
    </main>
  );
}
