'use client';

import { Save, RotateCcw } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6 px-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 font-bold text-2xl">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure system preferences and integrations</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { 
            title: "General Settings", 
            icon: "⚙️",
            description: "Company info, regional settings, and localization",
          },
          { 
            title: "Integrations", 
            icon: "🔗",
            description: "Connect third-party services and APIs",
          },
          { 
            title: "Security", 
            icon: "🔒",
            description: "Manage authentication, 2FA, and access control",
          },
          { 
            title: "Email & Notifications", 
            icon: "📧",
            description: "Configure email templates and notification rules",
          },
          { 
            title: "Payment Methods", 
            icon: "💳",
            description: "Manage payment gateways and billing configuration",
          },
          { 
            title: "System Backup", 
            icon: "💾",
            description: "Data backup, recovery, and archival settings",
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{section.icon}</div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">{section.title}</h3>
            <p className="text-xs text-gray-400">{section.description}</p>
          </div>
        ))}
      </div>

      {/* General Settings Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>

          {/* Form Fields */}
          <div className="space-y-5">
            {[
              { label: "Company Name", value: "Omega Houseware Ltd." },
              { label: "Company Email", value: "admin@omegahouseware.com" },
              { label: "Support Phone", value: "+63 2 8888-8888" },
              { label: "Website URL", value: "https://omegahouseware.com" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">{label}</label>
                <input
                  type="text"
                  defaultValue={value}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
                  disabled
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#bf262f" }}
          >
            <Save size={14} />
            Save Changes
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div
        className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center min-h-96"
      >
        <div className="text-center space-y-3">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold text-gray-800">More Settings Coming Soon</h3>
          <p className="text-gray-500 max-w-sm">
            Additional configuration options and advanced settings will be available in upcoming releases.
          </p>
        </div>
      </div>
    </div>
  );
}
