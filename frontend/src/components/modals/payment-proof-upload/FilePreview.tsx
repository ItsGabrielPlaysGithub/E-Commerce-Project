interface FilePreviewProps {
  file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
  const isPdf = file.type === "application/pdf";

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          {isPdf ? (
            <span className="text-xs font-bold text-blue-600">PDF</span>
          ) : (
            <span className="text-xs font-bold text-blue-600">IMG</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-600">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
    </div>
  );
}
