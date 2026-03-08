import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { OptionalId, Document } from "mongodb";
import type {
  HeroContent,
  ListItem,
  NewsletterContent,
  FormContent,
  SeoFields,
} from "@/types/cms";

/**
 * One-time seed: GET /api/seed
 * Seeds default content if collections are empty. Safe to call multiple times.
 */
export async function GET() {
  try {
    const db = await getDb();

    const hero = await db.collection("hero").findOne({});
    if (!hero) {
      await db.collection("hero").insertOne({
        tagline: "FMCG Wholesaler & Distributor | Australia",
        headline: "SUPERMARKETING",
        subtitle:
          "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
        ctaPrimaryText: "Discover Our Range",
        ctaSecondaryText: "Retailer Signup",
        insightLabel: "Market Insight",
        insightQuote:
          "We understand the complexity of today's FMCG retail market.",
      } as OptionalId<Document>);
    }

    const storesCount = await db.collection("stores").countDocuments();
    if (storesCount === 0) {
      const stores: ListItem[] = [
        "Ritchies", "Champions", "Romeos", "Supabarn", "Michael", "RedDrop",
        "Le-Max Group", "IGA Ryan", "Carlos", "Bernardis", "Ashcrofts", "Supamart IGA",
      ].map((name, order) => ({ name, order }));
      await db.collection("stores").insertMany(stores as OptionalId<Document>[]);
    }

    const brandsCount = await db.collection("brands").countDocuments();
    if (brandsCount === 0) {
      const brands: ListItem[] = [
        "Rosella", "Scrub Daddy", "Buderim", "G-Fresh", "Capi", "Coco Coast", "Bow Wow", "Pink Stuff",
      ].map((name, order) => ({ name, order }));
      await db.collection("brands").insertMany(brands as OptionalId<Document>[]);
    }

    const newsletter = await db.collection("newsletter").findOne({});
    if (!newsletter) {
      await db.collection("newsletter").insertOne({
        heading: "Stay updated",
        subheading: "Get the latest offers and news.",
        buttonText: "Subscribe",
        successMessage: "Thanks for subscribing!",
      } as OptionalId<Document>);
    }

    const formsCount = await db.collection("forms").countDocuments();
    if (formsCount === 0) {
      const forms: FormContent[] = [
        {
          formId: "signup",
          title: "Retailer Signup",
          introText:
            "Supermarketing is a trusted wholesale distributor of natural and FMCG products in Australia, supplying better-for-you snacks, pantry staples, protein and supplements, as well as eco-living and cleaning products.",
          confirmationMessage: "Application submitted successfully! We'll be in touch.",
          submitButtonText: "Submit Application",
        },
        {
          formId: "contact",
          title: "Contact Us",
          introText: "Get in touch with our team.",
          confirmationMessage: "Thank you. We'll get back to you soon.",
          submitButtonText: "Send",
        },
      ];
      await db.collection("forms").insertMany(forms as OptionalId<Document>[]);
    }

    const seoCount = await db.collection("seo").countDocuments();
    if (seoCount === 0) {
      const seo: SeoFields[] = [
        {
          pageKey: "home",
          pageTitle: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
          metaDescription:
            "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
        },
        { pageKey: "about", pageTitle: "About Us | SuperMarketing", metaDescription: "Learn about SuperMarketing and our team." },
        { pageKey: "products", pageTitle: "Products | SuperMarketing", metaDescription: "Browse our wholesale product catalogue." },
        { pageKey: "contact", pageTitle: "Contact | SuperMarketing", metaDescription: "Get in touch with SuperMarketing." },
      ];
      await db.collection("seo").insertMany(seo as OptionalId<Document>[]);
    }

    return NextResponse.json({ success: true, message: "Seed completed." });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Seed failed", message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
