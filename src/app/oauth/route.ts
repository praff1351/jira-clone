import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/features/auth/constants";

import { createAdminClient } from "@/lib/appwrite";

// ... existing POST handler

export async function GET(request: NextRequest) {
  // Get the user ID and secret from the URL
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return new NextResponse("Missing fields", { status: 400 });
  }
  // Create the Appwrite client
  const { account } = await createAdminClient();

  // Exchange the token for a session
  const session = await account.createSession(userId, secret);

  // Set the session cookie
  const rc = await cookies();

  rc.set(AUTH_COOKIE, session.secret, {
    sameSite: "strict",
    expires: new Date(session.expire),
    secure: true,
    httpOnly: true,
    path: "/",
  });

  // Redirect the logged in user to the account page
  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
