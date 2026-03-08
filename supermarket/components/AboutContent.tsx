"use client";

import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useCms } from "@/lib/useCms";
import type { JobListing, LeadershipProfile, NewsletterContent } from "@/types/cms";

const defaultLeadershipImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
];

const defaultLeadership: LeadershipProfile[] = [
  { name: "Harry", title: "Director", shortMessage: "Leading our vision for growth and long-term partnership with brands and retailers across Australia.", order: 0 },
  { name: "Mina", title: "Director", shortMessage: "Driving excellence in supply chain, operations, and our commitment to quality and reliability.", order: 1 },
  { name: "Justin", title: "General Manager", shortMessage: "Ensuring day-to-day delivery, client success, and the hands-on support our partners rely on.", order: 2 },
];

const defaultCareers: JobListing[] = [
  { title: "Sales Representative", location: "Sydney / Melbourne", type: "Full-time", description: "", order: 0, active: true },
  { title: "Operations Coordinator", location: "National", type: "Full-time", description: "", order: 1, active: true },
];

export default function AboutContent() {
  const leadershipList = useCms<LeadershipProfile[]>("/api/cms/leadership", []);
  const careersList = useCms<JobListing[]>("/api/cms/careers", []);
  const newsletterContent = useCms<NewsletterContent | null>("/api/cms/newsletter", null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSending, setNewsletterSending] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSending(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "newsletter", email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to subscribe. Please try again.");
        return;
      }
      toast.success("Thanks for subscribing! We'll keep you updated.");
      setNewsletterEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setNewsletterSending(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSending(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "contact",
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success("Message sent. We'll get back to you soon.");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setContactSending(false);
    }
  };

  const leadership = leadershipList.length > 0 ? leadershipList : defaultLeadership;
  const careers = careersList.length > 0 ? careersList.filter((j) => j.active !== false) : defaultCareers;
  const newsletter = newsletterContent && typeof newsletterContent.heading === "string" ? newsletterContent : null;

  return (
    <>
      {/* Banner */}
      <section className="bg-secondary py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="brand-font text-5xl md:text-7xl text-secondary-foreground mb-4"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
          >
            About Us
          </h1>
          <p className="text-secondary-foreground/80 font-medium text-base max-w-2xl mx-auto">
            Over 25 years in the market, connecting brands and independent retailers across Australia.
          </p>
        </div>
      </section>

      {/* Company background */}
      <section className="py-24 px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="section-label text-primary mb-6 block">Our story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tighter mb-8">
              Company background & history
            </h2>
            <div className="space-y-4 text-sm text-foreground/70 font-medium leading-relaxed">
              <p>
                Supermarketing has been a trusted name in FMCG wholesale and distribution for more than 25 years. We have built our reputation on reliable supply, competitive pricing, and direct relationships with both brands and independent supermarkets.
              </p>
              <p>
                From our early days servicing local retailers to our current national footprint, we have stayed focused on what matters: helping brands reach the right shelves and helping stores access the right products. Our hands-on approach — from field sales and in-store execution to logistics and account management — continues to set us apart in a complex market.
              </p>
              <p>
                Today we work with hundreds of stores and leading Australian and international brands, providing a bridge between supply and retail that drives growth for both. We are committed to the same values that have defined us for over two decades: integrity, communication, and delivery.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label text-primary mb-6 block">Directors / Management</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tighter mb-4">
                Leadership
              </h2>
              <p className="text-sm text-foreground/50 font-medium max-w-xl mx-auto">
                Meet the team behind our commitment to quality and service.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {leadership.map((person, i) => (
              <ScrollReveal key={person.name} delay={i * 100}>
                <div className="bg-background border border-foreground/5 p-6 text-center">
                  <div className="aspect-square max-w-[220px] mx-auto mb-6 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={defaultLeadershipImages[i % defaultLeadershipImages.length]}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">{person.name}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">{person.title}</p>
                  <p className="text-sm text-foreground/60 font-medium leading-relaxed">{person.shortMessage}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-8 bg-accent">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="brand-font text-3xl md:text-4xl text-accent-foreground mb-4">
              {newsletter?.heading ?? "Stay updated"}
            </h2>
            <p className="text-sm text-accent-foreground/70 font-medium mb-8">
              {newsletter?.subheading ?? "Get the latest news, offers, and insights from Supermarketing."}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 border border-accent-foreground/20 bg-white/10 text-accent-foreground placeholder:text-accent-foreground/50 rounded-sm text-sm"
                required
              />
              <button
                type="submit"
                disabled={newsletterSending}
                className="bg-secondary text-secondary-foreground px-8 py-3 brand-font text-sm font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {newsletterSending ? "Subscribing…" : (newsletter?.buttonText ?? "Subscribe")}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-24 px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label text-primary mb-6 block">Join us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tighter mb-4">
                Careers / job opportunities
              </h2>
              <p className="text-sm text-foreground/50 font-medium max-w-xl mx-auto">
                We are always looking for talented people to join our team.
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-4 mb-12">
            {careers.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 80}>
                <div className="bg-card border border-foreground/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.location} · {job.type}</p>
                    {job.description && <p className="text-sm text-foreground/60 mt-1 line-clamp-2">{job.description}</p>}
                  </div>
                  <Link
                    href="/contact?subject=Careers"
                    className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors shrink-0"
                  >
                    Enquire →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="text-center text-sm text-foreground/50">
              Don’t see a role? Get in touch — we’d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-24 px-8 bg-card">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-tight">
              Get in touch
            </h2>
            <p className="text-sm text-foreground/60 font-medium mb-8">
              Have a question or want to work with us? Send us a message.
            </p>
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-background rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-background rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-background rounded-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={contactSending}
                className="w-full bg-secondary text-secondary-foreground py-4 brand-font text-sm font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {contactSending ? "Sending…" : "Send message"}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
