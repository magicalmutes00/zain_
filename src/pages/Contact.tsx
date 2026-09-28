import { Contact } from "@/components/sections/HomeSections";
import { SEO } from "@/components/SEO";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact ZAIN Technical Oman | Get a Free Quote"
        description="Get a free fire safety quote in Oman. Fire detection, protection, electrical, CCTV & plumbing with 24/7 support. Call +968 92144367 now for a site survey."
      />
      <h1 className="sr-only">Contact ZAIN Technical — Fire Protection Company in Oman</h1>
      <Contact />
    </>
  );
}