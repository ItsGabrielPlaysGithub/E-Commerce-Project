"use client";

import { useRef, useEffect } from "react";
import { Upload } from "lucide-react";

interface OrderRowMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelOrder: () => void;
  onUploadPayment: () => void;
  onViewDetails: () => void;
  isExpanded: boolean;
}

export function OrderRowMenu({
  isOpen,
  onClose,
  onCancelOrder,
  onUploadPayment,
  onViewDetails,
  isExpanded,
}: OrderRowMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" ref={menuRef}>
      <div className="py-1">
        <button
          onClick={onCancelOrder}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel Order
        </button>

        <button
          onClick={onUploadPayment}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
           Upload Payment Proof
        </button>

        <button
          onClick={onViewDetails}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isExpanded ? "Close Details" : "View Details"}
        </button>
      </div>
    </div>
  );
}
