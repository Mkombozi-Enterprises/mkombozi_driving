"use client";

import { useCallback, useEffect, useState } from "react";
import { journeyPosts } from "@/lib/site";

/**
 * Signature: dashed centre-line + km posts (desktop).
 * Mobile: compact progress indicator only — reduces nav competition with header.
 * data-track attrs ready for analytics (spine vs header).
 */
export function JourneySpine() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [markerTop, setMarkerTop] = useState(0);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const p = scrollable > 0 ? window.scrollY / scrollable : 0;
    setProgress(Math.min(1, Math.max(0, p)));

    const trackStart = window.innerHeight * 0.12;
    const trackEnd = window.innerHeight * 0.9;
    const trackLen = trackEnd - trackStart;
    setMarkerTop(trackStart + trackLen * Math.min(1, Math.max(0, p)));

    let best = 0;
    let bestDist = Infinity;
    const mid = window.scrollY + window.innerHeight * 0.35;
    journeyPosts.forEach((post, i) => {
      const el = document.getElementById(post.id);
      if (!el) return;
      const top = el.offsetTop;
      const dist = Math.abs(top - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    update();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const onScroll = () => {
      if (reduce) {
        update();
        return;
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const last = Math.max(journeyPosts.length - 1, 1);
  const postPositions = journeyPosts.map((_, i) => `${(i / last) * 100}%`);
  const current = journeyPosts[active];

  return (
    <>
      <nav className="journey-spine" aria-label="Page journey">
        <div className="journey-spine__track" aria-hidden />
        <div
          className="journey-spine__progress"
          style={{ height: `calc((78vh) * ${progress})` }}
          aria-hidden
        />
        <div
          className="journey-spine__marker"
          style={{ top: markerTop }}
          aria-hidden
        />
        <div className="journey-spine__posts">
          {journeyPosts.map((post, i) => {
            const isActive = i === active;
            const isPassed = i < active;
            return (
              <button
                key={post.id}
                type="button"
                className={`journey-spine__post${isActive ? " is-active" : ""}${isPassed ? " is-passed" : ""}`}
                style={{ top: postPositions[i] }}
                onClick={() => goTo(post.id)}
                aria-label={`Go to ${post.label}`}
                aria-current={isActive ? "true" : undefined}
                data-track="spine-post"
                data-track-label={post.id}
              >
                {post.short}
                <span className="journey-spine__label">{post.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile: progress only — not a second nav system */}
      <div
        className="journey-progress-mobile"
        role="status"
        aria-live="polite"
        aria-label={`Journey step ${active + 1} of ${journeyPosts.length}: ${current?.label}`}
      >
        <div className="journey-progress-mobile__bar" aria-hidden>
          <span style={{ width: `${((active + 1) / journeyPosts.length) * 100}%` }} />
        </div>
        <p className="journey-progress-mobile__label">
          Step {active + 1} of {journeyPosts.length}
          <span> · {current?.label}</span>
        </p>
      </div>
    </>
  );
}
