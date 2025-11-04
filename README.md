# Audiophile E-commerce

A pixel-perfect e-commerce website for audio products built with Next.js, TypeScript, Tailwind CSS, Convex backend, and Resend email service.

## Features

✅ **Pixel-perfect responsive design** - Matches Figma design across mobile, tablet, and desktop  
✅ **Full checkout flow** - Form validation, order processing, and confirmation  
✅ **Backend integration** - Orders saved to Convex database  
✅ **Email notifications** - Automated confirmation emails via Resend  
✅ **Order tracking** - Dedicated order confirmation page  
✅ **Edge case handling** - Loading states, error handling, duplicate submission prevention  
✅ **Accessibility** - Screen reader friendly, semantic HTML, proper ARIA labels  

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Convex (serverless database & API)
- **Email**: Resend
- **Form**: React Hook Form + Zod validation
- **State Management**: React hooks + Convex real-time queries

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account ([convex.dev](https://convex.dev))
- Resend account ([resend.com](https://resend.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd audiophile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Update `.env.local` with your credentials:
   ```bash
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```
   This will:
   - Push the schema to your Convex deployment
   - Generate TypeScript types
   - Start the Convex dev server

5. **Run the development server**
   
   In a separate terminal:
   ```bash
   npm run dev
   ```

6. **Open the application**
   ```
   http://localhost:3000
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONVEX_DEPLOYMENT` | Your Convex deployment ID | Yes |
| `NEXT_PUBLIC_CONVEX_URL` | Your Convex deployment URL | Yes |
| `RESEND_API_KEY` | Your Resend API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Base URL for email links | No (defaults to localhost) |

## Project Structure

```
src/
├── components/
│   ├── checkout/           # Checkout flow components
│   ├── common/             # Reusable UI components
│   ├── home/               # Homepage sections
│   └── products/           # Product display components
├── pages/
│   ├── api/                # API routes (email)
│   ├── order/              # Order confirmation page
│   ├── products/           # Product pages
│   └── checkout.tsx        # Checkout page
├── utils/                  # Utility functions
├── data/                   # Static data (products, etc.)
└── styles/                 # Global styles

convex/
├── schema.ts               # Database schema
├── orders.ts               # Order mutations & queries
└── _generated/             # Auto-generated Convex types
```

## Features in Detail

### Checkout Flow

1. **Form Validation** - Real-time validation with Zod schema
2. **Order Creation** - Saved to Convex with unique order ID
3. **Email Confirmation** - HTML email sent via Resend
4. **Order Page** - Dedicated page to view order details
5. **Error Handling** - Graceful error messages and retry logic

### Database Schema (Convex)

Orders are stored with:
- Customer details (name, email, phone)
- Shipping address (address, city, zip, country)
- Payment method
- Cart items (id, name, price, quantity, image)
- Totals (subtotal, shipping, VAT, grand total)
- Order status and timestamp

### Email Template

Professional HTML email includes:
- Order ID and summary
- List of purchased items
- Shipping details
- Totals breakdown
- "View Your Order" CTA link
- Support contact information

## Development

```bash
# Run development server
npm run dev

# Run Convex dev server (in separate terminal)
npx convex dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Testing the Checkout

1. Add items to cart
2. Navigate to checkout page
3. Fill in the form with test data
4. Submit the order
5. Check Convex dashboard for saved order
6. Check email inbox for confirmation
7. Click "View Your Order" or visit `/order/[orderId]`


---