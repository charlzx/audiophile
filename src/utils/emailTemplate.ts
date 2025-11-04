import { CartProduct } from "@/types";

interface EmailTemplateProps {
  customerName: string;
  orderId: string;
  items: CartProduct[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  shippingCountry: string;
}

export function getOrderConfirmationEmailHTML({
  customerName,
  orderId,
  items,
  subtotal,
  shipping,
  vat,
  grandTotal,
  shippingAddress,
  shippingCity,
  shippingZipCode,
  shippingCountry,
}: EmailTemplateProps): string {
  const formatPrice = (price: number) => price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const itemsHTML = items
    .map(
      (item, index) => `
        <tr>
          <td style="padding: 0 0 ${index === items.length - 1 ? "0" : "12px"} 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(255,255,255,0.04); border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
              <tr>
                <td style="padding: 18px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align: top; width: 55%;">
                        <p style="margin: 0; font-weight: 700; font-size: 16px; color: #FFFFFF; letter-spacing: 0.2px;">${item.name}</p>
                        <p style="margin: 8px 0 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.45);">$ ${formatPrice(item.price)} each</p>
                      </td>
                      <td style="vertical-align: middle; text-align: center; width: 15%;">
                        <p style="margin: 0; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.7);">Qty</p>
                        <p style="margin: 6px 0 0 0; font-size: 18px; font-weight: 700; color: #FBAF85;">${item.quantity}</p>
                      </td>
                      <td style="vertical-align: middle; text-align: right; width: 30%;">
                        <p style="margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.45);">Line total</p>
                        <p style="margin: 6px 0 0 0; font-size: 18px; font-weight: 700; color: #FFFFFF;">$ ${formatPrice(item.price * item.quantity)}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Audiophile</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0B0B0E; color: #FFFFFF;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 48px 16px; background: radial-gradient(120% 120% at 50% 10%, rgba(216,125,74,0.12) 0%, rgba(11,11,14,1) 60%);">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width: 640px; background: linear-gradient(180deg, #111118 0%, #0B0B0E 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); box-shadow: 0 24px 60px rgba(0,0,0,0.45);">

          <!-- Branded Header -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #161621 0%, #0B0B0E 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #FFFFFF;">audiophile</p>
                    <p style="margin: 12px 0 0 0; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.38);">Premium Sound, Delivered</p>
                  </td>
                  <td style="text-align: right;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #FBAF85;">Order confirmation</p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.45);">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Message -->
          <tr>
            <td style="padding: 48px 40px 0 40px; text-align: left;">
              <p style="margin: 0; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.5);">Thank you, ${customerName.split(" ")[0] || customerName}</p>
              <h1 style="margin: 16px 0 0 0; font-size: 38px; line-height: 1.2; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">Your sound experience is on its way.</h1>
              <p style="margin: 18px 0 0 0; font-size: 15px; line-height: 26px; color: rgba(255,255,255,0.6);">We've locked in your order and our team is preparing it for dispatch. Below is everything you need to know while we get things ready.</p>
            </td>
          </tr>

          <!-- Order Snapshot -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 24px; background: rgba(255,255,255,0.04); border-radius: 18px; border: 1px solid rgba(255,255,255,0.08);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.45);">Order ID</p>
                          <p style="margin: 12px 0 0 0; font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #FBAF85; font-family: 'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', monospace;">${orderId}</p>
                        </td>
                        <td style="vertical-align: top; text-align: right;">
                          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.45);">Status</p>
                          <p style="display: inline-block; margin: 12px 0 0 0; padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #111118; background: linear-gradient(135deg, #FBAF85 0%, #D87D4A 100%);">Processing</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <tr>
                        <td style="padding-top: 20px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.45);">Delivery estimate</td>
                        <td style="padding-top: 20px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.45); text-align: right;">Destination</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 16px; font-weight: 600; color: #FFFFFF;">Within 3-5 business days</td>
                        <td style="padding-top: 8px; font-size: 16px; font-weight: 600; color: #FFFFFF; text-align: right;">${shippingCity}, ${shippingCountry}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Section -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.6);">Items secured</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                ${items.length ? itemsHTML : `<tr><td style="padding: 20px; background: rgba(255,255,255,0.04); border-radius: 12px; text-align: center; color: rgba(255,255,255,0.45);">Your cart was empty.</td></tr>`}
              </table>
            </td>
          </tr>

          <!-- Totals & Shipping -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 24px; background: rgba(255,255,255,0.05); border-radius: 18px; border: 1px solid rgba(255,255,255,0.08);">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.45);">Order value</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-size: 15px; color: rgba(255,255,255,0.55);">Subtotal</td>
                              <td style="font-size: 15px; text-align: right; color: #FFFFFF; font-weight: 600;">$ ${formatPrice(subtotal)}</td>
                            </tr>
                            <tr>
                              <td style="padding-top: 10px; font-size: 15px; color: rgba(255,255,255,0.55);">Shipping</td>
                              <td style="padding-top: 10px; font-size: 15px; text-align: right; color: #FFFFFF; font-weight: 600;">$ ${formatPrice(shipping)}</td>
                            </tr>
                            <tr>
                              <td style="padding-top: 10px; font-size: 15px; color: rgba(255,255,255,0.55);">VAT (included)</td>
                              <td style="padding-top: 10px; font-size: 15px; text-align: right; color: #FFFFFF; font-weight: 600;">$ ${formatPrice(vat)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.55);">Grand total</td>
                              <td style="font-size: 22px; text-align: right; font-weight: 800; color: #FBAF85;">$ ${formatPrice(grandTotal)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address & Next Steps -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 24px; background: rgba(255,255,255,0.05); border-radius: 18px; border: 1px solid rgba(255,255,255,0.08);">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.45);">Shipping to</p>
                    <p style="margin: 14px 0 0 0; font-size: 17px; font-weight: 600; color: #FFFFFF; line-height: 1.6;">${shippingAddress}<br/>${shippingCity}, ${shippingZipCode}<br/>${shippingCountry}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 24px; background: rgba(255,255,255,0.03); border-radius: 18px; border: 1px solid rgba(255,255,255,0.06);">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.45);">What happens next</p>
                    <ul style="margin: 16px 0 0 18px; padding: 0; color: rgba(255,255,255,0.6); font-size: 15px; line-height: 26px;">
                      <li style="margin-bottom: 6px;">You'll receive a shipping confirmation with tracking once your order leaves our warehouse.</li>
                      <li style="margin-bottom: 6px;">Need to make a change? Reply to this email within the next 12 hours.</li>
                      <li style="margin-bottom: 0;">Your account dashboard is always available for order history and invoices.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 40px 40px 0 40px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order/${orderId}" style="display: inline-block; padding: 18px 40px; border-radius: 999px; background: linear-gradient(135deg, #FBAF85 0%, #D87D4A 100%); color: #111118; font-size: 13px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; text-decoration: none;">View order timeline</a>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding: 48px 40px 0 40px; text-align: center;">
              <p style="margin: 0; font-size: 15px; color: rgba(255,255,255,0.55);">Need help? Our dedicated concierge team is ready.</p>
              <p style="margin: 12px 0 0 0; font-size: 15px; font-weight: 600;">
                <a href="mailto:support@audiophile.charlz.dev" style="color: #FBAF85; text-decoration: none;">support@audiophile.charlz.dev</a>
              </p>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.35);">We're here Monday to Saturday, 8am – 7pm EST</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; margin-top: 32px; background: #08080B; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.9);">audiophile</p>
              <p style="margin: 12px 0 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.35);">© 2025 Audiophile. Every decibel matters.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
