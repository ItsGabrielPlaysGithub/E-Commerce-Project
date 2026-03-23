"use client";

interface InvoicesFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const InvoicesFilter = ({ searchTerm, onSearchChange }: InvoicesFilterProps) => {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search by document number or customer..."
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
