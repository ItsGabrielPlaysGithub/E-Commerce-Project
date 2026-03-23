import { Send, ChevronDown } from "lucide-react";
import { RED, RED_LIGHT, ORDER_TYPES, type InquiryFormState } from "./constants";

interface InquiryFormProps {
  form: InquiryFormState;
  loading: boolean;
  onFieldChange: (field: keyof InquiryFormState, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function InquiryForm({ form, loading, onFieldChange, onSubmit }: InquiryFormProps) {
  const set = (field: keyof InquiryFormState, value: string | boolean) =>
    onFieldChange(field, value);

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <h2 className="text-gray-900 font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
        Send an Inquiry
      </h2>
      <p className="text-gray-400 text-sm mb-6">We'll get back to you within 24 hours.</p>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Names */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">First Name *</label>
            <input
              type="text" required placeholder="Juan"
              value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Last Name *</label>
            <input
              type="text" required placeholder="Dela Cruz"
              value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Email *</label>
            <input
              type="email" required placeholder="you@company.com"
              value={form.email} onChange={(e) => set("email", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Phone</label>
            <input
              type="tel" placeholder="+63 9XX XXX XXXX"
              value={form.phone} onChange={(e) => set("phone", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Company / Business</label>
          <input
            type="text" placeholder="Your company name"
            value={form.company} onChange={(e) => set("company", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
          />
        </div>

        {/* Order Type Selection */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Inquiry Type *</label>
          <div className="grid grid-cols-4 gap-2">
            {ORDER_TYPES.map((opt) => (
              <label
                key={opt.value}
                className="flex flex-col items-center py-3 rounded-xl border cursor-pointer transition-all text-center"
                style={form.orderType === opt.value
                  ? { backgroundColor: RED_LIGHT, borderColor: RED }
                  : { borderColor: "#e5e7eb" }}
              >
                <input type="radio" name="orderType" value={opt.value}
                  checked={form.orderType === opt.value}
                  onChange={(e) => set("orderType", e.target.value as any)}
                  className="sr-only"
                />
                <span className="text-xs font-semibold" style={{ color: form.orderType === opt.value ? RED : "#374151" }}>{opt.label}</span>
                <span className="text-gray-400 text-xs mt-0.5">{opt.sub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Products and Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Products of Interest</label>
            <input
              type="text" placeholder="e.g. Tumblers, Casseroles"
              value={form.products} onChange={(e) => set("products", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Estimated Quantity</label>
            <div className="relative">
              <select
                value={form.quantity} onChange={(e) => set("quantity", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50 appearance-none cursor-pointer"
              >
                <option value="">Select range</option>
                <option>1 – 11 units</option>
                <option>12 – 49 units</option>
                <option>50 – 99 units</option>
                <option>100 – 499 units</option>
                <option>500+ units</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Message</label>
          <textarea
            rows={3} placeholder="Delivery requirements, special requests, or other details..."
            value={form.message} onChange={(e) => set("message", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 bg-gray-50/50 resize-none"
          />
        </div>

        {/* Agreement */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox" required
            checked={form.agreed} onChange={(e) => set("agreed", e.target.checked)}
            className="mt-0.5 accent-red-600"
          />
          <span className="text-xs text-gray-400">
            I agree to Omega's <a href="#" style={{ color: RED }}>Privacy Policy</a> and consent to being contacted.
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit" disabled={loading}
          className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ backgroundColor: RED }}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Send size={15} /> Submit Inquiry</>
          )}
        </button>
      </form>
    </div>
  );
}
