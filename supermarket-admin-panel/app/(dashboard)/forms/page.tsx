"use client";

import { useState, useEffect } from "react";
import type { FormContent } from "@/types/cms";

const defaultForms: FormContent[] = [
  {
    formId: "signup",
    title: "Retailer Signup",
    introText:
      "Supermarketing is a trusted wholesale distributor of natural and FMCG products in Australia, supplying better-for-you snacks, pantry staples, protein and supplements, as well as eco-living and cleaning products.",
    confirmationMessage: "Application submitted successfully! We'll be in touch.",
    submitButtonText: "Submit Application",
  },
  {
    formId: "contact",
    title: "Contact Us",
    introText: "Get in touch with our team.",
    confirmationMessage: "Thank you. We'll get back to you soon.",
    submitButtonText: "Send",
  },
];

export default function FormsPage() {
  const [list, setList] = useState<FormContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editing, setEditing] = useState<FormContent | null>(null);

  useEffect(() => {
    fetch("/api/forms")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setList(data);
        } else {
          setList(defaultForms);
        }
      })
      .catch(() => setList(defaultForms))
      .finally(() => setLoading(false));
  }, []);

  const saveOne = async (doc: FormContent) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/forms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMessage({ type: "ok", text: "Saved." });
      setEditing(null);
      const listRes = await fetch("/api/forms");
      const next = await listRes.json();
      if (Array.isArray(next)) setList(next);
      else setList((prev) => (prev.some((f) => f.formId === doc.formId) ? prev.map((f) => (f.formId === doc.formId ? doc : f)) : [...prev, doc]));
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

  const forms = list.length ? list : defaultForms;

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Forms & contact</h1>
      <p className="text-zinc-600 text-sm mb-6">
        Form titles, intro text, confirmation messages, and submit button text.
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
      <div className="space-y-6">
        {forms.map((form) => (
          <div
            key={form.formId}
            className="p-4 border border-zinc-200 rounded-lg bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-zinc-900">{form.title}</p>
              <p className="text-xs text-zinc-500">ID: {form.formId}</p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(form)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {editing && (
        <div className="mt-8 p-6 border border-zinc-200 rounded-xl bg-white space-y-4">
          <h2 className="font-semibold text-zinc-900">Edit: {editing.formId}</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Form title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
              value={editing.title}
              onChange={(e) => setEditing((p) => (p ? { ...p, title: e.target.value } : p))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Intro text</label>
            <textarea
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[100px]"
              value={editing.introText}
              onChange={(e) => setEditing((p) => (p ? { ...p, introText: e.target.value } : p))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmation message</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
              value={editing.confirmationMessage}
              onChange={(e) =>
                setEditing((p) => (p ? { ...p, confirmationMessage: e.target.value } : p))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Submit button text</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
              value={editing.submitButtonText}
              onChange={(e) =>
                setEditing((p) => (p ? { ...p, submitButtonText: e.target.value } : p))
              }
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
