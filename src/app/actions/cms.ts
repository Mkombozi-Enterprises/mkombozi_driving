"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  clearSessionCookieOptions,
  createSessionValue,
  getAdminPassword,
  isCmsAuthenticated,
  sessionCookieOptions,
} from "@/lib/cms/auth";
import { appendAudit, listAudit, summarizeContentDiff } from "@/lib/cms/audit";
import { cmsBackend, loadContent, saveContent } from "@/lib/cms/store";
import { uploadCmsImage, uploadCmsResource } from "@/lib/cms/upload";
import type { SiteContent } from "@/lib/cms/types";
import type { AuditEntry } from "@/lib/cms/audit";

export async function cmsLogin(
  _prev: { ok: boolean; error?: string },
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const password = String(formData.get("password") || "");
  let expected: string;
  try {
    expected = getAdminPassword();
  } catch {
    return {
      ok: false,
      error: "Server is missing ADMIN_PASSWORD. Set it in the host environment.",
    };
  }
  if (password !== expected) {
    return { ok: false, error: "Incorrect password." };
  }
  const jar = await cookies();
  const opts = sessionCookieOptions(createSessionValue());
  jar.set(opts.name, opts.value, opts);
  return { ok: true };
}

export async function cmsLogout() {
  const jar = await cookies();
  const opts = clearSessionCookieOptions();
  jar.set(opts.name, opts.value, opts);
}

export async function getCmsContentAction(): Promise<
  { ok: true; content: SiteContent; backend: string } | { ok: false; error: string }
> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }
  return { ok: true, content: await loadContent(), backend: cmsBackend() };
}

export async function saveCmsContentAction(
  content: SiteContent,
  meta?: { section?: string; note?: string }
): Promise<{ ok: true; content: SiteContent } | { ok: false; error: string }> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }
  try {
    const before = await loadContent();
    const saved = await saveContent(content);
    const diff = summarizeContentDiff(
      before as unknown as Record<string, unknown>,
      saved as unknown as Record<string, unknown>
    );
    await appendAudit({
      actor: "site-manager",
      action: "publish",
      section: meta?.section || diff.sections.join(",") || "all",
      summary: meta?.note || diff.summary,
      detail: diff.sections.length ? `Fields: ${diff.sections.join(", ")}` : undefined,
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/preview");
    return { ok: true, content: saved };
  } catch (err) {
    console.error("[cms] save failed", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not save content. Check Supabase setup or disk permissions.",
    };
  }
}

export async function listCmsAuditAction(): Promise<
  { ok: true; entries: AuditEntry[] } | { ok: false; error: string }
> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }
  try {
    const entries = await listAudit(80);
    return { ok: true, entries };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not load audit log.",
    };
  }
}

export async function uploadInstructorPhotoAction(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }
  if (cmsBackend() !== "supabase") {
    return {
      ok: false,
      error:
        "Image upload requires Supabase. Set SUPABASE_URL + SUPABASE_SECRET_KEY and run supabase/cms-setup.sql.",
    };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file selected." };
  }

  try {
    const { url } = await uploadCmsImage(file, "instructors");
    await appendAudit({
      actor: "site-manager",
      action: "upload",
      section: "instructors",
      summary: `Uploaded instructor photo (${file.name})`,
    });
    return { ok: true, url };
  } catch (err) {
    console.error("[cms] upload failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

/** Upload PDF or image for Resource Center (Supabase Storage or public/documents). */
export async function uploadResourceFileAction(
  formData: FormData
): Promise<
  | { ok: true; url: string; kind: "pdf" | "image" }
  | { ok: false; error: string }
> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file selected." };
  }

  try {
    const { url, kind } = await uploadCmsResource(file);
    await appendAudit({
      actor: "site-manager",
      action: "upload",
      section: "resources",
      summary: `Uploaded resource file (${file.name})`,
      detail: kind,
    });
    return { ok: true, url, kind };
  } catch (err) {
    console.error("[cms] resource upload failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}
