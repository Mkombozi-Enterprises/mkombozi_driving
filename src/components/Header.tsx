"use client";

import { useEffect, useState } from "react";
import { IconBrand, IconClose, IconMenu } from "./Icons";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className="util-bar">
        <div className="util-inner">
          <div className="util-left">
            <a className="util-item" href={`tel:${site.phoneTel}`}>
              <IconPhoneSm /> {site.phone}
            </a>
            <a className="util-item" href={`mailto:${site.email}`}>
              <IconMailSm /> {site.email}
            </a>
            <span className="util-item">
              <IconClockSm /> {site.hours}
            </span>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="site-header">
        <div className="nav-inner">
          <a href="#home" className="brand">
            <IconBrand />
            <span className="brand-text">
              <b>Mkombozi</b>
              <span>Driving School</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-track="header-nav"
                data-track-label={l.href.replace("#", "")}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <a href="#contact" className="btn btn-primary btn-small">
              Enrol Now
            </a>
            <button
              className="nav-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-top">
          <span className="brand-text" style={{ color: "#fff" }}>
            <b style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
              Mkombozi
            </b>
          </span>
          <button
            className="close-btn"
            type="button"
            aria-label="Close menu"
            onClick={close}
          >
            <IconClose />
          </button>
        </div>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary mobile-cta" onClick={close}>
          Enrol Now
        </a>
      </div>
    </>
  );
}

function IconPhoneSm() {
  return (
    <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}
function IconMailSm() {
  return (
    <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function IconClockSm() {
  return (
    <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
