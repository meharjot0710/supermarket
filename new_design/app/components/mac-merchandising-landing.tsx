import Image from "next/image";
import Link from "next/link";
import { FeaturedProductsMarquee } from "./featured-products-marquee";
import { HeroBrandCardsAutoScroll } from "./hero-brand-cards-auto-scroll";
import { MacLogo } from "./mac-logo";
import { NewsletterCatalogueStrip } from "./newsletter-catalogue-strip";
import { ServiceImageCarousel } from "./service-image-carousel";
import { SiteHeaderBar } from "./site-header-bar";
import { TrustedBrandLogoMarquee } from "./trusted-brand-logo-marquee";
import { siteContent } from "../site-content";
import type { ResolvedHeroContent } from "@/lib/hero-cms";

function CarouselRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mac-scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
      {children}
    </div>
  );
}

type MacMerchandisingLandingProps = {
  heroContent?: ResolvedHeroContent;
};

export default function MacMerchandisingLanding({
  heroContent,
}: MacMerchandisingLandingProps) {
  const { services, trustedBrands, hero: defaultHero } = siteContent;
  const hero = heroContent ?? defaultHero;

  return (
    <div className="flex flex-col">
      <section
        className="overflow-hidden text-white"
        style={{ backgroundColor: "var(--mac-hero-blue)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12 lg:py-12">
          <div className="max-w-xl text-left lg:max-w-none">
            <MacLogo variant="light" size="hero" className="mb-5 sm:mb-6" />
            {/* <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/85 bg-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:mb-8 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.16em]">
              <span
                className="inline-block size-1.5 shrink-0 rounded-full bg-white"
                aria-hidden
              />
              <span className="min-w-0">{hero.badge}</span>
            </div> */}
            <h1
              className="font-heading mb-6 max-w-xl text-[1.65rem] font-bold uppercase leading-[1.06] tracking-tight sm:mb-8 sm:text-4xl sm:leading-[1.05] lg:max-w-2xl lg:text-5xl xl:text-6xl"
              style={{ color: "var(--mac-hero-heading)" }}
            >
              {hero.subtitle}
            </h1>
            {/* <p className="mb-8 max-w-xl text-base font-normal normal-case leading-relaxed text-white/90 sm:mb-10 sm:text-lg">
              {hero.subtitle}
            </p> */}
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:gap-5">
              <Link
                href={siteContent.hero.ctaPrimary.href}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl bg-black px-8 py-3.5 text-center text-base font-medium text-white shadow-[0_14px_36px_-14px_rgba(0,0,0,0.55)] transition hover:bg-neutral-900 sm:flex-initial sm:min-h-0 sm:px-8 sm:py-4"
              >
                {siteContent.hero.ctaPrimary.label}
              </Link>
              <Link
                href={siteContent.hero.ctaSecondary.href}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl border-2 border-white bg-transparent px-8 py-3.5 text-center text-base font-medium text-white transition hover:bg-white/10 sm:flex-initial sm:min-h-0 sm:px-8 sm:py-4"
              >
                {siteContent.hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroBrandCardsAutoScroll variant="hero" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 sm:py-20">
        <h2 className="font-heading mb-8 text-center text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
            About US
        </h2>
        <div className="mx-auto max-w-3xl px-5 text-center text-base leading-relaxed text-neutral-700 sm:px-8 sm:text-lg">
          <p>{siteContent.intro}</p>
        </div>
      </section>

      {/* <SiteHeaderBar /> */}

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-20 bg-white pb-20 pt-14 sm:pb-28 sm:pt-20"
      >
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
                  <ServiceImageCarousel
                    images={col.images}
                    alt={col.imageAlt}
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
          <TrustedBrandLogoMarquee brands={trustedBrands.names} />
        </div>
      </section>

      {/* Featured range */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-heading mb-8 text-center text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
            {siteContent.featuredProducts.title}
          </h2>
          <FeaturedProductsMarquee items={siteContent.featuredProducts.items} />
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
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm leading-relaxed text-[var(--mac-muted)] sm:text-base">
            Meet the team behind SuperMarketing's commitment to quality and service.
          </p>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {siteContent.about.leadership.map((person) => (
              <article
                key={`${person.name}-${person.title}`}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 shadow-sm"
              >
                <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-200">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-lg font-bold text-black">{person.name}</p>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[var(--mac-teal)]">
                  {person.title}
                </p>
                <p className="text-sm leading-relaxed text-[var(--mac-muted)]">
                  {person.shortMessage}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCatalogueStrip items={siteContent.newsletterCatalogue.items} />

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
              {siteContent.cta.headline1}
            </h2>
            <h2 className="font-heading mt-2 text-4xl font-bold uppercase leading-tight tracking-tight text-black sm:text-5xl">
              {siteContent.cta.headline2}
            </h2>
            <h2 className="font-heading mt-2 text-4xl font-bold uppercase leading-tight tracking-tight text-[var(--mac-teal)] sm:text-5xl">
              {siteContent.cta.headline3}
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
