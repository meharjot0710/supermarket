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
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export async function loadHeroFromDb(): Promise<ResolvedHeroContent> {
  const fallback = siteContent.hero;
  const db = await getDb();

  if (!db) {
    return {
      badge: fallback.badge,
      headline: fallback.headline,
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
        subtitle: fallback.subtitle,
        ctaPrimary: { ...fallback.ctaPrimary },
        ctaSecondary: { ...fallback.ctaSecondary },
      };
    }

    return {
      badge: asString(doc.tagline) ?? fallback.badge,
      headline: asString(doc.headline) ?? fallback.headline,
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
      subtitle: fallback.subtitle,
      ctaPrimary: { ...fallback.ctaPrimary },
      ctaSecondary: { ...fallback.ctaSecondary },
    };
  }
}
