import { AlertCircle } from "lucide-react";

interface UploadErrorMessageProps {
  error: string;
}

export function UploadErrorMessage({ error }: UploadErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
      <AlertCircle size={16} />
      <span>{error}</span>
    </div>
  );
}
