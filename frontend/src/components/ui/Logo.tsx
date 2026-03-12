import Link from "next/link";

interface LogoProps {
  href: string;
  RED: string;
}

export function Logo({ href, RED }: LogoProps) {
  return (
    <Link href={href} className="flex-shrink-0 select-none">
      <span
        className="text-2xl tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#1a1a1a" }}
      >
        omega<span style={{ color: RED }}>.</span>
      </span>
      <span className="hidden sm:inline text-xs text-gray-300 ml-2 uppercase tracking-widest">
        B2B Portal
      </span>
    </Link>
  );
}
