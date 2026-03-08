import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");
    const db = await getDb();
    if (!db) return NextResponse.json(null);
    if (formId) {
      const doc = await db.collection("forms").findOne({ formId });
      return NextResponse.json(doc || null);
    }
    const list = await db.collection("forms").find({}).toArray();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json(null);
  }
}
