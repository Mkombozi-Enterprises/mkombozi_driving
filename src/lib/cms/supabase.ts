import { createAdminClient, resolveEnv } from "@supabase/server/core";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only admin client (bypasses RLS) via @supabase/server.
 * Requires SUPABASE_URL + SUPABASE_SECRET_KEY in env.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const { data: env, error } = resolveEnv();
  if (error || !env) {
    throw new Error(
      error?.message ||
        "Supabase env missing. Set SUPABASE_URL and SUPABASE_SECRET_KEY."
    );
  }
  return createAdminClient() as unknown as SupabaseClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL &&
      (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEYS)
  );
}

export const CMS_TABLE = "site_content";
export const CMS_BUCKET = "cms-media";
