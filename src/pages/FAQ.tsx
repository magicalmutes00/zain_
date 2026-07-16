import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CTA, Contact } from "@/components/sections/HomeSections";

const faqs = [
  { q: "What fire safety services do you provide?", a: "We provide comprehensive fire safety services including fire detection systems, fire protection systems, fire extinguishers, emergency lighting, and annual maintenance contracts." },
  { q: "Do you offer emergency repair services?", a: "Yes, we offer 24/7 emergency support for fire safety, electrical, plumbing, and security systems across Oman." },
  { q: "What areas in Oman do you serve?", a: "We serve clients throughout Oman including Muscat, Salalah, Sohar, Nizwa, Barka, Duqm, and all major cities." },
  { q: "Are your technicians certified?", a: "Yes, all our engineers, technicians, and supervisors are certified and trained to international standards." },
  { q: "Do you provide annual maintenance contracts?", a: "Yes, we offer comprehensive Annual Maintenance Contracts for all our installed systems." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="bg-white dark:bg-[#144272] rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-[#0A2647] dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#FF6B35] flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} 
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
        </div>
      </section>
      <CTA />
      <Contact />
    </>
  );
}