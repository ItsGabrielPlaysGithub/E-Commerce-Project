import Link from "next/link";
import { ChevronDown, LayoutDashboard } from "lucide-react";

interface NavItem {
  label: string;
  path?: string;
  children?: {
    label: string;
    path: string;
    sub?: string;
  }[];
}

interface NavLinksProps {
  items: NavItem[];
  isLoggedIn: boolean;
  isActive: (path: string) => boolean;
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
  RED: string;
}

export function NavLinks({
  items,
  isLoggedIn,
  isActive,
  openDropdown,
  setOpenDropdown,
  RED,
}: NavLinksProps) {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {isLoggedIn && (
        <Link
          href="/b2b/home"
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors font-medium"
          style={{
            color: isActive("/b2b/home") ? RED : "#374151",
            backgroundColor: isActive("/b2b/home") ? "#f9e9ea" : "transparent",
          }}
        >
          <LayoutDashboard size={14} /> Home
        </Link>
      )}
      {items.map((item) =>
        item.children ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors font-medium"
              style={{ color: openDropdown === item.label ? RED : "#374151" }}
            >
              {item.label}
              <ChevronDown
                size={13}
                className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === item.label && (
              <div className="absolute top-full left-0 pt-1 z-50 w-48">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{child.label}</span>
                      {child.sub && <span className="text-xs text-gray-400">{child.sub}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.path}
            href={item.path!}
            className="px-4 py-2 text-sm rounded-lg transition-colors font-medium"
            style={{
              color: isActive(item.path!) ? RED : "#374151",
              backgroundColor: isActive(item.path!) ? "#f9e9ea" : "transparent",
            }}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
