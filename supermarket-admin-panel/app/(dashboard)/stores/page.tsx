"use client";

import { useState, useEffect } from "react";
import type { ListItem } from "@/types/cms";

const defaultStores = [
  "Ritchies", "Champions", "Romeos", "Supabarn", "Michael", "RedDrop",
  "Le-Max Group", "IGA Ryan", "Carlos", "Bernardis", "Ashcrofts", "Supamart IGA",
];

export default function StoresPage() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/stores")
      .then((r) => r.json())
      .then((list) => {
        if (Array.isArray(list) && list.length) {
          setItems(list);
        } else {
          setItems(defaultStores.map((name, i) => ({ name, order: i })));
        }
      })
      .catch(() => setItems(defaultStores.map((name, i) => ({ name, order: i }))))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/stores", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
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

  const add = () => setItems((prev) => [...prev, { name: "", order: prev.length }]);
  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i).map((it, idx) => ({ ...it, order: idx })));
  const update = (i: number, name: string) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, name } : it)));

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-zinc-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-2xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Store Listings</h1>
      <p className="text-zinc-600 text-sm mb-6">Names and order only (Trusted By section).</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-zinc-400 w-6 text-sm">{i + 1}.</span>
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg"
              value={item.name}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Store name"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 border border-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-100"
        >
          Add store
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {message && (
          <span className={message.type === "ok" ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
