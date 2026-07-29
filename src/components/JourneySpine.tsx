"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { journeyPosts } from "@/lib/site";

/**
 * Desktop spine starts *below* the sticky nav stack so step 01 is never covered.
 * Marker position is relative to the posts container inside the spine.
 */
export function JourneySpine() {
  const postsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [markerTop, setMarkerTop] = useState(0);
  const [progressH, setProgressH] = useState(0);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const p = scrollable > 0 ? window.scrollY / scrollable : 0;
    const clamped = Math.min(1, Math.max(0, p));

    const posts = postsRef.current;
    if (posts) {
      // Positions relative to .journey-spine
      const start = posts.offsetTop;
      const len = Math.max(posts.offsetHeight, 1);
      setMarkerTop(start + len * clamped);
      setProgressH(len * clamped);
    }

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
          style={{ height: progressH }}
          aria-hidden
        />
        <div
          className="journey-spine__marker"
          style={{ top: markerTop }}
          aria-hidden
        />
        <div className="journey-spine__posts" ref={postsRef}>
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
