import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { SERVICES, PROCESS_STEPS } from "@/data/company";
import { IconCircleArrowRight, IconFlame, IconShield, IconBolt, IconCamera, IconDroplet } from "@tabler/icons-react";

const ICON_MAP: Record<string, typeof IconFlame> = {
  Flame: IconFlame,
  Shield: IconShield,
  Zap: IconBolt,
  Video: IconCamera,
  Droplets: IconDroplet
};

export function Services() {
  return (
    <section className="py-20 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Services" subtitle="Comprehensive engineering solutions" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? IconFlame;
            return (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card hover className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "#FF6B3515" }}>
                    <Icon size={32} stroke={1.5} className="text-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                  <p className="text-[#64748B] text-sm flex-grow">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#64748B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-brand-ember dark:text-brand-soft font-medium hover:gap-3 transition-all">
                    Learn More <IconCircleArrowRight size={18} stroke={1.5} />
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="py-20 lg:py-32 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Project Process" subtitle="A systematic approach" light />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.slice(0, 5).map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold mx-auto mb-4"><span>{i + 1}</span></div>
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