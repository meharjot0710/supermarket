import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { HeroContent } from "@/types/cms";

const COLLECTION = "hero";

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection<HeroContent>(COLLECTION).findOne({});
    return NextResponse.json(doc || null);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch hero content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: HeroContent = await request.json();
    const db = await getDb();
    const { _id, ...data } = body;
    const result = await db.collection<HeroContent>(COLLECTION).updateOne(
      {},
      { $set: data },
      { upsert: true }
    );
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update hero content" },
      { status: 500 }
    );
  }
}
