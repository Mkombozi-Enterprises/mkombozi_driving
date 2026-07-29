"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroProps = {
  /** True when public/images/hero.jpg exists (detected on the server). */
  hasHeroPhoto?: boolean;
};

/**
 * Photography-ready hero:
 * - Primary media stage uses /images/hero.jpg when present
 * - Fallback: road geometry + real founder inset (no fake cars)
 */
export function Hero({ hasHeroPhoto = false }: HeroProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rowRef.current;
    if (!root) return;
    const counters = root.querySelectorAll<HTMLElement>(".stat-num");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = Math.round(target) + suffix;
        return;
      }
      const duration = 1300;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">NTSA-Certified · Kakamega County</span>
          <h1>
            <span className="line">Your road to</span>
            <span className="line accent">independence.</span>
          </h1>
          <p className="hero-sub">
            Mkombozi means <em>liberator</em> — and that&apos;s exactly what a driving
            licence gives you. Patient, professional instruction for every category of
            Kenyan licence: manual, automatic, motorcycle, and PSV.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              Book Your First Lesson
            </a>
            <a href="#courses" className="btn btn-ghost">
              See Our Courses
            </a>
          </div>
          <div className="stat-row" ref={rowRef}>
            <div className="stat">
              <b className="stat-num" data-target="1200" data-suffix="+">
                0
              </b>
              <span>Graduates</span>
            </div>
            <div className="stat">
              <b className="stat-num" data-target="97" data-suffix="%">
                0
              </b>
              <span>Pass Rate</span>
            </div>
            <div className="stat">
              <b className="stat-num" data-target="12" data-suffix=" yrs">
                0
              </b>
              <span>On Kenyan Roads</span>
            </div>
            <div className="stat">
              <b>NTSA</b>
              <span>Registered School</span>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-media-frame">
            <span className="hero-tick hero-tick--tl" aria-hidden />
            <span className="hero-tick hero-tick--tr" aria-hidden />
            <span className="hero-tick hero-tick--bl" aria-hidden />
            <span className="hero-tick hero-tick--br" aria-hidden />

            {hasHeroPhoto ? (
              <Image
                src="/images/hero.jpg"
                alt="Mkombozi learner training in a dual-control vehicle, Kakamega County"
                fill
                priority
                sizes="(max-width: 980px) 90vw, 480px"
                className="hero-media-photo"
              />
            ) : (
              <div className="hero-media-compose">
                <div className="hero-media-road" aria-hidden>
                  <RoadArt />
                </div>
                <div className="hero-media-inset">
                  <Image
                    src="/images/founder.jpeg"
                    alt="Founders of Mkombozi Driving School"
                    width={280}
                    height={200}
                    className="hero-media-inset-img"
                    priority
                  />
                  <span className="hero-media-inset-label">Our founders</span>
                </div>
              </div>
            )}

            <div className="hero-media-scrim" aria-hidden />
            <div className="hero-media-meta">
              <span className="hero-media-chip">Lumakanda yard</span>
              <span className="hero-media-chip hero-media-chip--quiet">
                Dual-control · NTSA path
              </span>
            </div>
          </div>

          <p className="hero-media-note">
            {hasHeroPhoto
              ? "Training on Kenyan roads — plates kept out of frame."
              : "Photo stage ready: drop public/images/hero.jpg (plate-safe yard or dual-control)."}
          </p>
        </div>
      </div>
    </section>
  );
}

function RoadArt() {
  return (
    <svg viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg" role="presentation">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3d36" />
          <stop offset="100%" stopColor="#14181c" />
        </linearGradient>
        <linearGradient id="hero-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b2d33" />
          <stop offset="100%" stopColor="#141519" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E9A820" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E9A820" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="500" height="240" fill="url(#hero-sky)" />
      <circle cx="250" cy="235" r="120" fill="url(#hero-sun)" />
      <rect x="0" y="235" width="500" height="325" fill="url(#hero-ground)" />
      <path
        d="M60,560 L220,235 L280,235 L440,560 Z"
        fill="#26282E"
        stroke="#3A3D45"
        strokeWidth="2"
      />
      <rect x="243" y="500" width="14" height="46" fill="#E9A820" opacity="0.9" />
      <rect x="245" y="420" width="10" height="34" fill="#E9A820" opacity="0.85" />
      <rect x="246.5" y="360" width="7" height="26" fill="#E9A820" opacity="0.8" />
      <rect x="247.5" y="312" width="5" height="18" fill="#E9A820" opacity="0.75" />
      <rect x="248.5" y="270" width="3" height="10" fill="#E9A820" opacity="0.7" />
      <g transform="translate(250,505)">
        <rect x="-46" y="-6" width="92" height="34" rx="10" fill="#F0EBE0" />
        <rect x="-30" y="-26" width="60" height="26" rx="8" fill="#F0EBE0" />
        <circle cx="-32" cy="30" r="11" fill="#14161C" />
        <circle cx="32" cy="30" r="11" fill="#14161C" />
      </g>
    </svg>
  );
}
