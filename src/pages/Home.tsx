import { Hero, About, Services, Process, Industries, Products, Certifications, Stats, CTA, Contact } from "@/components/sections/HomeSections";
import { MissionVision, CoreValues, WhyChooseUs } from "@/components/sections/About";

export default function Home() {
  return (
    <>
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