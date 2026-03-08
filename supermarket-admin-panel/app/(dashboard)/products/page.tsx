"use client";

import { useState, useEffect } from "react";
import type { ProductRecord } from "@/types/cms";

const categories = [
  "Beverages",
  "Pantry & Condiments",
  "Cleaning & Household",
  "Snacks & Confectionery",
  "Pet Care",
  "Health & Wellness",
];

export default function ProductsPage() {
  const [list, setList] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editing, setEditing] = useState<ProductRecord | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () =>
    fetch("/api/products")
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Update failed");
      setMessage({ type: "ok", text: "Product updated." });
      setEditing(null);
      load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Update failed" });
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Delete failed");
      setMessage({ type: "ok", text: "Product deleted." });
      setEditing(null);
      load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Delete failed" });
    } finally {
      setSaving(false);
    }
  };

  const createProduct = async (doc: Omit<ProductRecord, "_id">) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Create failed");
      setMessage({ type: "ok", text: "Product added." });
      setAdding(false);
      load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Create failed" });
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
    <div className="p-8 md:p-12 max-w-4xl">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Products</h1>
      <p className="text-zinc-600 text-sm mb-6">
        Add / edit / remove products and descriptions. Images and layout are fixed on the main site.
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
      <div className="mb-6">
        {!adding ? (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Add product
          </button>
        ) : (
          <ProductForm
            initial={{
              id: "",
              name: "",
              category: categories[0],
              brand: "",
              image: "",
              unit: "",
              minOrder: "",
              description: "",
            }}
            categories={categories}
            onSave={(d) => createProduct(d)}
            onCancel={() => setAdding(false)}
            saving={saving}
          />
        )}
      </div>
      <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 border-b border-zinc-200">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Brand</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-left p-3 font-medium">Description</th>
              <th className="p-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p._id || p.id} className="border-b border-zinc-100">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 max-w-[200px] truncate">{p.description || "—"}</td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => p._id && deleteProduct(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold mb-4">Edit product</h2>
            <ProductForm
              initial={editing}
              categories={categories}
              onSave={saveEdit}
              onCancel={() => setEditing(null)}
              saving={saving}
              isEdit
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({
  initial,
  categories,
  onSave,
  onCancel,
  saving,
  isEdit,
}: {
  initial: ProductRecord;
  categories: string[];
  onSave: (d: ProductRecord) => void;
  onCancel: () => void;
  saving: boolean;
  isEdit?: boolean;
}) {
  const [d, setD] = useState(initial);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(d);
      }}
      className="space-y-4"
    >
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
        <label className="block text-sm font-medium mb-1">Brand</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.brand}
          onChange={(e) => setD((p) => ({ ...p, brand: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.category}
          onChange={(e) => setD((p) => ({ ...p, category: e.target.value }))}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Unit (e.g. Case of 12)</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.unit}
          onChange={(e) => setD((p) => ({ ...p, unit: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Min order</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
          value={d.minOrder}
          onChange={(e) => setD((p) => ({ ...p, minOrder: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg min-h-[80px]"
          value={d.description}
          onChange={(e) => setD((p) => ({ ...p, description: e.target.value }))}
        />
      </div>
      {!isEdit && (
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (fixed on site; optional)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
            value={d.image}
            onChange={(e) => setD((p) => ({ ...p, image: e.target.value }))}
            placeholder="https://..."
          />
        </div>
      )}
      {!isEdit && (
        <div>
          <label className="block text-sm font-medium mb-1">ID (unique slug)</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg"
            value={d.id}
            onChange={(e) => setD((p) => ({ ...p, id: e.target.value }))}
            placeholder="e.g. product-1"
          />
        </div>
      )}
      <div className="flex gap-3 pt-2">
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
