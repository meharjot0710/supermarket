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
  const [editing, setEditing] = useState<SeoFields | null>(null);

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
      setEditing(null);
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
      <div className="p-8">
        <p className="text-zinc-500">Loading…</p>
      </div>
    );
  }

  const pages = list.length ? list : defaultPages;

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">SEO</h1>
      <p className="text-zinc-600 text-sm mb-6">Page titles and meta descriptions. Layout and templates are fixed.</p>
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
        {pages.map((seo) => (
          <div
            key={seo.pageKey}
            className="p-4 border border-zinc-200 rounded-lg bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-zinc-900">{seo.pageKey}</p>
              <p className="text-sm text-zinc-500 truncate max-w-md">{seo.pageTitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(seo)}
              className="text-blue-600 hover:underline text-sm shrink-0"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {editing && (
        <div className="mt-8 p-6 border border-zinc-200 rounded-xl bg-white space-y-4">
          <h2 className="font-semibold text-zinc-900">Edit: {editing.pageKey}</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Page title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
              value={editing.pageTitle}
              onChange={(e) => setEditing((p) => (p ? { ...p, pageTitle: e.target.value } : p))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta description</label>
            <textarea
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[80px]"
              value={editing.metaDescription}
              onChange={(e) => setEditing((p) => (p ? { ...p, metaDescription: e.target.value } : p))}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => saveOne(editing)}
              disabled={saving}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-5 py-2.5 border border-zinc-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
