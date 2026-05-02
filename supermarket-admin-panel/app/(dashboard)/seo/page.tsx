"use client";

import { useState, useEffect } from "react";
import type { SeoFields } from "@/types/cms";

const defaultPages: SeoFields[] = [
  { pageKey: "home", pageTitle: "SuperMarketing | Australia's Trusted FMCG Wholesaler", metaDescription: "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution." },
  { pageKey: "about", pageTitle: "About Us | SuperMarketing", metaDescription: "Learn about SuperMarketing and our team." },
  { pageKey: "products", pageTitle: "Products | SuperMarketing", metaDescription: "Browse our wholesale product catalogue." },
  { pageKey: "contact", pageTitle: "Contact | SuperMarketing", metaDescription: "Get in touch with SuperMarketing." },
];

export default function SeoPage() {
  const [list, setList] = useState<SeoFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/seo")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setList(data);
        } else {
          setList(defaultPages);
        }
      })
      .catch(() => setList(defaultPages))
      .finally(() => setLoading(false));
  }, []);

  const saveOne = async (doc: SeoFields) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMessage({ type: "ok", text: "Saved." });
      const listRes = await fetch("/api/seo");
      const next = await listRes.json();
      if (Array.isArray(next)) setList(next);
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const saveAll = async () => {
    setSaving(true);
    setMessage(null);
    try {
      for (const doc of list) {
        if (!doc.pageKey.trim()) continue;
        const res = await fetch("/api/seo", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doc),
        });
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || "Save failed");
      }
      setMessage({ type: "ok", text: "All SEO fields saved." });
      const listRes = await fetch("/api/seo");
      const next = await listRes.json();
      if (Array.isArray(next)) setList(next);
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-8">
        <p className="text-zinc-500">Loading…</p>
      </div>
    );
  }

  const pages = list.length ? list : defaultPages;

  return (
    <div className="max-w-3xl p-4 sm:p-8 md:p-12">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">SEO</h1>
      <p className="text-zinc-600 text-sm mb-6">
        Enter SEO fields directly for each page. Layout and templates are fixed.
      </p>
      {message && (
        <p
          className={
            message.type === "ok" ? "text-green-600 text-sm mb-4" : "text-red-600 text-sm mb-4"
          }
        >
          {message.text}
        </p>
      )}
      <div className="space-y-4">
        {pages.map((seo, i) => (
          <div key={`seo-item-${i}`} className="p-4 border border-zinc-200 rounded-lg bg-white space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Page key</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
                value={seo.pageKey}
                onChange={(e) =>
                  setList((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], pageKey: e.target.value };
                    return next;
                  })
                }
                placeholder="e.g. home, about, contact"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Page title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
                value={seo.pageTitle}
                onChange={(e) =>
                  setList((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], pageTitle: e.target.value };
                    return next;
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta description</label>
              <textarea
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[80px]"
                value={seo.metaDescription}
                onChange={(e) =>
                  setList((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], metaDescription: e.target.value };
                    return next;
                  })
                }
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => saveOne(seo)}
                disabled={saving || !seo.pageKey.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                Save this page
              </button>
              <button
                type="button"
                onClick={() =>
                  setList((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="px-4 py-2 border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setList((prev) => [
              ...prev,
              { pageKey: "", pageTitle: "", metaDescription: "" },
            ])
          }
          className="px-4 py-2 border border-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-50"
        >
          Add SEO entry
        </button>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save all"}
        </button>
      </div>
    </div>
  );
}
