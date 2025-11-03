import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutFormSchema, type CheckoutFormData } from './schema'
import { FormInput } from './FormInput'
import { FormRadio } from './FormRadio'
import CashOnDeliveryIcon from '@/assets/checkout/icon-cash-on-delivery.svg'
import { useEffect } from 'react'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  onPaymentMethodChange: (method: string) => void
}

export function CheckoutForm({ onSubmit, onPaymentMethodChange }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      payment: {
        method: 'e-Money'
      }
    }
  })

  const paymentMethod = watch('payment.method')

  useEffect(() => {
    onPaymentMethodChange(paymentMethod)
  }, [paymentMethod, onPaymentMethodChange])

  return (
    <div className="w-full overflow-hidden rounded-lg bg-neutral-100 p-[1.5rem] lg:p-[2rem] xl:basis-2/3">
      <h1 className="mb-8 pt-[0.35rem] text-2xl font-bold uppercase text-neutral-900 lg:text-3xl">
        Checkout
      </h1>

      <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h2 className="text-xs font-bold uppercase text-orange">Billing Details</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              label="Name"
              placeholder="Alexei Ward"
              {...register('billing.name')}
              error={errors.billing?.name?.message}
            />
            <FormInput
              label="Email Address"
              type="email"
              placeholder="alexei@mail.com"
              {...register('billing.email')}
              error={errors.billing?.email?.message}
            />
            <FormInput
              label="Phone Number"
              placeholder="+1 202-555-0136"
              {...register('billing.phone')}
              error={errors.billing?.phone?.message}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase text-orange">Shipping Info</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              label="Address"
              className="md:col-span-2"
              placeholder="1137 Williams Avenue"
              {...register('shipping.address')}
              error={errors.shipping?.address?.message}
            />
            <FormInput
              label="ZIP Code"
              placeholder="10001"
              {...register('shipping.zipCode')}
              error={errors.shipping?.zipCode?.message}
            />
            <FormInput
              label="City"
              placeholder="New York"
              {...register('shipping.city')}
              error={errors.shipping?.city?.message}
            />
            <FormInput
              label="Country"
              placeholder="United States"
              {...register('shipping.country')}
              error={errors.shipping?.country?.message}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase text-orange">Payment Details</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 md:contents">
              <div className="md:col-span-1">
                <label className="text-[0.75rem] font-bold leading-normal tracking-[-0.016em] text-neutral-900">
                  Payment Method
                </label>
                {errors.payment?.method && (
                  <span className="float-right text-xs text-red-500">
                    {errors.payment.method.message}
                  </span>
                )}
              </div>
              <div className="mt-[9px] space-y-4 md:col-span-1 md:mt-0">
                <FormRadio
                  label="e-Money"
                  value="e-Money"
                  {...register('payment.method')}
                />
                <FormRadio
                  label="Cash on Delivery"
                  value="Cash on Delivery"
                  {...register('payment.method')}
                />
              </div>
            </div>

            {paymentMethod === 'e-Money' ? (
              <>
                <FormInput
                  label="e-Money Number"
                  placeholder="238521993"
                  {...register('payment.eMoneyNumber')}
                  error={errors.payment?.eMoneyNumber?.message}
                />
                <FormInput
                  label="e-Money PIN"
                  placeholder="6891"
                  {...register('payment.eMoneyPin')}
                  error={errors.payment?.eMoneyPin?.message}
                />
              </>
            ) : paymentMethod === 'Cash on Delivery' && (
              <div className="col-span-2 flex flex-col items-center sm:flex-row">
                <div className="m-8 flex-shrink-0">
                  <Image
                    src={CashOnDeliveryIcon}
                    alt="Cash on Delivery"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-base text-neutral-900/50">
                  {"The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled."}
                </p>
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  )
} 