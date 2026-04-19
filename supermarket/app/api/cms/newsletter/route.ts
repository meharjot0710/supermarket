import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    if (!db) return NextResponse.json(null);
    const doc = await db.collection("newsletter").findOne(
      {},
      { projection: { pdfBinary: 0 } },
    );
    if (!doc) return NextResponse.json(null);
    const hasPdf =
      typeof doc.pdfFileName === "string" && doc.pdfFileName.length > 0;
    return NextResponse.json({ ...doc, hasPdf });
  } catch {
    return NextResponse.json(null);
  }
}
