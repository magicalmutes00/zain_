import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/ui/PageHero";
import { CTA, Contact } from "@/components/sections/HomeSections";

const faqs = [
  { q: "What fire safety services do you provide?", a: "We provide fire detection systems, fire protection systems including sprinklers, hydrants, pumps and FM-200 suppression, fire extinguishers, emergency lighting, electrical, CCTV, plumbing, and annual maintenance contracts across Oman." },
  { q: "How much does fire alarm installation cost in Muscat?", a: "Cost depends on building size, number of zones, panel type (addressable vs conventional), and cabling. A free site survey gives you a fixed quote. Call +968 92144367 or request a quote online." },
  { q: "Are you a Civil Defense approved fire fighting company in Oman?", a: "We design, install, test, and commission fire alarm and firefighting systems to Oman Civil Defense requirements and NFPA standards. Share your building type and location and we will advise on the exact approval path." },
  { q: "Addressable vs conventional fire alarm — which do I need?", a: "Addressable systems pinpoint the exact detector in alarm and suit large or multi-zone buildings such as hospitals, hotels, and plants. Conventional systems divide premises into zones and suit smaller buildings. We design, install, and maintain both." },
  { q: "Do you provide annual maintenance contracts (AMC) for fire systems?", a: "Yes. Our AMC covers scheduled inspection, testing, preventive maintenance, fault response, and documentation for fire detection, suppression, pumps, emergency lighting, electrical, and CCTV systems — with 24/7 emergency support." },
  { q: "How often should fire extinguishers be serviced in Oman?", a: "Most workplaces need professional servicing at least annually with monthly visual checks; high-risk sites need shorter intervals. Confirm the schedule against Oman Civil Defense requirements for your building type, then book servicing with a certified contractor." },
  { q: "What areas in Oman do you serve?", a: "We serve clients throughout Oman including Muscat, Barka, Sohar, Salalah, Nizwa, Duqm, Sur, Ibri, and all major cities." },
  { q: "Do you handle CCTV, electrical, and plumbing too?", a: "Yes. Alongside fire safety we install HD CCTV with NVR and access control, deliver commercial and industrial electrical works, and provide plumbing services with 24/7 emergency support." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://zaintechoman.com/faq/#faq",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Fire Safety FAQs Oman | ZAIN Technical"
        description="Fire safety FAQs for Oman: alarm costs, Civil Defense approvals, AMC coverage, extinguisher servicing & more. Answered by ZAIN Technical engineers."
      />
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>
      <PageHero title="Fire Safety FAQs for Oman" sub="Costs, approvals, AMC coverage, and servicing intervals — answered by our engineering team." />
      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-navy-deep rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:border-brand/25 hover:shadow-soft transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-display font-semibold text-navy dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-ember dark:text-brand-soft flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 text-[#64748B] dark:text-gray-400" role="region" aria-label={faq.q}>
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#64748B] dark:text-gray-400">
            Answered by the ZAIN Technical engineering team, Barka, Oman. Last verified: September 2026. Still have questions?{" "}
            <Link to="/contact" className="text-brand-ember dark:text-brand-soft hover:underline font-medium">
              Contact us for a free consultation
            </Link>
            .
          </p>
        </div>
      </section>
      <CTA />
      <Contact />
    </>
  );
}
