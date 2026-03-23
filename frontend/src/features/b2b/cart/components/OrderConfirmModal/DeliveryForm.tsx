import { MapPin, AlertCircle } from "lucide-react";
import { DeliveryDetails } from "../../types";

interface DeliveryFormProps {
  delivery: DeliveryDetails;
  errors: Partial<DeliveryDetails>;
  minDeliveryDate: string;
  redColor: string;
  onDeliveryChange: (field: keyof DeliveryDetails, value: string) => void;
}

export function DeliveryForm({
  delivery,
  errors,
  minDeliveryDate,
  redColor,
  onDeliveryChange,
}: DeliveryFormProps) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <MapPin size={12} className="inline mr-1" />
        Delivery Details
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">
          Delivery Address <span style={{ color: redColor }}>*</span>
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
            Contact Person <span style={{ color: redColor }}>*</span>
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
            Contact Number <span style={{ color: redColor }}>*</span>
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
          Preferred Delivery Date <span style={{ color: redColor }}>*</span>
        </label>
        <input
          type="date"
          value={delivery.deliveryDate}
          onChange={(e) => onDeliveryChange("deliveryDate", e.target.value)}
          min={minDeliveryDate}
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
  );
}
