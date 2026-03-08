import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("contact");
  return {
    title: seo?.pageTitle ?? "Contact Us | SuperMarketing",
    description: seo?.metaDescription ?? "Get in touch for wholesale enquiries, partnerships, or general questions.",
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
