"use client";

import { IconWhatsApp } from "./Icons";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Mobile-only sticky conversion bar — plugs the "leaky bucket" where
 * desktop Enrol disappears into the hamburger menu.
 */
export function MobileCtaBar() {
  return (
    <div className="mobile-cta-bar" role="region" aria-label="Quick actions">
      <a
        href="#contact"
        className="mobile-cta-bar__book"
        data-track="mobile-bar-book"
      >
        Book Lesson
      </a>
      <a
        href={whatsappUrl({ context: "general" })}
        className="mobile-cta-bar__wa"
        target="_blank"
        rel="noopener noreferrer"
        data-track="mobile-bar-whatsapp"
      >
        <IconWhatsApp size="sm" />
        WhatsApp
      </a>
    </div>
  );
}
