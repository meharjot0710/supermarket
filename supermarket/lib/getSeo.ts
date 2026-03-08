import { getDb } from "@/lib/mongodb";
import type { SeoFields } from "@/types/cms";

export async function getSeoForPage(pageKey: string): Promise<Pick<SeoFields, "pageTitle" | "metaDescription"> | null> {
  try {
    const db = await getDb();
    if (!db) return null;
    const doc = await db.collection("seo").findOne({ pageKey });
    if (!doc || typeof doc.pageTitle !== "string") return null;
    return {
      pageTitle: doc.pageTitle,
      metaDescription: typeof doc.metaDescription === "string" ? doc.metaDescription : "",
    };
  } catch {
    return null;
  }
}
