import Image from "next/image";
import Link from "next/link";

type MacLogoProps = {
  variant?: "light" | "brand";
  className?: string;
};

export function MacLogo({ variant = "brand", className = "" }: MacLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 ${className} ${
        variant === "light" ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" : ""
      }`}
      aria-label="SuperMarketing home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={220}
        height={56}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
