import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { NewsletterContent } from "@/types/cms";

const COLLECTION = "newsletter";

function stripPdfBinary(doc: Record<string, unknown> | null) {
  if (!doc) return null;
  const pdfBinary = doc.pdfBinary;
  const { pdfBinary: _b, ...rest } = doc;
  const binLen =
    Buffer.isBuffer(pdfBinary)
      ? pdfBinary.length
      : pdfBinary instanceof Binary
        ? pdfBinary.buffer.length
        : 0;
  const hasPdf =
    (typeof rest.pdfFileName === "string" &&
      (rest.pdfFileName as string).length > 0) ||
    binLen > 0;
  return { ...rest, hasPdf } as NewsletterContent & { hasPdf: boolean };
}

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({});
    return NextResponse.json(stripPdfBinary(doc as Record<string, unknown> | null));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch newsletter content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const db = await getDb();
    const data: Pick<
      NewsletterContent,
      "heading" | "subheading" | "buttonText" | "successMessage"
    > = {
      heading: typeof body.heading === "string" ? body.heading : "",
      subheading: typeof body.subheading === "string" ? body.subheading : "",
      buttonText: typeof body.buttonText === "string" ? body.buttonText : "",
      successMessage:
        typeof body.successMessage === "string" ? body.successMessage : "",
    };
    await db.collection(COLLECTION).updateOne({}, { $set: data }, { upsert: true });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update newsletter content" },
      { status: 500 }
    );
  }
}
