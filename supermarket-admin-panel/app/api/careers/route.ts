import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { JobListing } from "@/types/cms";
import { ObjectId, type OptionalId, type Document } from "mongodb";

const COLLECTION = "careers";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection(COLLECTION)
      .find({})
      .sort({ order: 1 })
      .toArray();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch job listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<JobListing, "_id"> = await request.json();
    const db = await getDb();
    const count = await db.collection(COLLECTION).countDocuments();
    const doc = {
      ...body,
      order: body.order ?? count,
      active: body.active ?? true,
    };
    const result = await db
      .collection(COLLECTION)
      .insertOne(doc as OptionalId<Document>);
    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create job listing" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: JobListing & { _id?: string } = await request.json();
    const { _id, ...data } = body;
    if (!_id) {
      return NextResponse.json({ error: "Missing _id" }, { status: 400 });
    }
    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(_id) },
      { $set: data }
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update job listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const db = await getDb();
    await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete job listing" },
      { status: 500 }
    );
  }
}
