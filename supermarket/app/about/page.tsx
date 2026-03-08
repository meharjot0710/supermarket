import type { Metadata } from "next";
import TickerBar from "@/components/TickerBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { getSeoForPage } from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("about");
  return {
    title: seo?.pageTitle ?? "About Us | SuperMarketing",
    description: seo?.metaDescription ?? "Over 25 years in the market, connecting brands and independent retailers across Australia.",
  };
}

export default function AboutPage() {
  return (
    <>
      <TickerBar />
      <Navbar />
      <AboutContent />
      <Footer />
    </>
  );
}
