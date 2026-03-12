import { RED } from "./constants";

export function InquiryHeader() {
  return (
    <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(135deg, #1a0608 0%, #bf262f 100%)" }}>
      <div className="max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-white/40 block mb-3">Inquiry</span>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Let's talk business.
        </h1>
        <p className="text-white/50 mt-3 text-sm max-w-sm">
          Tell us your requirements and we'll send a personalized quotation within 24 hours.
        </p>
      </div>
    </section>
  );
}
