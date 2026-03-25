import { kpis } from "../constants/dashboardData";

export default function KpiCards() {
  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((k) => (
        <article key={k.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{k.value}</p>
              <p className="mt-1 text-xs text-slate-500">{k.sub}</p>
            </div>
            <div className="rounded-xl p-2" style={{ backgroundColor: k.bg }}>
              <k.icon className="h-5 w-5" style={{ color: k.color }} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <span className={k.up ? "text-emerald-600" : "text-amber-600"}>{k.up ? "▲" : "▼"}</span>
            <span className={k.up ? "text-emerald-700" : "text-amber-700"}>{k.trend}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
