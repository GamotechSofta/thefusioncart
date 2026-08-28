/** Hex-only CSS for print/PDF — table layout, no flex/grid, no webfonts */
export const INVOICE_EXPORT_CSS = `
.invoice-export {
  width: 794px;
  max-width: 794px;
  margin: 0 auto;
  background: #ffffff;
  color: #111827;
  padding: 32px;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0 !important;
  word-spacing: 0 !important;
  box-sizing: border-box;
}
.invoice-export, .invoice-export * {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0 !important;
  word-spacing: 0 !important;
}
.invoice-export table {
  border-collapse: collapse;
  border-spacing: 0;
}
.invoice-export-header {
  width: 100%;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
  padding-bottom: 0;
}
.invoice-export-header td {
  vertical-align: top;
  padding-bottom: 24px;
}
.invoice-export-brand {
  width: 62%;
  padding-right: 20px;
}
.invoice-export-brand-inner {
  width: 100%;
}
.invoice-export-logo-cell {
  width: 1%;
  white-space: nowrap;
  padding-right: 14px;
  vertical-align: middle;
}
.invoice-export-logo {
  width: auto !important;
  height: auto !important;
  max-width: 96px;
  max-height: 64px;
  object-fit: contain;
  object-position: left center;
  display: block;
}
.invoice-export-brand-text {
  vertical-align: top;
}
.invoice-export-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
  line-height: 28px;
}
.invoice-export-subtitle {
  color: #4b5563;
  font-weight: 600;
  font-size: 13px;
  margin: 0 0 4px;
  line-height: 18px;
}
.invoice-export-muted {
  color: #6b7280;
  font-size: 12px;
  margin: 0 0 3px;
  line-height: 17px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.invoice-export-meta {
  width: 38%;
  text-align: right;
  font-size: 13px;
  color: #4b5563;
  line-height: 20px;
  white-space: nowrap;
}
.invoice-export-meta-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
  line-height: 28px;
}
.invoice-export-meta p {
  margin: 3px 0;
  line-height: 18px;
}
.invoice-export-meta strong {
  color: #111827;
  font-weight: 600;
}
.invoice-export-grid {
  width: 100%;
  margin-bottom: 24px;
}
.invoice-export-grid td {
  width: 50%;
  vertical-align: top;
  padding-right: 16px;
}
.invoice-export-grid td + td {
  padding-right: 0;
  padding-left: 16px;
}
.invoice-export-section-title {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  text-transform: uppercase;
  margin: 0 0 8px;
  line-height: 16px;
}
.invoice-export-section-body {
  font-size: 13px;
  color: #4b5563;
  line-height: 19px;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.invoice-export-section-body p {
  margin: 0 0 3px;
  line-height: 19px;
}
.invoice-export-section-body .name {
  font-weight: 700;
  color: #111827;
}
.invoice-export-items-title {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  text-transform: uppercase;
  margin: 0 0 12px;
  line-height: 16px;
}
.invoice-export-table {
  width: 100%;
  margin-bottom: 24px;
}
.invoice-export-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  line-height: 16px;
}
.invoice-export-table th.center,
.invoice-export-table td.center { text-align: center; }
.invoice-export-table th.right,
.invoice-export-table td.right { text-align: right; }
.invoice-export-table td {
  padding: 10px 12px;
  font-size: 13px;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 19px;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.invoice-export-table col.col-item { width: 48%; }
.invoice-export-table col.col-qty { width: 14%; }
.invoice-export-table col.col-price { width: 19%; }
.invoice-export-table col.col-total { width: 19%; }
.invoice-export-table td.item-name {
  font-weight: 600;
  color: #111827;
}
.invoice-export-table td.total-cell {
  font-weight: 700;
  color: #111827;
}
.invoice-export-totals-wrap {
  width: 100%;
  border-top: 2px solid #e5e7eb;
  padding-top: 12px;
}
.invoice-export-totals {
  width: 260px;
  margin-left: auto;
}
.invoice-export-totals td {
  padding: 4px 0;
  font-size: 13px;
  line-height: 19px;
}
.invoice-export-totals td.label { color: #4b5563; text-align: left; }
.invoice-export-totals td.value { color: #111827; text-align: right; }
.invoice-export-totals tr.grand td {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
  line-height: 22px;
}
.invoice-export-footer {
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 12px;
  color: #4b5563;
  line-height: 18px;
}
.invoice-export-footer p { margin: 0 0 6px; line-height: 18px; }

@media print {
  .invoice-export {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
  }
}
`;
