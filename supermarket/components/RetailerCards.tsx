import ScrollReveal from "@/components/ScrollReveal";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    alt: "Retail growth",
    title: "We Know How to Help You",
    description:
      "At Supermarketing, we understand the complexity of today's FMCG retail market. We help retailers maximise shelf space, improve margins, and access competitive wholesale deals.",
    link: "#range",
    linkText: "👉 Discover Our Range",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    alt: "Warehouse supply chain",
    title: "Your One-Stop FMCG Solution",
    description:
      "Supermarketing aims to be your complete FMCG partner. We provide products, services, and competitive pricing — all under one roof — making sourcing simple, efficient, and scalable.",
    link: "#signup",
    linkText: "👉 Partner With Supermarketing",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop",
    alt: "In-store execution",
    title: "We'll Do the Heavy Lifting",
    description:
      "Our experienced field sales team handles upselling, product placement, in-store display setup, and retail-level customer support — so you can focus on growing your business.",
    link: "#signup",
    linkText: "👉 Retailer Signup",
  },
];

const RetailerCards = () => {
  return (
    <section className="px-8 py-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-tighter">
              Why Partner With Us
            </h2>
            <p className="text-sm text-foreground/50 font-medium max-w-xl mx-auto">
              As a trusted wholesaler and distributor, we provide the execution
              and insights needed to thrive in a competitive market.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 150}>
              <div className="flex flex-col group text-left h-full">
                <div className="relative mb-8 mr-3">
                  <div className="absolute bottom-[-12px] right-[-12px] w-full h-full border-2 border-primary/20" />
                  <div className="relative aspect-video overflow-hidden bg-muted shadow-lg">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-foreground uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/60 font-medium mb-6 flex-1">
                  {card.description}
                </p>
                <a
                  href={card.link}
                  className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors"
                >
                  {card.linkText}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetailerCards;
