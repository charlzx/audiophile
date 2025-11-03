import { z } from 'zod'

export const checkoutFormSchema = z.object({
  billing: z.object({
    name: z.string().min(1, 'Required'),
    email: z.string()
      .min(1, 'Required')
      .email('Wrong format'),
    phone: z.string()
      .min(1, 'Required')
      .regex(/^\+?\d{10,14}$/, 'Wrong format'),
  }),
  shipping: z.object({
    address: z.string().min(1, 'Required'),
    zipCode: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Required'),
  }),
  payment: z.discriminatedUnion('method', [
    z.object({
      method: z.literal('e-Money'),
      eMoneyNumber: z.string()
        .min(1, 'Required')
        .regex(/^\d+$/, 'Wrong format'),
      eMoneyPin: z.string()
        .min(1, 'Required')
        .regex(/^\d{4}$/, 'Wrong format'),
    }),
    z.object({
      method: z.literal('Cash on Delivery'),
      eMoneyNumber: z.string().optional(),
      eMoneyPin: z.string().optional(),
    })
  ])
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema> 