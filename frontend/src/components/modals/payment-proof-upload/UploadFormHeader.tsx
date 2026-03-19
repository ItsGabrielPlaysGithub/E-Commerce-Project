interface UploadFormHeaderProps {
  orderId: string;
}

export function UploadFormHeader({ orderId }: UploadFormHeaderProps) {
  return (
    <>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Upload Proof of Payment</h2>
      <p className="text-sm text-gray-600 mb-6">
        Order: <span className="font-mono font-semibold">{orderId}</span>
      </p>
    </>
  );
}
