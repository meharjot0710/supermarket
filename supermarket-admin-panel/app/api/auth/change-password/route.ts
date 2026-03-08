import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, verifyToken, verifySetupToken, getCookieName, getTokenFromCookie } from "@/lib/auth";
import { getAdminFromDb, saveAdminToDb } from "@/lib/getAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { setupToken, currentPassword, newPassword } = body;

    const current = typeof currentPassword === "string" ? currentPassword.trim() : "";
    const newPass = typeof newPassword === "string" ? newPassword.trim() : "";

    if (!current || !newPass) {
      return NextResponse.json(
        { error: "Current password and new password required" },
        { status: 400 }
      );
    }

    if (newPass.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const adminFromDb = await getAdminFromDb();

    if (adminFromDb) {
      // Already configured: must be logged in and provide current password
      const cookieHeader = request.headers.get("cookie");
      const token = getTokenFromCookie(cookieHeader);
      if (!token) {
        return NextResponse.json(
          { error: "You must be logged in to change password" },
          { status: 401 }
        );
      }
      const payload = await verifyToken(token);
      if (!payload || payload.sub !== adminFromDb.username) {
        return NextResponse.json(
          { error: "Session invalid" },
          { status: 401 }
        );
      }
      const currentMatch = await bcrypt.compare(current, adminFromDb.passwordHash);
      if (!currentMatch) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }
      const passwordHash = await bcrypt.hash(newPass, 10);
      await saveAdminToDb(adminFromDb.username, passwordHash);
      return NextResponse.json({ success: true });
    }

    // First-time setup: need setupToken from login and current = env password
    const token = typeof setupToken === "string" ? setupToken.trim() : "";
    if (!token) {
      return NextResponse.json(
        { error: "Setup token required. Please log in again." },
        { status: 400 }
      );
    }
    const setup = await verifySetupToken(token);
    if (!setup) {
      return NextResponse.json(
        { error: "Setup link expired. Please log in again." },
        { status: 400 }
      );
    }
    const envPassword = process.env.ADMIN_PASSWORD?.trim();
    if (!envPassword || current !== envPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }
    const passwordHash = await bcrypt.hash(newPass, 10);
    await saveAdminToDb(setup.username, passwordHash);
    const authToken = await signToken(setup.username);
    const cookieName = getCookieName();
    const res = NextResponse.json({ success: true });
    res.cookies.set(cookieName, authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
