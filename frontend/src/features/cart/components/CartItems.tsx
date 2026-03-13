"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, AlertTriangle, Info } from "lucide-react";
import { CartItem, Company } from "../types";
import { CART_COLORS, CART_CONFIG } from "../constants/cartConstants";
import { Warning } from "./Warning";

interface CartItemsProps {
  items: CartItem[];
  company: Company;
  moqWarnings: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartItems({
  items,
  company,
  moqWarnings,
  onUpdateQty,
  onRemoveItem,
}: CartItemsProps) {
  const { RED } = CART_COLORS;
  const { MOQ_WARNING_COLOR, MOQ_WARNING_BG } = CART_CONFIG;
  const hasWarnings = moqWarnings.length > 0;

  return (
    <div className="lg:col-span-2 space-y-3">
      {/* Warnings */}
      {hasWarnings && (
        <Warning icon={AlertTriangle} color="#92400e" bg="#fffbeb">
          <strong>{moqWarnings.length} item{moqWarnings.length > 1 ? "s" : ""} below your MOQ</strong> — these will be charged at retail price unless quantity is adjusted. See details below.
        </Warning>
      )}

      {/* Items list */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-50">
          <div className="col-span-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</div>
          <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center hidden sm:block">Price</div>
          <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Qty</div>
          <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Total</div>
        </div>

        {items.map((item) => {
          const isBelowMoq = moqWarnings.some((w) => w.product.id === item.product.id);
          const moqRequired =
            company.accountType === "wholesale" ? item.product.minWholesale : item.product.minBulk;

          return (
            <div
              key={item.product.id}
              className="border-b border-gray-50 last:border-0"
              style={{ backgroundColor: isBelowMoq ? "#fffbeb" : "white" }}
            >
              <div className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
                {/* Product info */}
                <div className="col-span-6 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                  />
                  <div className="min-w-0">
                    <div className="text-gray-400 text-xs mb-0.5">{item.product.category}</div>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="text-gray-800 text-xs font-medium leading-snug hover:text-red-600 transition-colors line-clamp-2 block"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedColor && (
                      <div className="text-gray-400 text-xs mt-0.5">Color: {item.selectedColor}</div>
                    )}
                    {item.selectedSize && (
                      <div className="text-gray-400 text-xs mt-0.5">Size: {item.selectedSize}</div>
                    )}
                    {/* MOQ warning inline */}
                    {isBelowMoq && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertTriangle size={10} className="text-amber-500 flex-shrink-0" />
                        <span className="text-amber-600 text-xs">
                          Min. {moqRequired} units for {company.accountType} pricing
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Unit price */}
                <div className="col-span-2 text-center hidden sm:block">
                  <div className="text-gray-900 text-sm font-medium">₱{item.unitPrice.toLocaleString()}</div>
                  {item.unitPrice < item.product.retailPrice && (
                    <div className="text-gray-300 text-xs line-through">₱{item.product.retailPrice.toLocaleString()}</div>
                  )}
                </div>

                {/* Qty stepper */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-800 border-x border-gray-200">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <span className="text-gray-900 font-bold text-sm">
                    ₱{(item.qty * item.unitPrice).toLocaleString()}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOQ Fix suggestions */}
      {moqWarnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">Adjust to unlock your pricing tier</span>
          </div>
          {moqWarnings.map((w) => {
            const moqRequired =
              company.accountType === "wholesale" ? w.product.minWholesale : w.product.minBulk;
            return (
              <div key={w.product.id} className="flex items-center justify-between py-2 border-t border-amber-100 first:border-t-0">
                <span className="text-amber-700 text-xs">{w.product.name.slice(0, 40)}...</span>
                <button
                  onClick={() => onUpdateQty(w.product.id, moqRequired)}
                  className="text-xs font-semibold text-white px-3 py-1 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: MOQ_WARNING_COLOR }}
                >
                  Set to {moqRequired}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
