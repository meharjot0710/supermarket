import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { SeoFields } from "@/types/cms";

const COLLECTION = "seo";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db.collection<SeoFields>(COLLECTION).find({}).toArray();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch SEO fields" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: SeoFields & { _id?: string } = await request.json();
    const { pageKey, pageTitle, metaDescription } = body;
    if (!pageKey) {
      return NextResponse.json({ error: "Missing pageKey" }, { status: 400 });
    }
    const db = await getDb();
    await db.collection<SeoFields>(COLLECTION).updateOne(
      { pageKey },
      { $set: { pageKey, pageTitle: pageTitle ?? "", metaDescription: metaDescription ?? "" } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update SEO fields" },
      { status: 500 }
    );
  }
}
