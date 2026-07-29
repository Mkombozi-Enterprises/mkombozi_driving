"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "./types";

const SiteCtx = createContext<SiteContent | null>(null);

export function SiteProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  return <SiteCtx.Provider value={content}>{children}</SiteCtx.Provider>;
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteCtx);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteProvider");
  }
  return ctx;
}

/** Safe for optional use — returns null outside provider */
export function useSiteContentOptional(): SiteContent | null {
  return useContext(SiteCtx);
}
