import Image from "next/image";
import { Reveal } from "./Reveal";
import {
  CourseIcon,
  IconCar,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconShield,
  IconWallet,
  IconWhatsApp,
} from "./Icons";
import {
  addOns,
  faqs,
  fleet,
  founderQuote,
  instructors,
  licenceGroups,
  packages,
  routeStops,
  site,
  wallOfPasses,
  yardToday,
} from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { FAQList } from "./FAQList";
import { whatsappUrl } from "@/lib/whatsapp";
import { AudioPill } from "./AudioPill";
import { YardNote } from "./YardNote";
import { YardStatus } from "./YardStatus";

export function AboutSection() {
  return (
    <section className="section-pad bg-chalk" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-lead">
            <span className="eyebrow">Why Mkombozi</span>
            <h2 className="headline">Freedom is earned one lesson at a time.</h2>
            <p>
              We started Mkombozi Driving School on a simple belief: a driving licence
              isn&apos;t just a card, it&apos;s independence — for work, for family, for the
              freedom to move on your own terms. Every lesson is built around that goal,
              at a pace that respects where you&apos;re starting from.
            </p>
            <p className="quote">
              We teach you to drive, not just to{" "}
              <span className="script-word">pass</span>.
            </p>
          </Reveal>
          <div className="feature-grid">
            <Reveal className="feature-card" delay={1}>
              <IconShield />
              <h4>NTSA-Certified Instructors</h4>
              <p>
                Every instructor is licensed, assessed, and trained under NTSA&apos;s
                official curriculum.
              </p>
            </Reveal>
            <Reveal className="feature-card" delay={2}>
              <IconCar />
              <h4>Dual-Control Fleet</h4>
              <p>
                Learn in well-maintained manual and automatic vehicles fitted with dual
                safety controls.
              </p>
            </Reveal>
            <Reveal className="feature-card" delay={3}>
              <IconClock />
              <h4>Lessons That Fit Your Life</h4>
              <p>
                Early mornings, evenings, and weekend slots — no need to miss work or
                school.
              </p>
            </Reveal>
            <Reveal className="feature-card" delay={4}>
              <IconWallet />
              <h4>Transparent Pricing</h4>
              <p>
                One package at 16,000 KES — PDL booking, test booking, and extra coaching
                included. M-Pesa accepted.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="founder-note bg-chalk-dim">
      <div className="container">
        <div className="founder-layout">
          <Reveal className="founder-block">
            <span className="eyebrow">A Word From Our Founders</span>

            <div className="founder-portraits" role="group" aria-label="Founders">
              <figure className="founder-portrait">
                <div className="founder-portrait__frame">
                  <Image
                    src="/images/EdithFedha.png"
                    alt="Edith Fedha, Co-founder of Mkombozi Driving School"
                    width={400}
                    height={480}
                    className="founder-portrait__img"
                    sizes="(max-width: 640px) 45vw, 180px"
                  />
                  <span className="founder-portrait__tick" aria-hidden />
                </div>
                <figcaption>
                  <strong>Edith Fedha</strong>
                  <span>Founder &amp; Director</span>
                </figcaption>
              </figure>

              <figure className="founder-portrait founder-portrait--offset">
                <div className="founder-portrait__frame">
                  <Image
                    src="/images/EdwardMusamusi.png"
                    alt="Edward Musamusi, Co-founder of Mkombozi Driving School"
                    width={400}
                    height={480}
                    className="founder-portrait__img"
                    sizes="(max-width: 640px) 45vw, 180px"
                  />
                  <span className="founder-portrait__tick" aria-hidden />
                </div>
                <figcaption>
                  <strong>Edward Musamusi</strong>
                  <span>Founder &amp; Director</span>
                </figcaption>
              </figure>
            </div>

            <div className="founder-text">
              <p className="founder-quote">
                &ldquo;<em>{founderQuote}</em>&rdquo;
              </p>
              <p className="founder-name">
                — Edith Fedha &amp; Bishop Edward Musamusi, Founders and Directors
              </p>
              <AudioPill
                src={site.founderAudioSrc}
                label="Press play to hear from our founders"
                fallbackNote="Record a 30s phone voice note → public/audio/founder-mangelepa.mp3"
                className="founder-audio"
              />
              <p className="founder-transcript">
                <span className="founder-transcript__label">If you prefer to read:</span>{" "}
                {site.founderAudioTranscript}
              </p>
            </div>
          </Reveal>
          <YardNote />
        </div>
      </div>
    </section>
  );
}

/** Expanded origin band — specific, not “we are passionate” */
export function OriginSection() {
  return (
    <section className="origin-band" id="origin" aria-labelledby="origin-title">
      <div className="container">
        <Reveal>
          <p className="origin-kicker">The name · The yard · The belief</p>
          <h2 id="origin-title" className="origin-title">
            Why <em>Mkombozi</em>
          </h2>
          <div className="origin-grid">
            <p>
              <strong>Mkombozi</strong> means the one who liberates.
            </p>
            <p>
              In 2012, after watching too many young people in Kakamega struggle to find
              work because they couldn&apos;t drive, we opened a small yard off Mumias
              Road with two cars and a belief: knowing the road is freedom.
            </p>
            <p>
              Today we&apos;re NTSA-registered, but we still teach like it&apos;s your first
              time holding the wheel — because it usually is.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CoursesSection() {
  return (
    <section className="section-pad bg-chalk-dim" id="courses">
      <div className="container courses-with-status">
        <div>
          <Reveal className="section-head">
            <span className="eyebrow">Our Courses</span>
            <h2 className="headline">Category A &amp; B only</h2>
            <p className="sub">
              We train NTSA Category A (motorcycles) and Category B (light vehicles) —
              from mopeds and boda to passenger cars. We do not offer Class C trucks or
              Class D PSV matatu/bus courses.
            </p>
          </Reveal>
        </div>
        <YardStatus />

        {licenceGroups.map((group) => (
          <div key={group.classKey} className="licence-group">
            <Reveal className="licence-group__head">
              <h3 className="licence-group__title">{group.title}</h3>
              <p className="licence-group__sub">{group.subtitle}</p>
            </Reveal>
            <div className="service-grid service-grid--licence">
              {group.courses.map((c, i) => (
                <Reveal
                  key={c.code}
                  className="service-card service-card--licence"
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <CourseIcon name={c.icon} />
                  <span className="service-tag">{c.code}</span>
                  <h4>
                    {c.code} — {c.name}
                  </h4>
                  <p>{c.description}</p>
                  <div className="service-reqs">
                    <p className="service-reqs__label">Requirements</p>
                    <ul>
                      {c.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <div className="licence-group">
          <Reveal className="licence-group__head">
            <h3 className="licence-group__title">Add-ons</h3>
            <p className="licence-group__sub">
              Optional skills alongside your licence course — strengthen safety, care, and
              understanding of the machine.
            </p>
          </Reveal>
          <div className="service-grid service-grid--licence">
            {addOns.map((a, i) => (
              <Reveal
                key={a.title}
                className="service-card"
                delay={((i % 3) + 1) as 1 | 2 | 3}
              >
                <CourseIcon name={a.icon} />
                <span className="service-tag">{a.tag}</span>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RouteSection() {
  return (
    <section className="section-pad bg-asphalt route-section" id="route">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">The Route · Kakamega geography</span>
          <h2 className="headline">Six local stops to a licence</h2>
          <p className="sub">
            Not a generic checklist — the path we walk with learners around Kakamega and
            Lumakanda, including roads examiners actually use.
          </p>
        </Reveal>

        <div className="route-desktop">
          <div className="route-grid">
            <div className="route-line" aria-hidden />
            {routeStops.map((stop, i) => {
              const n = i + 1;
              const cardOnTop = n % 2 === 1;
              return (
                <div className="route-col" key={stop.title}>
                  <div className="route-slot top">
                    {cardOnTop && (
                      <div className="route-card">
                        <h4>{stop.title}</h4>
                        <p>{stop.body}</p>
                      </div>
                    )}
                  </div>
                  <div className="route-badge">{n}</div>
                  <div className="route-slot bottom">
                    {!cardOnTop && (
                      <div className="route-card">
                        <h4>{stop.title}</h4>
                        <p>{stop.body}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="route-mobile">
          {routeStops.map((stop, i) => (
            <div className="route-mobile-item" key={stop.title}>
              <div className="route-mobile-num">{i + 1}</div>
              <div>
                <h4>{stop.title}</h4>
                <p>{stop.mobile}</p>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="test-route-note">
          <p className="test-route-note__label">Thursday practice loop</p>
          <p>{yardToday.practiceRoute}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function FleetSection() {
  return (
    <section className="section-pad bg-chalk" id="fleet">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Our Fleet</span>
          <h2 className="headline">Learn in vehicles built for learning</h2>
          <p className="sub">
            Every vehicle is insured, regularly inspected, and fitted with dual controls
            so your instructor can keep you safe while you find your confidence.
          </p>
        </Reveal>
        <div className="fleet-grid">
          {fleet.map((v, i) => (
            <Reveal
              key={v.title}
              className="fleet-card"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="fleet-placeholder">
                <span>{v.slot}</span>
              </div>
              <h4>{v.title}</h4>
            </Reveal>
          ))}
        </div>

        <Reveal className="yard-visit">
          <div className="yard-visit__copy">
            <h3>Visit our yard</h3>
            <p>
              The best trust check is walking the yard on Chevaywa–Matete Road. Come see
              the dual-control cars, meet an instructor, and ask anything — no pressure
              to enrol the same day.
            </p>
            <div className="yard-visit__actions">
              <a href="#contact" className="btn btn-primary btn-small">
                Book a yard visit
              </a>
              <a
                href={whatsappUrl({ context: "fleet" })}
                className="btn btn-ghost on-light btn-small"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp size="sm" />
                WhatsApp to visit
              </a>
            </div>
          </div>
          <a
            href="#contact"
            className="yard-visit__map"
            aria-label="Jump to map and contact"
          >
            <iframe
              src={site.mapEmbedUrl}
              title="Map preview — Mkombozi yard area"
              loading="lazy"
              tabIndex={-1}
            />
            <span className="yard-visit__map-label">Lumakanda · full map at contact</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function PricingSection() {
  const pkg = packages[0];

  return (
    <section className="section-pad bg-chalk-dim" id="pricing">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Pricing</span>
          <h2 className="headline">One clear package</h2>
          <p className="sub">
            A single training package for Category A or B — no maze of tiers. Government
            medical / eCitizen / licence card fees may still apply separately.
          </p>
        </Reveal>
        <div className="price-grid price-grid--single">
          <Reveal className="price-card featured" delay={1}>
            <span className="price-badge">All-in training</span>
            <h4>{pkg.name}</h4>
            <span className="price-class">{pkg.classLabel}</span>
            <div className="price-amount">
              {pkg.price} <span>KES</span>
            </div>
            <p className="price-duration">{pkg.duration}</p>
            <div className="price-split">
              <p className="price-split-label">What&apos;s included</p>
              <ul className="price-list">
                {pkg.included.map((f) => (
                  <li key={f}>
                    <IconCheck size="sm" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="price-package-note">{pkg.note}</p>
            </div>
            <a
              href="#contact"
              className="btn btn-primary btn-block"
              data-choose-course={pkg.courseValue}
            >
              Enrol at 16,000 KES
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InstructorsSection() {
  return (
    <section className="section-pad bg-chalk" id="instructors">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Meet The Team</span>
          <h2 className="headline">Instructors with superpowers</h2>
          <p className="sub">
            Not job titles alone — the skills they&apos;re known for on Kakamega roads.
          </p>
        </Reveal>
        <div className="instructor-grid">
          {instructors.map((p, i) => (
            <Reveal
              key={p.name}
              className="instructor-card"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="avatar-sil" aria-hidden>
                <svg viewBox="0 0 80 80" className="avatar-sil__svg">
                  <circle cx="40" cy="40" r="40" fill="currentColor" opacity="0.12" />
                  <circle cx="40" cy="30" r="14" fill="currentColor" opacity="0.45" />
                  <path
                    d="M16 68c4-14 14-22 24-22s20 8 24 22"
                    fill="currentColor"
                    opacity="0.45"
                  />
                </svg>
                <span className="avatar-sil__badge" title="NTSA-certified instructor">
                  NTSA
                </span>
              </div>
              <h4>{p.name}</h4>
              <p className="instructor-super">{p.superpower}</p>
              <div className="instructor-role">
                {p.years}+ years · {p.role}
              </div>
              <p className="bio">&ldquo;{p.quote}&rdquo;</p>
              <AudioPill
                src={p.audioSrc}
                label={`Hear ${p.name.split(" ")[0]}`}
                compact
                fallbackNote="10s intro — drop MP3 in public/audio/"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Wall of Passes — factual, accumulative social proof */
export function WallSection() {
  const hasPasses = wallOfPasses.length > 0;

  return (
    <section className="section-pad bg-asphalt" id="wall">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Wall of Passes</span>
          <h2 className="headline">Licensed from this yard</h2>
          <p className="sub">
            Name · class · date · one word of advice. Real first names only — no licence
            numbers, no sample quotes.
          </p>
        </Reveal>

        {hasPasses ? (
          <div className="wall-scroll">
            {wallOfPasses.map((g) => (
              <article key={`${g.name}-${g.datePassed}`} className="wall-card">
                <p className="wall-card__name">{g.name}</p>
                <p className="wall-card__meta">
                  {g.classLabel} · {g.datePassed}
                </p>
                <p className="wall-card__advice">&ldquo;{g.advice}&rdquo;</p>
              </article>
            ))}
          </div>
        ) : (
          <Reveal className="wall-empty">
            <p className="wall-empty__lead">
              Be the first on our <strong>2026 wall</strong>.
            </p>
            <p>
              When you pass, we add your first name, class, and one piece of advice for
              the next learner — if you want to be here.
            </p>
            <a href="#contact" className="btn btn-primary">
              Book today
            </a>
          </Reveal>
        )}

        <p className="wall-harvest">
          Graduates:{" "}
          <a
            href={whatsappUrl({ context: "review" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us to join the wall
          </a>{" "}
          · or{" "}
          <a href={site.googleBusinessUrl} target="_blank" rel="noopener noreferrer">
            leave a Google review
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section-pad bg-chalk" id="faq">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Questions</span>
          <h2 className="headline">Frequently asked questions</h2>
        </Reveal>
        <Reveal>
          <FAQList items={[...faqs]} />
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section-pad bg-chalk-dim" id="contact">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Visit Us</span>
          <h2 className="headline">Come say hello, or just call</h2>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <IconPin />
                <div>
                  <b>Address</b>
                  <span>{site.address}</span>
                </div>
              </div>
              <div className="contact-info-item">
                <IconPhone />
                <div>
                  <b>Phone / WhatsApp</b>
                  <span>
                    <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
                    {" · "}
                    <a
                      href={whatsappUrl({ context: "general" })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </span>
                </div>
              </div>
              <div className="contact-info-item">
                <IconMail />
                <div>
                  <b>Email</b>
                  <span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                </div>
              </div>
              <div className="contact-info-item">
                <IconClock />
                <div>
                  <b>Hours</b>
                  <span>{site.hoursLong}</span>
                </div>
              </div>
            </div>
            <a href="#after-map" className="skip-map">
              Skip map
            </a>
            <div className="map-wrap">
              <iframe
                src={site.mapEmbedUrl}
                title="Map to Mkombozi Driving School"
                loading="lazy"
                tabIndex={-1}
              />
            </div>
            <p className="map-route-caption">{yardToday.practiceRoute}</p>
            <span id="after-map" className="sr-only">
              End of map
            </span>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
