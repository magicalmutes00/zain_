import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { SERVICES } from "@/data/company";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section className="py-20 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Services" subtitle="Comprehensive engineering solutions" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card hover className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "#FF6B3515" }}>
                    <img src={service.iconImage} alt={service.title} className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2647] mb-3">{service.title}</h3>
                  <p className="text-[#64748B] text-sm flex-grow">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#64748B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-[#FF6B35] font-medium hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </Link>
                </Card>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="py-20 lg:py-32 bg-[#0A2647]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Project Process" subtitle="A systematic approach" light />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.slice(0, 5).map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold mx-auto mb-4"><span>{i + 1}</span></div>
              <span className="text-sm font-medium text-white">{step}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.slice(5).map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 5) * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mx-auto mb-4 backdrop-blur-sm"><span>{i + 6}</span></div>
              <span className="text-sm font-medium text-white/80">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}