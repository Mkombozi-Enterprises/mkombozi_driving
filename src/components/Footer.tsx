import { IconBrand, IconFacebook, IconInstagram, IconWhatsApp, IconX } from "./Icons";
import { site } from "@/lib/site";

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
              <div className="footer-socials">
                <a href="#" aria-label="Facebook">
                  <IconFacebook size="sm" />
                </a>
                <a href="#" aria-label="Instagram">
                  <IconInstagram size="sm" />
                </a>
                <a href="#" aria-label="X">
                  <IconX size="sm" />
                </a>
              </div>
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
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {year} Mkombozi Driving School. All rights reserved.
            </span>
            <span>Safari njema — safe journeys.</span>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        className="wa-float"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconWhatsApp />
      </a>
    </>
  );
}
