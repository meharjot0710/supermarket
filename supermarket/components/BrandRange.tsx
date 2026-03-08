"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useCms } from "@/lib/useCms";
import type { ListItem } from "@/types/cms";

const defaultBrands = [
  "Rosella", "Scrub Daddy", "Buderim", "G-Fresh", "Capi", "Coco Coast", "Bow Wow", "Pink Stuff",
];

const BrandRange = () => {
  const list = useCms<ListItem[]>("/api/cms/brands", []);
  const brands = list.length > 0 ? list.map((i) => i.name) : defaultBrands;

  return (
    <section id="range" className="py-32 px-8 bg-card text-center">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <span className="font-black text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
              Access to the World&apos;s Best Brands
            </span>
            <h2 className="text-4xl font-bold text-foreground uppercase tracking-tighter mb-4">
              Our Core Range
            </h2>
            <p className="text-sm text-foreground/50 font-medium max-w-xl mx-auto">
              We work with leading brands including G-Fresh, Rosella, Buderim,
              Scrub Daddy, and many more. Our extensive wholesale range ensures
              consistent supply and strong brand performance at retail level.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {brands.map((brand, i) => (
            <ScrollReveal key={brand} delay={i * 80}>
              <div className="bg-background p-12 group hover:bg-accent transition-all duration-500 cursor-default">
                <span className="brand-font text-2xl text-foreground/20 group-hover:text-foreground transition-colors duration-500">
                  {brand}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandRange;
