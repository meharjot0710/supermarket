"use client";

import { useState, useEffect } from "react";
import type { NewsletterContent } from "@/types/cms";

const defaultNewsletter: NewsletterContent = {
  heading: "Stay updated",
  subheading: "Get the latest offers and news.",
  buttonText: "Subscribe",
  successMessage: "Thanks for subscribing!",
};

export default function NewsletterPage() {
  const [data, setData] = useState<NewsletterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((d) =>
        setData(
          d && typeof d.heading === "string"
            ? d
            : defaultNewsletter
        )
      )
      .catch(() => setData(defaultNewsletter))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
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

  const d = data ?? defaultNewsletter;

  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Newsletter content</h1>
      <p className="text-zinc-600 text-sm mb-6">Editable newsletter section text.</p>
      <div className="space-y-5">
        {[
          { key: "heading", label: "Heading", value: d.heading },
          { key: "subheading", label: "Subheading", value: d.subheading },
          { key: "buttonText", label: "Button text", value: d.buttonText },
          { key: "successMessage", label: "Success message", value: d.successMessage },
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
