import { features } from "../../data/homeData";

export function FeatureStrip() {
  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 flex-wrap min-w-0"
            style={{ wordBreak: "break-word" }}
          >
            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: "#f9e9ea" }}>
              <Icon size={20} style={{ color: "#bf262f" }} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-800 text-sm wrap-break-words">{title}</div>
              <div className="text-gray-500 text-xs mt-0.5 wrap-break-words">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
