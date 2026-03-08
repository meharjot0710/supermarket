import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("products");
  return {
    title: seo?.pageTitle ?? "Products | SuperMarketing",
    description: seo?.metaDescription ?? "Explore our range of quality FMCG and natural products by brand.",
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
