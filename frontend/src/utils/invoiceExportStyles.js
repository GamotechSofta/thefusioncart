/** Hex-only CSS for print/PDF — table layout, no flex/grid, no webfonts */
export const INVOICE_EXPORT_CSS = `
.invoice-export {
  width: 100%;
  max-width: 794px;
  margin: 0 auto;
  background: #ffffff;
  color: #111111;
  padding: 48px 36px 56px;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0px !important;
  word-spacing: 0px !important;
  box-sizing: border-box;
}
.invoice-export, .invoice-export * {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif !important;
  letter-spacing: 0px !important;
  word-spacing: 0px !important;
  font-kerning: none !important;
  font-variant-ligatures: none !important;
}
.invoice-export p { margin: 0; padding: 0; }
.invoice-export table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Header */
.invoice-export-top {
  width: 100%;
  margin: 0 0 8px;
  table-layout: fixed;
}
.invoice-export-top td {
  vertical-align: top;
  padding: 0;
}
.invoice-export-brand { width: 62%; padding-right: 16px; }
.invoice-export-meta { width: 38%; text-align: right; }
.invoice-export-logo {
  width: auto !important;
  height: auto !important;
  max-width: 200px;
  max-height: 56px;
  object-fit: contain;
  object-position: left center;
  display: block;
  margin: 0 0 12px;
  background: transparent;
}
.invoice-export-company {
  font-size: 13px;
  font-weight: 700;
  color: #111111;
  margin: 0 0 6px;
  line-height: 20px;
  text-transform: uppercase;
  word-break: normal;
  overflow-wrap: break-word;
}
.invoice-export-contact {
  font-size: 12px;
  font-weight: 400;
  color: #222222;
  margin: 0 0 4px;
  line-height: 20px;
  word-break: normal;
  overflow-wrap: break-word;
}
.invoice-export-doc-title {
  font-size: 32px;
  font-weight: 700;
  color: #111111;
  margin: 0;
  line-height: 38px;
  text-transform: uppercase;
}

/* Cards */
.invoice-card {
  width: 100%;
  margin: 0 0 14px;
  border: 1px solid #e5e7eb;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  table-layout: fixed;
}
.invoice-card-head {
  background: #f8f9fa;
  font-size: 14px;
  font-weight: 700;
  color: #111111;
  padding: 10px 14px;
  line-height: 20px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.invoice-card-body {
  padding: 0;
  background: #ffffff;
  vertical-align: top;
}

/* Invoice details 4-col */
.invoice-fields {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.invoice-fields td {
  padding: 10px 12px;
  font-size: 13px;
  line-height: 20px;
  color: #111111;
  vertical-align: top;
  border-bottom: 1px solid #eef0f2;
  word-break: normal;
  overflow-wrap: break-word;
}
.invoice-fields tr:last-child td { border-bottom: 0; }
.invoice-fields td.lbl {
  width: 18%;
  font-weight: 700;
  border-right: 1px solid #e5e7eb;
}
.invoice-fields td.val {
  width: 32%;
}
.invoice-fields td.lbl + td.val + td.lbl {
  border-left: 1px solid #e5e7eb;
}

/* Bill To */
.invoice-bill {
  width: 100%;
  border-collapse: collapse;
}
.invoice-bill td {
  padding: 8px 14px;
  font-size: 13px;
  line-height: 20px;
  color: #111111;
  vertical-align: top;
  word-break: normal;
  overflow-wrap: break-word;
}
.invoice-bill td.bill-name {
  font-weight: 700;
  padding-top: 12px;
  text-transform: uppercase;
}
.invoice-bill td.bill-label {
  width: 72px;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 8px;
}
.invoice-bill td.bill-value {
  font-weight: 400;
}
.invoice-bill tr:last-child td { padding-bottom: 12px; }

/* Order table */
.invoice-items {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.invoice-items th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #111111;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  line-height: 18px;
  text-transform: uppercase;
}
.invoice-items th.center,
.invoice-items td.center { text-align: center; }
.invoice-items th.right,
.invoice-items td.right { text-align: right; }
.invoice-items td {
  padding: 12px;
  font-size: 13px;
  color: #111111;
  border-bottom: 1px solid #eef0f2;
  vertical-align: middle;
  line-height: 20px;
  word-break: normal;
  overflow-wrap: break-word;
}
.invoice-items col.col-sr { width: 12%; }
.invoice-items col.col-item { width: 44%; }
.invoice-items col.col-qty { width: 12%; }
.invoice-items col.col-rate { width: 16%; }
.invoice-items col.col-amt { width: 16%; }
.invoice-items .empty {
  text-align: center;
  color: #9ca3af;
  padding: 24px 12px !important;
}

.invoice-totals-wrap {
  width: 100%;
  padding: 16px 12px 16px;
}
.invoice-totals {
  width: 320px;
  margin-left: auto;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #d1d5db;
}
.invoice-totals th,
.invoice-totals td {
  padding: 9px 12px;
  font-size: 13px;
  line-height: 20px;
  color: #111111;
  border: 1px solid #d1d5db;
}
.invoice-totals th {
  background: #f8f9fa;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  font-size: 12px;
}
.invoice-totals th.right,
.invoice-totals td.right { text-align: right; }
.invoice-totals col.col-label { width: 60%; }
.invoice-totals col.col-value { width: 40%; }
.invoice-totals tr.grand td {
  font-weight: 700;
  background: #f8f9fa;
}

.invoice-export-footer {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px dashed #c4c4c4;
  text-align: center;
  font-size: 13px;
  color: #111111;
  line-height: 20px;
}
.invoice-export-footer p { margin: 0 0 6px; line-height: 20px; }
.invoice-export-footer .muted {
  font-size: 12px;
  color: #4b5563;
}

@media print {
  .invoice-export {
    width: 100% !important;
    max-width: 100% !important;
    padding: 24px 8px 32px !important;
  }
}
`;
