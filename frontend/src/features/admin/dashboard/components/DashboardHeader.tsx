interface DashboardHeaderProps {
  today: string;
}

export default function DashboardHeader({ today }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">B2B Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500">{today} · Omega Houseware Distribution Portal</p>
      </div>
    </header>
  );
}
