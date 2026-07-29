import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  IconRosette,
  IconRosetteDiscountCheck,
  IconShieldCheck,
  IconCertificate,
  IconClipboardCheck,
  IconUsers,
  IconZoomIn,
  IconX,
  IconCircleCheck
} from "@tabler/icons-react";

interface CertImage {
  src: string;
  title: string;
  orientation: "landscape" | "portrait";
}

const certificateImages: CertImage[] = [
  { src: "/images/Extinguishers%20licence.png", title: "Extinguishers License", orientation: "portrait" as const },
  { src: "/images/installisation%20of%20fffa.png", title: "Installation of FFFA", orientation: "portrait" as const },
  { src: "/images/lpg%20system.jpeg", title: "LPG System Certification", orientation: "landscape" as const }
];

const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management System certification ensuring consistent quality in our products and services.",
    icon: IconRosette
  },
  {
    title: "ISO 14001:2015",
    description: "Environmental Management System certification demonstrating our commitment to environmental responsibility.",
    icon: IconShieldCheck
  },
  {
    title: "ISO 45001:2018",
    description: "Occupational Health and Safety Management System certification protecting our team and clients.",
    icon: IconRosetteDiscountCheck
  },
  {
    title: "Civil Defense Approval",
    description: "Official approval from Oman's Civil Defense authority for fire alarm and firefighting systems installation.",
    icon: IconCertificate
  },
  {
    title: "Professional Certifications",
    description: "Our engineers hold certifications from manufacturers including Honeywell, Gent, Tyco, and NAFFCO.",
    icon: IconUsers
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and commissioning protocols to ensure all systems meet international standards.",
    icon: IconClipboardCheck
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
  const [activeCert, setActiveCert] = useState<CertImage | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeCert) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      prevFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!activeCert) return;
    const img = new Image();
    img.src = activeCert.src;
    img.onload = () => setIsLandscape(img.width > img.height);
  }, [activeCert]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveCert(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SEO
        title="Certifications & Standards"
        description="ZAIN Technical maintains ISO certifications and complies with international fire safety standards including NFPA, BS5839, and Oman Civil Defense regulations."
      />

      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#0A2647] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FF6B35] blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#2C8EBD] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Awards & Certifications
          </motion.h1>
          <nav className="mt-4 text-white/80 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">|</span>
            <span>Awards & Certifications</span>
          </nav>
        </div>
      </section>

      <section className="pt-16 pb-20 bg-white dark:bg-[#0A2647]">
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
                  <cert.icon size={36} stroke={1.5} className="text-white" />
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
            title="Certificate Gallery"
            subtitle="Awards and Appreciations"
            description="Browse our official certificates, licenses, and approvals. Click any image to view full size."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificateImages
                .filter((c) => c.orientation === "portrait")
                .map((cert, index) => (
                  <motion.button
                    key={cert.src}
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative block overflow-hidden rounded-xl bg-white dark:bg-[#144272] shadow-md hover:shadow-2xl transition-shadow text-left cursor-zoom-in h-full"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={cert.src}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-contain bg-gray-100 dark:bg-[#0A2647]/40 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0A2647]/0 group-hover:bg-[#0A2647]/70 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white px-4">
                          <IconZoomIn size={36} stroke={1.5} className="mx-auto mb-2" />
                          <p className="font-semibold text-sm">Click to enlarge</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-[#0A2647] dark:text-white">{cert.title}</h3>
                    </div>
                  </motion.button>
                ))}
            </div>

            <motion.button
              type="button"
              onClick={() => {
                const lpg = certificateImages.find((c) => c.orientation === "landscape");
                if (lpg) setActiveCert(lpg);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative block overflow-hidden rounded-xl bg-white dark:bg-[#144272] shadow-md hover:shadow-2xl transition-shadow text-left cursor-zoom-in"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={certificateImages.find((c) => c.orientation === "landscape")!.src}
                  alt={certificateImages.find((c) => c.orientation === "landscape")!.title}
                  loading="lazy"
                  className="w-full h-full object-contain bg-gray-100 dark:bg-[#0A2647]/40 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0A2647]/0 group-hover:bg-[#0A2647]/70 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white px-4">
                    <IconZoomIn size={36} stroke={1.5} className="mx-auto mb-2" />
                    <p className="font-semibold text-sm">Click to enlarge</p>
                  </div>
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-[#0A2647] dark:text-white">
                  {certificateImages.find((c) => c.orientation === "landscape")!.title}
                </h3>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#0A2647]">
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
                className="flex items-start gap-4 bg-gray-50 dark:bg-[#144272] rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <IconCircleCheck size={20} stroke={1.5} className="text-[#FF6B35]" />
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

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={dialogRef}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <IconX size={28} stroke={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeCert.src}
                alt={activeCert.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="mt-4 text-white text-lg font-semibold text-center">{activeCert.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
