import { Contact } from "@/components/sections/HomeSections";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/ui/PageHero";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact ZAIN Technical Oman | Get a Free Quote"
        description="Get a free fire safety quote in Oman. Fire detection, protection, electrical, CCTV & plumbing with 24/7 support. Call +968 92144367 now for a site survey."
      />
      <PageHero title="Get In Touch" sub="Contact us for a free consultation and quote." />
      <Contact />
    </>
  );
}