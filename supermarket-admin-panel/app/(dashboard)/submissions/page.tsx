"use client";

import { useState, useEffect } from "react";
import { Inbox, ChevronDown, ChevronRight } from "lucide-react";

type Submission = {
  _id: string;
  formId: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

function summary(sub: Submission): string {
  const p = sub.payload;
  if (sub.formId === "contact") {
    const name = typeof p.name === "string" ? p.name : "";
    const email = typeof p.email === "string" ? p.email : "";
    return [name, email].filter(Boolean).join(" · ") || "—";
  }
  if (sub.formId === "signup") {
    const trading = typeof p.tradingAs === "string" ? p.tradingAs : "";
    const legal = typeof p.legalName === "string" ? p.legalName : "";
    return trading || legal || "—";
  }
  return Object.keys(p).length ? "View details" : "—";
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function SubmissionsPage() {
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/submissions")
      .then((r) => r.json())
      .then((data) => (Array.isArray(data) ? data : []))
      .then(setList)
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? list : list.filter((s) => s.formId === filter);
  const formIds = Array.from(new Set(list.map((s) => s.formId)));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Form submissions</h1>
      <p className="text-zinc-600 text-sm mb-6">
        Data submitted from the website: Retailer Signup and Contact forms.
      </p>

      {formIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
          >
            All ({list.length})
          </button>
          {formIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === id
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
              }`}
            >
              {id === "signup" ? "Retailer Signup" : id === "contact" ? "Contact" : id}
              {" "}({list.filter((s) => s.formId === id).length})
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="border border-zinc-200 rounded-xl bg-white p-12 text-center text-zinc-500">
          <Inbox size={40} className="mx-auto mb-3 opacity-50" />
          <p>No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((sub) => {
            const isOpen = expanded.has(sub._id);
            return (
              <div
                key={sub._id}
                className="border border-zinc-200 rounded-lg bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(sub._id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
                >
                  {isOpen ? (
                    <ChevronDown size={18} className="text-zinc-400 shrink-0" />
                  ) : (
                    <ChevronRight size={18} className="text-zinc-400 shrink-0" />
                  )}
                  <span className="text-xs font-medium text-zinc-500 w-24 shrink-0">
                    {sub.formId === "signup" ? "Signup" : sub.formId === "contact" ? "Contact" : sub.formId}
                  </span>
                  <span className="text-sm text-zinc-900 truncate flex-1 min-w-0">
                    {summary(sub)}
                  </span>
                  <span className="text-xs text-zinc-400 shrink-0">
                    {formatDate(sub.createdAt)}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0 border-t border-zinc-100">
                    <pre className="text-xs bg-zinc-50 p-4 rounded-lg overflow-auto max-h-96 text-zinc-700 whitespace-pre-wrap break-words">
                      {JSON.stringify(sub.payload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
