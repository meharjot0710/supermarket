import type { Metadata } from "next";
import TickerBar from "@/components/TickerBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SplitSection from "@/components/SplitSection";
import BrandRange from "@/components/BrandRange";
import TrustedBy from "@/components/TrustedBy";
import Standards from "@/components/Standards";
import LeadershipPreview from "@/components/LeadershipPreview";
import RetailerCards from "@/components/RetailerCards";
import ShopPreview from "@/components/ShopPreview";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";
import { getSeoForPage } from "@/lib/getSeo";

const defaultTitle = "SuperMarketing | Australia's Trusted FMCG Wholesaler";
const defaultDescription =
  "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("home");
  return {
    title: seo?.pageTitle ?? defaultTitle,
    description: seo?.metaDescription ?? defaultDescription,
    openGraph: {
      title: seo?.pageTitle ?? defaultTitle,
      description: seo?.metaDescription ?? defaultDescription,
      type: "website",
    },
  };
}

export default function Home() {
  return (
    <>
      <TickerBar />
      <Navbar />
      <Hero />
      <SplitSection />
      <BrandRange />
      <TrustedBy />
      <Standards />
      <LeadershipPreview />
      <RetailerCards />
      <ShopPreview />
      <SignupForm />
      <Footer />
    </>
  );
}
