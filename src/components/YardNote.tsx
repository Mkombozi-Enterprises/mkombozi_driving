"use client";

import { useSiteContent } from "@/lib/cms/provider";

/** Handwritten-style pin — feels updated by a person, not a cron job */
export function YardNote() {
  const { yardNote } = useSiteContent();
  return (
    <aside className="yard-note" aria-label="Note from the yard">
      <span className="yard-note__pin" aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="8" r="5" fill="#E9A820" />
          <circle cx="12" cy="8" r="2" fill="#14161C" />
          <path d="M12 13v8" stroke="#C78D12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <p className="yard-note__label">{yardNote.updatedLabel}</p>
      <p className="yard-note__body">{yardNote.body}</p>
      <p className="yard-note__sign">{yardNote.signOff}</p>
    </aside>
  );
}
