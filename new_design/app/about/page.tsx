import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { loadAboutPageFromDb } from "@/lib/about-cms";
import { SiteHeaderBar } from "../components/site-header-bar";
import { siteContent } from "../site-content";
import { AboutContactFields } from "./about-contact-fields";
import { AboutNewsletterFields } from "./about-newsletter-fields";

export const metadata: Metadata = {
  title: "About us | SuperMarketing",
  description: String(siteContent.about.bannerSubtitle),
};

/** CMS-backed sections must be read at request time, not at build/prerender. */
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { about } = siteContent;
  const cms = await loadAboutPageFromDb();

  return (
    <div className="bg-white pb-24">
      <SiteHeaderBar />

      <section
        className="text-white"
        style={{ backgroundColor: "var(--mac-hero-blue)" }}
      >
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
            {about.bannerTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {about.bannerSubtitle}
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-mac-teal">
            {about.storyEyebrow}
          </p>
          <h2 className="font-heading mb-8 text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
            {about.storyTitle}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-mac-muted sm:text-base">
            {about.storyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-neutral-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-mac-teal">
            {about.leadershipEyebrow}
          </p>
          <h2 className="font-heading mb-4 text-center text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
            {about.leadershipTitle}
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-sm text-mac-muted">
            {about.leadershipIntro}
          </p>
          <div className="grid gap-10 md:grid-cols-3">
            {cms.leadership.map((person, i) => (
              <article
                key={`${person.name}-${i}`}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width={220}
                  height={220}
                  className="mb-6 mx-auto h-[220px] w-[220px] max-w-full rounded-xl object-cover"
                  sizes="220px"
                />
                <h3 className="text-lg font-bold text-black">{person.name}</h3>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-mac-teal">
                  {person.title}
                </p>
                <p className="text-sm leading-relaxed text-mac-muted">
                  {person.shortMessage}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {cms.newsletter.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              {cms.newsletter.subheading}
            </p>
            <AboutNewsletterFields
              buttonText={cms.newsletter.buttonText}
              hasPdf={cms.newsletter.hasPdf}
            />
          </div>
        </div>
      </section>

      <section id="careers" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-mac-teal">
            {cms.careers.eyebrow}
          </p>
          <h2 className="font-heading mb-4 text-center text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
            {cms.careers.title}
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-sm text-mac-muted">
            {cms.careers.intro}
          </p>
          <div className="space-y-4">
            {cms.careers.jobs.map((job, i) => (
              <div
                key={`${job.title}-${job.location}-${i}`}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 shadow-sm sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-bold text-black">{job.title}</h3>
                  <p className="text-sm text-mac-muted">
                    {job.location} · {job.type}
                  </p>
                  {job.description ? (
                    <p className="mt-2 line-clamp-3 text-sm text-mac-muted">{job.description}</p>
                  ) : null}
                </div>
                <Link
                  href="/contact?from=careers"
                  className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-mac-teal hover:underline"
                >
                  Enquire →
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-mac-muted">
            {cms.careers.footerLine}
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[var(--mac-header-gray)] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-black">
            {about.contact.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mac-muted">{about.contact.intro}</p>
          <AboutContactFields />
        </div>
      </section>

      <section className="border-t border-neutral-200 py-10">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Link href="/" className="text-sm font-semibold text-mac-teal hover:underline">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
