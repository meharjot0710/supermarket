import Image from "next/image";
import Link from "next/link";

const logoSizeClasses = {
  default: "h-10 w-auto sm:h-12",
  hero: "h-10 w-auto sm:h-11 md:h-14",
} as const;

type MacLogoProps = {
  variant?: "light" | "brand";
  className?: string; 
  /** Larger treatment for the home hero; header keeps default. */
  size?: keyof typeof logoSizeClasses;
};

export function MacLogo({
  variant = "brand",
  className = "",
  size = "default",
}: MacLogoProps) {
  const intrinsic =
    size === "hero" ? { width: 308, height: 78 } : { width: 220, height: 56 };

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
        width={intrinsic.width}
        height={intrinsic.height}
        className={logoSizeClasses[size]}
        priority
      />
    </Link>
  );
}
