import { randomUUID } from "crypto";
import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryRecord } from "@/lib/enquiry";
import { notifyStaffEnquiry } from "@/lib/notify";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.jsonl");

/** Simple in-memory rate limit: max 8 enquiries per IP per 15 minutes */
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 8;
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prev.length >= RATE_MAX) {
    hits.set(ip, prev);
    return false;
  }
  prev.push(now);
  hits.set(ip, prev);
  return true;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Too many enquiries. Please try again later or call us." } },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid JSON body." } },
      { status: 400 }
    );
  }

  const result = validateEnquiry(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const record: EnquiryRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...result.data,
    userAgent: req.headers.get("user-agent") || undefined,
  };

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(ENQUIRIES_FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    console.error("[enquiry] failed to persist", err);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "We could not save your enquiry. Please call or WhatsApp us instead.",
        },
      },
      { status: 500 }
    );
  }

  console.info("[enquiry] received", {
    id: record.id,
    name: record.name,
    phone: record.phone,
    course: record.course,
  });

  // Non-blocking staff notify (Resend when env configured)
  void notifyStaffEnquiry(record);

  return NextResponse.json({
    ok: true,
    id: record.id,
    message: "Enquiry received. We typically reply within 2 hours during open hours.",
  });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "Mkombozi enquiry API",
      method: "POST",
      fields: ["name", "phone", "email?", "course?", "message?"],
    },
    { status: 200 }
  );
}
