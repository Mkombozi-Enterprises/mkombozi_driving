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
  IconStar,
  IconWallet,
} from "./Icons";
import {
  courses,
  faqs,
  fleet,
  instructors,
  packages,
  reviews,
  routeStops,
  site,
} from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { FAQList } from "./FAQList";

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
              &ldquo;Our job isn&apos;t to get you through a test. It&apos;s to make you a driver
              you can trust — long after the test is over.&rdquo;
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
                Clear packages, flexible instalments, and M-Pesa accepted. No hidden
                fees, ever.
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
        <Reveal className="founder-wrap">
          <Image
            src="/images/founder.jpeg"
            alt="Founders of Mkombozi Driving School"
            width={150}
            height={110}
            className="founder-photo"
          />
          <div className="founder-text">
            <span className="eyebrow">A Word From Our Founders</span>
            <p className="founder-quote">
              &ldquo;Mangelepa — <em>Marching Forward.</em>&rdquo; That&apos;s the phrase we live
              by — and the same spirit we want every learner to drive away with.
            </p>
            <p className="founder-name">
              — Bishop Edward Musamusi &amp; Miss Sikuche Musamusi, Founders and Directors
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
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Our Courses</span>
          <h2 className="headline">A course for every kind of driver</h2>
          <p className="sub">
            NTSA groups Kenyan licences into classes based on the vehicle you&apos;ll drive.
            Tell us where you&apos;re headed, and we&apos;ll get you there — legally, safely, and
            confidently.
          </p>
        </Reveal>
        <div className="service-grid">
          {courses.map((c, i) => (
            <Reveal
              key={c.title}
              className="service-card"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <CourseIcon name={c.icon} />
              <span className="service-tag">{c.tag}</span>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </Reveal>
          ))}
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
          <span className="eyebrow">The Route</span>
          <h2 className="headline">Six stops between you and a licence</h2>
          <p className="sub">
            Getting licensed in Kenya follows a clear path. We walk it with you, start
            to finish.
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
        <p className="fleet-note">
          Real fleet photos are next — plate-safe shots of our Kenyan training vehicles
          will land here. Placeholders keep the layout honest until then.
        </p>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="section-pad bg-chalk-dim" id="pricing">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Packages</span>
          <h2 className="headline">Simple, honest course packages</h2>
        </Reveal>
        <p className="price-note">
          Sample pricing in KES — confirm current rates and instalment plans with our
          team.
        </p>
        <div className="price-grid">
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.name}
              className={`price-card${pkg.featured ? " featured" : ""}`}
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              {pkg.featured && <span className="price-badge">Most Popular</span>}
              <h4>{pkg.name}</h4>
              <span className="price-class">{pkg.classLabel}</span>
              <div className="price-amount">
                {pkg.price} <span>KES</span>
              </div>
              <ul className="price-list">
                {pkg.features.map((f) => (
                  <li key={f}>
                    <IconCheck size="sm" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn btn-block ${pkg.featured ? "btn-primary" : "btn-ghost on-light"}`}
                data-choose-course={pkg.courseValue}
              >
                Choose {pkg.name}
              </a>
            </Reveal>
          ))}
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
          <h2 className="headline">Instructors who meet you where you are</h2>
        </Reveal>
        <div className="instructor-grid">
          {instructors.map((p, i) => (
            <Reveal
              key={p.name}
              className="instructor-card"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="avatar-fallback" aria-hidden>
                {p.initials}
              </div>
              <h4>{p.name}</h4>
              <div className="instructor-role">{p.role}</div>
              <div className="instructor-years">{p.years}</div>
              <p className="bio">&ldquo;{p.bio}&rdquo;</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section-pad bg-asphalt" id="reviews">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Reviews</span>
          <h2 className="headline">What our graduates say</h2>
        </Reveal>
        <div className="testi-grid">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              className="testi-card"
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              <div className="testi-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <IconStar key={s} size="sm" />
                ))}
              </div>
              <p className="quote">&ldquo;{r.quote}&rdquo;</p>
              <div className="testi-name">{r.name}</div>
              <div className="testi-loc">{r.loc}</div>
            </Reveal>
          ))}
        </div>
        <p className="sub testi-note">
          Sample reviews shown — swap these for real feedback from your own graduates.
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
            <div className="map-wrap">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=34.9319%2C0.6241%2C34.9819%2C0.6641&marker=0.6441%2C34.9569&layer=mapnik"
                title="Map to Mkombozi Driving School"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
