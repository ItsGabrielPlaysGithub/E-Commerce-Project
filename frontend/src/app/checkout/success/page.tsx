'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, Home, FileText } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const id = searchParams.get('orderId');
    setOrderId(id);
  }, [searchParams]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your payment. Your order is being processed.
          </p>
        </div>

        {/* Order Details */}
        {orderId && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-lg font-semibold text-blue-600">#{orderId}</p>
          </div>
        )}

        {/* Info Text */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-700">
            <strong>What happens next?</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>✓ We've received your payment</li>
            <li>✓ You'll receive a confirmation email shortly</li>
            <li>✓ Your order is being prepared for shipment</li>
            <li>✓ Track your order in your dashboard</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back Home
          </button>
          <button
            onClick={() => router.push('/admin/invoices')}
            className="flex-1 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            View Invoice
          </button>
        </div>

        {/* Redirect Timer */}
        <p className="text-xs text-gray-500">
          Redirecting to home in {countdown}s...
        </p>
      </div>
    </div>
  );
}
