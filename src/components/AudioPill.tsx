"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  label: string;
  /** Shown when file 404s — still documents the intended clip */
  fallbackNote?: string;
  className?: string;
  compact?: boolean;
};

/**
 * Road-sign styled HTML5 audio control.
 * Lazy-loads src only after first play intent. Authenticity > studio polish.
 */
export function AudioPill({
  src,
  label,
  fallbackNote,
  className = "",
  compact = false,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio();
    a.preload = "none";
    a.src = src;
    a.addEventListener("timeupdate", () => {
      if (a.duration) setProgress(a.currentTime / a.duration);
    });
    a.addEventListener("ended", () => {
      setPlaying(false);
      setProgress(0);
    });
    a.addEventListener("error", () => {
      setMissing(true);
      setPlaying(false);
    });
    a.addEventListener("canplay", () => setReady(true));
    audioRef.current = a;
    return a;
  };

  const toggle = async () => {
    if (missing) return;
    const a = ensureAudio();
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      await a.play();
      setPlaying(true);
      setReady(true);
    } catch {
      setMissing(true);
    }
  };

  return (
    <div
      className={`audio-pill${compact ? " audio-pill--compact" : ""} ${className}`.trim()}
    >
      <button
        type="button"
        className={`audio-pill__btn${playing ? " is-playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        disabled={missing}
      >
        {playing ? (
          <span className="audio-pill__icon" aria-hidden>
            ❚❚
          </span>
        ) : (
          <span className="audio-pill__icon audio-pill__icon--play" aria-hidden>
            ▶
          </span>
        )}
      </button>
      <div className="audio-pill__meta">
        <span className="audio-pill__label">{label}</span>
        <span className="audio-pill__track" aria-hidden>
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </span>
        {missing ? (
          <span className="audio-pill__hint">
            {fallbackNote || "Voice note coming soon — record on phone, drop MP3 here."}
          </span>
        ) : (
          <span className="audio-pill__hint">
            {ready || playing ? "Voice note" : "Tap play · phone-recorded"}
          </span>
        )}
      </div>
    </div>
  );
}
