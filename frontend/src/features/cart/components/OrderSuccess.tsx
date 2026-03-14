"use client";

import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, LayoutDashboard, Clock } from "lucide-react";

const RED = "#bf262f";
const RED_LIGHT = "#f9e9ea";

interface OrderSuccessProps {
  orderNumber: string;
}

export function OrderSuccess({ orderNumber }: OrderSuccessProps) {
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
    </div>
  );
}
