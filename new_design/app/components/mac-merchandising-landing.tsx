import Image from "next/image";
import Link from "next/link";
import { HeroBrandCardsAutoScroll } from "./hero-brand-cards-auto-scroll";
import { MacLogo } from "./mac-logo";
import { SiteHeaderBar } from "./site-header-bar";
import { siteContent } from "../site-content";

function CarouselRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mac-scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
      {children}
    </div>
  );
}

export default function MacMerchandisingLanding() {
  const { hero, services, trustedBrands, trustedRetailers } = siteContent;
  const trustedCarouselNames = [
    ...trustedBrands.names,
    ...trustedRetailers.names,
  ];

  return (
    <div className="flex flex-col">
      <section
        className="text-white"
        style={{ backgroundColor: "var(--mac-hero-blue)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:py-20">
          <div className="max-w-xl lg:max-w-none">
            <MacLogo variant="light" className="mb-8" />
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
              <span className="inline-block size-1.5 rounded-full bg-white" />
              {hero.badge}
            </div>
            <h1 className="font-heading mb-10 max-w-xl text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.15rem] xl:text-[3.4rem]">
              {hero.headline}
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={hero.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-medium text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] transition hover:bg-neutral-900"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 bg-transparent px-8 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroBrandCardsAutoScroll />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center text-base leading-relaxed text-neutral-700 sm:px-8 sm:text-lg">
          <p>{siteContent.intro}</p>
        </div>
      </section>

      {/* <SiteHeaderBar /> */}

      {/* Services */}
      <section className="bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            {services.eyebrow}
          </p>
          <h2 className="font-heading mb-10 text-center text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
            {services.title}
          </h2>

          <div className="mb-10 hidden grid-cols-3 gap-6 md:grid">
            <div />
            <div className="flex justify-center">
              <div
                className="size-0 border-x-[10px] border-b-[14px] border-x-transparent border-b-[var(--mac-teal)]"
                aria-hidden
              />
            </div>
            <div />
          </div>

          <div className="mb-10 flex justify-center md:hidden">
            <div
              className="size-0 border-x-[10px] border-b-[14px] border-x-transparent border-b-[var(--mac-teal)]"
              aria-hidden
            />
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {services.columns.map((col) => (
              <article key={col.title}>
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shadow-sm ring-1 ring-black/5">
                  <Image
                    src={col.image}
                    alt={col.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mb-3 text-lg font-bold text-black">{col.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--mac-muted)]">
                  {col.lead}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--mac-muted)]">
                  {col.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-[var(--mac-muted)]">
                  {col.footer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-8 text-center text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
            {trustedBrands.title}
          </h2>
          <CarouselRow>
            {trustedCarouselNames.map((name) => (
              <div
                key={name}
                className="min-w-[160px] snap-center rounded-xl border border-neutral-200 bg-white px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-neutral-700 shadow-sm"
              >
                {name}
              </div>
            ))}
          </CarouselRow>
        </div>
      </section>

      {/* <SiteHeaderBar /> */}

      {/* What makes us different */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-6 text-center text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl">
            {siteContent.differentiators.title}
            <br />
            {siteContent.differentiators.titleAccent}
          </h2>
          <p className="mx-auto mb-14 max-w-3xl text-center text-base leading-relaxed text-[var(--mac-muted)] sm:text-lg">
            {siteContent.differentiators.intro}
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.differentiators.cards.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 shadow-sm"
              >
                <div className="mb-4 aspect-video w-full rounded-xl bg-neutral-200" />
                <h3 className="mb-2 text-lg font-bold text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--mac-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-neutral-900 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading mb-4 text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
                {siteContent.story.title}
              </h2>
              <h2 className="font-heading mb-8 text-4xl font-bold uppercase leading-tight tracking-tight text-[var(--mac-teal)] sm:text-5xl">
                {siteContent.story.titleAccent}
              </h2>
              {siteContent.story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-6 text-base leading-relaxed text-neutral-300 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--mac-teal)]">
                {siteContent.story.statsEyebrow}
              </p>
              <p className="font-heading mt-2 text-5xl font-bold uppercase sm:text-6xl">
                {siteContent.story.statsTitle}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 text-center">
                {siteContent.story.stats.map((s) => (
                  <div key={s.l}>
                    <p className="font-heading text-3xl font-bold text-white sm:text-4xl">
                      {s.v}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <SiteHeaderBar /> */}

      {/* Team */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-4 text-center text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
            {siteContent.team.title}
          </h2>
          <p className="font-heading mb-12 text-center text-4xl font-bold uppercase tracking-tight text-[var(--mac-teal)] sm:text-5xl">
            {siteContent.team.titleAccent}
          </p>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl bg-neutral-200 shadow-lg ring-1 ring-black/5 lg:mx-0">
              <Image
                src={siteContent.team.image}
                alt={siteContent.team.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 280px, 320px"
              />
            </div>
            <div className="text-[var(--mac-muted)]">
              <p className="mb-2 text-lg font-semibold text-black">
                {siteContent.team.leadName}
              </p>
              {siteContent.team.bio.map((p, i) => (
                <p key={i} className="mb-6 text-sm leading-relaxed last:mb-0">
                  {p}
                </p>
              ))}
              <p className="mt-6 text-sm">
                <Link
                  href={siteContent.team.aboutHref}
                  className="font-semibold text-[var(--mac-teal)] hover:underline"
                >
                  About us →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured range */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-8 text-center text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
            {siteContent.featuredProducts.title}
          </h2>
          <CarouselRow>
            {siteContent.featuredProducts.items.map((item) => (
              <div
                key={item.name}
                className="flex min-w-[200px] snap-center flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md"
              >
                <div className="aspect-[5/3] bg-gradient-to-br from-neutral-100 to-neutral-200" />
                <div className="p-4 text-center text-sm font-semibold text-neutral-800">
                  {item.name}
                </div>
              </div>
            ))}
          </CarouselRow>
        </div>
      </section>

      {/* Why partner */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-14 text-center text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl">
            {siteContent.whyPartner.title}
            <br />
            {siteContent.whyPartner.titleLine2}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {siteContent.whyPartner.cards.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-8 shadow-sm"
              >
                <h3 className="mb-2 text-xl font-bold text-black">{c.title}</h3>
                <p className="text-base leading-relaxed text-[var(--mac-muted)]">
                  {c.subtitle}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--mac-teal)]">
            {siteContent.whyPartner.footnote}
          </p>
        </div>
      </section>

      {/* CTA + footer */}
      <section className="border-t border-neutral-200 bg-[var(--mac-header-gray)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl">
              {siteContent.cta.headline1}{" "}
              <span className="text-[var(--mac-teal)]">
                {siteContent.cta.headline1Highlight}
              </span>{" "}
              {siteContent.cta.headline1Rest}
            </h2>
            <h2 className="font-heading mt-2 text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl">
              {siteContent.cta.headline2Before}{" "}
              <span className="text-[var(--mac-teal)]">
                {siteContent.cta.headline2Highlight}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--mac-muted)]">
              {siteContent.cta.blurb}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
            {siteContent.cta.contacts.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-semibold text-black">{block.title}</p>
                {block.lines.map((line) => (
                  <Link
                    key={line.label}
                    className="mt-2 block text-sm text-[var(--mac-teal)] hover:underline"
                    href={line.href}
                  >
                    {line.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <footer className="mt-16 flex flex-col items-center gap-4 border-t border-neutral-300 pt-10 text-center text-sm text-neutral-600">
            <p>
              © {new Date().getFullYear()} {siteContent.footer.copyright}.
            </p>
            {siteContent.footer.credit ? (
              <p className="text-xs text-neutral-500">{siteContent.footer.credit}</p>
            ) : null}
            <div className="flex gap-6 text-sm font-medium">
              <Link className="text-[var(--mac-teal)] hover:underline" href="/contact">
                Contact
              </Link>
              <Link className="text-[var(--mac-teal)] hover:underline" href="/about">
                About
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {siteContent.footer.tagline}
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
