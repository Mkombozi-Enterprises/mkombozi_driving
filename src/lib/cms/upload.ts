import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { CMS_BUCKET, getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { cmsBackend } from "./store";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const PDF_TYPE = "application/pdf";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_BYTES = 25 * 1024 * 1024; // 25 MB

function extFor(type: string, originalName: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "application/pdf":
      return "pdf";
    default: {
      const fromName = originalName.split(".").pop()?.toLowerCase();
      return fromName && fromName.length <= 5 ? fromName : "bin";
    }
  }
}

function safeBaseName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

/**
 * Upload an instructor (or CMS) image to Supabase Storage.
 * Returns a public URL.
 */
export async function uploadCmsImage(
  file: File,
  folder: "instructors" | "founders" | "misc" = "instructors"
): Promise<{ url: string; path: string }> {
  if (!IMAGE_TYPES.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, or GIF images are allowed.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const admin = getSupabaseAdmin();
  const ext = extFor(file.type, file.name);
  const pathKey = `${folder}/${Date.now()}-${safeBaseName(file.name) || "photo"}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from(CMS_BUCKET).upload(pathKey, buffer, {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = admin.storage.from(CMS_BUCKET).getPublicUrl(pathKey);
  if (!data?.publicUrl) {
    throw new Error("Upload succeeded but public URL is missing.");
  }

  return { url: data.publicUrl, path: pathKey };
}

export type ResourceUploadKind = "pdf" | "image";

/**
 * Upload a resource file (PDF or image).
 * - Supabase mode: Storage bucket cms-media/resources/
 * - File mode: public/documents/ on disk (Next serves it statically)
 */
export async function uploadCmsResource(
  file: File
): Promise<{ url: string; path: string; kind: ResourceUploadKind }> {
  const isPdf =
    file.type === PDF_TYPE || file.name.toLowerCase().endsWith(".pdf");
  const isImage = IMAGE_TYPES.has(file.type);

  if (!isPdf && !isImage) {
    throw new Error("Only PDF or image files (JPEG, PNG, WebP, GIF) are allowed.");
  }
  if (isPdf && file.size > MAX_PDF_BYTES) {
    throw new Error("PDF must be 25 MB or smaller.");
  }
  if (isImage && file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const kind: ResourceUploadKind = isPdf ? "pdf" : "image";
  const ext = isPdf ? "pdf" : extFor(file.type, file.name);
  const base = safeBaseName(file.name) || (isPdf ? "document" : "image");
  const fileName = `${Date.now()}-${base}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  // Prefer Supabase when configured
  if (cmsBackend() === "supabase" && isSupabaseConfigured()) {
    const admin = getSupabaseAdmin();
    const storagePath = `resources/${fileName}`;
    const contentType = isPdf ? PDF_TYPE : file.type;

    const { error } = await admin.storage
      .from(CMS_BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: true });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data } = admin.storage.from(CMS_BUCKET).getPublicUrl(storagePath);
    if (!data?.publicUrl) {
      throw new Error("Upload succeeded but public URL is missing.");
    }
    return { url: data.publicUrl, path: storagePath, kind };
  }

  // Local / file backend: write under public/documents
  const docsDir = path.join(process.cwd(), "public", "documents");
  mkdirSync(docsDir, { recursive: true });
  const diskPath = path.join(docsDir, fileName);
  writeFileSync(diskPath, buffer);
  return { url: `/documents/${fileName}`, path: diskPath, kind };
}
