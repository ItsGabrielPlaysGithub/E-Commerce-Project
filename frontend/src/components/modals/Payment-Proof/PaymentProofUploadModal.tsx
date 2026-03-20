"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { UploadForm } from "./UploadForm";
import { SuccessMessage } from "./SuccessMessage";

interface PaymentProofUploadModalProps {
  isOpen: boolean;
  orderId: string | number;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
}

export function PaymentProofUploadModal({
  isOpen,
  orderId,
  onClose,
  onSubmit,
}: PaymentProofUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload JPEG, PNG, WebP, or PDF.");
      return;
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      setError("File size exceeds 4MB limit.");
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(selectedFile);
      setSuccess(true);

      // Close modal after 2 seconds of success
      setTimeout(() => {
        resetAndClose();
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload payment proof. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={resetAndClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors z-10"
          disabled={isLoading}
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        {success ? (
          <SuccessMessage />
        ) : (
          <UploadForm
            orderId={orderId}
            selectedFile={selectedFile}
            preview={preview}
            error={error}
            isLoading={isLoading}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={resetAndClose}
          />
        )}
      </div>
    </div>
  );
}
