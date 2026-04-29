"use client";

import Image from "next/image";
import { useRef } from "react";
import { ScrollReveal } from "./scroll-reveal";

type NewsletterItem = {
  title: string;
  issue: string;
  coverImage: string;
  pdfUrl: string;
};

export function NewsletterCatalogueStrip({ items }: { items: readonly NewsletterItem[] }) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const orderedItems = [...items].reverse();

  const scrollByCards = (direction: "left" | "right") => {
    const el = listRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-10 sm:py-12">
      <ScrollReveal className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--mac-teal)]">
            Stay updated
          </p>
          <h2 className="font-heading mt-2 text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
            Newsletter
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[var(--mac-teal)]/70" />
        </div>

        <div
          ref={listRef}
          className="mac-scrollbar-hide relative -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8"
        >
          <div className="inline-flex w-max min-w-full snap-x snap-mandatory justify-center gap-3 pb-2 sm:gap-4">
            {orderedItems.map((item) => (
              <article
                key={`${item.title}-${item.issue}`}
                className="min-w-[230px] snap-start overflow-hidden rounded-sm border border-neutral-200 bg-white sm:min-w-[250px]"
              >
                <div className="relative aspect-[3/4] w-full bg-white p-3">
                  <Image
                    src={item.coverImage}
                    alt={`${item.title} ${item.issue}`}
                    unoptimized={
                      item.coverImage.startsWith("http://") ||
                      item.coverImage.startsWith("https://")
                    }
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 70vw, 250px"
                  />
                </div>
                <div className="border-t border-neutral-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {item.issue}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-[var(--mac-teal)] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
                    >
                      Read
                    </a>
                    <a
                      href={item.pdfUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-100"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            className="rounded-full border border-[var(--mac-teal)]/35 px-3 py-2 text-sm font-bold text-[var(--mac-teal)] transition hover:bg-[var(--mac-teal)]/10"
            aria-label="Scroll newsletters left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("right")}
            className="rounded-full border border-[var(--mac-teal)]/35 px-3 py-2 text-sm font-bold text-[var(--mac-teal)] transition hover:bg-[var(--mac-teal)]/10"
            aria-label="Scroll newsletters right"
          >
            →
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
