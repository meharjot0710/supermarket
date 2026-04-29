import { NextResponse } from "next/server";
import { uploadToBunny } from "@/lib/bunny";

const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set(["services", "newsletter"]);

function isAllowedType(file: File, folder: string) {
  const name = file.name.toLowerCase();
  const isImage =
    file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(name);
  const isPdf = file.type === "application/pdf" || name.endsWith(".pdf");

  if (folder === "newsletter") return isImage || isPdf;
  return isImage;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderValue = String(formData.get("folder") || "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "A file is required." }, { status: 400 });
    }
    if (!ALLOWED_FOLDERS.has(folderValue)) {
      return NextResponse.json({ error: "Invalid folder." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File must be 25MB or smaller." }, { status: 413 });
    }
    if (!isAllowedType(file, folderValue)) {
      return NextResponse.json(
        { error: "Unsupported file type for this section." },
        { status: 400 },
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
    const now = Date.now();
    const normalized = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w\- ]/g, "_")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const fileName = `${now}-${normalized || "upload"}${ext}`;

    const { publicUrl, objectPath } = await uploadToBunny({
      bytes,
      fileName,
      folder: `supermarketing/${folderValue}`,
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({ success: true, publicUrl, objectPath });
  } catch (error) {
    console.error("[media/upload]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 },
    );
  }
}
