"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { OAuthProvider } from "node-appwrite";

import { createAdminClient } from "@/lib/appwrite";

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const h = await headers();
  const origin = h.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth?prompt=consent`,
    `${origin}/sign-up?prompt=consent`
  );
  return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const h = await headers();
  const origin = h.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth?prompt=consent`,
    `${origin}/sign-up?prompt=consent`
  );
  return redirect(redirectUrl);
}
