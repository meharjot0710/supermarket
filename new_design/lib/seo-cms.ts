import { getDb } from "@/lib/mongodb";

export type ResolvedSeo = {
  title: string;
  description: string;
};

type SeoDoc = {
  pageKey?: unknown;
  pageTitle?: unknown;
  metaDescription?: unknown;
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export async function loadSeoByPageKey(
  pageKey: string,
  fallback: ResolvedSeo,
): Promise<ResolvedSeo> {
  const db = await getDb();
  if (!db) return fallback;

  try {
    const doc = (await db.collection("seo").findOne({ pageKey })) as SeoDoc | null;
    if (!doc) return fallback;
    return {
      title: asString(doc.pageTitle) ?? fallback.title,
      description: asString(doc.metaDescription) ?? fallback.description,
    };
  } catch (error) {
    console.error("[seo-cms] load failed:", error);
    return fallback;
  }
}
