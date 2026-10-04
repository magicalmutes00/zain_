import { Hero, ProofBand, About, Services, SlimCTA, Process, Industries, Products, Certifications, CTA, Contact } from "@/components/sections/HomeSections";
import { MissionVision, CoreValues, WhyChooseUs } from "@/components/sections/About";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <ProofBand />
      <Services />
      <SlimCTA />
      <Industries />
      <Process />
      <Products />
      <About />
      <Certifications />
      <CTA />
      <Contact />
    </>
  );
}