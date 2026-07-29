"use client";

import { useState } from "react";
import {
  uploadInstructorPhotoAction,
  uploadResourceFileAction,
} from "@/app/actions/cms";
import type {
  AddOn,
  FaqItem,
  Instructor,
  ResourceItem,
  SiteContent,
  WallPass,
} from "@/lib/cms/types";

type EditorProps = {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
};

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function Field({
  label,
  value,
  onChange,
  multiline,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <div className="cms-field">
      <label>{label}</label>
      {multiline ? (
        <textarea value={String(value)} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          type={type}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export function SiteFields({ content, setContent }: EditorProps) {
  const s = content.site;
  const set = (key: keyof typeof s, v: string) =>
    setContent((c) => ({
      ...c,
      site: {
        ...c.site,
        [key]:
          key === "mapLat" || key === "mapLng" ? Number(v) || 0 : v,
      },
    }));

  return (
    <div className="cms-card">
      <h3>Contact & map</h3>
      <div className="cms-row">
        <Field label="School name" value={s.name} onChange={(v) => set("name", v)} />
        <Field label="Phone display" value={s.phone} onChange={(v) => set("phone", v)} />
      </div>
      <div className="cms-row">
        <Field label="Phone tel: link" value={s.phoneTel} onChange={(v) => set("phoneTel", v)} />
        <Field label="WhatsApp (254…)" value={s.whatsapp} onChange={(v) => set("whatsapp", v)} />
      </div>
      <Field label="Email" value={s.email} onChange={(v) => set("email", v)} />
      <div className="cms-row">
        <Field label="Hours short" value={s.hours} onChange={(v) => set("hours", v)} />
        <Field label="Hours long" value={s.hoursLong} onChange={(v) => set("hoursLong", v)} />
      </div>
      <Field label="Address" value={s.address} onChange={(v) => set("address", v)} multiline />
      <Field
        label="Address short"
        value={s.addressShort}
        onChange={(v) => set("addressShort", v)}
      />
      <Field
        label="Google Business URL"
        value={s.googleBusinessUrl}
        onChange={(v) => set("googleBusinessUrl", v)}
      />
      <Field
        label="Map embed URL"
        value={s.mapEmbedUrl}
        onChange={(v) => set("mapEmbedUrl", v)}
        multiline
      />
      <div className="cms-row">
        <Field label="Map lat" value={s.mapLat} onChange={(v) => set("mapLat", v)} />
        <Field label="Map lng" value={s.mapLng} onChange={(v) => set("mapLng", v)} />
      </div>
    </div>
  );
}

export function FoundersFields({ content, setContent }: EditorProps) {
  return (
    <>
      <div className="cms-card">
        <h3>Founder quote</h3>
        <Field
          label="Quote"
          value={content.founderQuote}
          onChange={(v) => setContent((c) => ({ ...c, founderQuote: v }))}
          multiline
        />
        <Field
          label="Attribution line"
          value={content.site.founderAttribution}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              site: { ...c.site, founderAttribution: v },
            }))
          }
        />
        <Field
          label="Audio transcript"
          value={content.site.founderAudioTranscript}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              site: { ...c.site, founderAudioTranscript: v },
            }))
          }
          multiline
        />
        <Field
          label="Audio file path"
          value={content.site.founderAudioSrc}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              site: { ...c.site, founderAudioSrc: v },
            }))
          }
        />
      </div>
      <div className="cms-card">
        <h3>Founder portraits</h3>
        {content.site.founders.map((f, i) => (
          <div key={i} className="cms-list-item">
            <Field
              label="Name"
              value={f.name}
              onChange={(v) =>
                setContent((c) => {
                  const founders = [...c.site.founders];
                  founders[i] = { ...founders[i], name: v };
                  return { ...c, site: { ...c.site, founders } };
                })
              }
            />
            <Field
              label="Role"
              value={f.role}
              onChange={(v) =>
                setContent((c) => {
                  const founders = [...c.site.founders];
                  founders[i] = { ...founders[i], role: v };
                  return { ...c, site: { ...c.site, founders } };
                })
              }
            />
            <Field
              label="Image path (public/…)"
              value={f.image}
              onChange={(v) =>
                setContent((c) => {
                  const founders = [...c.site.founders];
                  founders[i] = { ...founders[i], image: v };
                  return { ...c, site: { ...c.site, founders } };
                })
              }
            />
          </div>
        ))}
      </div>
      <div className="cms-card">
        <h3>Yard note (handwritten card)</h3>
        <Field
          label="Label"
          value={content.yardNote.updatedLabel}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardNote: { ...c.yardNote, updatedLabel: v },
            }))
          }
        />
        <Field
          label="Body"
          value={content.yardNote.body}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardNote: { ...c.yardNote, body: v },
            }))
          }
          multiline
        />
        <Field
          label="Sign-off"
          value={content.yardNote.signOff}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardNote: { ...c.yardNote, signOff: v },
            }))
          }
        />
      </div>
      <div className="cms-card">
        <h3>Today at the yard</h3>
        <Field
          label="Title"
          value={content.yardToday.title}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardToday: { ...c.yardToday, title: v },
            }))
          }
        />
        {content.yardToday.lines.map((line, i) => (
          <div key={i} className="cms-row">
            <Field
              label={`Line ${i + 1} icon (car|moto|rain)`}
              value={line.icon}
              onChange={(v) =>
                setContent((c) => {
                  const lines = [...c.yardToday.lines];
                  lines[i] = {
                    ...lines[i],
                    icon: v as "car" | "moto" | "rain",
                  };
                  return { ...c, yardToday: { ...c.yardToday, lines } };
                })
              }
            />
            <Field
              label={`Line ${i + 1} text`}
              value={line.text}
              onChange={(v) =>
                setContent((c) => {
                  const lines = [...c.yardToday.lines];
                  lines[i] = { ...lines[i], text: v };
                  return { ...c, yardToday: { ...c.yardToday, lines } };
                })
              }
            />
          </div>
        ))}
        <Field
          label="Next intake"
          value={content.yardToday.nextIntake}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardToday: { ...c.yardToday, nextIntake: v },
            }))
          }
        />
        <Field
          label="Practice route text"
          value={content.yardToday.practiceRoute}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              yardToday: { ...c.yardToday, practiceRoute: v },
            }))
          }
          multiline
        />
      </div>
    </>
  );
}

export function CopyFields({ content, setContent }: EditorProps) {
  const s = content.site;
  return (
    <div className="cms-card">
      <h3>Marketing copy</h3>
      <Field
        label="Hero sub (after Mkombozi means liberator)"
        value={s.heroSub}
        onChange={(v) =>
          setContent((c) => ({ ...c, site: { ...c.site, heroSub: v } }))
        }
        multiline
      />
      <Field
        label="About lead paragraph"
        value={s.aboutLead}
        onChange={(v) =>
          setContent((c) => ({ ...c, site: { ...c.site, aboutLead: v } }))
        }
        multiline
      />
      <Field
        label="About pull quote"
        value={s.aboutQuote}
        onChange={(v) =>
          setContent((c) => ({ ...c, site: { ...c.site, aboutQuote: v } }))
        }
      />
      <Field
        label="Origin title"
        value={s.originTitle}
        onChange={(v) =>
          setContent((c) => ({ ...c, site: { ...c.site, originTitle: v } }))
        }
      />
      <Field
        label="Origin paragraphs (one per line)"
        value={s.originParagraphs.join("\n\n")}
        onChange={(v) =>
          setContent((c) => ({
            ...c,
            site: {
              ...c.site,
              originParagraphs: v
                .split(/\n\n+/)
                .map((p) => p.trim())
                .filter(Boolean),
            },
          }))
        }
        multiline
      />
      <div className="cms-row">
        <Field
          label="Wall ticker count (this week)"
          value={content.passesTicker.thisWeekCount}
          type="number"
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              passesTicker: {
                ...c.passesTicker,
                thisWeekCount: Number(v) || 0,
              },
            }))
          }
        />
        <Field
          label="Empty wall CTA"
          value={content.passesTicker.emptyCta}
          onChange={(v) =>
            setContent((c) => ({
              ...c,
              passesTicker: { ...c.passesTicker, emptyCta: v },
            }))
          }
        />
      </div>
    </div>
  );
}

export function NavFields({ content, setContent }: EditorProps) {
  return (
    <>
      <div className="cms-card">
        <div className="cms-list-head">
          <h3>Header nav links</h3>
        </div>
        {content.navLinks.map((link, i) => (
          <div key={i} className="cms-list-item">
            <div className="cms-row">
              <Field
                label="Label"
                value={link.label}
                onChange={(v) =>
                  setContent((c) => {
                    const navLinks = [...c.navLinks];
                    navLinks[i] = { ...navLinks[i], label: v };
                    return { ...c, navLinks };
                  })
                }
              />
              <Field
                label="Href (#section)"
                value={link.href}
                onChange={(v) =>
                  setContent((c) => {
                    const navLinks = [...c.navLinks];
                    navLinks[i] = { ...navLinks[i], href: v };
                    return { ...c, navLinks };
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="cms-card">
        <h3>Journey spine posts</h3>
        {content.journeyPosts.map((p, i) => (
          <div key={i} className="cms-list-item">
            <div className="cms-row">
              <Field
                label="Short"
                value={p.short}
                onChange={(v) =>
                  setContent((c) => {
                    const journeyPosts = [...c.journeyPosts];
                    journeyPosts[i] = { ...journeyPosts[i], short: v };
                    return { ...c, journeyPosts };
                  })
                }
              />
              <Field
                label="Label"
                value={p.label}
                onChange={(v) =>
                  setContent((c) => {
                    const journeyPosts = [...c.journeyPosts];
                    journeyPosts[i] = { ...journeyPosts[i], label: v };
                    return { ...c, journeyPosts };
                  })
                }
              />
            </div>
            <Field
              label="Section id"
              value={p.id}
              onChange={(v) =>
                setContent((c) => {
                  const journeyPosts = [...c.journeyPosts];
                  journeyPosts[i] = { ...journeyPosts[i], id: v };
                  return { ...c, journeyPosts };
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function RouteFields({ content, setContent }: EditorProps) {
  return (
    <div className="cms-card">
      <h3>Six route stops</h3>
      {content.routeStops.map((stop, i) => (
        <div key={i} className="cms-list-item">
          <strong>Stop {i + 1}</strong>
          <Field
            label="Title"
            value={stop.title}
            onChange={(v) =>
              setContent((c) => {
                const routeStops = [...c.routeStops];
                routeStops[i] = { ...routeStops[i], title: v };
                return { ...c, routeStops };
              })
            }
          />
          <Field
            label="Body (desktop)"
            value={stop.body}
            onChange={(v) =>
              setContent((c) => {
                const routeStops = [...c.routeStops];
                routeStops[i] = { ...routeStops[i], body: v };
                return { ...c, routeStops };
              })
            }
            multiline
          />
          <Field
            label="Body (mobile)"
            value={stop.mobile}
            onChange={(v) =>
              setContent((c) => {
                const routeStops = [...c.routeStops];
                routeStops[i] = { ...routeStops[i], mobile: v };
                return { ...c, routeStops };
              })
            }
            multiline
          />
        </div>
      ))}
    </div>
  );
}

export function CoursesFields({ content, setContent }: EditorProps) {
  return (
    <>
      {content.licenceGroups.map((group, gi) => (
        <div key={group.classKey} className="cms-card">
          <h3>{group.title}</h3>
          <Field
            label="Group title"
            value={group.title}
            onChange={(v) =>
              setContent((c) => {
                const licenceGroups = [...c.licenceGroups];
                licenceGroups[gi] = { ...licenceGroups[gi], title: v };
                return { ...c, licenceGroups };
              })
            }
          />
          <Field
            label="Subtitle"
            value={group.subtitle}
            onChange={(v) =>
              setContent((c) => {
                const licenceGroups = [...c.licenceGroups];
                licenceGroups[gi] = { ...licenceGroups[gi], subtitle: v };
                return { ...c, licenceGroups };
              })
            }
          />
          {group.courses.map((course, ci) => (
            <div key={course.code} className="cms-list-item">
              <div className="cms-list-head">
                <strong>
                  {course.code} — {course.name}
                </strong>
              </div>
              <div className="cms-row">
                <Field
                  label="Code"
                  value={course.code}
                  onChange={(v) =>
                    setContent((c) => {
                      const licenceGroups = structuredClone(c.licenceGroups);
                      licenceGroups[gi].courses[ci].code = v;
                      return { ...c, licenceGroups };
                    })
                  }
                />
                <Field
                  label="Name"
                  value={course.name}
                  onChange={(v) =>
                    setContent((c) => {
                      const licenceGroups = structuredClone(c.licenceGroups);
                      licenceGroups[gi].courses[ci].name = v;
                      return { ...c, licenceGroups };
                    })
                  }
                />
              </div>
              <Field
                label="Description"
                value={course.description}
                onChange={(v) =>
                  setContent((c) => {
                    const licenceGroups = structuredClone(c.licenceGroups);
                    licenceGroups[gi].courses[ci].description = v;
                    return { ...c, licenceGroups };
                  })
                }
                multiline
              />
              <Field
                label="Requirements (one per line)"
                value={course.requirements.join("\n")}
                onChange={(v) =>
                  setContent((c) => {
                    const licenceGroups = structuredClone(c.licenceGroups);
                    licenceGroups[gi].courses[ci].requirements = v
                      .split("\n")
                      .map((x) => x.trim())
                      .filter(Boolean);
                    return { ...c, licenceGroups };
                  })
                }
                multiline
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function AddOnsFields({ content, setContent }: EditorProps) {
  const add = () => {
    const item: AddOn = {
      tag: "Add-On",
      title: "New add-on",
      body: "Describe this add-on.",
      icon: "shield",
    };
    setContent((c) => ({ ...c, addOns: [...c.addOns, item] }));
  };

  return (
    <div className="cms-card">
      <div className="cms-list-head">
        <h3>Add-on courses</h3>
        <button type="button" className="cms-btn cms-btn-ghost" onClick={add}>
          + Add
        </button>
      </div>
      {content.addOns.map((a, i) => (
        <div key={i} className="cms-list-item">
          <div className="cms-list-head">
            <strong>{a.title}</strong>
            <button
              type="button"
              className="cms-btn cms-btn-danger"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  addOns: c.addOns.filter((_, j) => j !== i),
                }))
              }
            >
              Remove
            </button>
          </div>
          <Field
            label="Title"
            value={a.title}
            onChange={(v) =>
              setContent((c) => {
                const addOns = [...c.addOns];
                addOns[i] = { ...addOns[i], title: v };
                return { ...c, addOns };
              })
            }
          />
          <Field
            label="Body"
            value={a.body}
            onChange={(v) =>
              setContent((c) => {
                const addOns = [...c.addOns];
                addOns[i] = { ...addOns[i], body: v };
                return { ...c, addOns };
              })
            }
            multiline
          />
          <Field
            label="Icon (moto|car|shield|check|target|clock)"
            value={a.icon}
            onChange={(v) =>
              setContent((c) => {
                const addOns = [...c.addOns];
                addOns[i] = { ...addOns[i], icon: v as AddOn["icon"] };
                return { ...c, addOns };
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

export function PackageFields({ content, setContent }: EditorProps) {
  const pkg = content.packages[0];
  if (!pkg) return <p>No package defined.</p>;
  return (
    <div className="cms-card">
      <h3>Single training package</h3>
      <Field
        label="Name"
        value={pkg.name}
        onChange={(v) =>
          setContent((c) => {
            const packages = [...c.packages];
            packages[0] = { ...packages[0], name: v };
            return { ...c, packages };
          })
        }
      />
      <Field
        label="Class label"
        value={pkg.classLabel}
        onChange={(v) =>
          setContent((c) => {
            const packages = [...c.packages];
            packages[0] = { ...packages[0], classLabel: v };
            return { ...c, packages };
          })
        }
      />
      <Field
        label="Price (KES number as shown)"
        value={pkg.price}
        onChange={(v) =>
          setContent((c) => {
            const packages = [...c.packages];
            packages[0] = { ...packages[0], price: v };
            return { ...c, packages };
          })
        }
      />
      <Field
        label="Included (one per line)"
        value={pkg.included.join("\n")}
        onChange={(v) =>
          setContent((c) => {
            const packages = [...c.packages];
            packages[0] = {
              ...packages[0],
              included: v
                .split("\n")
                .map((x) => x.trim())
                .filter(Boolean),
            };
            return { ...c, packages };
          })
        }
        multiline
      />
      <Field
        label="Note under list"
        value={pkg.note}
        onChange={(v) =>
          setContent((c) => {
            const packages = [...c.packages];
            packages[0] = { ...packages[0], note: v };
            return { ...c, packages };
          })
        }
        multiline
      />
    </div>
  );
}

export function ResourcesFields({ content, setContent }: EditorProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  const resources = content.resources || [];

  const addBlank = () => {
    const item: ResourceItem = {
      id: uid("res"),
      title: "New resource",
      description: "",
      kind: "pdf",
      url: "",
      category: "Guides",
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setContent((c) => ({
      ...c,
      resources: [...(c.resources || []), item],
    }));
  };

  const onUpload = async (i: number, file: File | null) => {
    if (!file) return;
    setUploadErr(null);
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadResourceFileAction(fd);
    setUploading(false);
    if (!res.ok) {
      setUploadErr(res.error);
      return;
    }
    setContent((c) => {
      const list = [...(c.resources || [])];
      list[i] = {
        ...list[i],
        url: res.url,
        kind: res.kind,
        title:
          list[i].title === "New resource"
            ? file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")
            : list[i].title,
      };
      return { ...c, resources: list };
    });
  };

  return (
    <div className="cms-card">
      <div className="cms-list-head">
        <h3>Resource centre</h3>
        <button type="button" className="cms-btn cms-btn-ghost" onClick={addBlank}>
          + Add resource
        </button>
      </div>
      <p style={{ color: "#9a9da6", fontSize: "0.85rem", marginTop: 0 }}>
        Upload a PDF or image (Supabase Storage or <code>public/documents</code>), then
        click <strong>Save changes</strong>. You can also paste a public URL.
      </p>
      {uploadErr ? (
        <div className="cms-banner err" role="alert">
          {uploadErr}
        </div>
      ) : null}
      {uploading ? (
        <p style={{ color: "#e9a820", fontSize: "0.85rem" }}>Uploading file…</p>
      ) : null}
      {resources.length === 0 ? (
        <p style={{ color: "#9a9da6" }}>No resources yet.</p>
      ) : null}
      {resources.map((r, i) => (
        <div key={r.id} className="cms-list-item">
          <div className="cms-list-head">
            <strong>{r.title || `Resource ${i + 1}`}</strong>
            <button
              type="button"
              className="cms-btn cms-btn-danger"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  resources: (c.resources || []).filter((_, j) => j !== i),
                }))
              }
            >
              Remove
            </button>
          </div>
          <Field
            label="Title"
            value={r.title}
            onChange={(v) =>
              setContent((c) => {
                const list = [...(c.resources || [])];
                list[i] = { ...list[i], title: v };
                return { ...c, resources: list };
              })
            }
          />
          <Field
            label="Description"
            value={r.description}
            onChange={(v) =>
              setContent((c) => {
                const list = [...(c.resources || [])];
                list[i] = { ...list[i], description: v };
                return { ...c, resources: list };
              })
            }
            multiline
          />
          <div className="cms-row">
            <Field
              label="Category"
              value={r.category}
              onChange={(v) =>
                setContent((c) => {
                  const list = [...(c.resources || [])];
                  list[i] = { ...list[i], category: v };
                  return { ...c, resources: list };
                })
              }
            />
            <Field
              label="Kind (pdf | image | link)"
              value={r.kind}
              onChange={(v) =>
                setContent((c) => {
                  const list = [...(c.resources || [])];
                  list[i] = {
                    ...list[i],
                    kind: (v as ResourceItem["kind"]) || "pdf",
                  };
                  return { ...c, resources: list };
                })
              }
            />
          </div>
          <Field
            label="URL or path"
            value={r.url}
            onChange={(v) =>
              setContent((c) => {
                const list = [...(c.resources || [])];
                list[i] = { ...list[i], url: v };
                return { ...c, resources: list };
              })
            }
          />
          <div className="cms-field">
            <label>Upload PDF or image</label>
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/png,image/webp,image/gif,.pdf"
              disabled={uploading}
              onChange={(e) => onUpload(i, e.target.files?.[0] || null)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function InstructorsFields({ content, setContent }: EditorProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  const add = () => {
    const item: Instructor = {
      id: uid("inst"),
      name: "New instructor",
      superpower: "Superpower",
      role: "Role",
      years: 1,
      quote: "A short quote.",
      audioSrc: "",
    };
    setContent((c) => ({ ...c, instructors: [...c.instructors, item] }));
  };

  const onPhoto = async (i: number, file: File | null) => {
    if (!file) return;
    setUploadErr(null);
    setUploadingId(content.instructors[i].id);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadInstructorPhotoAction(fd);
    setUploadingId(null);
    if (!res.ok) {
      setUploadErr(res.error);
      return;
    }
    setContent((c) => {
      const instructors = [...c.instructors];
      instructors[i] = { ...instructors[i], photo: res.url };
      return { ...c, instructors };
    });
  };

  return (
    <div className="cms-card">
      <div className="cms-list-head">
        <h3>Instructors</h3>
        <button type="button" className="cms-btn cms-btn-ghost" onClick={add}>
          + Add instructor
        </button>
      </div>
      {uploadErr ? (
        <div className="cms-banner err" role="alert">
          {uploadErr}
        </div>
      ) : null}
      <p style={{ color: "#9a9da6", fontSize: "0.85rem", marginTop: 0 }}>
        Keep the School Manager card. Add real instructors only when you have names
        and photos — no placeholder people. Photo upload uses Supabase Storage (
        <code>cms-media</code>). Click <strong>Publish</strong> to put changes live.
      </p>
      {!content.instructors.length ? (
        <p className="cms-empty-hint">
          No team cards — the section is hidden on the live site. Add the manager or
          an instructor to show “Meet the team”.
        </p>
      ) : null}
      {content.instructors.map((inst, i) => (
        <div key={inst.id} className="cms-list-item">
          <div className="cms-list-head">
            <strong>{inst.name}</strong>
            <button
              type="button"
              className="cms-btn cms-btn-danger"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  instructors: c.instructors.filter((_, j) => j !== i),
                }))
              }
            >
              Remove
            </button>
          </div>
          <div className="cms-row">
            <Field
              label="Name"
              value={inst.name}
              onChange={(v) =>
                setContent((c) => {
                  const instructors = [...c.instructors];
                  instructors[i] = { ...instructors[i], name: v };
                  return { ...c, instructors };
                })
              }
            />
            <Field
              label="Years"
              value={inst.years}
              type="number"
              onChange={(v) =>
                setContent((c) => {
                  const instructors = [...c.instructors];
                  instructors[i] = {
                    ...instructors[i],
                    years: Number(v) || 0,
                  };
                  return { ...c, instructors };
                })
              }
            />
          </div>
          <Field
            label="Superpower"
            value={inst.superpower}
            onChange={(v) =>
              setContent((c) => {
                const instructors = [...c.instructors];
                instructors[i] = { ...instructors[i], superpower: v };
                return { ...c, instructors };
              })
            }
          />
          <Field
            label="Role"
            value={inst.role}
            onChange={(v) =>
              setContent((c) => {
                const instructors = [...c.instructors];
                instructors[i] = { ...instructors[i], role: v };
                return { ...c, instructors };
              })
            }
          />
          <Field
            label="Quote"
            value={inst.quote}
            onChange={(v) =>
              setContent((c) => {
                const instructors = [...c.instructors];
                instructors[i] = { ...instructors[i], quote: v };
                return { ...c, instructors };
              })
            }
            multiline
          />
          <Field
            label="Audio path"
            value={inst.audioSrc}
            onChange={(v) =>
              setContent((c) => {
                const instructors = [...c.instructors];
                instructors[i] = { ...instructors[i], audioSrc: v };
                return { ...c, instructors };
              })
            }
          />
          <div className="cms-field">
            <label>Photo</label>
            {inst.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={inst.photo}
                alt=""
                style={{
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: 12,
                  marginBottom: 8,
                  display: "block",
                }}
              />
            ) : null}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploadingId === inst.id}
              onChange={(e) => onPhoto(i, e.target.files?.[0] || null)}
            />
            {uploadingId === inst.id ? (
              <p style={{ fontSize: "0.8rem", color: "#e9a820" }}>Uploading…</p>
            ) : null}
            <Field
              label="Photo URL (auto-filled after upload, or paste path)"
              value={inst.photo || ""}
              onChange={(v) =>
                setContent((c) => {
                  const instructors = [...c.instructors];
                  instructors[i] = { ...instructors[i], photo: v || undefined };
                  return { ...c, instructors };
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqFields({ content, setContent }: EditorProps) {
  const add = () => {
    const item: FaqItem = {
      id: uid("faq"),
      q: "New question?",
      a: "Answer goes here.",
    };
    setContent((c) => ({ ...c, faqs: [...c.faqs, item] }));
  };

  return (
    <div className="cms-card">
      <div className="cms-list-head">
        <h3>FAQ</h3>
        <button type="button" className="cms-btn cms-btn-ghost" onClick={add}>
          + Add FAQ
        </button>
      </div>
      {content.faqs.map((faq, i) => (
        <div key={faq.id} className="cms-list-item">
          <div className="cms-list-head">
            <strong>#{i + 1}</strong>
            <button
              type="button"
              className="cms-btn cms-btn-danger"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  faqs: c.faqs.filter((_, j) => j !== i),
                }))
              }
            >
              Remove
            </button>
          </div>
          <Field
            label="Question"
            value={faq.q}
            onChange={(v) =>
              setContent((c) => {
                const faqs = [...c.faqs];
                faqs[i] = { ...faqs[i], q: v };
                return { ...c, faqs };
              })
            }
          />
          <Field
            label="Answer"
            value={faq.a}
            onChange={(v) =>
              setContent((c) => {
                const faqs = [...c.faqs];
                faqs[i] = { ...faqs[i], a: v };
                return { ...c, faqs };
              })
            }
            multiline
          />
        </div>
      ))}
    </div>
  );
}

export function FleetFields({ content, setContent }: EditorProps) {
  return (
    <div className="cms-card">
      <h3>Fleet cards</h3>
      {content.fleet.map((f, i) => (
        <div key={i} className="cms-list-item">
          <div className="cms-row">
            <Field
              label="Title"
              value={f.title}
              onChange={(v) =>
                setContent((c) => {
                  const fleet = [...c.fleet];
                  fleet[i] = { ...fleet[i], title: v };
                  return { ...c, fleet };
                })
              }
            />
            <Field
              label="Slot label"
              value={f.slot}
              onChange={(v) =>
                setContent((c) => {
                  const fleet = [...c.fleet];
                  fleet[i] = { ...fleet[i], slot: v };
                  return { ...c, fleet };
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WallFields({ content, setContent }: EditorProps) {
  const add = () => {
    const item: WallPass = {
      id: uid("pass"),
      name: "Graduate",
      classLabel: "B1",
      datePassed: "2026",
      advice: "Practice every day.",
    };
    setContent((c) => ({ ...c, wallOfPasses: [...c.wallOfPasses, item] }));
  };

  return (
    <div className="cms-card">
      <div className="cms-list-head">
        <h3>Wall of passes</h3>
        <button type="button" className="cms-btn cms-btn-ghost" onClick={add}>
          + Add graduate
        </button>
      </div>
      {content.wallOfPasses.length === 0 ? (
        <p style={{ color: "#9a9da6" }}>Empty — public site shows the “be first” CTA.</p>
      ) : null}
      {content.wallOfPasses.map((g, i) => (
        <div key={g.id} className="cms-list-item">
          <div className="cms-list-head">
            <strong>{g.name}</strong>
            <button
              type="button"
              className="cms-btn cms-btn-danger"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  wallOfPasses: c.wallOfPasses.filter((_, j) => j !== i),
                }))
              }
            >
              Remove
            </button>
          </div>
          <div className="cms-row">
            <Field
              label="Name"
              value={g.name}
              onChange={(v) =>
                setContent((c) => {
                  const wallOfPasses = [...c.wallOfPasses];
                  wallOfPasses[i] = { ...wallOfPasses[i], name: v };
                  return { ...c, wallOfPasses };
                })
              }
            />
            <Field
              label="Class"
              value={g.classLabel}
              onChange={(v) =>
                setContent((c) => {
                  const wallOfPasses = [...c.wallOfPasses];
                  wallOfPasses[i] = { ...wallOfPasses[i], classLabel: v };
                  return { ...c, wallOfPasses };
                })
              }
            />
          </div>
          <Field
            label="Date passed"
            value={g.datePassed}
            onChange={(v) =>
              setContent((c) => {
                const wallOfPasses = [...c.wallOfPasses];
                wallOfPasses[i] = { ...wallOfPasses[i], datePassed: v };
                return { ...c, wallOfPasses };
              })
            }
          />
          <Field
            label="One-word / short advice"
            value={g.advice}
            onChange={(v) =>
              setContent((c) => {
                const wallOfPasses = [...c.wallOfPasses];
                wallOfPasses[i] = { ...wallOfPasses[i], advice: v };
                return { ...c, wallOfPasses };
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

export function FormOptionsFields({ content, setContent }: EditorProps) {
  return (
    <div className="cms-card">
      <h3>Contact form — course dropdown</h3>
      {content.courseSelectOptions.map((opt, i) => (
        <div key={i} className="cms-list-item">
          <div className="cms-row">
            <Field
              label="Value (stored)"
              value={opt.value}
              onChange={(v) =>
                setContent((c) => {
                  const courseSelectOptions = [...c.courseSelectOptions];
                  courseSelectOptions[i] = {
                    ...courseSelectOptions[i],
                    value: v,
                  };
                  return { ...c, courseSelectOptions };
                })
              }
            />
            <Field
              label="Label (shown)"
              value={opt.label}
              onChange={(v) =>
                setContent((c) => {
                  const courseSelectOptions = [...c.courseSelectOptions];
                  courseSelectOptions[i] = {
                    ...courseSelectOptions[i],
                    label: v,
                  };
                  return { ...c, courseSelectOptions };
                })
              }
            />
          </div>
          <Field
            label="Duration hint"
            value={opt.duration}
            onChange={(v) =>
              setContent((c) => {
                const courseSelectOptions = [...c.courseSelectOptions];
                courseSelectOptions[i] = {
                  ...courseSelectOptions[i],
                  duration: v,
                };
                return { ...c, courseSelectOptions };
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
