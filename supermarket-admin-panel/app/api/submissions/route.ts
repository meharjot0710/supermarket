import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const COLLECTION = "form_submissions";

export async function GET() {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }
    const list = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    // Serialize dates and _id for JSON
    const out = list.map((doc) => ({
      _id: doc._id.toString(),
      formId: doc.formId,
      payload: doc.payload,
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    }));
    return NextResponse.json(out);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
