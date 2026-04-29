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

function labelFromKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value || "—";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
      .join(", ");
  }
  return JSON.stringify(value);
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
                    <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                      <div className="grid gap-2 sm:grid-cols-[180px_1fr]">
                        {Object.entries(sub.payload).map(([key, value]) => (
                          <div key={key} className="contents">
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              {labelFromKey(key)}
                            </p>
                            <p className="text-sm text-zinc-800 break-words">{renderValue(value)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
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
