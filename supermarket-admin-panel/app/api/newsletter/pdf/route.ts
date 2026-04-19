import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const COLLECTION = "newsletter";
const MAX_BYTES = 15 * 1024 * 1024;

function safePdfFilename(name: string): string {
  const base = name.replace(/[\r\n]/g, "").trim();
  const cleaned = base.replace(/[^\w.\- ()]/g, "_").slice(0, 160);
  const withExt =
    cleaned.toLowerCase().endsWith(".pdf") ? cleaned : `${cleaned || "newsletter"}.pdf`;
  return withExt;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Expected a PDF file." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "PDF must be 15MB or smaller." },
        { status: 413 },
      );
    }
    const lower = file.name.toLowerCase();
    const isPdfMime =
      file.type === "application/pdf" || file.type === "application/x-pdf";
    if (!isPdfMime && !lower.endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed." }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const pdfFileName = safePdfFilename(file.name);
    const db = await getDb();

    await db.collection(COLLECTION).updateOne(
      {},
      {
        $set: {
          pdfBinary: buf,
          pdfFileName,
          pdfUpdatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true, pdfFileName });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      {},
      { $unset: { pdfBinary: "", pdfFileName: "", pdfUpdatedAt: "" } },
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Remove failed." }, { status: 500 });
  }
}
