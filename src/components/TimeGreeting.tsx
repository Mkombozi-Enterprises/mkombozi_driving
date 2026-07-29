"use client";

import { useEffect, useState } from "react";
import { eveningBannerForHour, greetingForHour } from "@/lib/site";

/** EAT-aware concierge line for the hero */
export function TimeGreeting() {
  const [line, setLine] = useState<string | null>(null);
  const [evening, setEvening] = useState<string | null>(null);

  useEffect(() => {
    // Prefer Africa/Nairobi wall clock
    const fmt = new Intl.DateTimeFormat("en-KE", {
      timeZone: "Africa/Nairobi",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(fmt.format(new Date()), 10);
    setLine(greetingForHour(Number.isFinite(hour) ? hour : new Date().getHours()));
    setEvening(eveningBannerForHour(Number.isFinite(hour) ? hour : new Date().getHours()));
  }, []);

  if (!line) {
    return (
      <p className="hero-time-greet hero-time-greet--pending" aria-hidden>
        &nbsp;
      </p>
    );
  }

  return (
    <>
      {evening ? (
        <p className="hero-evening-tag" role="status">
          {evening}
        </p>
      ) : null}
      <p className="hero-time-greet">{line}</p>
    </>
  );
}
