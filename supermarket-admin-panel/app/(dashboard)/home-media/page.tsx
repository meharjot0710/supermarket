"use client";

import { useEffect, useState } from "react";
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

async function uploadMedia(file: File, folder: "services") {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/media/upload", { method: "POST", body: fd });
  const out = await res.json();
  if (!res.ok) throw new Error(out.error || "Upload failed");
  return out.publicUrl as string;
}

function fileBaseName(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
}

async function uploadManyMedia(
  files: File[],
  folder: "services",
) {
  const uploaded: { url: string; originalName: string }[] = [];
  for (const file of files) {
    const url = await uploadMedia(file, folder);
    uploaded.push({ url, originalName: fileBaseName(file.name) });
  }
  return uploaded;
}

export default function HomeMediaPage() {
  const [data, setData] = useState<HomeMediaContent>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    fetch("/api/home-media")
      .then((r) => r.json())
      .then((d) => setData(d && d.services ? d : DEFAULT_DATA))
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

  if (loading) return <div className="p-8 text-zinc-500">Loading…</div>;

  return (
    <div className="max-w-5xl p-8 md:p-12 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Home Media (Bunny.net)</h1>
        <p className="text-sm text-zinc-600">
          Manage media for only: <strong>How we help you grow</strong>.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 space-y-5">
        <h2 className="font-semibold text-zinc-900">How we help you grow (service carousels)</h2>
        {data.services.columns.map((col, colIndex) => (
          <div key={col.title} className="rounded-lg border border-zinc-200 p-4">
            <p className="font-medium text-sm mb-3">{col.title}</p>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm cursor-pointer hover:bg-zinc-50">
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
                    const uploads = await uploadManyMedia(files, "services");
                    setData((prev) => {
                      const next = structuredClone(prev);
                      next.services.columns[colIndex].images.push(
                        ...uploads.map((u) => u.url),
                      );
                      return next;
                    });
                    setMsg(
                      `Uploaded ${uploads.length} image${uploads.length > 1 ? "s" : ""}. Click Save to publish.`,
                    );
                  } catch (error) {
                    setMsg(error instanceof Error ? error.message : "Upload failed");
                  } finally {
                    input.value = "";
                  }
                }}
              />
              Upload image
            </label>
            <div className="mt-3 space-y-2">
              {col.images.map((url, imageIndex) => (
                <div key={`${url}-${imageIndex}`} className="flex items-center gap-2">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100">
                    {url ? (
                      // Small preview thumbnail for quick verification.
                      <img
                        src={url}
                        alt={`Preview ${imageIndex + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <input
                    className="flex-1 rounded border border-zinc-300 px-2 py-1 text-xs"
                    value={url}
                    onChange={(e) =>
                      setData((prev) => {
                        const next = structuredClone(prev);
                        next.services.columns[colIndex].images[imageIndex] = e.target.value;
                        return next;
                      })
                    }
                  />
                  <button
                    type="button"
                    className="text-red-600 text-xs"
                    onClick={() =>
                      setData((prev) => {
                        const next = structuredClone(prev);
                        next.services.columns[colIndex].images.splice(imageIndex, 1);
                        return next;
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save media config"}
        </button>
        {msg ? <span className="text-sm text-zinc-700">{msg}</span> : null}
      </div>
    </div>
  );
}
