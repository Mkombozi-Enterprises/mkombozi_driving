import Image from "next/image";
import { IconBrand, IconWhatsApp } from "./Icons";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { MobileCtaBar } from "./MobileCtaBar";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="brand">
                <IconBrand />
                <span className="brand-text">
                  <b>Mkombozi</b>
                  <span>Driving School</span>
                </span>
              </a>
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
                  <a href="#courses">Class A — Motorcycle</a>
                </li>
                <li>
                  <a href="#courses">Class B — Car</a>
                </li>
                <li>
                  <a href="#courses">Class C — Truck</a>
                </li>
                <li>
                  <a href="#courses">Class D — PSV</a>
                </li>
                <li>
                  <a href="#courses">Defensive Driving</a>
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
                    href={whatsappUrl({ context: "general" })}
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
            <span>Mkombozi Driving School · Lumakanda</span>
          </div>
        </div>
      </footer>

      <WhatsAppHumanFloat />
      <MobileCtaBar />
    </>
  );
}

function WhatsAppHumanFloat() {
  return (
    <div className="wa-human wa-float--desktop">
      <div className="wa-human__bubble" role="status">
        Hi! Need help choosing between Class B and D? Text us.
      </div>
      <a
        href={whatsappUrl({ context: "general" })}
        className="wa-float wa-human__btn"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        data-track="wa-float-desktop"
      >
        <span className="wa-human__avatar" aria-hidden>
          <Image
            src="/images/founder.jpeg"
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
