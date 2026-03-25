import type { Dispatch, SetStateAction } from "react";

import { quickReorder } from "../constants/dashboardData";

interface QuickReorderCardProps {
  reorderQtys: Record<string, number>;
  setReorderQtys: Dispatch<SetStateAction<Record<string, number>>>;
}

export default function QuickReorderCard({ reorderQtys, setReorderQtys }: QuickReorderCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col min-h-80 sm:min-h-96">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Quick Reorder</h2>
        <button className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
          Create Draft Order
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto flex-1">
        {quickReorder.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">
                {item.sku} · Last {item.lastQty} · Stock {item.stock}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-red-500 focus:outline-none"
                value={reorderQtys[item.id] ?? item.lastQty}
                onChange={(e) =>
                  setReorderQtys((prev) => ({
                    ...prev,
                    [item.id]: Math.max(1, Number(e.target.value) || 1),
                  }))
                }
              />
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
