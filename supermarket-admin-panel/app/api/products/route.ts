import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { ProductRecord } from "@/types/cms";
import { ObjectId, type OptionalId, type Document } from "mongodb";

const COLLECTION = "products";

export async function GET() {
  try {
    const db = await getDb();
    const list = await db
      .collection(COLLECTION)
      .find({})
      .toArray();
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<ProductRecord, "_id"> = await request.json();
    const db = await getDb();
    const doc = {
      ...body,
      description: body.description ?? "",
    };
    const result = await db.collection(COLLECTION).insertOne(doc as OptionalId<Document>);
    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: ProductRecord & { _id?: string } = await request.json();
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
      { error: "Failed to update product" },
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
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
