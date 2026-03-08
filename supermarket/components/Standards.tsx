import ScrollReveal from "@/components/ScrollReveal";

const Standards = () => {
  return (
    <section
      id="about"
      className="py-32 px-6 bg-card flex flex-col items-center border-y border-foreground/5"
    >
      <ScrollReveal>
        <div className="max-w-4xl text-center">
          <span className="inline-block border border-foreground rounded-full px-5 py-2 text-[10px] font-black mb-12 uppercase tracking-widest">
            Our Relationships
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-foreground mb-8">
            Reliable Supply. Dedicated Service. Clear Communication.
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-foreground/60 font-medium leading-relaxed">
              Supermarketing is a dynamic FMCG wholesaler and distributor
              delivering quality products at competitive prices across Australia.
            </p>
            <p className="text-sm text-foreground/60 font-medium leading-relaxed">
              Our hands-on sales approach and direct collaboration with retailers
              have enabled us to build strong, long-term distributor
              relationships.
            </p>
            <p className="text-sm text-foreground/60 font-medium leading-relaxed">
              Our point of difference is effective communication, reliable
              supply, and dedicated service — ensuring maximum satisfaction
              across the supermarket industry.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Standards;
