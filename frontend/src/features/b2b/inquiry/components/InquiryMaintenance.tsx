import { Wrench } from "lucide-react";

export function InquiryMaintenance() {
  return (
    <section className="min-h-[60vh] w-full flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Wrench size={20} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Inquiry Is Under Maintenance</h1>
        <p className="mt-3 text-sm text-gray-600">
          We are currently improving this feature. Please check back shortly.
        </p>
      </div>
    </section>
  );
}