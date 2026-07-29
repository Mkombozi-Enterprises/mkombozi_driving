import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "mkombozi_cms_session";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

/**
 * Session signing secret — must be set in production (Netlify env).
 * Falls back only for local dev when CMS_SECRET is unset.
 */
function secret() {
  const s = process.env.CMS_SECRET;
  if (s && s.length >= 8) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("CMS_SECRET environment variable is required in production.");
  }
  // Local-only fallback (must never match a real production secret)
  return "local-dev-cms-signing-key-not-for-production";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Admin login password — always from env; no hardcoded default in source. */
export function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD must be set (min 8 characters). Configure it in .env.local or your host env."
    );
  }
  return pw;
}

export function createSessionValue(): string {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const body = `ok.${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [ok, expStr, sig] = parts;
  if (ok !== "ok") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const body = `${ok}.${expStr}`;
  let expected: string;
  try {
    expected = sign(body);
  } catch {
    return false;
  }
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isCmsAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionValue(jar.get(COOKIE)?.value);
}

export function sessionCookieOptions(value: string) {
  return {
    name: COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export { COOKIE as CMS_COOKIE_NAME };
