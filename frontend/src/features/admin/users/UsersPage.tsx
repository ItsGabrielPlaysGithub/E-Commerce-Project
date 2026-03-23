'use client';

import { Plus, Search } from "lucide-react";

export function UsersPage() {
  return (
    <div className="space-y-6 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 font-bold text-2xl">Users & Accounts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage user accounts and permissions</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "#bf262f" }}
        >
          <Plus size={14} />
          New User
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all"
        />
      </div>

      {/* Placeholder Content */}
      <div
        className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center min-h-96"
      >
        <div className="text-center space-y-3">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <p className="text-gray-500 max-w-sm">
            User account management, roles, and permissions coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
