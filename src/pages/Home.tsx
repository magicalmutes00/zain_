import { Hero, About, Services, Process, Industries, Products, Certifications, Stats, CTA, Contact } from "@/components/sections/HomeSections";
import { MissionVision, CoreValues, WhyChooseUs } from "@/components/sections/About";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Products />
      <Process />
      <Stats />
      <Certifications />
      <CTA />
      <Contact />
    </>
  );
}