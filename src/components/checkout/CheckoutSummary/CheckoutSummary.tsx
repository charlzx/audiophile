import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { CartProduct } from '@/types'
import { getFormattedPrice, getShortenedProductName } from '@/utils/cart'
import { SubmitButton } from '../SubmitButton/SubmitButton'

interface CheckoutSummaryProps {
  cart: CartProduct[]
  cartTotal: number
  shippingCost: number
  vatAmount: number
  grandTotal: number
  formId: string
  paymentMethod: string
}

export function CheckoutSummary({ 
  cart, 
  cartTotal, 
  shippingCost,
  vatAmount,
  grandTotal,
  formId,
  paymentMethod 
}: CheckoutSummaryProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-neutral-100 p-[1.5rem] lg:p-[2rem] xl:basis-1/3">
      <h2 className="text-lg font-bold uppercase text-neutral-900">Summary</h2>
      <div className={twMerge("mt-[2rem] space-y-[1.5rem]", cart.length === 0 && "mt-[1.5rem]")}>
        <ul className="space-y-[1.5rem] overflow-y-auto">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-[1rem]">
              <Image
                width={64}
                height={64}
                src={item.image}
                alt={item.name}
                className="rounded-lg"
              />
              <div className="flex w-full flex-col">
                <div className="flex justify-between">
                  <span className="text-base font-bold">{getShortenedProductName(item.name)}</span>
                  <span className="ml-auto text-base font-bold text-neutral-900/50">x{item.quantity}</span>
                </div>
                <span className="whitespace-nowrap text-sm font-bold leading-[1.5625rem] tracking-normal text-neutral-900/50">
                  $ {getFormattedPrice(item.price)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {cart.length > 0 && (
        <div className="mt-[2rem] flex flex-col gap-[0.5rem]">
          <div className="flex justify-between">
            <span className="text-base uppercase text-neutral-900/50">Total</span>
            <span className="text-lg text-neutral-900">$ {getFormattedPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base uppercase text-neutral-900/50">Shipping</span>
            <span className="text-lg text-neutral-900">$ {shippingCost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base uppercase text-neutral-900/50">Vat (included)</span>
            <span className="text-lg text-neutral-900">$ {getFormattedPrice(vatAmount)}</span>
          </div>
          <div className="mt-[1rem] flex justify-between">
            <span className="text-base uppercase text-neutral-900/50">Grand total</span>
            <span className="text-lg text-orange">$ {getFormattedPrice(grandTotal)}</span>
          </div>
        </div>
      )}
      <SubmitButton 
        className="mt-[2rem]"
        fullWidth
        form={formId}
      >
        {paymentMethod === 'Cash on Delivery' ? 'Continue' : 'Continue & Pay'}
      </SubmitButton>
    </div>
  )
} 