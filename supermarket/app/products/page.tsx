"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import TickerBar from "@/components/TickerBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default function ProductsPage() {
  const cmsProducts = useCms<ProductRecord[]>("/api/cms/products", []);
  const products = useMemo(
    () => (cmsProducts.length > 0 ? cmsProducts.map(toProduct) : staticProducts),
    [cmsProducts]
  );
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);

  const [activeBrand, setActiveBrand] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchesBrand = activeBrand === "All" || p.brand === activeBrand;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <>
      <TickerBar />
      <Navbar />

      {/* Banner */}
      <section className="bg-secondary py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary-foreground/60 text-[11px] font-bold uppercase tracking-widest hover:text-secondary-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <h1
            className="brand-font text-5xl md:text-7xl text-secondary-foreground mb-4"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
          >
            Products
          </h1>
          <p className="text-secondary-foreground/70 font-medium text-base max-w-xl mx-auto">
            Browse our wholesale catalogue by brand. Product images and descriptions — contact us for enquiries.
          </p>
        </div>
      </section>

      {/* Filters: by brand + search */}
      <section className="bg-card border-b border-foreground/5 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search
                size={14}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={100}
                className="form-input-underline pl-6"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveBrand("All")}
                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-all ${
                  activeBrand === "All"
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
                }`}
              >
                All
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-all ${
                    activeBrand === brand
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 px-8 bg-background min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-8">
                Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} linkToDetail />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground font-medium text-lg mb-2">No products found</p>
              <p className="text-sm text-muted-foreground/60">Try adjusting your search or brand filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="brand-font text-3xl md:text-4xl text-accent-foreground mb-4">
            Ready to order?
          </h2>
          <p className="text-sm text-accent-foreground/70 font-medium mb-8 max-w-lg mx-auto">
            Contact us for wholesale pricing and delivery. We supply registered retailers across Australia.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary text-secondary-foreground px-10 py-5 brand-font text-sm hover:opacity-90 transition-all shadow-xl tracking-widest rounded-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
