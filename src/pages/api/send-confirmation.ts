import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrderConfirmationEmailHTML } from '@/utils/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      customerName,
      customerEmail,
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
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !orderId || !items) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailHTML = getOrderConfirmationEmailHTML({
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
    });

    const { data, error } = await resend.emails.send({
      from: 'Audiophile <orders@audiophile.charlz.dev>',
      to: [customerEmail],
      subject: `Order Confirmation - ${orderId}`,
      html: emailHTML,
    });

    if (error) {
      console.error('Error sending email:', error);
      
      // Handle Resend testing mode restriction
      if (error.name === 'validation_error' && error.message?.includes('testing emails')) {
        console.warn('⚠️  Resend is in testing mode. Email can only be sent to verified account email.');
        console.warn('📧 To send to any email: Verify a domain at resend.com/domains');
        console.warn(`📝 Attempted to send to: ${customerEmail}`);
        
        // Return success to not block the order, but log the limitation
        return res.status(200).json({ 
          success: true, 
          warning: 'Email service in testing mode',
          message: 'Order created successfully. Email notifications require domain verification.'
        });
      }
      
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in send-confirmation API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
