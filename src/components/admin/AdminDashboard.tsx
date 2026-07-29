"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  cmsLogout,
  listCmsAuditAction,
  saveCmsContentAction,
} from "@/app/actions/cms";
import type { AuditEntry } from "@/lib/cms/audit";
import { CMS_MAP, getMapSection, type CmsMapSection } from "@/lib/cms/sections-map";
import type { SiteContent } from "@/lib/cms/types";
import {
  AddOnsFields,
  CopyFields,
  CoursesFields,
  FaqFields,
  FleetFields,
  FormOptionsFields,
  FoundersFields,
  InstructorsFields,
  NavFields,
  PackageFields,
  ResourcesFields,
  RouteFields,
  SiteFields,
  WallFields,
} from "./AdminFields";
import "../../app/admin/admin.css";

const CHANNEL = "mkombozi-cms-preview";

type SectionId = CmsMapSection["id"];
type DeviceMode = "phone" | "desktop" | "split";
type MobilePane = "edit" | "preview" | "map";

const EDIT_SECTIONS = CMS_MAP.filter((s) => s.id !== "audit");

function stableStringify(value: unknown): string {
  return JSON.stringify(value);
}

export function AdminDashboard({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [published, setPublished] = useState<SiteContent>(initial);
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<SectionId>("copy");
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();
  const [navOpen, setNavOpen] = useState(false);
  const [device, setDevice] = useState<DeviceMode>("phone");
  const [mobilePane, setMobilePane] = useState<MobilePane>("edit");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [auditErr, setAuditErr] = useState<string | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  const phoneRef = useRef<HTMLIFrameElement>(null);
  const desktopRef = useRef<HTMLIFrameElement>(null);

  const dirty = useMemo(
    () => stableStringify(content) !== stableStringify(published),
    [content, published]
  );

  const mapSection = getMapSection(section) || EDIT_SECTIONS[0];

  const updatedLabel = useMemo(
    () =>
      published.updatedAt
        ? new Date(published.updatedAt).toLocaleString("en-KE")
        : "—",
    [published.updatedAt]
  );

  const pushToFrame = useCallback(
    (frame: HTMLIFrameElement | null, data: object) => {
      if (!frame?.contentWindow) return;
      frame.contentWindow.postMessage(
        { channel: CHANNEL, ...data },
        window.location.origin
      );
    },
    []
  );

  const broadcastContent = useCallback(() => {
    const payload = { type: "content" as const, content };
    pushToFrame(phoneRef.current, payload);
    pushToFrame(desktopRef.current, payload);
  }, [content, pushToFrame]);

  const broadcastHighlight = useCallback(
    (anchor: string) => {
      if (!anchor) return;
      const payload = { type: "highlight" as const, anchor };
      pushToFrame(phoneRef.current, payload);
      pushToFrame(desktopRef.current, payload);
    },
    [pushToFrame]
  );

  // Keep draft iframes in sync as the manager types
  useEffect(() => {
    const t = window.setTimeout(broadcastContent, 180);
    return () => window.clearTimeout(t);
  }, [broadcastContent]);

  // Child frames request content when ready
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.channel !== CHANNEL) return;
      if (data.type === "ready") {
        broadcastContent();
        if (mapSection?.anchor) {
          broadcastHighlight(mapSection.anchor);
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [broadcastContent, broadcastHighlight, mapSection?.anchor]);

  const loadAudit = useCallback(() => {
    setAuditLoading(true);
    setAuditErr(null);
    startTransition(async () => {
      const res = await listCmsAuditAction();
      setAuditLoading(false);
      if (!res.ok) {
        setAuditErr(res.error);
        return;
      }
      setAudit(res.entries);
    });
  }, []);

  useEffect(() => {
    if (section === "audit") loadAudit();
  }, [section, loadAudit]);

  const selectSection = (id: SectionId) => {
    setSection(id);
    setNavOpen(false);
    setStatus(null);
    if (id !== "audit") {
      setMobilePane("edit");
      const m = getMapSection(id);
      if (m?.anchor) {
        // Allow iframe content paint then scroll
        window.setTimeout(() => broadcastHighlight(m.anchor), 220);
      }
    }
  };

  const publish = useCallback(() => {
    setStatus(null);
    startTransition(async () => {
      const res = await saveCmsContentAction(content, {
        section: section === "audit" ? "all" : section,
      });
      if (!res.ok) {
        setStatus({ type: "err", msg: res.error });
        return;
      }
      setPublished(res.content);
      setContent(res.content);
      setStatus({
        type: "ok",
        msg: "Published. The live site will show this draft on the next load.",
      });
      router.refresh();
      if (section === "audit") loadAudit();
    });
  }, [content, section, router, loadAudit]);

  const discard = () => {
    setContent(published);
    setStatus({ type: "ok", msg: "Draft discarded — back to last published version." });
  };

  const logout = () => {
    startTransition(async () => {
      await cmsLogout();
      router.replace("/admin/login");
      router.refresh();
    });
  };

  const showPhone = device === "phone" || device === "split";
  const showDesktop = device === "desktop" || device === "split";

  return (
    <div className="cms cms-v2">
      <header className="cms-topbar">
        <div className="cms-topbar__brand">
          <button
            type="button"
            className="cms-icon-btn cms-nav-toggle"
            aria-label={navOpen ? "Close sections" : "Open sections"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="cms-burger" aria-hidden />
          </button>
          <div>
            <p className="cms-topbar__title">Mkombozi CMS</p>
            <p className="cms-topbar__meta">
              {dirty ? (
                <span className="cms-pill cms-pill--draft">Unpublished draft</span>
              ) : (
                <span className="cms-pill cms-pill--live">Live</span>
              )}
              <span className="cms-topbar__sep">·</span>
              Last publish {updatedLabel}
            </p>
          </div>
        </div>

        <div className="cms-topbar__actions">
          {dirty ? (
            <button
              type="button"
              className="cms-btn cms-btn-ghost"
              onClick={discard}
              disabled={pending}
            >
              Discard
            </button>
          ) : null}
          <button
            type="button"
            className="cms-btn cms-btn-primary"
            onClick={publish}
            disabled={pending || !dirty}
          >
            {pending ? "Publishing…" : "Publish"}
          </button>
          <button
            type="button"
            className="cms-btn cms-btn-ghost cms-btn-logout"
            onClick={logout}
            disabled={pending}
          >
            Log out
          </button>
        </div>
      </header>

      {navOpen ? (
        <button
          type="button"
          className="cms-nav-scrim"
          aria-label="Close menu"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <div className={`cms-layout${previewOpen ? " has-preview" : ""}`}>
        <aside className={`cms-sidebar${navOpen ? " is-open" : ""}`}>
          <p className="cms-sidebar__label">Page map</p>
          <nav className="cms-side-nav" aria-label="CMS sections">
            {CMS_MAP.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`cms-side-nav__item${section === s.id ? " active" : ""}`}
                onClick={() => selectSection(s.id)}
              >
                <span className="cms-side-nav__name">{s.label}</span>
                <span className="cms-side-nav__where">{s.appearsOn}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="cms-workspace">
          {/* Mobile pane switcher */}
          <div className="cms-mobile-tabs" role="tablist" aria-label="CMS panes">
            <button
              type="button"
              role="tab"
              aria-selected={mobilePane === "edit"}
              className={mobilePane === "edit" ? "active" : ""}
              onClick={() => setMobilePane("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobilePane === "preview"}
              className={mobilePane === "preview" ? "active" : ""}
              onClick={() => {
                setMobilePane("preview");
                setPreviewOpen(true);
              }}
            >
              Preview
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobilePane === "map"}
              className={mobilePane === "map" ? "active" : ""}
              onClick={() => setMobilePane("map")}
            >
              Map
            </button>
          </div>

          {status ? (
            <div
              className={`cms-banner ${status.type === "ok" ? "ok" : "err"}`}
              role="status"
            >
              {status.msg}
            </div>
          ) : null}

          <div
            className={`cms-editor-pane${
              mobilePane === "edit" || mobilePane === "map" ? " is-mobile-visible" : ""
            }${mobilePane === "map" ? " show-map-only" : ""}`}
          >
            <div className="cms-section-context">
              <div>
                <h2>{mapSection.label}</h2>
                <p className="cms-section-context__appears">
                  <strong>Shows on:</strong> {mapSection.appearsOn || "Admin only"}
                </p>
                <p className="cms-section-context__help">{mapSection.help}</p>
              </div>
              {mapSection.anchor ? (
                <button
                  type="button"
                  className="cms-btn cms-btn-ghost cms-btn-sm"
                  onClick={() => {
                    setPreviewOpen(true);
                    setMobilePane("preview");
                    broadcastHighlight(mapSection.anchor);
                  }}
                >
                  Jump in preview {mapSection.anchor}
                </button>
              ) : null}
            </div>

            {/* Road-map strip for orientation */}
            <div
              className={`cms-roadmap${mobilePane === "map" ? " is-expanded" : ""}`}
              aria-label="Homepage section map"
            >
              <p className="cms-roadmap__title">Homepage road</p>
              <ol className="cms-roadmap__list">
                {[...EDIT_SECTIONS]
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={section === s.id ? "active" : ""}
                        onClick={() => selectSection(s.id)}
                      >
                        <span className="cms-roadmap__km">{s.order}</span>
                        <span>{s.label}</span>
                      </button>
                    </li>
                  ))}
              </ol>
            </div>

            {section === "audit" ? (
              <AuditPanel
                entries={audit}
                loading={auditLoading || pending}
                error={auditErr}
                onRefresh={loadAudit}
              />
            ) : (
              <SectionEditor
                section={section}
                content={content}
                setContent={setContent}
              />
            )}
          </div>

          <div
            className={`cms-preview-pane${previewOpen ? " is-open" : ""}${
              mobilePane === "preview" ? " is-mobile-visible" : ""
            }`}
          >
            <div className="cms-preview-toolbar">
              <div className="cms-device-toggle" role="group" aria-label="Preview device">
                <button
                  type="button"
                  className={device === "phone" ? "active" : ""}
                  onClick={() => setDevice("phone")}
                >
                  Phone
                </button>
                <button
                  type="button"
                  className={device === "desktop" ? "active" : ""}
                  onClick={() => setDevice("desktop")}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  className={device === "split" ? "active" : ""}
                  onClick={() => setDevice("split")}
                >
                  Both
                </button>
              </div>
              <div className="cms-preview-toolbar__right">
                {dirty ? (
                  <span className="cms-pill cms-pill--draft">Draft · not live</span>
                ) : (
                  <span className="cms-pill cms-pill--live">Matches live</span>
                )}
                <button
                  type="button"
                  className="cms-btn cms-btn-ghost cms-btn-sm cms-hide-desktop"
                  onClick={() => setMobilePane("edit")}
                >
                  Back to edit
                </button>
                <button
                  type="button"
                  className="cms-btn cms-btn-ghost cms-btn-sm cms-hide-mobile"
                  onClick={() => setPreviewOpen((o) => !o)}
                >
                  {previewOpen ? "Hide preview" : "Show preview"}
                </button>
              </div>
            </div>

            <div
              className={`cms-device-stage device-${device}${
                showPhone && showDesktop ? " is-split" : ""
              }`}
            >
              {showPhone ? (
                <div className="cms-device cms-device--phone">
                  <div className="cms-device__chrome">
                    <span className="cms-device__notch" />
                    <span className="cms-device__label">Phone · draft</span>
                  </div>
                  <iframe
                    ref={phoneRef}
                    title="Phone draft preview"
                    src="/preview"
                    className="cms-device__frame"
                    onLoad={broadcastContent}
                  />
                </div>
              ) : null}

              {showDesktop ? (
                <div className="cms-device cms-device--desktop">
                  <div className="cms-device__chrome cms-device__chrome--desktop">
                    <span className="cms-device__dots" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="cms-device__url">mkombozi · draft preview</span>
                  </div>
                  <iframe
                    ref={desktopRef}
                    title="Desktop draft preview"
                    src="/preview"
                    className="cms-device__frame"
                    onLoad={broadcastContent}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  content,
  setContent,
}: {
  section: string;
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}) {
  const props = { content, setContent };
  switch (section) {
    case "site":
      return <SiteFields {...props} />;
    case "founders":
      return <FoundersFields {...props} />;
    case "copy":
      return <CopyFields {...props} />;
    case "nav":
      return <NavFields {...props} />;
    case "route":
      return <RouteFields {...props} />;
    case "courses":
      return <CoursesFields {...props} />;
    case "addons":
      return <AddOnsFields {...props} />;
    case "packages":
      return <PackageFields {...props} />;
    case "resources":
      return <ResourcesFields {...props} />;
    case "instructors":
      return <InstructorsFields {...props} />;
    case "faqs":
      return <FaqFields {...props} />;
    case "fleet":
      return <FleetFields {...props} />;
    case "wall":
      return <WallFields {...props} />;
    case "form":
      return <FormOptionsFields {...props} />;
    default:
      return (
        <div className="cms-card">
          <p>Unknown section.</p>
        </div>
      );
  }
}

function AuditPanel({
  entries,
  loading,
  error,
  onRefresh,
}: {
  entries: AuditEntry[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  return (
    <div className="cms-card cms-audit">
      <div className="cms-list-head">
        <h3>Audit log</h3>
        <button
          type="button"
          className="cms-btn cms-btn-ghost cms-btn-sm"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>
      <p className="cms-section-context__help" style={{ marginTop: 0 }}>
        Every publish and media upload is recorded here. Use this when Hudson asks
        “who changed the pricing?” or to confirm a publish went through.
      </p>
      {error ? (
        <div className="cms-banner err" role="alert">
          {error}
        </div>
      ) : null}
      {!entries.length && !loading ? (
        <p className="cms-empty-hint">No entries yet — publish something to start the log.</p>
      ) : (
        <ul className="cms-audit-list">
          {entries.map((e) => (
            <li key={e.id} className="cms-audit-item">
              <div className="cms-audit-item__top">
                <span className={`cms-audit-badge cms-audit-badge--${e.action}`}>
                  {e.action}
                </span>
                <time dateTime={e.at}>
                  {new Date(e.at).toLocaleString("en-KE")}
                </time>
              </div>
              <p className="cms-audit-item__summary">{e.summary}</p>
              <p className="cms-audit-item__meta">
                {e.section ? <span>Section: {e.section}</span> : null}
                <span>Actor: {e.actor}</span>
                {e.detail ? <span>{e.detail}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
