import { invoiceSummary, sapModules } from "../constants/dashboardData";

export default function DashboardSummaryCards() {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">SAP Integration Status</h2>
        <div className="space-y-2">
          {sapModules.map((m) => (
            <div key={m.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span className="text-sm text-slate-700">{m.label}</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: m.color }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Invoice Aging Snapshot</h2>
        <div className="space-y-3">
          {invoiceSummary.map((i) => (
            <div key={i.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-600">{i.label}</span>
                <span className="font-semibold text-slate-900">{i.amount}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${i.pct}%`, backgroundColor: i.color }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
