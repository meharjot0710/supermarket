import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { FormContent } from "@/types/cms";

const COLLECTION = "forms";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");
    const db = await getDb();
    if (formId) {
      const doc = await db
        .collection<FormContent>(COLLECTION)
        .findOne({ formId });
      return NextResponse.json(doc || null);
    }
    const list = await db.collection<FormContent>(COLLECTION).find({}).toArray();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch form content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: FormContent & { _id?: string } = await request.json();
    const { formId, ...data } = body;
    if (!formId) {
      return NextResponse.json({ error: "Missing formId" }, { status: 400 });
    }
    const db = await getDb();
    await db.collection<FormContent>(COLLECTION).updateOne(
      { formId },
      { $set: { ...data, formId } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update form content" },
      { status: 500 }
    );
  }
}
