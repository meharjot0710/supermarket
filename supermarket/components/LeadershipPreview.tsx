"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useCms } from "@/lib/useCms";
import type { LeadershipProfile } from "@/types/cms";

const defaultLeadership: LeadershipProfile[] = [
  { name: "Harry", title: "Director", shortMessage: "Leading our vision for growth and partnership.", order: 0 },
  { name: "Mina", title: "Director", shortMessage: "Driving excellence in supply and operations.", order: 1 },
  { name: "Justin", title: "General Manager", shortMessage: "Ensuring day-to-day delivery and client success.", order: 2 },
];

const LeadershipPreview = () => {
  const list = useCms<LeadershipProfile[]>("/api/cms/leadership", []);
  const leadership = list.length > 0 ? list.slice(0, 3) : defaultLeadership;

  return (
    <section id="leadership" className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-label text-primary mb-6 block">Directors / Management</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tighter mb-4">
              Leadership
            </h2>
            <p className="text-sm text-foreground/50 font-medium max-w-xl mx-auto">
              Meet the team behind Supermarketing&apos;s commitment to quality and service.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {leadership.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 100}>
              <div className="bg-card border border-foreground/5 p-6 text-center">
                <div className="aspect-square max-w-[180px] mx-auto mb-4 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop`}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-lg text-foreground">{person.name}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">{person.title}</p>
                <p className="text-sm text-foreground/60 font-medium">{person.shortMessage}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center">
            <Link
              href="/about#leadership"
              className="inline-block text-[11px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors"
            >
              Meet the full team →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LeadershipPreview;
