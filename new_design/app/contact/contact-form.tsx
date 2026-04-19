"use client";

import { useState } from "react";

type ContactFormProps = {
  initialMessage?: string;
};

export function ContactForm({ initialMessage = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "contact",
          name,
          email,
          company,
          message,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setNotice({
          type: "err",
          text: data.error ?? "Failed to send. Please try again.",
        });
        return;
      }
      setNotice({ type: "ok", text: "Message sent. We'll get back to you soon." });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setNotice({ type: "err", text: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {notice ? (
        <p
          className={
            notice.type === "ok"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          }
        >
          {notice.text}
        </p>
      ) : null}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-600">
          Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[var(--mac-teal)]/30 focus:ring-2"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-600">
          Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[var(--mac-teal)]/30 focus:ring-2"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-600">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[var(--mac-teal)]/30 focus:ring-2"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-600">
          Message *
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none ring-[var(--mac-teal)]/30 focus:ring-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-900 disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
