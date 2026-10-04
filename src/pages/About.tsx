import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/ui/PageHero";
import { About, MissionVision, Ethos, Workforce, CoreValues, WhyChooseUs } from "@/components/sections/About";
import { CTA, Contact } from "@/components/sections/HomeSections";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="ZAIN Technical & Integrated Services LLC - Professional fire detection, fire protection, electrical, CCTV, and plumbing services in Oman since 2021."
      />
      <PageHero title="About Us" sub="ZAIN TECHNICAL & INTEGRATED SERVICES LLC" />
      <About />
      <Ethos />
      <MissionVision />
      <Workforce />
      <CoreValues />
      <WhyChooseUs />
      <CTA />
      <Contact />
    </>
  );
}