import type { EnquiryRecord } from "@/lib/enquiry";

/**
 * Optional staff email via Resend when RESEND_API_KEY + ENQUIRY_NOTIFY_TO are set.
 * Without env vars, silently no-ops so local/dev still works.
 */
export async function notifyStaffEnquiry(record: EnquiryRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO || process.env.STAFF_EMAIL;
  const from =
    process.env.ENQUIRY_NOTIFY_FROM || "Mkombozi Enquiries <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.info(
      "[enquiry] email notify skipped (set RESEND_API_KEY and ENQUIRY_NOTIFY_TO)"
    );
    return;
  }

  const subject = `New enquiry: ${record.name}${record.course ? ` — ${record.course}` : ""}`;
  const text = [
    `New Mkombozi website enquiry`,
    ``,
    `Name: ${record.name}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email || "—"}`,
    `Course: ${record.course || "—"}`,
    `Message: ${record.message || "—"}`,
    ``,
    `ID: ${record.id}`,
    `At: ${record.createdAt}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[enquiry] Resend failed", res.status, body);
    } else {
      console.info("[enquiry] staff email sent", { id: record.id, to });
    }
  } catch (err) {
    console.error("[enquiry] notify error", err);
  }
}
