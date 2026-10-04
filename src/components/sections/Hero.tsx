import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";
import { ArrowRight, Shield, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Outdoor%20Diesel%20Fire%20Pump%20Station%20Maintenance%20with%20Fire%20Water%20Storage%20Tank.webp"
          alt="Fire pump station installation with water storage tank in Oman by ZAIN Technical"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/90" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6"
            >
              <Shield size={16} className="text-brand" />
              <span className="text-white/90 text-sm font-medium font-arabic" lang="ar" dir="rtl">شريك موثوق في السلامة من الحرائق في عمان</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Fire Protection Company in Oman —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-soft">Detection, Suppression & Engineering</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-white/80 mb-8 max-w-xl"
            >
              ZAIN Technical designs, supplies, installs, tests, commissions, and maintains fire detection, suppression, electrical, CCTV, and plumbing systems for commercial, industrial, government, and residential projects across Oman — with 24/7 emergency support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get a Free Quote
              </Button>
              <a href={`tel:${COMPANY.phones[0]}`} className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                <Phone size={20} />
                {COMPANY.phones[0]}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              <div><span className="text-3xl font-bold text-white">5+</span><p className="text-white/60 text-sm">Years Experience</p></div>
              <div><span className="text-3xl font-bold text-white">200+</span><p className="text-white/60 text-sm">Projects Completed</p></div>
              <div><span className="text-3xl font-bold text-white">100+</span><p className="text-white/60 text-sm">Happy Clients</p></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent rounded-3xl" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Fire Detection", color: "#FF6B35" },
                  { label: "Fire Protection", color: "#FF8F5E" },
                  { label: "Electrical", color: "#0A2647" },
                  { label: "CCTV & ELV", color: "#144272" },
                  { label: "Plumbing", color: "#0A2647" },
                  { label: "24/7 Support", color: "#FF6B35" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: item.color }} />
                    <span className="text-white text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}