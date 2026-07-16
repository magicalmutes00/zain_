import { SEO } from "@/components/SEO";
import { About, MissionVision, CoreValues, WhyChooseUs } from "@/components/sections/About";
import { CTA, Contact } from "@/components/sections/HomeSections";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="ZAIN Technical & Integrated Services LLC - Professional fire detection, fire protection, electrical, CCTV, and plumbing services in Oman since 2021."
      />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white/80 text-lg">ZAIN TECHNICAL & INTEGRATED SERVICES LLC</p>
        </div>
      </section>
      <About />
      <MissionVision />
      <CoreValues />
      <WhyChooseUs />
      <CTA />
      <Contact />
    </>
  );
}