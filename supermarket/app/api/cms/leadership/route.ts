import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    if (!db) return NextResponse.json([]);
    const list = await db.collection("leadership").find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}
