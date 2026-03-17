import Link from "next/link";
import Image from "next/image";
import omegaLogo from "@/assets/omega_logo_456x150_1_456x150.avif";

interface LogoProps {
  href: string;
  RED: string;
}

export function Logo({ href, RED }: LogoProps) {
  return (
    <Link href={href} className="flex-shrink-0 select-none">
      <Image 
        src={omegaLogo}
        alt="Omega Logo"
        width={120}
        height={40}
        className="h-auto w-auto"
        loading="eager"
      />
    </Link>
  );
}
