import Link from "next/link";
import { BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { sapFeatures } from "../data/homeData";

export function SAPIntegration() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#bf262f" }}>
              Technology
            </span>
            <h2
              className="mt-2 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.125rem", fontWeight: 700 }}
            >
              Fully Integrated with SAP S/4HANA
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Our B2B platform is directly connected to our SAP ERP system, giving you real-time visibility into inventory, instant invoicing, and complete financial transparency for every order you place.
            </p>
            <ul className="mt-6 space-y-3">
              {sapFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckCircle size={16} style={{ color: "#bf262f", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/sap-portal"
              className="mt-8 inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
              style={{ backgroundColor: "#bf262f" }}
            >
              <BarChart3 size={16} />
              Access SAP Portal <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1a0608 0%, #5a1215 50%, #bf262f 100%)" }}
            >
              <div className="p-8">
                {/* Mock SAP portal preview */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-300 text-xs font-medium">SAP System Connected · OHW_PRD</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Total Invoices",   value: "₱1.25M", color: "#fca5a5" },
                    { label: "Open Orders",       value: "5",      color: "#fcd34d" },
                    { label: "Inventory Items",   value: "12",     color: "#86efac" },
                    { label: "Collection Rate",   value: "71.5%",  color: "#93c5fd" },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="text-xs text-gray-400">{label}</div>
                      <div
                        className="mt-1 font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Recent Invoice</span>
                    <span className="text-xs px-2 py-0.5 rounded-full text-orange-300 bg-orange-900/30">Open</span>
                  </div>
                  <div className="text-white font-medium text-sm">9000010245</div>
                  <div className="text-gray-400 text-xs mt-0.5">Nourish Restaurant Group · ₱241,668</div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20"
              style={{ backgroundColor: "#bf262f" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
