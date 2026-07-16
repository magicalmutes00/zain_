import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, CheckCircle2, FileBadge, ShieldCheck, ClipboardCheck, Users } from "lucide-react";

const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management System certification ensuring consistent quality in our products and services.",
    icon: Award
  },
  {
    title: "ISO 14001:2015",
    description: "Environmental Management System certification demonstrating our commitment to environmental responsibility.",
    icon: ShieldCheck
  },
  {
    title: "ISO 45001:2018",
    description: "Occupational Health and Safety Management System certification protecting our team and clients.",
    icon: CheckCircle2
  },
  {
    title: "Civil Defense Approval",
    description: "Official approval from Oman's Civil Defense authority for fire alarm and firefighting systems installation.",
    icon: FileBadge
  },
  {
    title: "Professional Certifications",
    description: "Our engineers hold certifications from manufacturers including Honeywell, Gent, Tyco, and NAFFCO.",
    icon: Users
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and commissioning protocols to ensure all systems meet international standards.",
    icon: ClipboardCheck
  }
];

const complianceStandards = [
  "NFPA 72 - National Fire Alarm and Signaling Code",
  "NFPA 20 - Installation of Stationary Pumps for Fire Protection",
  "NFPA 13 - Installation of Sprinkler Systems",
  "BS 5839 - Fire Detection and Fire Alarm Systems (British Standard)",
  "Oman Civil Defense Regulations",
  "International Building Code (IBC)",
  "LEED Certification Support"
];

export default function CertificationsPage() {
  return (
    <>
      <SEO
        title="Certifications & Standards"
        description="ZAIN Technical maintains ISO certifications and complies with international fire safety standards including NFPA, BS5839, and Oman Civil Defense regulations."
      />
      
      <section className="pt-32 pb-20 bg-white dark:bg-[#0A2647]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Certifications & Standards"
            subtitle="Quality You Can Trust"
            description="We maintain rigorous certifications and adhere to international standards to ensure the highest quality fire safety and engineering solutions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-[#144272] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85A2A] flex items-center justify-center mx-auto mb-6">
                  <cert.icon size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-3">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Standards We Follow"
            subtitle="International Compliance"
            description="Our systems and installations comply with recognized international standards to ensure safety and reliability."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 bg-white dark:bg-[#144272] rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={20} className="text-[#FF6B35]" />
                </div>
                <span className="text-[#0A2647] dark:text-white font-medium">{standard}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A2647]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Committed to Excellence
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our certifications reflect our commitment to delivering the highest quality fire safety solutions in Oman.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#E85A2A] transition-colors"
          >
            Discuss Your Project
          </a>
        </div>
      </section>
    </>
  );
}