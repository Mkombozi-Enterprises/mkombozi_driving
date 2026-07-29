"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { IconCheck, IconWhatsApp } from "./Icons";
import type { EnquiryFieldErrors } from "@/lib/enquiry";
import { carrierLabel, detectCarrier } from "@/lib/carrier";
import { whatsappUrl } from "@/lib/whatsapp";
import { useSiteContent } from "@/lib/cms/provider";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { site, courseSelectOptions } = useSiteContent();
  const [status, setStatus] = useState<Status>("idle");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
  const [successCourse, setSuccessCourse] = useState("");

  const durationHint = useMemo(() => {
    const opt = courseSelectOptions.find((o) => o.value === course);
    return opt?.duration ?? null;
  }, [course, courseSelectOptions]);

  const carrier = useMemo(() => detectCarrier(phone), [phone]);
  const carrierText = carrierLabel(carrier);

  useEffect(() => {
    const onChoose = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const btn = t?.closest?.("[data-choose-course]") as HTMLElement | null;
      if (!btn) return;
      const value = btn.getAttribute("data-choose-course");
      if (value) {
        setCourse(value);
        setErrors((prev) => ({ ...prev, course: undefined }));
      }
    };
    document.addEventListener("click", onChoose);
    return () => document.removeEventListener("click", onChoose);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      course: String(fd.get("course") || course || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        id?: string;
        errors?: EnquiryFieldErrors;
      };

      if (!res.ok || !data.ok) {
        setErrors(data.errors || { form: "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }

      setEnquiryId(data.id || null);
      setName(payload.name);
      setSuccessCourse(payload.course);
      setStatus("success");
      form.reset();
      setPhone("");
      setCourse("");
    } catch {
      setErrors({
        form: "Network error. Check your connection, or WhatsApp us directly.",
      });
      setStatus("error");
    }
  };

  if (status === "success") {
    const wa = whatsappUrl(site.whatsapp, {
      context: "form-success",
      course: successCourse || undefined,
      name: name || undefined,
    });
    return (
      <div className="form-success is-visible" id="form-success" role="status">
        <IconCheck />
        <h4 className="form-success-title">Asante sana!</h4>
        <p>
          We&apos;ve received your enquiry. <em className="swahili-soft">Safari njema</em>{" "}
          starts here. We typically reply within <strong>2 hours</strong> during open
          hours.
          {enquiryId ? (
            <>
              {" "}
              <span className="form-ref">Ref: {enquiryId.slice(0, 8)}</span>
            </>
          ) : null}
        </p>
        <p className="form-success-nudge">
          Need faster? Continue on WhatsApp — we&apos;ll already have your context.
        </p>
        <a
          href={wa}
          className="btn btn-wa btn-block"
          target="_blank"
          rel="noopener noreferrer"
          data-track="form-success-whatsapp"
        >
          <IconWhatsApp size="sm" />
          WhatsApp us now
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={onSubmit} noValidate>
      {errors.form ? (
        <p className="form-banner form-banner--error" role="alert">
          {errors.form}
        </p>
      ) : null}

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className={`field${errors.name ? " has-error" : ""}`}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="e.g. Judith Wasike"
            disabled={status === "submitting"}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name ? (
            <span id="err-name" className="field-error">
              {errors.name}
            </span>
          ) : null}
        </div>
        <div className={`field${errors.phone ? " has-error" : ""}`}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            placeholder="07XX XXX XXX"
            disabled={status === "submitting"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : carrierText ? "carrier-hint" : undefined}
          />
          {carrierText ? (
            <span id="carrier-hint" className="field-hint">
              Looks like <strong>{carrierText}</strong>
            </span>
          ) : null}
          {errors.phone ? (
            <span id="err-phone" className="field-error">
              {errors.phone}
            </span>
          ) : null}
        </div>
      </div>
      <div className={`field${errors.email ? " has-error" : ""}`}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          disabled={status === "submitting"}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
        {errors.email ? (
          <span id="err-email" className="field-error">
            {errors.email}
          </span>
        ) : null}
      </div>
      <div className={`field${errors.course ? " has-error" : ""}`}>
        <label htmlFor="course-interest">Course of interest</label>
        <select
          id="course-interest"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          disabled={status === "submitting"}
        >
          <option value="">Select a course</option>
          {courseSelectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {durationHint ? (
          <span className="field-hint">
            Typical duration: <strong>{durationHint}</strong>
          </span>
        ) : null}
      </div>
      <div className={`field${errors.message ? " has-error" : ""}`}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a bit about your schedule or goals..."
          disabled={status === "submitting"}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message ? (
          <span id="err-message" className="field-error">
            {errors.message}
          </span>
        ) : null}
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Tuko njiani… preparing your route." : "Send Enquiry"}
      </button>
    </form>
  );
}
