/** Shared enquiry payload + validation (client + server) */

export type EnquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  course?: string;
  message?: string;
};

export type EnquiryRecord = EnquiryPayload & {
  id: string;
  createdAt: string;
  userAgent?: string;
};

export type EnquiryFieldErrors = Partial<
  Record<"name" | "phone" | "email" | "course" | "message" | "form", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(raw: string) {
  return raw.replace(/\D/g, "");
}

/** Normalize common KE formats to +2547XXXXXXXX / +2541XXXXXXXX */
export function normalizePhone(raw: string): string {
  let d = digitsOnly(raw);
  if (d.startsWith("254") && d.length === 12) return `+${d}`;
  if (d.startsWith("0") && d.length === 10) return `+254${d.slice(1)}`;
  if ((d.startsWith("7") || d.startsWith("1")) && d.length === 9) return `+254${d}`;
  if (d.length >= 9) return d.startsWith("254") ? `+${d}` : `+${d}`;
  return raw.trim();
}

function isValidKenyanMobile(raw: string): boolean {
  const d = digitsOnly(raw);
  // 07XXXXXXXX / 01XXXXXXXX
  if (/^0[17]\d{8}$/.test(d)) return true;
  // 7XXXXXXXX / 1XXXXXXXX
  if (/^[17]\d{8}$/.test(d)) return true;
  // 2547XXXXXXXX / 2541XXXXXXXX
  if (/^254[17]\d{8}$/.test(d)) return true;
  return false;
}

export function validateEnquiry(body: unknown): {
  ok: true;
  data: EnquiryPayload;
} | {
  ok: false;
  errors: EnquiryFieldErrors;
} {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: { form: "Invalid request body." } };
  }

  const b = body as Record<string, unknown>;
  const errors: EnquiryFieldErrors = {};

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phoneRaw = typeof b.phone === "string" ? b.phone.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const course = typeof b.course === "string" ? b.course.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (name.length < 2) errors.name = "Please enter your full name.";
  if (name.length > 80) errors.name = "Name is too long.";

  if (!phoneRaw) errors.phone = "Phone number is required.";
  else if (!isValidKenyanMobile(phoneRaw)) {
    errors.phone = "Use a valid Kenyan mobile (e.g. 07XX XXX XXX).";
  }

  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email, or leave it blank.";
  }
  if (email.length > 120) errors.email = "Email is too long.";
  if (course.length > 80) errors.course = "Course value is too long.";
  if (message.length > 2000) {
    errors.message = "Message is too long (max 2000 characters).";
  }

  // Honeypot (bots fill this)
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return { ok: false, errors: { form: "Unable to send enquiry." } };
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      phone: normalizePhone(phoneRaw),
      email: email || undefined,
      course: course || undefined,
      message: message || undefined,
    },
  };
}
