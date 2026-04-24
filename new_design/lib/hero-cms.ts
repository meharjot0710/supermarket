import { siteContent } from "@/app/site-content";
import { getDb } from "@/lib/mongodb";

type HeroDoc = {
  tagline?: unknown;
  headline?: unknown;
  subtitle?: unknown;
  ctaPrimaryText?: unknown;
  ctaSecondaryText?: unknown;
};

export type ResolvedHeroContent = {
  badge: string;
  headline: string;
  /** Stacked main title; use newlines in CMS `headline` to override. */
  headlineLines: string[];
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function headlineLinesFromString(
  headline: string | null,
  fallbackLines: readonly string[],
): string[] {
  if (!headline) return [...fallbackLines];
  const parts = headline
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length > 0) return [...parts];
  return [...fallbackLines];
}

export async function loadHeroFromDb(): Promise<ResolvedHeroContent> {
  const fallback = siteContent.hero;
  const db = await getDb();

  if (!db) {
    return {
      badge: fallback.badge,
      headline: fallback.headline,
      headlineLines: [...fallback.headlineLines],
      subtitle: fallback.subtitle,
      ctaPrimary: { ...fallback.ctaPrimary },
      ctaSecondary: { ...fallback.ctaSecondary },
    };
  }

  try {
    const doc = (await db.collection("hero").findOne({})) as HeroDoc | null;
    if (!doc) {
      return {
        badge: fallback.badge,
        headline: fallback.headline,
        headlineLines: [...fallback.headlineLines],
        subtitle: fallback.subtitle,
        ctaPrimary: { ...fallback.ctaPrimary },
        ctaSecondary: { ...fallback.ctaSecondary },
      };
    }

    const headlineStr = asString(doc.headline) ?? fallback.headline;

    return {
      badge: asString(doc.tagline) ?? fallback.badge,
      headline: headlineStr,
      headlineLines: headlineLinesFromString(
        asString(doc.headline),
        fallback.headlineLines,
      ),
      subtitle: asString(doc.subtitle) ?? fallback.subtitle,
      ctaPrimary: {
        href: fallback.ctaPrimary.href,
        label: asString(doc.ctaPrimaryText) ?? fallback.ctaPrimary.label,
      },
      ctaSecondary: {
        href: fallback.ctaSecondary.href,
        label: asString(doc.ctaSecondaryText) ?? fallback.ctaSecondary.label,
      },
    };
  } catch (e) {
    console.error("[hero-cms] load failed:", e);
    return {
      badge: fallback.badge,
      headline: fallback.headline,
      headlineLines: [...fallback.headlineLines],
      subtitle: fallback.subtitle,
      ctaPrimary: { ...fallback.ctaPrimary },
      ctaSecondary: { ...fallback.ctaSecondary },
    };
  }
}
