"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type ServiceImageCarouselProps = {
  images: readonly string[];
  alt: string;
};

export function ServiceImageCarousel({ images, alt }: ServiceImageCarouselProps) {
  const safeImages = useMemo(() => (images.length > 0 ? [...images] : []), [images]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % safeImages.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [safeImages.length]);

  if (safeImages.length === 0) {
    return <div className="h-full w-full bg-neutral-100" aria-hidden />;
  }

  const goPrev = () => {
    setActive((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % safeImages.length);
  };

  return (
    <div className="relative h-full w-full">
      {safeImages.map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt={alt}
          unoptimized={src.startsWith("http://") || src.startsWith("https://")}
          fill
          className={`object-cover transition-opacity duration-500 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={i === 0}
        />
      ))}

      {safeImages.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-black/70"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-black/70"
          >
            →
          </button>
        </>
      ) : null}
    </div>
  );
}
