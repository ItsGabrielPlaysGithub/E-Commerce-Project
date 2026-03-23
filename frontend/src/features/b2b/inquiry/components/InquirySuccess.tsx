import { CheckCircle2 } from "lucide-react";
import { RED, RED_LIGHT, type InquiryFormState } from "./constants";

interface InquirySuccessProps {
  form: InquiryFormState;
  onReset: () => void;
}

export function InquirySuccess({ form, onReset }: InquirySuccessProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-sm w-full text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: RED_LIGHT }}
        >
          <CheckCircle2 size={28} style={{ color: RED }} />
        </div>
        <h2 className="text-gray-900 font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
          Inquiry Received
        </h2>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          Thanks, <strong className="text-gray-700">{form.firstName}</strong>. Our team will respond within <strong className="text-gray-700">24 business hours</strong>.
        </p>
        <div className="text-left rounded-xl p-4 text-sm mb-6" style={{ backgroundColor: RED_LIGHT }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: RED }}>Summary</div>
          <div className="text-gray-600">Type: <span className="font-medium capitalize">{form.orderType}</span></div>
          {form.company && <div className="text-gray-600">Company: <span className="font-medium">{form.company}</span></div>}
          <div className="text-gray-600">Email: <span className="font-medium">{form.email}</span></div>
        </div>
        <button
          onClick={onReset}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: RED }}
        >
          Submit Another
        </button>
      </div>
    </div>
  );
}
