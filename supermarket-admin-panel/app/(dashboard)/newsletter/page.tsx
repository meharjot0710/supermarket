"use client";

import { useState, useEffect, useCallback } from "react";
import type { NewsletterContent } from "@/types/cms";

const defaultNewsletter: NewsletterContent = {
  heading: "Stay updated",
  subheading: "Get the latest offers and news.",
  buttonText: "View newsletter",
  successMessage: "",
};

async function loadNewsletter(): Promise<NewsletterContent & { hasPdf?: boolean }> {
  const r = await fetch("/api/newsletter");
  const d = await r.json();
  if (d && typeof d.heading === "string") return d;
  return { ...defaultNewsletter, hasPdf: false };
}

export default function NewsletterPage() {
  const [data, setData] = useState<(NewsletterContent & { hasPdf?: boolean }) | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const refresh = useCallback(async () => {
    const next = await loadNewsletter();
    setData(next);
  }, []);

  useEffect(() => {
    loadNewsletter()
      .then(setData)
      .catch(() => setData({ ...defaultNewsletter, hasPdf: false }))
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
        body: JSON.stringify({
          heading: data.heading,
          subheading: data.subheading,
          buttonText: data.buttonText,
          successMessage: data.successMessage,
        }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMessage({ type: "ok", text: "Saved." });
      await refresh();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const uploadPdf = async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/newsletter/pdf", { method: "POST", body: fd });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Upload failed");
      setMessage({ type: "ok", text: `Uploaded: ${out.pdfFileName ?? "PDF"}` });
      await refresh();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const removePdf = async () => {
    setRemoving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter/pdf", { method: "DELETE" });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Remove failed");
      setMessage({ type: "ok", text: "PDF removed." });
      await refresh();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Remove failed" });
    } finally {
      setRemoving(false);
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
  const hasPdf = !!d.hasPdf;

  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Newsletter</h1>
      <p className="text-zinc-600 text-sm mb-8">
        Edit the About page newsletter section. Upload a PDF (stored in MongoDB); visitors open
        it in a new browser tab from{" "}
        <code className="text-xs bg-zinc-100 px-1 rounded">/api/newsletter-pdf</code>.
      </p>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 mb-8">
        <h2 className="text-sm font-semibold text-zinc-800 mb-3">Newsletter PDF</h2>
        <p className="text-sm text-zinc-600 mb-4">
          {hasPdf ? (
            <>
              Current file:{" "}
              <span className="font-medium text-zinc-900">
                {d.pdfFileName ?? "newsletter.pdf"}
              </span>
            </>
          ) : (
            "No PDF uploaded yet. Visitors will see a short notice until you upload one."
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-800 cursor-pointer hover:bg-zinc-50">
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) => uploadPdf(e.target.files)}
            />
            {uploading ? "Uploading…" : "Choose PDF"}
          </label>
          {hasPdf ? (
            <button
              type="button"
              onClick={removePdf}
              disabled={removing}
              className="px-4 py-2 text-sm font-medium text-red-700 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
            >
              {removing ? "Removing…" : "Remove PDF"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-sm font-semibold text-zinc-800">Section copy</h2>
        {[
          { key: "heading", label: "Heading", value: d.heading },
          { key: "subheading", label: "Subheading", value: d.subheading },
          { key: "buttonText", label: "Button label (opens PDF in a new tab)", value: d.buttonText },
          {
            key: "successMessage",
            label: "Legacy success message (optional)",
            value: d.successMessage ?? "",
          },
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
          {saving ? "Saving…" : "Save copy"}
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
