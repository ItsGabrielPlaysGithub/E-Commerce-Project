"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OrderSuccess } from "@/features/b2b/cart/components/OrderSuccess";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber =
    searchParams?.get("orderNumber") ||
    `OMG-2025-${String(Math.floor(Math.random() * 900 + 100)).padStart(6, "0")}`;
  const orderIdParam = searchParams?.get("orderId");
  const parsedOrderId = orderIdParam ? Number.parseInt(orderIdParam, 10) : Number.NaN;
  const hasValidOrderId = Number.isInteger(parsedOrderId) && parsedOrderId > 0;

  const grandTotalParam = searchParams?.get("grandTotal") || "0";
  const parsedGrandTotal = Number.parseFloat(grandTotalParam);
  const safeGrandTotal = Number.isFinite(parsedGrandTotal) && parsedGrandTotal >= 0 ? parsedGrandTotal : 0;

  if (!hasValidOrderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center space-y-4">
          <h1 className="text-xl font-semibold text-gray-900">Missing Order Reference</h1>
          <p className="text-sm text-gray-600">
            This page was opened without a valid order ID. Please continue from checkout or view your recent orders.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/b2b/my-orders" className="px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-800">
              Go to My Orders
            </Link>
            <Link href="/b2b/cart" className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <OrderSuccess orderNumber={orderNumber} orderId={String(parsedOrderId)} grandTotal={safeGrandTotal} />;
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}