import ScrollReveal from "@/components/ScrollReveal";

const SplitSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      {/* Left: Dark video/image side */}
      <div className="relative flex items-center justify-center bg-secondary min-h-[400px] p-12 lg:p-20">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="relative mr-4 mb-4">
            <div className="absolute bottom-[-16px] right-[-16px] w-full h-full border-2 border-secondary-foreground/15" />
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"
                alt="Warehouse execution"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
          </div>
          <ScrollReveal direction="left">
            <h2 className="brand-font text-4xl md:text-5xl text-secondary-foreground text-center mt-8">
              SUPER
              <br />
              MARKETING
            </h2>
          </ScrollReveal>
        </div>
      </div>

      {/* Right: Yellow content side */}
      <div className="bg-accent flex flex-col items-center justify-center text-center p-12 lg:p-24 min-h-[500px]">
        <ScrollReveal direction="right">
          <div className="mb-6">
            <span className="font-black text-xs uppercase tracking-[0.3em] text-accent-foreground">
              Reliable & Cost-Effective
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-sm text-accent-foreground">
            Choose from a wide range of solutions designed to maximise your
            profitability.
          </h3>

          <p className="text-sm text-accent-foreground/60 font-medium mb-12 max-w-md">
            From optimised shelf placement to our renowned relay service, we
            ensure value at every stage.
          </p>

          <div className="space-y-4 mb-12 text-[11px] font-bold uppercase text-accent-foreground/60">
            <p>— Upselling & Product Placement</p>
            <p>— In-Store Display Setup</p>
            <p>— Retail-Level Customer Support</p>
            <p>— Direct Retailer Collaboration</p>
            <p>— Access to 4,000+ Quality Products</p>
          </div>

          <a
            href="#signup"
            className="text-[12px] font-bold border-b-2 border-accent-foreground pb-2 hover:px-6 transition-all group uppercase tracking-widest text-accent-foreground"
          >
            See What We&apos;re Made Of{" "}
            <span className="group-hover:translate-x-1 inline-block transition-transform">
              →
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SplitSection;
