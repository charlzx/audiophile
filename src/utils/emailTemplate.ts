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
  
  const getShortenedName = (name: string) => {
    return name.replace(/headphones|speaker|earphones/gi, "").trim();
  };

  const itemsHTML = items
    .map(
      (item, index) => `
        <tr>
          <td style="padding: 0 0 ${index === items.length - 1 ? "0" : "16px"} 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: ${index === items.length - 1 ? "none" : "1px solid rgba(0,0,0,0.08)"}; padding-bottom: ${index === items.length - 1 ? "0" : "16px"};">
              <tr>
                <td style="width: 64px; vertical-align: top; padding-right: 16px;">
                  <div style="width: 64px; height: 64px; background: #F1F1F1; border-radius: 8px;"></div>
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0; font-weight: 700; font-size: 15px; color: #000000;">${getShortenedName(item.name)}</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 700; color: rgba(0,0,0,0.5);">$ ${formatPrice(item.price)}</p>
                </td>
                <td style="vertical-align: top; text-align: right; padding-left: 16px;">
                  <p style="margin: 0; font-size: 15px; color: rgba(0,0,0,0.5);">x${item.quantity}</p>
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F1F1F1; color: #000000;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 20px; background-color: #F1F1F1;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width: 640px; background: #FAFAFA; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Success Header with Icon -->
          <tr>
            <td style="padding: 48px 48px 32px 48px; background: #FFFFFF; border-radius: 8px;">
              <!-- Success Icon SVG -->
              <div style="width: 64px; height: 64px; margin-bottom: 32px;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="32" fill="#D87D4A"/>
                  <path d="M20.5 32.5L28.5 40.5L44.5 24.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; line-height: 1.2; font-weight: 700; color: #000000; text-transform: uppercase;">Thank you<br/>for your order</h1>
              <p style="margin: 0; font-size: 15px; line-height: 25px; color: rgba(0,0,0,0.5);">You will receive an email confirmation shortly.</p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 0 48px 24px 48px; background: #FFFFFF;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #F1F1F1; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 24px; border-bottom: 1px solid rgba(0,0,0,0.08);">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Order Date</p>
                    <p style="margin: 8px 0 0 0; font-size: 15px; color: #000000;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px; border-bottom: 1px solid rgba(0,0,0,0.08);">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Order ID</p>
                    <p style="margin: 8px 0 0 0; font-size: 15px; font-weight: 700; letter-spacing: 1px; color: #000000; font-family: 'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', monospace;">${orderId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Status</p>
                    <p style="display: inline-block; margin: 8px 0 0 0; padding: 4px 16px; border-radius: 999px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #FFFFFF; background: #D87D4A;">CONFIRMED</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Section -->
          <tr>
            <td style="padding: 0 48px 24px 48px; background: #FFFFFF;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; color: #000000;">Order Items</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #F1F1F1; border-radius: 8px; padding: 24px;">
                ${items.length ? itemsHTML : `<tr><td style="padding: 20px; text-align: center; color: rgba(0,0,0,0.5);">Your cart was empty.</td></tr>`}
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 48px 24px 48px; background: #FFFFFF;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; color: #000000;">Order Summary</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #F1F1F1; border-radius: 8px; padding: 24px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 15px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Subtotal</td>
                        <td style="padding-bottom: 8px; font-size: 18px; text-align: right; color: #000000;">$ ${formatPrice(subtotal)}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 15px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Shipping</td>
                        <td style="padding-bottom: 8px; font-size: 18px; text-align: right; color: #000000;">$ ${formatPrice(shipping)}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 16px; font-size: 15px; text-transform: uppercase; color: rgba(0,0,0,0.5);">VAT (included)</td>
                        <td style="padding-bottom: 16px; font-size: 18px; text-align: right; color: #000000;">$ ${formatPrice(vat)}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 15px; text-transform: uppercase; color: rgba(0,0,0,0.5);">Grand Total</td>
                        <td style="padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 18px; font-weight: 700; text-align: right; color: #D87D4A;">$ ${formatPrice(grandTotal)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 48px 24px 48px; background: #FFFFFF;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; text-transform: uppercase; color: #000000;">Shipping Address</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #F1F1F1; border-radius: 8px; padding: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-weight: 700; color: #000000;">${customerName}</p>
                    <p style="margin: 4px 0 0 0; color: rgba(0,0,0,0.75); line-height: 1.6;">${shippingAddress}<br/>${shippingCity}, ${shippingZipCode}<br/>${shippingCountry}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 48px 32px 48px; background: #FFFFFF;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order/${orderId}" style="display: block; padding: 15px 32px; background: #D87D4A; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; text-align: center; border-radius: 2px; transition: background 0.3s;">View Order Details</a>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding: 32px 48px; background: #FFFFFF; border-top: 1px solid rgba(0,0,0,0.08); text-align: center;">
              <p style="margin: 0; font-size: 14px; color: rgba(0,0,0,0.5);">Need help? Contact our support team</p>
              <p style="margin: 8px 0 0 0; font-size: 14px; font-weight: 600;">
                <a href="mailto:charlesobuzor@outlook.com" style="color: #D87D4A; text-decoration: none;">charlesobuzor@outlook.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 48px; background: #F1F1F1; text-align: center; border-top: 1px solid rgba(0,0,0,0.08);">
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,0.4);">© ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
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
