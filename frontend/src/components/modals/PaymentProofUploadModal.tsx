"use client";

import { useState } from "react";
import { X, Upload as UploadIcon, Check } from "lucide-react";

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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, WebP, or PDF.');
      return;
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      setError('File size exceeds 4MB limit.');
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
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
      setError('Please select a file.');
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
          : 'Failed to upload payment proof. Please try again.'
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
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                <Check size={28} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Upload Successful!
            </h2>
            <p className="text-gray-600 text-sm">
              Your payment proof has been submitted for verification.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Upload Payment Proof
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Order #{orderId}
            </p>

            {/* File input area */}
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
              />
              <div className="flex justify-center mb-2">
                <UploadIcon size={28} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Click to select or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, WebP, or PDF (Max 4MB)
              </p>
            </label>

            {/* File preview */}
            {selectedFile && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Selected: {selectedFile.name}
                </p>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                  />
                )}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={resetAndClose}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !selectedFile}
                className="flex-1 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
