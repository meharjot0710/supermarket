"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useCms } from "@/lib/useCms";
import type { ProductRecord } from "@/types/cms";

const toProduct = (p: ProductRecord) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  brand: p.brand,
  image: p.image,
  unit: p.unit,
  minOrder: p.minOrder,
  description: p.description,
});

const ShopPreview = () => {
  const cmsProducts = useCms<ProductRecord[]>("/api/cms/products", []);
  const products = cmsProducts.length > 0 ? cmsProducts.map(toProduct) : staticProducts;
  const featured = products.slice(0, 4);

  return (
    <section id="shop" className="py-32 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-label text-primary mb-6 block">
              Wholesale Catalogue
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tighter mb-4">
              Shop Our Products
            </h2>
            <p className="text-sm text-muted-foreground font-medium max-w-xl mx-auto">
              Browse our extensive FMCG catalogue. Competitive wholesale pricing
              for registered retailers across Australia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 brand-font text-sm hover:brightness-110 transition-all shadow-xl tracking-widest rounded-sm group"
            >
              View Full Catalogue
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ShopPreview;
