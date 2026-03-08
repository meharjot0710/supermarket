import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    if (!db) return NextResponse.json(null);
    const doc = await db.collection("newsletter").findOne({});
    return NextResponse.json(doc || null);
  } catch {
    return NextResponse.json(null);
  }
}
