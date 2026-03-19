interface UploadActionsProps {
  isUploading: boolean;
  hasFile: boolean;
  onCancel: () => void;
  onUpload: () => void;
}

export function UploadActions({
  isUploading,
  hasFile,
  onCancel,
  onUpload,
}: UploadActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        disabled={isUploading}
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        onClick={onUpload}
        disabled={!hasFile || isUploading}
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
  );
}
