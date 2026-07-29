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
import { cmsBackend, loadContent, saveContent } from "@/lib/cms/store";
import { uploadCmsImage } from "@/lib/cms/upload";
import type { SiteContent } from "@/lib/cms/types";

export async function cmsLogin(
  _prev: { ok: boolean; error?: string },
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const password = String(formData.get("password") || "");
  if (password !== getAdminPassword()) {
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
  content: SiteContent
): Promise<{ ok: true; content: SiteContent } | { ok: false; error: string }> {
  if (!(await isCmsAuthenticated())) {
    return { ok: false, error: "Unauthorized" };
  }
  try {
    const saved = await saveContent(content);
    revalidatePath("/");
    revalidatePath("/admin");
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
    return { ok: true, url };
  } catch (err) {
    console.error("[cms] upload failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}
