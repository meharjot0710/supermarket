"use client";

import Image from "next/image";

const BRAND_LOGO_BY_NAME: Record<string, string> = {
  Rosella: "Rosella Logo.png",
  "Scrub Daddy": "cropped-NEW-Blue-Banner-Logo-2.png",
  Buderim: "Buderim Logo.png",
  "G-Fresh": "GFresh Logo.jpg",
  Capi: "CAPI_LOGO_RED.png",
  "Coco Coast": "2025_CocoCoast_Logo_RGB_Natural.png",
  "Bow Wow": "Bow Wow Logo.png",
  "Pink Stuff": "the pink stuff.PNG",
};

function logoSrc(filename: string) {
  return `/Brand Logos/${encodeURIComponent(filename)}`;
}

export function TrustedBrandLogoMarquee({ brands }: { brands: readonly string[] }) {
  const logos = brands
    .map((name) => {
      const file = BRAND_LOGO_BY_NAME[name];
      return file ? { name, file } : null;
    })
    .filter((x): x is { name: string; file: string } => x !== null);

  const loop = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="trusted-brand-marquee flex w-max gap-4 py-1">
        {loop.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-16 w-[190px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-2 shadow-sm"
          >
            <div className="relative h-14 w-full">
              <Image
                src={logoSrc(logo.file)}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="190px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
