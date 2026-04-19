import { siteContent } from "@/app/site-content";
import { getDb } from "@/lib/mongodb";

const DEFAULT_LEADERSHIP_IMAGES = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
] as const;

export type AboutLeadershipPerson = {
  name: string;
  title: string;
  shortMessage: string;
  image: string;
};

export type AboutCareerJob = {
  title: string;
  location: string;
  type: string;
  description?: string;
};

export type AboutNewsletterCopy = {
  heading: string;
  subheading: string;
  buttonText: string;
  /** True when a PDF was uploaded from the admin panel (MongoDB `newsletter` doc). */
  hasPdf: boolean;
};

function pickString(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

/**
 * Loads About-page CMS slices from MongoDB (same collections as `supermarket/`).
 * Falls back to `siteContent.about` when the DB is unavailable or a slice is empty.
 */
export type ResolvedAboutCareers = {
  eyebrow: string;
  title: string;
  intro: string;
  footerLine: string;
  jobs: AboutCareerJob[];
};

export type ResolvedAboutPage = {
  leadership: AboutLeadershipPerson[];
  careers: ResolvedAboutCareers;
  newsletter: AboutNewsletterCopy;
};

export async function loadAboutPageFromDb(): Promise<ResolvedAboutPage> {
  const base = siteContent.about;
  const fallback: ResolvedAboutPage = {
    leadership: base.leadership.map((p) => ({ ...p })) as AboutLeadershipPerson[],
    careers: {
      eyebrow: base.careers.eyebrow,
      title: base.careers.title,
      intro: base.careers.intro,
      footerLine: base.careers.footerLine,
      jobs: base.careers.jobs.map((j) => ({ ...j })) as AboutCareerJob[],
    },
    newsletter: { ...base.newsletter, hasPdf: false } as AboutNewsletterCopy,
  };

  const db = await getDb();
  if (!db) return fallback;

  try {
    const [leadershipDocs, careerDocsRaw, newsletterDoc] = await Promise.all([
      db.collection("leadership").find({}).sort({ order: 1 }).toArray(),
      db.collection("careers").find({}).sort({ order: 1 }).toArray(),
      db.collection("newsletter").findOne(
        {},
        {
          projection: {
            heading: 1,
            subheading: 1,
            buttonText: 1,
            pdfFileName: 1,
          },
        },
      ),
    ]);

    const careerDocs = careerDocsRaw.filter((doc) => {
      const active = (doc as { active?: boolean }).active;
      return active !== false;
    });

    let leadership = fallback.leadership;
    if (leadershipDocs.length > 0) {
      leadership = leadershipDocs.map((doc, i) => {
        const o = doc as Record<string, unknown>;
        const name = pickString(o, "name") ?? "Team member";
        const title = pickString(o, "title") ?? "";
        const shortMessage = pickString(o, "shortMessage") ?? "";
        const image =
          pickString(o, "image") ??
          DEFAULT_LEADERSHIP_IMAGES[i % DEFAULT_LEADERSHIP_IMAGES.length];
        return { name, title, shortMessage, image };
      });
    }

    let jobs = fallback.careers.jobs;
    if (careerDocs.length > 0) {
      jobs = careerDocs.map((doc) => {
        const o = doc as Record<string, unknown>;
        const desc = pickString(o, "description");
        return {
          title: pickString(o, "title") ?? "Role",
          location: pickString(o, "location") ?? "",
          type: pickString(o, "type") ?? "",
          ...(desc ? { description: desc } : {}),
        };
      });
    }

    let newsletter = fallback.newsletter;
    if (newsletterDoc && isPlainObject(newsletterDoc)) {
      const o = newsletterDoc;
      const heading = pickString(o, "heading");
      const hasPdf = !!(pickString(o, "pdfFileName")?.length);
      if (heading) {
        newsletter = {
          heading,
          subheading: pickString(o, "subheading") ?? base.newsletter.subheading,
          buttonText: pickString(o, "buttonText") ?? base.newsletter.buttonText,
          hasPdf,
        };
      } else if (hasPdf) {
        newsletter = { ...fallback.newsletter, hasPdf };
      }
    }

    return {
      leadership,
      careers: { ...fallback.careers, jobs },
      newsletter,
    };
  } catch (e) {
    console.error("[about-cms] load failed:", e);
    return fallback;
  }
}
