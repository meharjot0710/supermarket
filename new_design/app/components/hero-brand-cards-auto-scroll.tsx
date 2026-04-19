"use client";

import Image from "next/image";

const BRAND_LOGO_FILES = [
  "2025_CocoCoast_Logo_RGB_Natural.png",
  "Astonish Logo.PNG",
  "Baby Mum-Mum.png",
  "Bow Wow Logo.png",
  "Buderim Logo.png",
  "CAPI_LOGO_RED.png",
  "Care Organic.JPG",
  "CLR.png",
  "cropped-NEW-Blue-Banner-Logo-2.png",
  "Deli Grains.PNG",
  "Devondale Logo.png",
  "download (2).png",
  "Dr.Beckmann-o7ik6ev0lgs9o8yn912l1t3y4y8dqpn4pinh50enjg.png",
  "GFresh Logo.jpg",
  "Hercules Logo.PNG",
  "Homeforce Logo.PNG",
  "Hygiene Plus Logo.PNG",
  "KDM Logo.PNG",
  "Lakanto.PNG",
  "Lemon Lime.png",
  "Lemon&Lime Logo.PNG",
  "Logo.png",
  "logo-aim.png",
  "logo-huggie.png",
  "logo-small.jpg",
  "logo-sunlight.png",
  "logo-white-king.png",
  "MainLogo.png",
  "Moroccan.png",
  "O_Cedar.jpg",
  "Orama Logo.PNG",
  "PLATINUM LOGO.png",
  "Rosella Logo.png",
  "Sunraysia+Logo-01.png",
  "th.jpg",
  "the pink stuff.PNG",
  "Urbane Logo.jpg",
] as const;

function brandSrc(filename: string) {
  return `/Brand Logos/${encodeURIComponent(filename)}`;
}

function brandId(filename: string) {
  return filename.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

function BrandCard({ filename }: { filename: string }) {
  return (
    <div
      className="flex min-h-[5.75rem] w-full shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/95 px-5 py-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-black/5 sm:min-h-[6.5rem] sm:rounded-[1.35rem]"
    >
      <div className="relative h-14 w-full sm:h-16">
        <Image
          src={brandSrc(filename)}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 18.5rem"
        />
      </div>
    </div>
  );
}

export function HeroBrandCardsAutoScroll() {
  const items = [...BRAND_LOGO_FILES];
  const loop = [...items, ...items];

  return (
    <div
      className="mx-auto w-full max-w-[min(100%,20rem)] [perspective:1100px] lg:mx-0 lg:max-w-[18.5rem]"
      aria-hidden
    >
      <div className="relative h-[min(32rem,72vh)] overflow-hidden sm:h-[min(36rem,75vh)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[var(--mac-hero-blue)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[var(--mac-hero-blue)] to-transparent" />

        <div className="flex h-full items-stretch justify-center pt-2 pb-4">
          <div
            className="hero-deck-scroll-track flex w-full flex-col gap-4 [transform-style:preserve-3d] will-change-transform"
            style={{
              transformOrigin: "50% 50%",
            }}
          >
            {loop.map((filename, i) => (
              <BrandCard
                key={`${brandId(filename)}-${i}`}
                filename={filename}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
