"use client";

import { useState, useEffect } from "react";
import type { HeroContent } from "@/types/cms";

const defaultHero: HeroContent = {
  tagline: "FMCG Wholesaler & Distributor | Australia",
  headline: "SUPERMARKETING",
  subtitle:
    "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
  ctaPrimaryText: "Discover Our Range",
  ctaSecondaryText: "Retailer Signup",
  insightLabel: "Market Insight",
  insightQuote:
    "We understand the complexity of today's FMCG retail market.",
};

export default function HeroPage() {
  const [data, setData] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => setData(d && typeof d.tagline === "string" ? d : defaultHero))
      .catch(() => setData(defaultHero))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMessage({ type: "ok", text: "Saved." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-zinc-500">Loading…</p>
      </div>
    );
  }

  const d = data ?? defaultHero;

  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Hero Banner (text only)</h1>
      <p className="text-zinc-600 text-sm mb-6">
        Editable text only. Images and layout are fixed on the main site.
      </p>
      <div className="space-y-5">
        {[
          { key: "tagline", label: "Tagline (small caps)", value: d.tagline },
          { key: "headline", label: "Headline", value: d.headline },
          { key: "subtitle", label: "Subtitle", value: d.subtitle },
          { key: "ctaPrimaryText", label: "Primary button text", value: d.ctaPrimaryText },
          { key: "ctaSecondaryText", label: "Secondary button text", value: d.ctaSecondaryText },
          { key: "insightLabel", label: "Floating insight label", value: d.insightLabel },
          { key: "insightQuote", label: "Floating insight quote", value: d.insightQuote },
        ].map(({ key, label, value }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-zinc-700 mb-1">{label}</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={value}
              onChange={(e) =>
                setData((prev) => (prev ? { ...prev, [key]: e.target.value } : prev))
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {message && (
          <span
            className={
              message.type === "ok" ? "text-green-600 text-sm" : "text-red-600 text-sm"
            }
          >
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
