"use client";

import { useState } from "react";
import { toast } from "sonner";
import TickerBar from "@/components/TickerBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCms } from "@/lib/useCms";
import type { FormContent } from "@/types/cms";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const formContent = useCms<FormContent | null>("/api/cms/forms?formId=contact", null);
  const contactContent = formContent && formContent.formId === "contact" ? formContent : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "contact",
          name,
          email,
          company,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to send. Please try again.");
        return;
      }
      toast.success(contactContent?.confirmationMessage ?? "Message sent. We'll get back to you soon.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const pageTitle = contactContent?.title ?? "Contact Us";
  const formTitle = contactContent?.title ?? "Enquiry form";
  const submitLabel = contactContent?.submitButtonText ?? "Send enquiry";

  return (
    <>
      <TickerBar />
      <Navbar />

      {/* Banner */}
      <section className="bg-secondary py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="brand-font text-5xl md:text-7xl text-secondary-foreground mb-4"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
          >
            {pageTitle}
          </h1>
          <p className="text-secondary-foreground/80 font-medium text-base max-w-xl mx-auto">
            {contactContent?.introText ?? "Get in touch for wholesale enquiries, partnerships, or general questions."}
          </p>
        </div>
      </section>

      <section className="py-24 px-8 bg-background">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Business contact details */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-tight mb-6">
              Business details
            </h2>
            <div className="space-y-4 text-sm text-foreground/70 font-medium">
              <p>
                <span className="font-bold text-foreground block mb-1">Supermarketing</span>
                FMCG Wholesaler & Distributor
              </p>
              <p>
                <span className="font-bold text-foreground block mb-1">Enquiries</span>
                Contact us via the form or your usual account manager.
              </p>
              <p>
                <span className="font-bold text-foreground block mb-1">National coverage</span>
                Serving independent supermarkets and retailers across Australia.
              </p>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-3">
            <h2 className="text-lg font-bold text-foreground uppercase tracking-tight mb-6">
              {formTitle}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-card rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-card rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-card rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/70 mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-foreground/10 bg-card rounded-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-secondary text-secondary-foreground py-4 brand-font text-sm font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? "Sending…" : submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
