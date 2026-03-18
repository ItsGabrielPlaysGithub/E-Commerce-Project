import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import {
  ChevronDown,
  Users,
  Package,
  FileText,
  UserCircle,
  KeyRound,
  LogOut,
} from "lucide-react";
import { CompanyProfile } from "@/features/auth/hooks/useAuth";
import { GET_ME, ReadProfileData } from "@/features/auth/services/query";

interface ProfileDropdownProps {
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  company: CompanyProfile | null;
  sessionUserId: number;
  sessionEmail: string;
  onLogout: () => void;
  RED: string;
}

export function ProfileDropdown({
  profileOpen,
  setProfileOpen,
  company,
  sessionUserId,
  sessionEmail,
  onLogout,
  RED,
}: ProfileDropdownProps) {
  const companyUserId = company?.userId && company.userId > 0 ? company.userId : undefined;
  const effectiveUserId = companyUserId ?? sessionUserId;

  const { data } = useQuery<ReadProfileData>(GET_ME, {
    variables: {
      userId: effectiveUserId,
    },
    skip: !effectiveUserId,
  });
  
  const profile = data?.readProfile;

  // Priority: Query data > Company prop > Defaults
  const displayName =
    profile?.fullName?.split(" ")[0] ??
    company?.fullName?.split(" ")[0] ??
    sessionEmail.split("@")[0] ??
    "User";
  const displayEmail = profile?.emailAddress ?? company?.emailAddress ?? sessionEmail;
  const displayInitial = profile?.fullName?.charAt(0) ?? company?.fullName?.charAt(0) ?? "U";
  
  return (
    <div className="relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: RED }}
        >
          {displayInitial}
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-medium text-gray-800">
            {displayName}
          </span>
          <span className="text-xs text-gray-400 truncate max-w-30">
            {displayEmail}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
        />
      </button>
      {profileOpen && (
        <div className="absolute top-full right-0 pt-1 z-50 w-56">
          <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1">
            <Link
              href="/b2b/sales-agents"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Users size={15} className="text-gray-400" /> My Sales Agents
            </Link>
            <Link
              href="/b2b/my-orders"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Package size={15} className="text-gray-400" /> My Orders
            </Link>
            <Link
              href="/b2b/invoices"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileText size={15} className="text-gray-400" /> My Invoices
            </Link>
            <Link
              href="/b2b/profile"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserCircle size={15} className="text-gray-400" /> Update Profile
            </Link>
            <Link
              href="/b2b/change-password"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <KeyRound size={15} className="text-gray-400" /> Change Password
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} className="text-red-400" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
