import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new order
export const createOrder = mutation({
  args: {
    orderId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingZipCode: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
    eMoneyNumber: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.number(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      orderId: args.orderId,
      status: "pending",
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      shippingAddress: args.shippingAddress,
      shippingZipCode: args.shippingZipCode,
      shippingCity: args.shippingCity,
      shippingCountry: args.shippingCountry,
      paymentMethod: args.paymentMethod,
      eMoneyNumber: args.eMoneyNumber,
      items: args.items,
      subtotal: args.subtotal,
      shipping: args.shipping,
      vat: args.vat,
      grandTotal: args.grandTotal,
      createdAt: Date.now(),
    });
    
    return orderId;
  },
});

// Get order by orderId
export const getOrderByOrderId = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
    
    return order;
  },
});

// Get orders by email
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", args.email))
      .collect();
    
    return orders;
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    await ctx.db.patch(order._id, {
      status: args.status,
    });
    
    return order._id;
  },
});
