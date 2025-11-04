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
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Checkout() {
  const [displayCart, setDisplayCart] = useState<CartProduct[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [orderData, setOrderData] = useState<CheckoutFormData>();
  const [currentPaymentMethod, setCurrentPaymentMethod] =
    useState<string>("e-Money");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedOrderId, setGeneratedOrderId] = useState<string | null>(null);
  const router = useRouter();
  const createOrder = useMutation(api.orders.createOrder);

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

  const handleCheckout = async (data: CheckoutFormData) => {
    // Prevent duplicate submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate unique order ID in format: AUD-DDMMYY-XXXX
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const randomId = Math.floor(1000 + Math.random() * 9000); // 4-digit number
      const orderId = `AUD-${day}${month}${year}-${randomId}`;
      setGeneratedOrderId(orderId);

      // Prepare order data
      const orderPayload = {
        orderId,
        customerName: data.billing.name,
        customerEmail: data.billing.email,
        customerPhone: data.billing.phone,
        shippingAddress: data.shipping.address,
        shippingZipCode: data.shipping.zipCode,
        shippingCity: data.shipping.city,
        shippingCountry: data.shipping.country,
        paymentMethod: data.payment.method,
        eMoneyNumber: data.payment.method === "e-Money" ? data.payment.eMoneyNumber : undefined,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: cartTotal,
        shipping: SHIPPING_COST,
        vat: calculateVatAmount(),
        grandTotal: calculateGrandTotal(),
      };

      // Save order to Convex
      await createOrder(orderPayload);

      // Send confirmation email
      try {
        const emailResponse = await fetch("/api/send-confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });

        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
          // Don't fail the order if email fails
        } else if (emailResult.warning) {
          console.warn("⚠️  " + emailResult.warning);
          console.info("ℹ️  " + emailResult.message);
        } else {
          console.log("✅ Confirmation email sent successfully");
        }
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the order if email fails
      }

      // Clear cart only after successful order creation
      localStorage.removeItem("cart");
      setOrderData(data);
      setIsConfirmationOpen(true);
    } catch (error) {
      console.error("Error creating order:", error);
      setSubmitError(
        "Failed to complete your order. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmationClose = () => {
    setCart([]);
    setIsConfirmationOpen(false);
    router.push("/");
  };

  const handleViewOrder = () => {
    setCart([]);
    setIsConfirmationOpen(false);
    if (generatedOrderId) {
      router.push(`/order/${generatedOrderId}`);
    } else {
      router.push("/");
    }
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
        
        {/* Error Message */}
        {submitError && (
          <div className="mt-4 rounded-lg bg-form-error/10 border border-form-error p-4">
            <p className="text-form-error font-bold">{submitError}</p>
          </div>
        )}
        
        <div className="mt-[1.5rem] flex flex-col gap-[2rem] xl:mt-[2rem] xl:flex-row">
          <CheckoutForm
            onSubmit={handleCheckout}
            onPaymentMethodChange={setCurrentPaymentMethod}
            disabled={isSubmitting}
          />
          <CheckoutSummary
            cart={displayCart}
            cartTotal={cartTotal}
            shippingCost={SHIPPING_COST}
            vatAmount={calculateVatAmount()}
            grandTotal={calculateGrandTotal()}
            formId="checkout-form"
            paymentMethod={currentPaymentMethod}
            isSubmitting={isSubmitting}
          />
        </div>
      </Container>
      {isConfirmationOpen && orderData && (
        <OrderConfirmation
          orderData={orderData}
          cart={displayCart}
          grandTotal={calculateGrandTotal()}
          onClose={handleConfirmationClose}
          onViewOrder={handleViewOrder}
        />
      )}
    </main>
  );
}
