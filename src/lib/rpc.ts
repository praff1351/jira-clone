import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

// Use NEXT_PUBLIC_APP_URL when provided (e.g. for SSR or external clients),
// otherwise fall back to same-origin relative requests so the browser
// will always hit the current app and show up in the Network tab.
const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_APP_URL
    : undefined;

export const client = hc<AppType>(baseUrl ?? "/");
