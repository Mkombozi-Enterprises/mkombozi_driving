import { existsSync } from "fs";
import path from "path";
import { loadContent } from "@/lib/cms/store";
import { SiteProvider } from "@/lib/cms/provider";
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
  RouteSection,
  WallSection,
} from "@/components/Sections";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await loadContent();
  const hasHeroPhoto = existsSync(
    path.join(process.cwd(), "public", "images", "hero.jpg")
  );

  return (
    <SiteProvider content={content}>
      <Header />
      <JourneySpine />
      <div className="page-shell">
        <main>
          <Hero hasHeroPhoto={hasHeroPhoto} />
          <AboutSection />
          <FounderSection />
          <OriginSection />
          <CoursesSection />
          <RouteSection />
          <FleetSection />
          <PricingSection />
          <InstructorsSection />
          <WallSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}
