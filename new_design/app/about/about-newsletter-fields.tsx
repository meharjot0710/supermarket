"use client";

type Props = {
  buttonText: string;
  hasPdf: boolean;
};

export function AboutNewsletterFields({ buttonText, hasPdf }: Props) {
  if (!hasPdf) {
    return (
      <p className="mt-8 text-sm leading-relaxed text-white/60">
        The latest newsletter PDF will appear here once it has been uploaded in the admin
        panel.
      </p>
    );
  }

  return (
    <div className="mt-8 flex justify-center">
      <a
        href="/api/newsletter-pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-100"
      >
        {buttonText}
      </a>
    </div>
  );
}
