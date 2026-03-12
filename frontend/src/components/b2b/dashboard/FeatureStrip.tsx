import { features } from "../../../data/homeData";

export function FeatureStrip() {
  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: "#f9e9ea" }}>
              <Icon size={20} style={{ color: "#bf262f" }} />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{title}</div>
              <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
