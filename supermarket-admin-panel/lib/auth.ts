import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supermarket-admin-secret-change-in-production"
);
const COOKIE_NAME = "admin_token";
const JWT_EXPIRY = "24h";

export interface TokenPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export function getCookieName() {
  return COOKIE_NAME;
}

export async function signToken(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const prefix = `${COOKIE_NAME}=`;
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return part.slice(prefix.length).trim();
    }
  }
  return null;
}

/** One-time token for first-time password change (no admin in DB yet). */
const SETUP_TOKEN_EXPIRY = "10m";

export async function signSetupToken(username: string): Promise<string> {
  return new SignJWT({ sub: username, type: "initial-password-change" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SETUP_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifySetupToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const p = payload as { sub?: string; type?: string };
    if (p.type !== "initial-password-change" || !p.sub) return null;
    return { username: p.sub };
  } catch {
    return null;
  }
}
