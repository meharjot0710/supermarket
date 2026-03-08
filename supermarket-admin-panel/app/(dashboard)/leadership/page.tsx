"use client";

import { useState, useEffect } from "react";
import type { LeadershipProfile } from "@/types/cms";

export default function LeadershipPage() {
  const [list, setList] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editing, setEditing] = useState<LeadershipProfile | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () =>
    fetch("/api/leadership")
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const saveOne = async (doc: LeadershipProfile) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/leadership", {
        method: doc._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Save failed");
      setMessage({ type: "ok", text: doc._id ? "Updated." : "Added." });
      setEditing(null);
      setAdding(false);
      load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const deleteOne = async (id: string) => {
    if (!confirm("Remove this profile?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/leadership?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Delete failed");
      setMessage({ type: "ok", text: "Removed." });
      setEditing(null);
      load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Delete failed" });
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

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Leadership profiles</h1>
      <p className="text-zinc-600 text-sm mb-6">Names, titles, and short messages.</p>
      {message && (
        <p
          className={
            message.type === "ok" ? "text-green-600 text-sm mb-4" : "text-red-600 text-sm mb-4"
          }
        >
          {message.text}
        </p>
      )}
      {!adding && !editing && (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Add profile
        </button>
      )}
      {(adding || editing) && (
        <LeadershipForm
          initial={
            editing ?? {
              name: "",
              title: "",
              shortMessage: "",
              order: list.length,
            }
          }
          onSave={saveOne}
          onCancel={() => {
            setAdding(false);
            setEditing(null);
          }}
          saving={saving}
        />
      )}
      <div className="space-y-4">
        {list.map((p, i) => (
          <div
            key={p._id || i}
            className="p-4 border border-zinc-200 rounded-lg bg-white flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-zinc-900">{p.name}</p>
              <p className="text-sm text-zinc-500">{p.title}</p>
              <p className="text-sm text-zinc-600 mt-1">{p.shortMessage}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              {p._id && (
                <button
                  type="button"
                  onClick={() => deleteOne(p._id!)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadershipForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: LeadershipProfile;
  onSave: (d: LeadershipProfile) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [d, setD] = useState(initial);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(d);
      }}
      className="mb-8 p-6 border border-zinc-200 rounded-xl bg-white space-y-4"
    >
      <h2 className="font-semibold text-zinc-900">{initial._id ? "Edit profile" : "New profile"}</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.name}
          onChange={(e) => setD((p) => ({ ...p, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.title}
          onChange={(e) => setD((p) => ({ ...p, title: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Short message</label>
        <textarea
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[80px]"
          value={d.shortMessage}
          onChange={(e) => setD((p) => ({ ...p, shortMessage: e.target.value }))}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-zinc-300 rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  );
}
