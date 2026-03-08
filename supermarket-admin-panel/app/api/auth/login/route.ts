import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, signSetupToken, getCookieName } from "@/lib/auth";
import { getAdminFromDb } from "@/lib/getAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME?.trim();
    const envPassword = process.env.ADMIN_PASSWORD?.trim();

    if (!adminUsername || !envPassword) {
      return NextResponse.json(
        { error: "Server auth not configured (set ADMIN_USERNAME and ADMIN_PASSWORD in .env)" },
        { status: 500 }
      );
    }

    const user = typeof username === "string" ? username.trim() : "";
    const pass = typeof password === "string" ? password.trim() : "";
    if (!user || !pass) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    const usernameMatch = user.toLowerCase() === adminUsername.toLowerCase();
    if (!usernameMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const adminFromDb = await getAdminFromDb();

    if (adminFromDb) {
      // Admin already configured: validate against DB only (ignore .env password)
      const passwordMatch = await bcrypt.compare(pass, adminFromDb.passwordHash);
      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        );
      }
      const token = await signToken(adminFromDb.username);
      const cookieName = getCookieName();
      const res = NextResponse.json({ success: true });
      res.cookies.set(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24h
      });
      return res;
    }

    // No admin in DB: first-time login with .env password → require change
    if (pass !== envPassword) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
    const setupToken = await signSetupToken(adminUsername);
    return NextResponse.json({
      success: true,
      requirePasswordChange: true,
      setupToken,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
