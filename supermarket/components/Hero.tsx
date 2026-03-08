"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useCms } from "@/lib/useCms";
import type { HeroContent } from "@/types/cms";

const defaultHero: HeroContent = {
  tagline: "FMCG Wholesaler & Distributor | Australia",
  headline: "SUPERMARKETING",
  subtitle:
    "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
  ctaPrimaryText: "Brands / Suppliers",
  ctaSecondaryText: "Stores / Retailers",
  insightLabel: "Market Insight",
  insightQuote:
    "We understand the complexity of today's FMCG retail market.",
};

const Hero = () => {
  const cms = useCms<HeroContent | null>("/api/cms/hero", null);
  const h = cms && typeof cms.headline === "string" ? cms : defaultHero;

  return (
    <header className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-secondary">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-secondary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center px-4">
        <ScrollReveal delay={100}>
          <div className="mb-6">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-secondary-foreground/60 font-black">
              {h.tagline}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <h1
            className="brand-font headline-responsive mb-8 text-secondary-foreground tracking-tighter"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
          >
            {h.headline}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-secondary-foreground/90 leading-snug font-medium">
              {h.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={550}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
            <a
              href="#range"
              className="bg-primary text-primary-foreground px-10 py-5 brand-font text-sm hover:brightness-110 transition-all shadow-xl tracking-widest min-w-[240px] rounded-sm text-center"
            >
              {h.ctaPrimaryText}
            </a>
            <a
              href="#signup"
              className="bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground px-10 py-5 brand-font text-sm hover:bg-secondary-foreground hover:text-secondary transition-all tracking-widest min-w-[240px] rounded-sm text-center"
            >
              {h.ctaSecondaryText}
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Floating Insight */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <ScrollReveal delay={700} direction="right">
          <div className="bg-secondary-foreground/5 backdrop-blur-lg p-6 border border-secondary-foreground/10 shadow-2xl max-w-[280px]">
            <span className="text-[9px] uppercase tracking-widest text-secondary-foreground/40 font-black block mb-2">
              {h.insightLabel}
            </span>
            <p className="text-[12px] leading-relaxed font-semibold italic text-secondary-foreground/80">
              &quot;{h.insightQuote}&quot;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </header>
  );
};

export default Hero;
