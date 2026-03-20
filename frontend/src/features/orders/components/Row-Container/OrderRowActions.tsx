"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { OrderRowMenu } from "./OrderRowMenu";

interface OrderRowActionsProps {
  order: any;
  isExpanded: boolean;
  onExpand: (orderId: string | null) => void;
  onCancelOrder: () => void;
  onUploadPayment: () => void;
}

export function OrderRowActions({
  order,
  isExpanded,
  onExpand,
  onCancelOrder,
  onUploadPayment,
}: OrderRowActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="text-right">
        <div className="font-bold text-gray-800 text-sm">
          ₱{order.total.toLocaleString()}
        </div>
        <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>
          incl. delivery
        </div>
      </div>

      {/* 3-Dot Menu */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          title="More actions"
        >
          <MoreVertical size={16} />
        </button>

        <OrderRowMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onCancelOrder={() => {
            onCancelOrder();
            setIsMenuOpen(false);
          }}
          onUploadPayment={() => {
            onUploadPayment();
            setIsMenuOpen(false);
          }}
          onViewDetails={() => {
            onExpand(isExpanded ? null : order.id);
            setIsMenuOpen(false);
          }}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
}
