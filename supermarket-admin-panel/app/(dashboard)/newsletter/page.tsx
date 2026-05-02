"use client";

import { useState, useEffect } from "react";
import type { HomeMediaContent } from "@/types/cms";

const DEFAULT_DATA: HomeMediaContent = {
  services: {
    columns: [
      { title: "Wholesale range & distribution", images: [] },
      { title: "Field sales & in-store execution", images: [] },
      { title: "Partnership & service", images: [] },
    ],
  },
  featuredProducts: { items: [] },
  newsletterCatalogue: { items: [] },
};

async function uploadMedia(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", "newsletter");
  const res = await fetch("/api/media/upload", { method: "POST", body: fd });
  const out = await res.json();
  if (!res.ok) throw new Error(out.error || "Upload failed");
  return out.publicUrl as string;
}

function fileBaseName(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
}

async function uploadManyMedia(files: File[]) {
  const uploaded: { url: string; originalName: string }[] = [];
  for (const file of files) {
    const url = await uploadMedia(file);
    uploaded.push({ url, originalName: fileBaseName(file.name) });
  }
  return uploaded;
}

export default function NewsletterPage() {
  const [data, setData] = useState<HomeMediaContent>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    fetch("/api/home-media")
      .then((r) => r.json())
      .then((d) => setData(d && d.newsletterCatalogue ? d : DEFAULT_DATA))
      .catch(() => setData(DEFAULT_DATA))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/home-media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMsg("Saved.");
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Save failed");
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

  return (
    <div className="max-w-4xl space-y-8 p-4 sm:p-8 md:p-12">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Newsletter</h1>
        <p className="text-sm text-zinc-600">
          Set newsletter card <strong>Name</strong>, <strong>Date</strong>, cover image, and PDF URL.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        {data.newsletterCatalogue.items.map((item, i) => (
          <div key={`newsletter-item-${i}`} className="grid gap-2 rounded border border-zinc-200 p-3">
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="rounded border border-zinc-300 px-2 py-1 text-sm"
                placeholder="Name (e.g. Team News)"
                value={item.title}
                onChange={(e) =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.newsletterCatalogue.items[i].title = e.target.value;
                    return next;
                  })
                }
              />
              <input
                className="rounded border border-zinc-300 px-2 py-1 text-sm"
                placeholder="Date (e.g. Mar 2025)"
                value={item.issue}
                onChange={(e) =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.newsletterCatalogue.items[i].issue = e.target.value;
                    return next;
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs"
                placeholder="Cover image URL"
                value={item.coverImage}
                onChange={(e) =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.newsletterCatalogue.items[i].coverImage = e.target.value;
                    return next;
                  })
                }
              />
              <label className="inline-flex items-center px-3 py-1.5 border rounded text-xs cursor-pointer hover:bg-zinc-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const input = e.currentTarget;
                    const files = Array.from(input.files ?? []);
                    if (files.length === 0) return;
                    try {
                      const uploads = await uploadManyMedia(files);
                      setData((prev) => {
                        const next = structuredClone(prev);
                        next.newsletterCatalogue.items[i].coverImage = uploads[0].url;
                        for (const extra of uploads.slice(1)) {
                          next.newsletterCatalogue.items.push({
                            title: "Team News",
                            issue: extra.originalName || "",
                            coverImage: extra.url,
                            pdfUrl: "",
                          });
                        }
                        return next;
                      });
                      setMsg(
                        `Uploaded ${uploads.length} cover image${uploads.length > 1 ? "s" : ""}. Click Save to publish.`,
                      );
                    } catch (error) {
                      setMsg(error instanceof Error ? error.message : "Upload failed");
                    } finally {
                      input.value = "";
                    }
                  }}
                />
                Upload cover
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs"
                placeholder="PDF URL"
                value={item.pdfUrl}
                onChange={(e) =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.newsletterCatalogue.items[i].pdfUrl = e.target.value;
                    return next;
                  })
                }
              />
              <label className="inline-flex items-center px-3 py-1.5 border rounded text-xs cursor-pointer hover:bg-zinc-50">
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const input = e.currentTarget;
                    const files = Array.from(input.files ?? []);
                    if (files.length === 0) return;
                    try {
                      const uploads = await uploadManyMedia(files);
                      setData((prev) => {
                        const next = structuredClone(prev);
                        next.newsletterCatalogue.items[i].pdfUrl = uploads[0].url;
                        for (const extra of uploads.slice(1)) {
                          next.newsletterCatalogue.items.push({
                            title: "Team News",
                            issue: extra.originalName || "",
                            coverImage: "",
                            pdfUrl: extra.url,
                          });
                        }
                        return next;
                      });
                      setMsg(
                        `Uploaded ${uploads.length} PDF${uploads.length > 1 ? "s" : ""}. Click Save to publish.`,
                      );
                    } catch (error) {
                      setMsg(error instanceof Error ? error.message : "Upload failed");
                    } finally {
                      input.value = "";
                    }
                  }}
                />
                Upload PDF
              </label>
              <button
                type="button"
                className="text-red-600 text-xs"
                onClick={() =>
                  setData((prev) => {
                    const next = structuredClone(prev);
                    next.newsletterCatalogue.items.splice(i, 1);
                    return next;
                  })
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-2 text-sm border rounded-lg hover:bg-zinc-50"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              newsletterCatalogue: {
                items: [
                  ...prev.newsletterCatalogue.items,
                  { title: "", issue: "", coverImage: "", pdfUrl: "" },
                ],
              },
            }))
          }
        >
          Add newsletter item
        </button>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save newsletter"}
        </button>
        {msg ? <span className="text-sm text-zinc-700">{msg}</span> : null}
      </div>
    </div>
  );
}
