"use client";

import { X, AlertTriangle, MapPin, AlertCircle, Package } from "lucide-react";
import { CartItem, Company, DeliveryDetails } from "../types";
import { CART_COLORS, CART_CONFIG } from "../constants/cartConstants";
import { Warning } from "./Warning";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  company: Company;
  subtotal: number;
  itemCount: number;
  moqWarnings: CartItem[];
  delivery: DeliveryDetails;
  errors: Partial<DeliveryDetails>;
  confirmed: boolean;
  placing: boolean;
  onDeliveryChange: (field: keyof DeliveryDetails, value: string) => void;
  onConfirmedChange: (value: boolean) => void;
  onPlaceOrder: () => void;
}

export function OrderConfirmModal({
  isOpen,
  onClose,
  items,
  company,
  subtotal,
  itemCount,
  moqWarnings,
  delivery,
  errors,
  confirmed,
  placing,
  onDeliveryChange,
  onConfirmedChange,
  onPlaceOrder,
}: OrderConfirmModalProps) {
  const { RED, RED_LIGHT } = CART_COLORS;
  const { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, MOQ_WARNING_COLOR, MOQ_WARNING_BG } = CART_CONFIG;

  if (!isOpen) return null;

  const hasWarnings = moqWarnings.length > 0;
  const fullRetailTotal = items.reduce((s, i) => s + i.qty * i.product.retailPrice, 0);
  const savings = fullRetailTotal - subtotal;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2
              className="text-gray-900 font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}
            >
              Review & Confirm Order
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">Verify all details before placing your order.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Warnings block */}
          {hasWarnings && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Order Warnings
                </span>
              </div>
              {moqWarnings.map((w) => {
                const moqRequired =
                  company.accountType === "wholesale"
                    ? w.product.minWholesale
                    : w.product.minBulk;
                return (
                  <Warning
                    key={w.product.id}
                    icon={AlertTriangle}
                    color={MOQ_WARNING_COLOR}
                    bg={MOQ_WARNING_BG}
                  >
                    <strong>{w.product.name.split("—")[0].trim()}</strong> — You have {w.qty} units,
                    but {company.accountType} pricing requires <strong>{moqRequired} minimum</strong>.
                    Retail price will apply for this item.
                  </Warning>
                );
              })}
            </div>
          )}

          {/* Order items summary */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              <Package size={12} className="inline mr-1" />
              Order Items ({itemCount} pcs)
            </div>
            <div className="bg-gray-50 rounded-xl divide-y divide-gray-100 overflow-hidden">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                    <span className="text-gray-700 line-clamp-1 font-medium">
                      {item.product.name.split("—")[0].trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <span className="text-gray-400">×{item.qty}</span>
                    <span className="text-gray-900 font-semibold">
                      ₱{(item.qty * item.unitPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₱{subtotal.toLocaleString()}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Tier discount</span>
                <span>-₱{savings.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "FREE" : `₱${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span style={{ color: RED }}>₱{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery details form */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <MapPin size={12} className="inline mr-1" />
              Delivery Details
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Delivery Address <span style={{ color: RED }}>*</span>
              </label>
              <input
                type="text"
                value={delivery.address}
                onChange={(e) => onDeliveryChange("address", e.target.value)}
                placeholder="Full delivery address"
                className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors"
                style={{ borderColor: errors.address ? "#ef4444" : "#e5e7eb" }}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Contact Person <span style={{ color: RED }}>*</span>
                </label>
                <input
                  type="text"
                  value={delivery.contactPerson}
                  onChange={(e) => onDeliveryChange("contactPerson", e.target.value)}
                  placeholder="Name"
                  className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none"
                  style={{ borderColor: errors.contactPerson ? "#ef4444" : "#e5e7eb" }}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Contact Number <span style={{ color: RED }}>*</span>
                </label>
                <input
                  type="tel"
                  value={delivery.contactNumber}
                  onChange={(e) => onDeliveryChange("contactNumber", e.target.value)}
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none"
                  style={{ borderColor: errors.contactNumber ? "#ef4444" : "#e5e7eb" }}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Preferred Delivery Date <span style={{ color: RED }}>*</span>
              </label>
              <input
                type="date"
                value={delivery.deliveryDate}
                onChange={(e) => onDeliveryChange("deliveryDate", e.target.value)}
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none"
                style={{ borderColor: errors.deliveryDate ? "#ef4444" : "#e5e7eb" }}
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Order Notes <span className="text-gray-300">(optional)</span>
              </label>
              <textarea
                value={delivery.notes}
                onChange={(e) => onDeliveryChange("notes", e.target.value)}
                placeholder="Special instructions, landmark, etc."
                rows={2}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Confirm checkbox */}
          <label
            className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
            style={{
              borderColor: confirmed ? RED : "#e5e7eb",
              backgroundColor: confirmed ? RED_LIGHT : "#fafafa",
            }}
          >
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => onConfirmedChange(e.target.checked)}
              className="mt-0.5 accent-red-600"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I confirm this order is correct. I understand the pricing tier, MOQ requirements,
              and delivery terms for <strong>{company.name}</strong>.
            </span>
          </label>
        </div>

        {/* Modal footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onPlaceOrder}
            disabled={placing}
            className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: RED }}
          >
            {placing ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Confirm Order</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
