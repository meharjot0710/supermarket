import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { ListItem } from "@/types/cms";

const COLLECTION = "brands";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection<ListItem>(COLLECTION)
      .find({})
      .sort({ order: 1 })
      .toArray();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: { items: ListItem[] } = await request.json();
    const db = await getDb();
    await db.collection(COLLECTION).deleteMany({});
    if (body.items?.length) {
      const toInsert = body.items.map((item, i) => ({
        name: item.name,
        order: item.order ?? i,
      }));
      await db.collection(COLLECTION).insertMany(toInsert);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update brands" },
      { status: 500 }
    );
  }
}
