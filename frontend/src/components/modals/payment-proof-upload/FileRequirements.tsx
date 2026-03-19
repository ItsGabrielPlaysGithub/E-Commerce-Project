export function FileRequirements() {
  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4">
      <p className="text-xs font-medium text-gray-700 mb-2">Accepted formats:</p>
      <ul className="text-xs text-gray-600 space-y-1">
        <li>• JPEG, PNG, WebP (images)</li>
        <li>• PDF (documents)</li>
        <li>• Maximum 4MB</li>
      </ul>
    </div>
  );
}
