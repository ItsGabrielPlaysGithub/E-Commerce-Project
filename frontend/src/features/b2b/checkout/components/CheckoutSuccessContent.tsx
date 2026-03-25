import { CheckCircle, Home, FileText } from 'lucide-react';

interface CheckoutSuccessContentProps {
  orderId: string | null;
  countdown: number;
  onBackHome: () => void;
  onViewInvoice: () => void;
}

export const CheckoutSuccessContent = ({
  orderId,
  countdown,
  onBackHome,
  onViewInvoice,
}: CheckoutSuccessContentProps) => {
  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you for your payment. Your order is being processed.
        </p>
      </div>

      {orderId && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-semibold text-blue-600">#{orderId}</p>
        </div>
      )}

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

      <div className="flex gap-3">
        <button
          onClick={onBackHome}
          className="flex-1 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Back Home
        </button>
        <button
          onClick={onViewInvoice}
          className="flex-1 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          View Invoice
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Redirecting to home in {countdown}s...
      </p>
    </div>
  );
};
