"use client";

import { FormEvent, useEffect, useState } from "react";
import { IconCheck } from "./Icons";
import { courseSelectOptions } from "@/lib/site";
import type { EnquiryFieldErrors } from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [enquiryId, setEnquiryId] = useState<string | null>(null);

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
      website: String(fd.get("website") || ""), // honeypot
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
        message?: string;
      };

      if (!res.ok || !data.ok) {
        setErrors(data.errors || { form: "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }

      setEnquiryId(data.id || null);
      setStatus("success");
      form.reset();
      setCourse("");
    } catch {
      setErrors({
        form: "Network error. Check your connection, or WhatsApp us directly.",
      });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success is-visible" id="form-success" role="status">
        <IconCheck />
        <h4>Asante! Enquiry received.</h4>
        <p>
          We&apos;ll be in touch within 24 hours to confirm your lesson details.
          {enquiryId ? (
            <>
              {" "}
              <span className="form-ref">Ref: {enquiryId.slice(0, 8)}</span>
            </>
          ) : null}
        </p>
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

      {/* Honeypot — hidden from users */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
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
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
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
            <option key={opt} value={opt}>
              {opt === "Other" ? "Other / Not sure yet" : opt.replace(" – ", " — ")}
            </option>
          ))}
        </select>
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
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
