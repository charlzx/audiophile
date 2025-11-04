import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    orderId: v.optional(v.string()), // Made optional for backward compatibility
    orderNumber: v.optional(v.string()), // Old field, kept for compatibility
    status: v.string(), // "pending", "processing", "completed", "cancelled"
    
    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping details
    shippingAddress: v.string(),
    shippingZipCode: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    
    // Payment details
    paymentMethod: v.string(), // "e-Money" or "Cash on Delivery"
    eMoneyNumber: v.optional(v.string()),
    
    // Order items
    items: v.array(
      v.object({
        id: v.number(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    
    // Totals (made optional for backward compatibility)
    subtotal: v.number(),
    shipping: v.optional(v.number()), // Old field name
    shippingCost: v.optional(v.number()), // Old field name
    vat: v.optional(v.number()),
    vatAmount: v.optional(v.number()), // Old field name
    grandTotal: v.number(),
    
    // Metadata
    createdAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_orderNumber", ["orderNumber"])
    .index("by_email", ["customerEmail"])
    .index("by_createdAt", ["createdAt"]),
});
