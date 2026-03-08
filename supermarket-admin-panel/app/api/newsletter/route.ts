import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { NewsletterContent } from "@/types/cms";

const COLLECTION = "newsletter";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db
      .collection<NewsletterContent>(COLLECTION)
      .findOne({});
    return NextResponse.json(doc || null);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch newsletter content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: NewsletterContent = await request.json();
    const db = await getDb();
    const { _id, ...data } = body;
    await db.collection<NewsletterContent>(COLLECTION).updateOne(
      {},
      { $set: data },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update newsletter content" },
      { status: 500 }
    );
  }
}
