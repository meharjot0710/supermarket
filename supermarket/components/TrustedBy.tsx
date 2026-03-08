"use client";

import { useCms } from "@/lib/useCms";
import type { ListItem } from "@/types/cms";

const defaultStores = [
  "Ritchies", "Champions", "Romeos", "Supabarn", "Michael", "RedDrop",
  "Le-Max Group", "IGA Ryan", "Carlos", "Bernardis", "Ashcrofts", "Supamart IGA",
];

const TrustedBy = () => {
  const list = useCms<ListItem[]>("/api/cms/stores", []);
  const names = list.length > 0 ? list.map((i) => i.name) : defaultStores;
  const tickerContent = names.map((r) => `${r} \u00A0•\u00A0 `).join("");

  return (
    <section className="py-10 bg-card border-y border-foreground/5 overflow-hidden">
      <div className="text-center mb-6">
        <span className="section-label text-muted-foreground">Trusted By</span>
      </div>
      <div className="relative">
        <div className="inline-block whitespace-nowrap animate-marquee text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30">
          <span>{tickerContent}</span>
          <span>{tickerContent}</span>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
