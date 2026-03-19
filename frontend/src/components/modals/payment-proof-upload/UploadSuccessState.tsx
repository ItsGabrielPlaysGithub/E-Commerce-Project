import { CheckCircle } from "lucide-react";

interface UploadSuccessStateProps {
  orderId: string;
}

export function UploadSuccessState({ orderId }: UploadSuccessStateProps) {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-50">
          <CheckCircle size={28} style={{ color: "#22c55e" }} />
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">Upload Successful</h2>
      <p className="text-sm text-gray-600">
        Your payment proof has been submitted for Order {orderId}.
      </p>
    </div>
  );
}
