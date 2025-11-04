import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/router";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button/Button";
import { getFormattedPrice, getShortenedProductName } from "@/utils/cart";
import OrderConfirmationIcon from "@/assets/checkout/icon-order-confirmation.svg";

export default function OrderPage() {
  const router = useRouter();
  const { orderId } = router.query;

  const order = useQuery(
    api.orders.getOrderByOrderId,
    orderId && typeof orderId === "string" ? { orderId } : "skip"
  );

  if (!orderId || typeof orderId !== "string") {
    return (
      <main className="min-h-screen bg-neutral-300 pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
        <Container>
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-xl text-neutral-600">Invalid order ID</p>
          </div>
        </Container>
      </main>
    );
  }

  if (order === undefined) {
    return (
      <main className="min-h-screen bg-neutral-300 pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
        <Container>
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-xl text-neutral-600">Loading order...</p>
          </div>
        </Container>
      </main>
    );
  }

  if (order === null) {
    return (
      <main className="min-h-screen bg-neutral-300 pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
        <Container>
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
            <p className="text-xl text-neutral-600">Order not found</p>
            <Button intent="primary" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-neutral-300 pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
      <Container>
        <div className="mx-auto max-w-[50rem]">
          {/* Success Header */}
          <div className="rounded-lg bg-neutral-100 p-8 md:p-12">
            <div className="mb-6 md:mb-8">
              <Image
                src={OrderConfirmationIcon}
                width={64}
                height={64}
                alt="Order confirmed"
                priority
              />
            </div>
            <h1 className="mb-4 text-2xl font-bold uppercase text-neutral-900 md:mb-6 lg:text-3xl">
              Thank you
              <br />
              for your order
            </h1>
            <p className="mb-6 text-base text-neutral-900/50 md:mb-8">
              You will receive an email confirmation shortly.
            </p>

            {/* Order Details */}
            <div className="mb-6 space-y-4 rounded-lg bg-neutral-400 p-6 md:mb-8">
              <div className="border-b border-neutral-900/[8%] pb-4">
                <p className="text-xs uppercase text-neutral-900/50">
                  Order Date
                </p>
                <p className="mt-2 text-neutral-900">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="border-b border-neutral-900/[8%] pb-4">
                <p className="text-xs uppercase text-neutral-900/50">
                  Order ID
                </p>
                <p className="mt-2 font-bold tracking-wider text-neutral-900">
                  {order.orderId}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-neutral-900/50">Status</p>
                <p className="mt-2 inline-block rounded-full bg-orange px-4 py-1 text-sm font-bold uppercase text-neutral-100">
                  {order.status}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6 md:mb-8">
              <h2 className="mb-4 text-lg font-bold uppercase">Order Items</h2>
              <div className="space-y-4 rounded-lg bg-neutral-400 p-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 border-b border-neutral-900/[8%] pb-4 last:border-b-0 last:pb-0"
                  >
                    <Image
                      width={64}
                      height={64}
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg"
                    />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p className="font-bold">
                          {getShortenedProductName(item.name)}
                        </p>
                        <p className="text-sm font-bold tracking-[0] text-neutral-900/50">
                          $ {getFormattedPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-base opacity-50">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6 space-y-2 md:mb-8">
              <h2 className="mb-4 text-lg font-bold uppercase">
                Order Summary
              </h2>
              <div className="space-y-2 rounded-lg bg-neutral-400 p-6">
                <div className="flex justify-between">
                  <span className="text-base uppercase text-neutral-900/50">
                    Subtotal
                  </span>
                  <span className="text-lg text-neutral-900">
                    $ {getFormattedPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base uppercase text-neutral-900/50">
                    Shipping
                  </span>
                  <span className="text-lg text-neutral-900">
                    $ {getFormattedPrice(order.shipping || order.shippingCost || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base uppercase text-neutral-900/50">
                    VAT (included)
                  </span>
                  <span className="text-lg text-neutral-900">
                    $ {getFormattedPrice(order.vat || order.vatAmount || 0)}
                  </span>
                </div>
                <div className="mt-4 flex justify-between border-t border-neutral-900/[8%] pt-4">
                  <span className="text-base uppercase text-neutral-900/50">
                    Grand Total
                  </span>
                  <span className="text-lg font-bold text-orange">
                    $ {getFormattedPrice(order.grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-lg font-bold uppercase">
                  Shipping Address
                </h2>
                <div className="space-y-1 rounded-lg bg-neutral-400 p-6">
                  <p className="font-bold">{order.customerName}</p>
                  <p className="text-neutral-900/75">{order.shippingAddress}</p>
                  <p className="text-neutral-900/75">
                    {order.shippingCity}, {order.shippingZipCode}
                  </p>
                  <p className="text-neutral-900/75">{order.shippingCountry}</p>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-bold uppercase">
                  Contact & Payment
                </h2>
                <div className="space-y-1 rounded-lg bg-neutral-400 p-6">
                  <p className="text-neutral-900/75">{order.customerEmail}</p>
                  <p className="text-neutral-900/75">{order.customerPhone}</p>
                  <p className="mt-4 font-bold">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                className="w-full"
                intent="primary"
                fullWidth
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
