"use client";

import { useState, useEffect } from "react";
import type { JobListing } from "@/types/cms";

export default function CareersPage() {
  const [list, setList] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editing, setEditing] = useState<JobListing | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () =>
    fetch("/api/careers")
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const saveOne = async (doc: JobListing) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/careers", {
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
    if (!confirm("Remove this job listing?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/careers?id=${encodeURIComponent(id)}`, { method: "DELETE" });
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
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Careers / job listings</h1>
      <p className="text-zinc-600 text-sm mb-6">Add and edit job listings.</p>
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
          Add job
        </button>
      )}
      {(adding || editing) && (
        <JobForm
          initial={
            editing ?? {
              title: "",
              location: "",
              type: "Full-time",
              description: "",
              order: list.length,
              active: true,
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
        {list.map((j, i) => (
          <div
            key={j._id || i}
            className="p-4 border border-zinc-200 rounded-lg bg-white flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-zinc-900">{j.title}</p>
              <p className="text-sm text-zinc-500">
                {j.location} · {j.type} {!j.active && "(inactive)"}
              </p>
              <p className="text-sm text-zinc-600 mt-1 line-clamp-2">{j.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(j)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              {j._id && (
                <button
                  type="button"
                  onClick={() => deleteOne(j._id!)}
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

function JobForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: JobListing;
  onSave: (d: JobListing) => void;
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
      <h2 className="font-semibold text-zinc-900">{initial._id ? "Edit job" : "New job"}</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.title}
          onChange={(e) => setD((p) => ({ ...p, title: e.target.value }))}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
            value={d.location}
            onChange={(e) => setD((p) => ({ ...p, location: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
            value={d.type}
            onChange={(e) => setD((p) => ({ ...p, type: e.target.value }))}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Casual</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[120px]"
          value={d.description}
          onChange={(e) => setD((p) => ({ ...p, description: e.target.value }))}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={d.active}
          onChange={(e) => setD((p) => ({ ...p, active: e.target.checked }))}
        />
        <label htmlFor="active" className="text-sm">Active (show on site)</label>
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
