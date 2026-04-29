export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = fromEnv && /^https?:\/\//i.test(fromEnv)
    ? fromEnv
    : "https://www.supermarketing.com.au";
  return base.replace(/\/+$/, "");
}
