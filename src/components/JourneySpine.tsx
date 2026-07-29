"use client";

import { useCallback, useEffect, useState } from "react";
import { journeyPosts } from "@/lib/site";

/**
 * Signature element: a dashed centre-line (road marking) with kilometre posts.
 * Progress tracks scroll; posts jump to sections. Encodes "licence = a route".
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

    // Marker rides the track (12vh → bottom 10vh)
    const trackStart = window.innerHeight * 0.12;
    const trackEnd = window.innerHeight * 0.9;
    const trackLen = trackEnd - trackStart;
    setMarkerTop(trackStart + trackLen * Math.min(1, Math.max(0, p)));

    // Active post = section closest to viewport centre
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

  // Vertical positions for posts along the fixed track
  const last = Math.max(journeyPosts.length - 1, 1);
  const postPositions = journeyPosts.map((_, i) => `${(i / last) * 100}%`);

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
              >
                {post.short}
                <span className="journey-spine__label">{post.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <nav className="journey-spine-mobile" aria-label="Page journey">
        <div className="journey-spine-mobile__inner">
          {journeyPosts.map((post, i) => (
            <button
              key={post.id}
              type="button"
              className={`journey-spine-mobile__post${i === active ? " is-active" : ""}`}
              onClick={() => goTo(post.id)}
              aria-label={`Go to ${post.label}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="journey-spine-mobile__num">{post.short}</span>
              <span>{post.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
