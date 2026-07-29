import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { defaultContent } from "./default-content";
import { CMS_TABLE, getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import type { SiteContent } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_FILE = path.join(CONTENT_DIR, "site.json");

function ensureDir() {
  if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });
}

function withDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...parsed,
    site: { ...defaultContent.site, ...(parsed.site || {}) },
    yardNote: { ...defaultContent.yardNote, ...(parsed.yardNote || {}) },
    yardToday: { ...defaultContent.yardToday, ...(parsed.yardToday || {}) },
    passesTicker: {
      ...defaultContent.passesTicker,
      ...(parsed.passesTicker || {}),
    },
  };
}

export function cmsBackend(): "file" | "supabase" {
  // Prefer Supabase when credentials exist (unless forced to file)
  if (process.env.CMS_BACKEND === "file") return "file";
  if (process.env.CMS_BACKEND === "supabase" || isSupabaseConfigured()) {
    if (isSupabaseConfigured()) return "supabase";
  }
  return "file";
}

function loadFromFile(): SiteContent {
  ensureDir();
  if (!existsSync(CONTENT_FILE)) {
    const seed = {
      ...defaultContent,
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(CONTENT_FILE, JSON.stringify(seed, null, 2), "utf8");
    return structuredClone(seed);
  }
  try {
    const raw = readFileSync(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return withDefaults(parsed);
  } catch (err) {
    console.error("[cms] failed to read content/site.json, using defaults", err);
    return structuredClone(defaultContent);
  }
}

function saveToFile(content: SiteContent): SiteContent {
  ensureDir();
  const prev = loadFromFile();
  const next: SiteContent = {
    ...content,
    version: (prev.version || 1) + 1,
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(CONTENT_FILE, JSON.stringify(next, null, 2), "utf8");
  return next;
}

async function loadFromSupabase(): Promise<SiteContent> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from(CMS_TABLE)
    .select("data, version, updated_at")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("[cms] supabase load error", error);
    throw new Error(`Supabase load failed: ${error.message}`);
  }

  if (!data?.data) {
    // Seed row from defaults / local file if present
    const seed = existsSync(CONTENT_FILE) ? loadFromFile() : structuredClone(defaultContent);
    seed.updatedAt = new Date().toISOString();
    const { error: upsertErr } = await admin.from(CMS_TABLE).upsert({
      id: 1,
      data: seed,
      version: seed.version || 1,
      updated_at: seed.updatedAt,
    });
    if (upsertErr) {
      console.error("[cms] supabase seed error", upsertErr);
      throw new Error(`Supabase seed failed: ${upsertErr.message}`);
    }
    return withDefaults(seed);
  }

  const payload = data.data as Partial<SiteContent>;
  const merged = withDefaults(payload);
  if (typeof data.version === "number") merged.version = data.version;
  if (data.updated_at) merged.updatedAt = data.updated_at;
  return merged;
}

async function saveToSupabase(content: SiteContent): Promise<SiteContent> {
  const admin = getSupabaseAdmin();
  const { data: existing } = await admin
    .from(CMS_TABLE)
    .select("version")
    .eq("id", 1)
    .maybeSingle();

  const nextVersion = ((existing?.version as number) || content.version || 1) + 1;
  const next: SiteContent = {
    ...content,
    version: nextVersion,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await admin.from(CMS_TABLE).upsert({
    id: 1,
    data: next,
    version: next.version,
    updated_at: next.updatedAt,
  });

  if (error) {
    console.error("[cms] supabase save error", error);
    throw new Error(`Supabase save failed: ${error.message}`);
  }

  // Mirror to local file as backup when disk is available
  try {
    ensureDir();
    writeFileSync(CONTENT_FILE, JSON.stringify(next, null, 2), "utf8");
  } catch {
    /* ignore ephemeral FS */
  }

  return next;
}

/** Load CMS content (Supabase when configured, else content/site.json). */
export async function loadContent(): Promise<SiteContent> {
  if (cmsBackend() === "supabase") {
    try {
      return await loadFromSupabase();
    } catch (err) {
      console.error("[cms] falling back to file after supabase error", err);
      return loadFromFile();
    }
  }
  return loadFromFile();
}

/** Persist full CMS document. */
export async function saveContent(content: SiteContent): Promise<SiteContent> {
  if (cmsBackend() === "supabase") {
    return saveToSupabase(content);
  }
  return saveToFile(content);
}

export function getContentPath() {
  return CONTENT_FILE;
}
