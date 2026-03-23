"use client";

import { X, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import type { Invoice } from "../services/invoiceService";

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  invoice: Invoice;
  onClose: () => void;
}

export function InvoiceDetailsModal({ isOpen, invoice, onClose }: InvoiceDetailsModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return { bg: "#ecfdf5", color: "#16a34a" };
      case "OVERDUE":
        return { bg: "#fef2f2", color: "#dc2626" };
      case "PARTIALLY_PAID":
        return { bg: "#fef3c7", color: "#ca8a04" };
      default:
        return { bg: "#fef3c7", color: "#ca8a04" };
    }
  };

  const statusColor = getStatusColor(invoice.paymentStatus);

  const handlePrintInvoice = () => {
    const invoiceWindow = window.open("", "_blank", "width=980,height=760");
    if (!invoiceWindow) return;

    const createdDate = invoice.createdAt
      ? new Date(invoice.createdAt).toLocaleDateString()
      : "TBD";
    const dueDate = invoice.dueDate
      ? new Date(invoice.dueDate).toLocaleDateString()
      : "TBD";
    const paymentStatus = String(invoice.paymentStatus || "PENDING").toUpperCase();
    const paymentColor = paymentStatus === "PAID" ? "#16a34a" : "#d97706";

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>${invoice.invoiceNumber}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              background: #f1f5f9;
              font-family: Arial, sans-serif;
              color: #0f172a;
            }
            .sheet {
              max-width: 860px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #dbe4ef;
              box-shadow: 0 12px 34px rgba(15, 23, 42, 0.14);
            }
            .header {
              background: linear-gradient(120deg, #030213 36%, #bf262f 36%, #bf262f 100%);
              color: #ffffff;
              padding: 24px 28px;
              display: flex;
              justify-content: space-between;
              gap: 20px;
            }
            .brand-title {
              margin: 0;
              font-size: 24px;
              font-weight: 800;
              letter-spacing: 0.02em;
            }
            .brand-sub {
              margin: 6px 0 0;
              font-size: 12px;
              color: rgba(191, 219, 254, 0.95);
              letter-spacing: 0.05em;
            }
            .invoice-title {
              margin: 0;
              font-size: 34px;
              line-height: 1;
              font-weight: 900;
              text-align: right;
            }
            .meta {
              margin-top: 8px;
              font-size: 12px;
              line-height: 1.5;
              text-align: right;
            }
            .status-pill {
              display: inline-block;
              margin-top: 10px;
              padding: 4px 10px;
              border-radius: 999px;
              background: rgba(255,255,255,0.14);
              font-size: 11px;
              letter-spacing: 0.06em;
            }
            .content { padding: 22px 28px 28px; }
            .row-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 18px;
              margin-bottom: 18px;
            }
            .card {
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 14px;
            }
            .label {
              margin: 0 0 6px;
              color: #64748b;
              font-size: 11px;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              font-weight: 700;
            }
            .value { margin: 0; font-size: 14px; line-height: 1.5; }
            .value strong { font-size: 15px; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0 16px;
            }
            thead th {
              text-align: left;
              padding: 10px 12px;
              background: #bf262f;
              color: #ffffff;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            }
            tbody td {
              border-bottom: 1px solid #e2e8f0;
              padding: 12px;
              font-size: 13px;
              color: #1e293b;
            }
            tfoot td {
              padding: 10px 12px;
              font-size: 13px;
            }
            .totals {
              margin-left: auto;
              width: 320px;
              border: 1px solid #dbe4ef;
              border-radius: 10px;
              overflow: hidden;
            }
            .totals-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 12px;
              border-bottom: 1px solid #e2e8f0;
              font-size: 13px;
            }
            .totals-row:last-child {
              border-bottom: none;
              background: #bf262f;
              color: #ffffff;
              font-weight: 800;
            }
            .footer {
              margin-top: 22px;
              padding-top: 14px;
              border-top: 1px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              gap: 10px;
            }
            .note {
              margin: 0;
              font-size: 12px;
              color: #64748b;
              line-height: 1.6;
              max-width: 530px;
            }
            .signature {
              text-align: right;
              min-width: 170px;
              font-size: 11px;
              color: #64748b;
            }
            .signature-line {
              margin-top: 26px;
              border-top: 1px solid #94a3b8;
              padding-top: 6px;
            }
            .actions {
              margin-top: 18px;
              display: flex;
              justify-content: flex-end;
              gap: 10px;
            }
            .btn {
              border: none;
              border-radius: 8px;
              padding: 10px 14px;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
            }
            .btn-print { background: #0b5ea8; color: #ffffff; }
            .btn-close { background: #e2e8f0; color: #334155; }
            @media print {
              body { padding: 0; background: #ffffff; }
              .sheet { border: none; box-shadow: none; }
              .actions { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div>
                <h1 class="brand-title">OMEGA</h1>
                <p class="brand-sub">ECOMMERCE SOLUTIONS</p>
              </div>
              <div>
                <h2 class="invoice-title">INVOICE</h2>
                <div class="meta">
                  <div><strong>Invoice:</strong> ${invoice.invoiceNumber}</div>
                  <div><strong>Order:</strong> #${invoice.orderId}</div>
                  <div><strong>Issue Date:</strong> ${createdDate}</div>
                  <div><strong>Due Date:</strong> ${dueDate}</div>
                </div>
                <span class="status-pill" style="color:${paymentColor};">${paymentStatus}</span>
              </div>
            </div>

            <div class="content">
              <div class="row-grid">
                <div class="card">
                  <p class="label">Invoice To</p>
                  <p class="value"><strong>User #${invoice.userId}</strong></p>
                  <p class="value">Invoice ID: ${invoice.invoiceId}</p>
                </div>
                <div class="card">
                  <p class="label">Payment Details</p>
                  <p class="value">Method: Portal Payment</p>
                  <p class="value">Reference: ${invoice.invoiceNumber}</p>
                  <p class="value">Status: ${paymentStatus}</p>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style="width:12%">No.</th>
                    <th style="width:46%">Description</th>
                    <th style="width:14%">Price</th>
                    <th style="width:12%">Qty</th>
                    <th style="width:16%; text-align:right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Services/Products - Order #${invoice.orderId}</td>
                    <td>₱${invoice.totalAmount.toFixed(2)}</td>
                    <td>1</td>
                    <td style="text-align:right; font-weight:700;">₱${invoice.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div class="totals">
                <div class="totals-row"><span>Subtotal</span><span>₱${invoice.totalAmount.toFixed(2)}</span></div>
                <div class="totals-row"><span>Discount</span><span>₱0.00</span></div>
                <div class="totals-row"><span>Tax (0%)</span><span>₱0.00</span></div>
                <div class="totals-row"><span>Total</span><span>₱${invoice.totalAmount.toFixed(2)}</span></div>
              </div>

              <div class="footer">
                <p class="note">
                  Terms and conditions: Payment is due on or before the due date shown above.
                  Please refer to the sales order for detailed terms and conditions.
                </p>
                <div class="signature">
                  <div class="signature-line">Omega Billing</div>
                </div>
              </div>

              <!-- Buyer Info & Signatures Section -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #dbe4ef;">
                <!-- Buyer Address -->
                <div style="margin-bottom: 20px;">
                  <p style="margin: 0 0 8px; font-weight: 700; color: #0f172a; font-size: 13px;">BUYER ADDRESS</p>
                  <p style="margin: 0; font-size: 12px; color: #4b5563; line-height: 1.6; width: 100%; padding-bottom: 8px; border-bottom: 1px solid #94a3b8;">&nbsp;</p>
                </div>

                <!-- Three Column Layout for Signatures -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 30px;">
                  <!-- Packer -->
                  <div style="text-align: center;">
                    <div style="min-height: 60px; border-bottom: 1px solid #94a3b8; margin-bottom: 8px;"></div>
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #0f172a;">Packer Name</p>
                  </div>

                  <!-- Date -->
                  <div style="text-align: center;">
                    <div style="min-height: 60px; border-bottom: 1px solid #94a3b8; margin-bottom: 8px;"></div>
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #0f172a;">Date</p>
                  </div>

                  <!-- Admin Signature -->
                  <div style="text-align: center;">
                    <div style="min-height: 60px; border-bottom: 1px solid #94a3b8; margin-bottom: 8px;"></div>
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #0f172a;">Admin Signature</p>
                  </div>
                </div>
              </div>

              <div class="actions">
                <button class="btn btn-close" onclick="window.close()">Close</button>
                <button class="btn btn-print" onclick="window.print()">Print / Save PDF</button>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    invoiceWindow.document.close();
    invoiceWindow.focus();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-40"
        style={{
          background: "rgba(0,0,0,0.5)",
          animation: isOpen ? "fadeIn 0.2s ease-out" : "fadeOut 0.2s ease-out forwards",
        }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 pointer-events-none" style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <div
          className="rounded-2xl overflow-hidden w-full max-w-2xl pointer-events-auto"
          style={{
            background: "white",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            animation: isOpen ? "slideUp 0.3s ease-out" : "slideDown 0.2s ease-out forwards",
          }}
          onAnimationEnd={() => {
            if (!isOpen) setIsAnimating(false);
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes slideDown {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(20px);
              }
            }
          `}</style>

          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
              Invoice Details
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} color="#64748b" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Invoice Header */}
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#f1f5f9" }}
              >
                <FileText size={28} style={{ color: "#2563eb" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }} className="truncate">
                  Invoice #{invoice.invoiceNumber}
                </h2>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                  Invoice ID: <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{invoice.invoiceId}</span>
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3" style={{ paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Payment Status</span>
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: statusColor.bg,
                  color: statusColor.color,
                  border: `1px solid ${statusColor.color}30`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor.color }} />
                {invoice.paymentStatus}
              </span>
            </div>

            {/* Invoice Info Grid */}
            <div className="grid grid-cols-2 gap-4 pb-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }} className="font-semibold">
                  Billing Date
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {new Date(invoice.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }} className="font-semibold">
                  Due Date
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {new Date(invoice.dueDate).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }} className="font-semibold">
                  Customer ID
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {invoice.userId}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }} className="font-semibold">
                  Sales Order Ref
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {invoice.orderId}
                </p>
              </div>
            </div>

            {/* Amount Details */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                Amount Summary
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "#eff6ff",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>Total Amount</span>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#2563eb" }}>
                    ₱{invoice.totalAmount.toLocaleString("en-PH")}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>Balance Due</span>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#dc2626" }}>
                    {invoice.paymentStatus === "PAID" ? "₱0" : `₱${invoice.totalAmount.toLocaleString("en-PH")}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: "#f8fafc" }}>
              <div>
                <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }} className="font-semibold">
                  Created
                </p>
                <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                  {new Date(invoice.createdAt).toLocaleString("en-PH")}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }} className="font-semibold">
                  Last Updated
                </p>
                <p style={{ fontSize: "13px", color: "#0f172a", fontWeight: 600 }}>
                  {new Date(invoice.updatedAt).toLocaleString("en-PH")}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: "#f1f5f9", color: "#334155" }}
            >
              Close
            </button>
            <button
              onClick={handlePrintInvoice}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "#0b5ea8" }}
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
