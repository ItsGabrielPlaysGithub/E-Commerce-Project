"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, LayoutDashboard, Clock, Upload, Copy, ChevronDown, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { PaymentProofUploadModal } from "@/components/modals/Payment-Proof";

const RED = "#bf262f";
const RED_LIGHT = "#f9e9ea";

interface OrderSuccessProps {
  orderNumber: string;
  orderId?: string;
  grandTotal?: number;
}

export function OrderSuccess({ orderNumber, orderId = "", grandTotal = 0 }: OrderSuccessProps) {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const [resolvedOrderId] = useState<number | null>(
    orderId ? parseInt(orderId, 10) : null
  );

  const bankAccount = {
    bank: "BDO Unibank",
    accountName: "Omega Houseware",
    accountNumber: "1234567890",
    reference: orderNumber,
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bankAccount.accountNumber);
    setIsCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUploadPaymentProof = async (file: File): Promise<void> => {
    try {
      // Use resolved order ID
      if (!resolvedOrderId) {
        throw new Error("Order ID is missing. Please navigate to order success page via the checkout flow. If you arrived here directly, please contact support.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:4000/orders/upload-payment-proof/${resolvedOrderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload payment proof");
      }

      toast.success("Payment proof uploaded successfully!");
      toast.success("Order status updated to processing!");
      setIsUploadModalOpen(false);
      
      // Navigate to orders page after successful upload
      setTimeout(() => {
        router.push("/b2b/my-orders");
      }, 1500);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to upload payment proof";
      toast.error(errorMsg);
      throw error;
    }
  };
  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Top band */}
          <div
            className="h-2 w-full"
            style={{ background: `linear-gradient(90deg, ${RED}, #8f1d23)` }}
          />

          <div className="px-8 py-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "#ecfdf5" }}
            >
              <CheckCircle2 size={30} className="text-green-600" />
            </div>

            <h1
              className="text-gray-900 mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.6rem" }}
            >
              Order Placed!
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your order has been received and is being processed. You'll receive a confirmation email shortly.
            </p>

            {/* Order reference */}
            <div
              className="rounded-xl p-4 mb-6"
              style={{ backgroundColor: RED_LIGHT }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order Reference</div>
              <div
                className="font-bold text-lg"
                style={{ fontFamily: "'Playfair Display', serif", color: RED }}
              >
                {orderNumber}
              </div>
              <div className="text-gray-400 text-xs mt-0.5">Save this for tracking purposes</div>
            </div>

            {/* Total Amount Due */}
            {grandTotal > 0 && (
              <div
                className="rounded-xl p-4 mb-6 border-1"
                style={{ backgroundColor: "#fef3f2", borderColor: RED }}
              >
                <div className="text-xs font-bold text-#000000-500 uppercase tracking-wider mb-2">Total Amount Due</div>
                <div className="flex items-baseline justify-between">
                  <div
                    className="font-bold text-3xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
                  >
                    ₱{grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-gray-400 text-xs mt-2">Please pay this amount via bank transfer</div>
              </div>
            )}

            {/* Bank Account Details Dropdown */}
            <button
              onClick={() => setIsBankDetailsOpen(!isBankDetailsOpen)}
              className="w-full rounded-xl p-4 mb-6 border text-left transition-all"
              style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Transfer Details</div>
                  <div className="text-sm font-medium text-gray-800">{bankAccount.bank} • {bankAccount.accountName}</div>
                </div>
                <ChevronDown
                  size={18}
                  style={{ color: "#9ca3af" }}
                  className={`transition-transform ${isBankDetailsOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Expanded Details */}
              {isBankDetailsOpen && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2.5">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Bank Name</div>
                    <div className="text-sm font-medium text-gray-800">{bankAccount.bank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Account Name</div>
                    <div className="text-sm font-medium text-gray-800">{bankAccount.accountName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Account Number</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-mono font-medium text-gray-800 flex-1 break-all">
                        {bankAccount.accountNumber}
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAccountNumber();
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
                      >
                        <Copy size={14} style={{ color: RED }} />
                      </div>
                    </div>
                    {isCopied && <div className="text-xs text-green-600 mt-1">Copied!</div>}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Reference/Remarks</div>
                    <div className="text-sm font-medium text-gray-800">{bankAccount.reference}</div>
                  </div>

                  {/* Upload Payment Proof Button */}
                  {resolvedOrderId ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUploadModalOpen(true);
                      }}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                      style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                    >
                      <Upload size={14} />
                      Upload Payment Proof
                    </div>
                  ) : (
                    <div
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}
                    >
                      <AlertCircle size={14} />
                      Order ID Missing - Please Refresh
                    </div>
                  )}
                </div>
              )}
            </button>

            {/* What's next */}
            <div className="text-left space-y-3 mb-7">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">What happens next</div>
              {[
                {
                  icon: CheckCircle2,
                  color: "#16a34a",
                  step: "Order confirmed",
                  sub: "Our team will verify your order details.",
                },
                {
                  icon: Package,
                  color: RED,
                  step: "Picking & packing",
                  sub: "Items are prepared at our warehouse.",
                },
                {
                  icon: Clock,
                  color: "#2563eb",
                  step: "Dispatched for delivery",
                  sub: "You'll receive tracking details via email.",
                },
              ].map(({ icon: Icon, color, step, sub }) => (
                <div key={step} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-gray-800 text-sm font-medium">{step}</div>
                    <div className="text-gray-400 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Link
                href="/b2b/home"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/b2b/products"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: RED }}
              >
                Order More <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-5">
          Questions? Contact your account manager or email{" "}
          <a href="mailto:inquiry@omegahouseware.com.ph" style={{ color: RED }}>
            inquiry@omegahouseware.com.ph
          </a>
        </p>
      </div>

      {/* Payment Proof Upload Modal */}
      <PaymentProofUploadModal
        isOpen={isUploadModalOpen}
        orderId={orderNumber}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadPaymentProof}
      />
    </div>
  );
}
