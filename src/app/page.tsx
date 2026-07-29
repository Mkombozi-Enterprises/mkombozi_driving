import { existsSync } from "fs";
import path from "path";
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
  PricingSection,
  ReviewsSection,
  RouteSection,
} from "@/components/Sections";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const hasHeroPhoto = existsSync(
    path.join(process.cwd(), "public", "images", "hero.jpg")
  );

  return (
    <>
      <Header />
      <JourneySpine />
      <div className="page-shell">
        <main>
          <Hero hasHeroPhoto={hasHeroPhoto} />
          <AboutSection />
          <FounderSection />
          <CoursesSection />
          <RouteSection />
          <FleetSection />
          <PricingSection />
          <InstructorsSection />
          <ReviewsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
