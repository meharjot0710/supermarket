import { siteContent } from "@/app/site-content";
import { getDb } from "@/lib/mongodb";

type MediaServiceColumn = { title?: unknown; images?: unknown };
type MediaFeaturedItem = { name?: unknown; hint?: unknown; image?: unknown };
type MediaNewsletterItem = {
  title?: unknown;
  issue?: unknown;
  coverImage?: unknown;
  pdfUrl?: unknown;
};
type HomeMediaDoc = {
  key?: unknown;
  content?: {
    services?: { columns?: MediaServiceColumn[] };
    featuredProducts?: { items?: MediaFeaturedItem[] };
    newsletterCatalogue?: { items?: MediaNewsletterItem[] };
  };
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeMediaUrl(url: string): string {
  const m = url.match(
    /^https?:\/\/(?:[a-z0-9-]+\.)?storage\.bunnycdn\.com\/([^/]+)\/(.+)$/i,
  );
  if (!m) return url;
  const zone = m[1];
  const rest = m[2];
  return `https://${zone}.b-cdn.net/${rest}`;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(asString)
    .filter((v): v is string => v !== null)
    .map(normalizeMediaUrl);
}

export type ResolvedHomeMedia = {
  servicesColumns: Array<{
    image: string;
    images: string[];
    imageAlt: string;
    title: string;
    lead: string;
    bullets: string[];
    footer: string;
  }>;
  featuredItems: Array<{
    name: string;
    hint: string;
    image: string;
  }>;
  newsletterItems: Array<{
    title: string;
    issue: string;
    coverImage: string;
    pdfUrl: string;
  }>;
};

export async function loadHomeMediaFromDb(): Promise<ResolvedHomeMedia> {
  const fallback: ResolvedHomeMedia = {
    // Keep copy/text from site content, but do not use hardcoded media when admin media exists.
    servicesColumns: siteContent.services.columns.map((c) => ({
      ...c,
      image: "",
      images: [],
      bullets: [...c.bullets],
    })),
    featuredItems: siteContent.featuredProducts.items.map((i) => ({ ...i })),
    newsletterItems: [],
  };

  const db = await getDb();
  if (!db) return fallback;

  try {
    const doc = (await db.collection("home_media").findOne({ key: "home" })) as HomeMediaDoc | null;
    const content = doc?.content;
    if (!content) return fallback;

    const servicesByTitle = new Map<string, string[]>();
    const rawCols = content.services?.columns;
    if (Array.isArray(rawCols)) {
      for (const c of rawCols) {
        const title = asString(c?.title);
        const images = asStringArray(c?.images);
        if (title && images.length > 0) servicesByTitle.set(title, images);
      }
    }

    const servicesColumns = fallback.servicesColumns.map((c) => {
      const overrideImages = servicesByTitle.get(c.title);
      if (!overrideImages || overrideImages.length === 0) return c;
      return {
        ...c,
        image: overrideImages[0],
        images: overrideImages,
      };
    });

    const rawNewsletter = content.newsletterCatalogue?.items;
    const newsletterItems =
      Array.isArray(rawNewsletter) && rawNewsletter.length > 0
        ? rawNewsletter
            .map((item) => ({
              title: asString(item?.title) ?? "Team News",
              issue: asString(item?.issue) ?? "",
              coverImage: (() => {
                const img = asString(item?.coverImage);
                return img ? normalizeMediaUrl(img) : "/Supermarketing%20Logo/re.png";
              })(),
              pdfUrl: (() => {
                const pdf = asString(item?.pdfUrl);
                return pdf ? normalizeMediaUrl(pdf) : null;
              })(),
            }))
            .filter(
              (x): x is { title: string; issue: string; coverImage: string; pdfUrl: string } =>
                !!x.pdfUrl,
            )
        : [];

    return {
      servicesColumns,
      featuredItems: fallback.featuredItems,
      newsletterItems,
    };
  } catch (error) {
    console.error("[home-media-cms] load failed:", error);
    return fallback;
  }
}
