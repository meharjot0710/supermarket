"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Subset used in the home hero (taller stacks use the full list below). */
const HERO_BRAND_LOGO_FILES = [
  "GFresh Logo.jpg",
  "Bow Wow Logo.png",
  "CAPI_LOGO_RED.png",
  "Rosella Logo.png","Astonish Logo.PNG",
  "Baby Mum-Mum.png",
  "Care Organic.JPG",
  "CLR.png",
  "cropped-NEW-Blue-Banner-Logo-2.png",
  "Deli Grains.PNG",
  "Devondale Logo.png",
  "download (2).png",
  "Dr.Beckmann-o7ik6ev0lgs9o8yn912l1t3y4y8dqpn4pinh50enjg.png",
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
  "Sunraysia+Logo-01.png",
  "th.jpg",
  "the pink stuff.PNG",
  "Urbane Logo.jpg",
] as const;

const BRAND_LOGO_FILES = [
  // Requested lead sequence
  "GFresh Logo.jpg",
  "Bow Wow Logo.png",
  "CAPI_LOGO_RED.png",
  "Rosella Logo.png",
  "Buderim Logo.png",
  "2025_CocoCoast_Logo_RGB_Natural.png",
  // Then the rest
  "Astonish Logo.PNG",
  "Baby Mum-Mum.png",
  "Care Organic.JPG",
  "CLR.png",
  "cropped-NEW-Blue-Banner-Logo-2.png",
  "Deli Grains.PNG",
  "Devondale Logo.png",
  "download (2).png",
  "Dr.Beckmann-o7ik6ev0lgs9o8yn912l1t3y4y8dqpn4pinh50enjg.png",
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
      className="flex h-[5.75rem] w-full shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/95 px-5 py-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-black/5 sm:h-[6.5rem] sm:rounded-[1.35rem]"
    >
      <div className="relative h-16 w-full sm:h-20">
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

type HeroBrandCardsAutoScrollProps = {
  /** When true, only hero logos and a shorter viewport (default for home hero). */
  variant?: "hero" | "full";
};

export function HeroBrandCardsAutoScroll({
  variant = "hero",
}: HeroBrandCardsAutoScrollProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const sequence = sequenceRef.current;
    if (!track || !sequence) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const speedPxPerSecond = 90;
    let sequenceHeight = 1;
    let offset = 0;
    let rafId = 0;
    let lastTs = performance.now();

    const measure = () => {
      sequenceHeight = Math.max(sequence.offsetHeight, 1);
    };

    const tick = (ts: number) => {
      const deltaSeconds = (ts - lastTs) / 1000;
      lastTs = ts;
      offset += speedPxPerSecond * deltaSeconds;

      if (offset >= sequenceHeight) {
        offset -= sequenceHeight;
      }

      track.style.transform = `translate3d(0, -${offset}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const files =
    variant === "hero"
      ? HERO_BRAND_LOGO_FILES
      : (BRAND_LOGO_FILES as readonly string[]);

  const viewportHeightClass =
    variant === "hero"
      ? "h-[min(20rem,44vh)] sm:h-[min(24rem,50vh)] lg:h-[min(28rem,56vh)]"
      : "h-[min(32rem,72vh)] sm:h-[min(36rem,75vh)]";

  return (
    <div
      className="mx-auto w-full max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-[18.5rem]"
      aria-hidden
    >
      <div
        className={`relative overflow-x-visible overflow-y-hidden px-2 sm:px-3 ${viewportHeightClass}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[var(--mac-hero-blue)] to-transparent sm:h-14" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[var(--mac-hero-blue)] to-transparent sm:h-14" />

        <div className="flex h-full items-stretch justify-center pt-1 pb-2 sm:pt-2 sm:pb-3">
          <div
            ref={trackRef}
            className="flex w-full flex-col gap-3 will-change-transform sm:gap-4"
            style={{ transformOrigin: "50% 50%" }}
          >
            <div ref={sequenceRef} className="flex w-full flex-col gap-3 sm:gap-4">
              {files.map((filename, i) => (
                <BrandCard key={`${brandId(filename)}-a-${i}`} filename={filename} />
              ))}
            </div>
            <div className="flex w-full flex-col gap-3 sm:gap-4" aria-hidden>
              {files.map((filename, i) => (
                <BrandCard key={`${brandId(filename)}-b-${i}`} filename={filename} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
