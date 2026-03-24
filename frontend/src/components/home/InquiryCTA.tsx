import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InquiryCTA() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f5f3ed" }}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
          Get in Touch
        </span>
        <h2
          className="mt-2 text-gray-900"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
        >
          Ready to Start Your B2B Journey?
        </h2>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Tell us about your business needs and one of our sales representatives will prepare a personalized quotation for you.
        </p>
        <div className="mt-9 flex gap-4 justify-center flex-wrap">
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 text-white px-9 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
            style={{ backgroundColor: "#bf262f" }}
          >
            Make an Inquiry <ArrowRight size={17} />
          </Link>
          {/* <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 border-2 border-gray-800 text-gray-800 px-9 py-3.5 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-colors"
          >
            Wholesale Terms
          </Link> */}
        </div>
      </div>
    </section>
  );
}
