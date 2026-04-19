import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

function bufferFromStored(bin: unknown): Buffer | null {
  if (!bin) return null;
  if (Buffer.isBuffer(bin)) return bin;
  if (bin instanceof Binary) return Buffer.from(bin.buffer);
  if (
    typeof bin === "object" &&
    bin !== null &&
    "buffer" in bin &&
    bin.buffer instanceof ArrayBuffer
  ) {
    return Buffer.from(bin.buffer);
  }
  return null;
}

function asciiFilename(name: string): string {
  const trimmed = name.replace(/[\r\n"]/g, "").trim().slice(0, 180);
  const safe = trimmed.replace(/[^\w.\- ()]/g, "_");
  return safe || "newsletter.pdf";
}

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }

  try {
    const doc = await db
      .collection("newsletter")
      .findOne({}, { projection: { pdfBinary: 1, pdfFileName: 1 } });

    const buf = bufferFromStored(doc?.pdfBinary);
    if (!buf || buf.length === 0) {
      return NextResponse.json(
        { error: "No newsletter PDF has been uploaded yet." },
        { status: 404 },
      );
    }

    const filename = asciiFilename(
      typeof doc?.pdfFileName === "string" && doc.pdfFileName.length > 0
        ? doc.pdfFileName
        : "newsletter.pdf",
    );

    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    console.error("[newsletter-pdf]", e);
    return NextResponse.json({ error: "Failed to load PDF." }, { status: 500 });
  }
}
