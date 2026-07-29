import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { cmsBackend } from "./store";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

export type AuditEntry = {
  id: string;
  at: string;
  actor: string;
  action: "publish" | "upload" | "login";
  section?: string;
  summary: string;
  /** Optional compact before/after hints */
  detail?: string;
};

const AUDIT_DIR = path.join(process.cwd(), "content");
const AUDIT_FILE = path.join(AUDIT_DIR, "audit.jsonl");
const MAX_ENTRIES = 200;

function uid() {
  return `aud-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function ensureDir() {
  if (!existsSync(AUDIT_DIR)) mkdirSync(AUDIT_DIR, { recursive: true });
}

function appendFile(entry: AuditEntry) {
  ensureDir();
  appendFileSync(AUDIT_FILE, `${JSON.stringify(entry)}\n`, "utf8");
}

function readFileEntries(): AuditEntry[] {
  if (!existsSync(AUDIT_FILE)) return [];
  try {
    return readFileSync(AUDIT_FILE, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => JSON.parse(l) as AuditEntry)
      .reverse()
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

export async function appendAudit(
  partial: Omit<AuditEntry, "id" | "at"> & { at?: string }
): Promise<AuditEntry> {
  const entry: AuditEntry = {
    id: uid(),
    at: partial.at || new Date().toISOString(),
    actor: partial.actor,
    action: partial.action,
    section: partial.section,
    summary: partial.summary,
    detail: partial.detail,
  };

  // Always try local mirror
  try {
    appendFile(entry);
  } catch {
    /* ephemeral FS */
  }

  if (cmsBackend() === "supabase" && isSupabaseConfigured()) {
    try {
      const admin = getSupabaseAdmin();
      await admin.from("cms_audit_log").insert({
        id: entry.id,
        at: entry.at,
        actor: entry.actor,
        action: entry.action,
        section: entry.section || null,
        summary: entry.summary,
        detail: entry.detail || null,
      });
    } catch (err) {
      console.error("[cms] audit supabase insert failed", err);
    }
  }

  return entry;
}

export async function listAudit(limit = 50): Promise<AuditEntry[]> {
  if (cmsBackend() === "supabase" && isSupabaseConfigured()) {
    try {
      const admin = getSupabaseAdmin();
      const { data, error } = await admin
        .from("cms_audit_log")
        .select("id, at, actor, action, section, summary, detail")
        .order("at", { ascending: false })
        .limit(limit);
      if (!error && data?.length) {
        return data as AuditEntry[];
      }
    } catch (err) {
      console.error("[cms] audit supabase list failed", err);
    }
  }
  return readFileEntries().slice(0, limit);
}

/** Diff two content snapshots into a short human summary for the audit log */
export function summarizeContentDiff(
  before: Record<string, unknown>,
  after: Record<string, unknown>
): { sections: string[]; summary: string } {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const changed: string[] = [];
  for (const k of keys) {
    if (k === "version" || k === "updatedAt") continue;
    try {
      if (JSON.stringify(before[k]) !== JSON.stringify(after[k])) {
        changed.push(k);
      }
    } catch {
      changed.push(k);
    }
  }
  if (!changed.length) {
    return { sections: [], summary: "Publish with no field changes detected" };
  }
  return {
    sections: changed,
    summary: `Updated: ${changed.join(", ")}`,
  };
}
