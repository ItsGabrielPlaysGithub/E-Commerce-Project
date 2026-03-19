"use client";

import { X } from "lucide-react";
import { useState, useRef } from "react";
import { ACCEPTED_TYPES, MAX_FILE_SIZE, PaymentProofUploadModalProps } from "./types";
import { UploadSuccessState } from "./UploadSuccessState";
import { UploadFormHeader } from "./UploadFormHeader";
import { UploadErrorMessage } from "./UploadErrorMessage";
import { FileUploadDropzone } from "./FileUploadDropzone";
import { FilePreview } from "./FilePreview";
import { FileRequirements } from "./FileRequirements";
import { UploadActions } from "./UploadActions";

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
            <UploadSuccessState orderId={orderId} />
          ) : (
            <>
              <UploadFormHeader orderId={orderId} />
              <UploadErrorMessage error={error} />
              <FileUploadDropzone
                selectedFile={selectedFile}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
              />
              {selectedFile && <FilePreview file={selectedFile} />}
              <FileRequirements />
              <UploadActions
                isUploading={isUploading}
                hasFile={!!selectedFile}
                onCancel={handleClose}
                onUpload={handleUpload}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
