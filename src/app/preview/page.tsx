"use client";

import { useEffect, useState } from "react";
import { SiteProvider } from "@/lib/cms/provider";
import type { SiteContent } from "@/lib/cms/types";
import { Header } from "@/components/Header";
import { JourneySpine } from "@/components/JourneySpine";
import { Hero } from "@/components/Hero";
import {
  AboutSection,
  ContactSection,
  CoursesSection,
  FAQSection,
  FleetSection,
  FounderSection,
  InstructorsSection,
  OriginSection,
  PricingSection,
  ResourcesSection,
  RouteSection,
  WallSection,
} from "@/components/Sections";
import { Footer } from "@/components/Footer";

const CHANNEL = "mkombozi-cms-preview";

/**
 * Live draft preview — content arrives via postMessage from /admin.
 * Not linked in public nav; used inside the CMS device frames.
 */
export default function PreviewPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [ready, setReady] = useState(false);
  const [highlight, setHighlight] = useState<string>("");

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.channel !== CHANNEL) return;
      if (data.type === "content" && data.content) {
        setContent(data.content as SiteContent);
        setReady(true);
      }
      if (data.type === "highlight" && typeof data.anchor === "string") {
        setHighlight(data.anchor);
        const id = data.anchor.replace(/^#/, "");
        if (id) {
          // slight delay so layout paints with new content
          window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 80);
        }
      }
    };
    window.addEventListener("message", onMessage);
    // Request content if parent is ready
    window.parent?.postMessage({ channel: CHANNEL, type: "ready" }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!highlight) return;
    const id = highlight.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("cms-preview-highlight");
    const t = window.setTimeout(() => el.classList.remove("cms-preview-highlight"), 2200);
    return () => window.clearTimeout(t);
  }, [highlight, content]);

  if (!content) {
    return (
      <div className="cms-preview-waiting">
        <p>Waiting for draft from the CMS…</p>
        <p className="cms-preview-waiting__hint">
          Open the preview panel in Admin. Changes appear here before you publish.
        </p>
      </div>
    );
  }

  return (
    <SiteProvider content={content}>
      <div className={`cms-preview-root${ready ? " is-ready" : ""}`} data-preview="1">
        <div className="cms-preview-banner" role="status">
          Draft preview — not published until you press Publish on the live site
        </div>
        <Header />
        <JourneySpine />
        <div className="page-shell">
          <main>
            <Hero hasHeroPhoto={false} />
            <AboutSection />
            <FounderSection />
            <OriginSection />
            <CoursesSection />
            <RouteSection />
            <FleetSection />
            <PricingSection />
            <ResourcesSection />
            <InstructorsSection />
            <WallSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </SiteProvider>
  );
}
