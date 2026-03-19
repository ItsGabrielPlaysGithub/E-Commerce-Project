"use client";

import { X, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";

interface PaymentProofUploadModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export function PaymentProofUploadModal({
  isOpen,
  orderId,
  onClose,
  onSubmit,
}: PaymentProofUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.");
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 4MB limit. Please choose a smaller file.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onSubmit(selectedFile);
      setUploadSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setError("");
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-6">
          {uploadSuccess ? (
            // Success state
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
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Upload Proof of Payment
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Order: <span className="font-mono font-semibold">{orderId}</span>
              </p>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* File input area */}
              <div className="mb-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_EXTENSIONS.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />

                {selectedFile ? (
                  // Selected file preview
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        {selectedFile.type === "application/pdf" ? (
                          <span className="text-xs font-bold text-blue-600">PDF</span>
                        ) : (
                          <span className="text-xs font-bold text-blue-600">IMG</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Upload placeholder
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex flex-col items-center justify-center gap-2 py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload file
                    </p>
                    <p className="text-xs text-gray-500">
                      or drag and drop
                    </p>
                  </button>
                )}
              </div>

              {/* File requirements */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Accepted formats:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• JPEG, PNG, WebP (images)</li>
                  <li>• PDF (documents)</li>
                  <li>• Maximum 4MB</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={isUploading}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#bf262f" }}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
