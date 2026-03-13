import { stats } from "../../../data/homeData";

export function StatsSection() {
  return (
    <section className="py-14 px-4" style={{ backgroundColor: "#bf262f" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <div
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {value}
            </div>
            <div className="text-red-200 text-sm mt-1.5">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
