import { Phone, Mail, MapPin } from "lucide-react";
import { RED, RED_LIGHT, BUSINESS_HOURS } from "./constants";

const ICONS: Record<string, React.ReactNode> = {
  Phone: <Phone size={14} />,
  Mail: <Mail size={14} />,
  MapPin: <MapPin size={14} />,
};

const CONTACT_INFO = [
  { Icon: "Phone", label: "Phone", value: "+63 2 8XXX-XXXX" },
  { Icon: "Mail", label: "Email", value: "inquiry@omegahouseware.com.ph" },
  { Icon: "MapPin", label: "Address", value: "123 Industrial Ave., Quezon City, Metro Manila" },
];

export function InquirySidebar() {
  return (
    <div className="space-y-4">
      {CONTACT_INFO.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: RED_LIGHT }}>
            <span style={{ color: RED }}>{ICONS[Icon]}</span>
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
            <div className="text-gray-800 text-sm font-medium mt-0.5">{value}</div>
          </div>
        </div>
      ))}

      <div className="p-4 bg-white rounded-xl border border-gray-100">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2.5">Business Hours</div>
        <div className="space-y-1.5 text-sm">
          {BUSINESS_HOURS.map(({ day, time, closed }) => (
            <div key={day} className="flex justify-between">
              <span className={closed ? "text-gray-400" : "text-gray-500"}>{day}</span>
              <span className={`font-medium ${closed ? "text-gray-400" : "text-gray-800"}`}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
