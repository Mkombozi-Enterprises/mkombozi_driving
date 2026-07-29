"use client";

import Image from "next/image";
import { IconWhatsApp } from "./Icons";
import { useSiteContent } from "@/lib/cms/provider";
import { whatsappUrl } from "@/lib/whatsapp";
import { MobileCtaBar } from "./MobileCtaBar";

export function Footer() {
  const { site } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="footer-band">
          <a
            href="#home"
            className="footer-logo-panel"
            aria-label={`${site.name} home`}
          >
            <span className="footer-logo-panel__fill" aria-hidden>
              <Image
                src="/icon.png"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 28vw"
                className="footer-logo-panel__img"
                priority={false}
              />
            </span>
            <span className="footer-logo-panel__grain" aria-hidden />
            <span className="footer-logo-panel__edge" aria-hidden />
            <span className="footer-logo-panel__caption">Mkombozi</span>
          </a>

          <div className="footer-main">
            <div className="footer-grid">
              <div className="footer-brand">
                <p className="footer-brand-name">{site.name}</p>
                <p>
                  Your road to independence. NTSA-registered driver training in Kakamega
                  County and beyond.
                </p>
                <a
                  href={site.googleBusinessUrl}
                  className="footer-gbp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find us on Google · Leave a review
                </a>
              </div>
              <div className="footer-col">
                <h5>Quick Links</h5>
                <ul>
                  <li>
                    <a href="#about">About Us</a>
                  </li>
                  <li>
                    <a href="#courses">Courses</a>
                  </li>
                  <li>
                    <a href="#pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="#instructors">Instructors</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h5>Courses</h5>
                <ul>
                  <li>
                    <a href="#courses">A1 — Moped</a>
                  </li>
                  <li>
                    <a href="#courses">A2 — Light motorcycle</a>
                  </li>
                  <li>
                    <a href="#courses">A3 — Taxi / three-wheeler</a>
                  </li>
                  <li>
                    <a href="#courses">B1 — Light vehicle</a>
                  </li>
                  <li>
                    <a href="#courses">B2 — Automatic</a>
                  </li>
                  <li>
                    <a href="#courses">B3 — Professional</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h5>Contact</h5>
                <ul>
                  <li>{site.addressShort}</li>
                  <li>
                    <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl(site.whatsapp, { context: "general" })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp chat
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <span>Built by hand in Kakamega. Safari njema. · {year}</span>
              <span>
                {site.name} · Lumakanda
              </span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppHumanFloat whatsapp={site.whatsapp} />
      <MobileCtaBar />
    </>
  );
}

function WhatsAppHumanFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="wa-human wa-float--desktop">
      <div className="wa-human__bubble" role="status">
        Hi! Need help choosing between Category A and B? Text us.
      </div>
      <a
        href={whatsappUrl(whatsapp, { context: "general" })}
        className="wa-float wa-human__btn"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        data-track="wa-float-desktop"
      >
        <span className="wa-human__avatar" aria-hidden>
          <Image
            src="/images/EdwardMusamusi.png"
            alt=""
            width={40}
            height={40}
            className="wa-human__avatar-img"
          />
        </span>
        <IconWhatsApp />
        <span className="wa-float__label">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
