import { NextResponse } from "next/server";
import { getCookieName, sessionCookieBase } from "@/lib/auth";

export async function POST(request: Request) {
  const res = NextResponse.json({ success: true });
  res.cookies.set(getCookieName(), "", {
    ...sessionCookieBase(request),
    maxAge: 0,
  });
  return res;
}
