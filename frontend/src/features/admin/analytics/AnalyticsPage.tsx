'use client';

export function AnalyticsPage() {
  return (
    <div className="space-y-6 px-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 font-bold text-2xl">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Business insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₱5.2M", trend: "+12% vs last month", up: true },
          { label: "Order Count", value: "328", trend: "+8% vs last month", up: true },
          { label: "Avg Order Value", value: "₱15,853", trend: "-2% vs last month", up: false },
          { label: "Conversion Rate", value: "3.2%", trend: "+0.4% vs last month", up: true },
        ].map(({ label, value, trend, up }) => (
          <div key={label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-400 font-medium mb-2">{label}</div>
            <div className="text-2xl font-bold text-gray-900 mb-3">{value}</div>
            <div
              className="text-xs flex items-center gap-1"
              style={{
                color: up ? "#16a34a" : "#dc2626",
              }}
            >
              <span>{up ? "↑" : "↓"}</span>
              <span>{trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center min-h-72"
          >
            <div className="text-center space-y-2">
              <div className="text-3xl">📊</div>
              <p className="text-sm text-gray-500">Chart {i}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div
        className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-96"
      >
        <div className="text-center space-y-3">
          <div className="text-5xl mb-4">📈</div>
          <h3 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h3>
          <p className="text-gray-500 max-w-sm">
            Advanced analytics, charts, and business insights coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
