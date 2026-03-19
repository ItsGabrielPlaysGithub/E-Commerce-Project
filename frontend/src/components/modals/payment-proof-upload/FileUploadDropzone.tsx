import { Upload } from "lucide-react";
import { ACCEPTED_EXTENSIONS } from "./types";

interface FileUploadDropzoneProps {
  selectedFile: File | null;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadDropzone({
  selectedFile,
  isUploading,
  fileInputRef,
  onFileChange,
}: FileUploadDropzoneProps) {
  return (
    <div className="mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        onChange={onFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {selectedFile ? null : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full flex flex-col items-center justify-center gap-2 py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={24} className="text-gray-400" />
          <p className="text-sm font-medium text-gray-700">Click to upload file</p>
          <p className="text-xs text-gray-500">or drag and drop</p>
        </button>
      )}
    </div>
  );
}
