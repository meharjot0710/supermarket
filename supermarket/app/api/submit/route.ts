import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const COLLECTION = "form_submissions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formId = typeof body?.formId === "string" ? body.formId.trim() : "";
    if (!formId) {
      return NextResponse.json({ error: "formId required" }, { status: 400 });
    }

    const { formId: _f, ...payload } = body as { formId: string; [k: string]: unknown };
    const doc = {
      formId,
      payload,
      createdAt: new Date(),
    };

    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { error: "Submissions are not available at the moment." },
        { status: 503 }
      );
    }

    await db.collection(COLLECTION).insertOne(doc);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to submit." },
      { status: 500 }
    );
  }
}
