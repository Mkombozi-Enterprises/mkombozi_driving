"use client";

import { useEffect, useState } from "react";
import { IconChevron } from "./Icons";

export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [sawa, setSawa] = useState(false);

  useEffect(() => {
    if (!sawa) return;
    const t = window.setTimeout(() => setSawa(false), 900);
    return () => window.clearTimeout(t);
  }, [sawa]);

  return (
    <div className="faq-list">
      {sawa ? (
        <span className="sawa-tag" role="status">
          Sawa.
        </span>
      ) : null}
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => {
                const next = isOpen ? null : i;
                setOpen(next);
                if (next !== null) setSawa(true);
              }}
            >
              <span>{item.q}</span>
              <IconChevron />
            </button>
            <div className="faq-a">
              <div className="faq-a-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
