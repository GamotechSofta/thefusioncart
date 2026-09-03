import { Resend } from 'resend';
import Order from '../models/Order.js';
import { User } from '../models/User.js';
import { Product } from '../models/product.js';
import { COMPANY_INFO } from '../config/companyInfo.js';

const formatINR = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const getProductTitle = (product) =>
  product?.title || product?.['SKU Name'] || product?.name || 'Product';

async function populateOrderItems(items) {
  return Promise.all(
    (items || []).map(async (item) => {
      const product = await Product.findById(item.product);
      const productObj = product?.toObject?.() || product;
      const price =
        item.price && item.price > 0
          ? item.price
          : productObj?.price || productObj?.mrp || 0;

      return {
        quantity: item.quantity || 1,
        price,
        size: item.size,
        title: getProductTitle(productObj),
      };
    })
  );
}

function formatEmailAddress(shipping = {}) {
  return [
    shipping.address,
    shipping.locality,
    shipping.city,
    shipping.state,
    shipping.pincode,
  ]
    .filter(Boolean)
    .join(', ');
}

function buildInvoiceHtml({ order, items, customerName, customerEmail }) {
  const rawId = order._id.toString();
  const shortId = rawId.slice(-8).toUpperCase();
  const invoiceNo = `INV${shortId}`;
  const d = new Date(order.createdAt || Date.now());
  const orderDate = d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const shipping = order.shippingAddress || {};
  const name = customerName || shipping.fullName || 'Customer';
  const addressText = formatEmailAddress(shipping) || '—';
  const placeOfSupply =
    [shipping.city, shipping.state].filter(Boolean).join(', ') || 'Gurugram, Haryana';
  const paymentMode =
    order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod === 'Manual' ? 'Manual' : 'Online';
  const paymentStatus =
    order.status === 'failed' ? 'Failed' : order.paymentMethod === 'COD' ? 'Pending' : 'Paid';

  const itemRows = items
    .map((item, index) => {
      const title = item.size ? `${item.title} (Size: ${item.size})` : item.title;
      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #eef0f2;text-align:center;">${index + 1}</td>
          <td style="padding:12px;border-bottom:1px solid #eef0f2;">${title}</td>
          <td style="padding:12px;border-bottom:1px solid #eef0f2;text-align:center;">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #eef0f2;text-align:right;">${formatINR(item.price)}</td>
          <td style="padding:12px;border-bottom:1px solid #eef0f2;text-align:right;">${formatINR(item.price * item.quantity)}</td>
        </tr>`;
    })
    .join('');

  const field = (label, value) =>
    `<td style="padding:10px 12px;font-weight:700;border-bottom:1px solid #eef0f2;border-right:1px solid #e5e7eb;width:18%;">${label}</td>
     <td style="padding:10px 12px;border-bottom:1px solid #eef0f2;width:32%;">${value}</td>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111111;">
  <div style="max-width:640px;margin:0 auto;padding:40px 28px 48px;background:#ffffff;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      <tr>
        <td style="vertical-align:top;width:62%;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;text-transform:uppercase;">${COMPANY_INFO.legalName}</p>
          <p style="margin:0 0 4px;font-size:12px;line-height:20px;">${COMPANY_INFO.registeredAddress}</p>
          <p style="margin:0;font-size:12px;line-height:20px;">${COMPANY_INFO.email} · GSTIN: ${COMPANY_INFO.gstin}</p>
        </td>
        <td style="vertical-align:top;text-align:right;font-size:28px;font-weight:700;text-transform:uppercase;">INVOICE</td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid #e5e7eb;border-radius:10px;margin:0 0 14px;">
      <tr><td style="background:#f8f9fa;font-weight:700;padding:10px 14px;border-bottom:1px solid #e5e7eb;">Invoice Details</td></tr>
      <tr>
        <td style="padding:0;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr>${field('Invoice No', invoiceNo)}${field('Place of Supply', placeOfSupply)}</tr>
            <tr>${field('Order No', shortId)}${field('Invoice Date', orderDate)}</tr>
            <tr>${field('Order Status', order.status || 'confirmed')}${field('Payment Status', paymentStatus)}</tr>
            <tr>${field('Payment Mode', paymentMode)}<td></td><td></td></tr>
          </table>
        </td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid #e5e7eb;border-radius:10px;margin:0 0 14px;">
      <tr><td style="background:#f8f9fa;font-weight:700;padding:10px 14px;border-bottom:1px solid #e5e7eb;">Bill To</td></tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;line-height:20px;">
          <p style="margin:0 0 8px;font-weight:700;text-transform:uppercase;">${name}</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong> ${customerEmail || '—'}</p>
          <p style="margin:0 0 4px;"><strong>Phone:</strong> ${shipping.mobileNumber || '—'}</p>
          <p style="margin:0;"><strong>Address:</strong> ${addressText}</p>
        </td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:separate;border-spacing:0;border:1px solid #e5e7eb;border-radius:10px;margin:0 0 14px;">
      <tr><td style="background:#f8f9fa;font-weight:700;padding:10px 14px;border-bottom:1px solid #e5e7eb;">Order Details</td></tr>
      <tr>
        <td style="padding:0;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:center;border-bottom:1px solid #e5e7eb;">SR NO</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;">ITEM NAME</th>
                <th style="padding:10px 12px;text-align:center;border-bottom:1px solid #e5e7eb;">QTY</th>
                <th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;">RATE</th>
                <th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
          <table style="width:320px;margin:16px 12px 16px auto;border-collapse:collapse;font-size:13px;border:1px solid #d1d5db;">
            <tr>
              <th style="padding:9px 12px;text-align:left;background:#f8f9fa;border:1px solid #d1d5db;font-size:12px;text-transform:uppercase;">Particulars</th>
              <th style="padding:9px 12px;text-align:right;background:#f8f9fa;border:1px solid #d1d5db;font-size:12px;text-transform:uppercase;">Amount</th>
            </tr>
            <tr>
              <td style="padding:9px 12px;border:1px solid #d1d5db;">Sub Total</td>
              <td style="padding:9px 12px;border:1px solid #d1d5db;text-align:right;">${formatINR(order.amount)}</td>
            </tr>
            <tr>
              <td style="padding:9px 12px;border:1px solid #d1d5db;">GST (18%)</td>
              <td style="padding:9px 12px;border:1px solid #d1d5db;text-align:right;">₹0</td>
            </tr>
            <tr>
              <td style="padding:9px 12px;border:1px solid #d1d5db;">Shipping Charges</td>
              <td style="padding:9px 12px;border:1px solid #d1d5db;text-align:right;">₹0</td>
            </tr>
            <tr>
              <td style="padding:9px 12px;border:1px solid #d1d5db;font-weight:700;background:#f8f9fa;">Total Amount</td>
              <td style="padding:9px 12px;border:1px solid #d1d5db;text-align:right;font-weight:700;background:#f8f9fa;">${formatINR(order.amount)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="margin-top:8px;padding-top:16px;border-top:1px dashed #c4c4c4;text-align:center;">
      <p style="margin:0 0 6px;font-size:13px;">Thank you for your order!</p>
      <p style="margin:0;font-size:12px;color:#4b5563;">For any queries, contact us at ${COMPANY_INFO.email} or ${COMPANY_INFO.phone}</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Send order invoice email via Resend.
 * @param {string} orderId
 * @param {{ email?: string }} options - optional override email (e.g. PayU callback)
 */
export async function sendOrderInvoiceEmail(orderId, options = {}) {
  const apiKey = process.env.RESEND_API;
  if (!apiKey) {
    console.warn('[invoiceEmail] RESEND_API not configured, skipping invoice email');
    return { skipped: true, reason: 'missing_api_key' };
  }

  const order = await Order.findById(orderId);
  if (!order) {
    console.warn('[invoiceEmail] Order not found:', orderId);
    return { skipped: true, reason: 'order_not_found' };
  }

  if (order.invoiceEmailSentAt) {
    return { skipped: true, reason: 'already_sent' };
  }

  let recipientEmail = options.email?.trim() || '';
  let customerName = options.name?.trim() || '';

  if (order.user) {
    const user = await User.findById(order.user).select('name email');
    if (user) {
      if (!recipientEmail) recipientEmail = user.email || '';
      if (!customerName) customerName = user.name || '';
    }
  }

  if (!customerName && order.shippingAddress?.fullName) {
    customerName = order.shippingAddress.fullName;
  }

  if (!recipientEmail) {
    console.warn('[invoiceEmail] No recipient email for order:', orderId);
    return { skipped: true, reason: 'no_recipient_email' };
  }

  const items = await populateOrderItems(order.items);
  const html = buildInvoiceHtml({
    order,
    items,
    customerName,
    customerEmail: recipientEmail,
  });
  const orderNumber = order._id.toString().slice(-8).toUpperCase();
  const from =
    process.env.RESEND_FROM || `${COMPANY_INFO.brandName} <onboarding@resend.dev>`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: recipientEmail,
    subject: `Your ${COMPANY_INFO.brandName} Invoice — Order #${orderNumber}`,
    html,
  });

  if (error) {
    console.error('[invoiceEmail] Resend error:', error);
    throw new Error(error.message || 'Failed to send invoice email');
  }

  order.invoiceEmailSentAt = new Date();
  await order.save();

  console.log('[invoiceEmail] Sent invoice for order', orderId, 'to', recipientEmail, data?.id);
  return { success: true, id: data?.id };
}
