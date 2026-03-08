"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products as staticProducts } from "@/data/products";
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

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const cmsProducts = useCms<ProductRecord[]>("/api/cms/products", []);
  const products = cmsProducts.length > 0 ? cmsProducts.map(toProduct) : staticProducts;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <TickerBar />
        <Navbar />
        <div className="min-h-[50vh] flex items-center justify-center px-8">
          <div className="text-center">
            <p className="text-muted-foreground font-medium text-lg mb-4">Product not found</p>
            <Link href="/products" className="text-primary font-bold hover:underline">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TickerBar />
      <Navbar />

      <section className="bg-secondary py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-secondary-foreground/60 text-[11px] font-bold uppercase tracking-widest hover:text-secondary-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Products
          </Link>
        </div>
      </section>

      <section className="py-16 px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="absolute bottom-[-12px] right-[-12px] w-full h-full border-2 border-primary/20" />
              <div className="relative aspect-square overflow-hidden bg-muted shadow-lg rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                {product.category}
              </p>
              <span className="bg-secondary text-secondary-foreground text-[9px] font-black uppercase tracking-widest px-3 py-1.5 inline-block mb-4">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground font-medium mb-4">
                {product.unit} · Min order: {product.minOrder}
              </p>
              {product.description && (
                <p className="text-foreground/80 font-medium leading-relaxed mb-8">
                  {product.description}
                </p>
              )}
              <Link
                href="/contact"
                className="inline-block w-full md:w-auto text-center bg-secondary text-secondary-foreground px-10 py-4 brand-font text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
