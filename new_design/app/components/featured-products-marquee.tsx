"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type FeaturedItem = {
  name: string;
  hint: string;
  image?: string;
};

export function FeaturedProductsMarquee({ items }: { items: readonly FeaturedItem[] }) {
  const loop = [...items, ...items];
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const speedPxPerSecond = 55;
    let offset = 0;
    let halfWidth = Math.max(track.scrollWidth / 2, 1);
    let rafId = 0;
    let lastTs = performance.now();

    const measure = () => {
      halfWidth = Math.max(track.scrollWidth / 2, 1);
    };

    const tick = (ts: number) => {
      const deltaSeconds = (ts - lastTs) / 1000;
      lastTs = ts;
      offset += speedPxPerSecond * deltaSeconds;

      if (offset >= halfWidth) {
        offset -= halfWidth;
      }

      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
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
  }, [items]);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max gap-4 py-1 will-change-transform"
      >
        {loop.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex min-w-[220px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md"
          >
            <div className="relative aspect-[5/3] bg-gradient-to-br from-neutral-100 to-neutral-200">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              ) : null}
            </div>
            <div className="p-4 text-center">
              <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">{item.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
