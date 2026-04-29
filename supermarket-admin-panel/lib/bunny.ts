function cleanSegment(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function cleanName(value: string): string {
  const base = value.replace(/[\r\n]/g, "").trim();
  return base.replace(/[^a-zA-Z0-9._\- ()]/g, "_");
}

function getStorageHost() {
  const region = (process.env.BUNNY_STORAGE_REGION || "").trim().toLowerCase();
  if (!region || region === "de") return "storage.bunnycdn.com";
  return `${region}.storage.bunnycdn.com`;
}

export function getBunnyPublicBaseUrl(): string {
  const base = (process.env.BUNNY_PUBLIC_BASE_URL || "").trim();
  if (!base) throw new Error("Missing BUNNY_PUBLIC_BASE_URL");
  const cleaned = base.replace(/\/+$/, "");
  const m = cleaned.match(
    /^https?:\/\/(?:[a-z0-9-]+\.)?storage\.bunnycdn\.com\/([^/]+)(?:\/.*)?$/i,
  );
  if (m?.[1]) {
    return `https://${m[1]}.b-cdn.net`;
  }
  return cleaned;
}

export function validateBunnyEnv() {
  const zone = (process.env.BUNNY_STORAGE_ZONE || "").trim();
  const accessKey = (process.env.BUNNY_STORAGE_PASSWORD || "").trim();
  const publicBase = (process.env.BUNNY_PUBLIC_BASE_URL || "").trim();

  if (!zone) throw new Error("Missing BUNNY_STORAGE_ZONE");
  if (!accessKey) throw new Error("Missing BUNNY_STORAGE_PASSWORD");
  if (!publicBase) throw new Error("Missing BUNNY_PUBLIC_BASE_URL");

  return { zone, accessKey };
}

export async function uploadToBunny(params: {
  bytes: Uint8Array;
  fileName: string;
  folder: string;
  contentType: string;
}) {
  const { zone, accessKey } = validateBunnyEnv();
  const safeName = cleanName(params.fileName) || `file-${Date.now()}`;
  const folder = cleanSegment(params.folder);
  const objectPath = folder ? `${folder}/${safeName}` : safeName;
  const host = getStorageHost();
  const uploadUrl = `https://${host}/${encodeURIComponent(zone)}/${objectPath
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/")}`;
  const bodyBuffer = params.bytes.buffer.slice(
    params.bytes.byteOffset,
    params.bytes.byteOffset + params.bytes.byteLength,
  ) as ArrayBuffer;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": params.contentType || "application/octet-stream",
    },
    body: bodyBuffer,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401) {
      const keyHint =
        accessKey.length >= 8
          ? `${accessKey.slice(0, 4)}...${accessKey.slice(-4)}`
          : "(too short)";
      throw new Error(
        `Bunny upload unauthorized (401). Check BUNNY_STORAGE_PASSWORD and BUNNY_STORAGE_ZONE match the same Storage Zone. ` +
          `Using host=${host}, zone=${zone}, folder=${folder || "(root)"}, key=${keyHint}. ` +
          `If your zone is not in DE, set BUNNY_STORAGE_REGION (e.g. ny, la, sg, uk, se). ` +
          `Raw response: ${text || "unknown error"}`,
      );
    }
    throw new Error(
      `Bunny upload failed (${res.status}) host=${host} zone=${zone}: ${text || "unknown error"}`,
    );
  }

  const publicBase = getBunnyPublicBaseUrl();
  const publicUrl = `${publicBase}/${objectPath
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/")}`;

  return { objectPath, publicUrl };
}
