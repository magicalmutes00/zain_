import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTA, Contact, Process } from "@/components/sections/HomeSections";
import { SERVICES as ServicesData } from "@/data/company";
import { Flame, Shield, Zap, Video, Droplets, CheckCircle2, Phone, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Flame, Shield, Zap, Video, Droplets };

export default function ServicesPage() {
  const { slug } = useParams();

  if (slug) {
    const service = ServicesData.find((s) => s.slug === slug);
    if (!service) return <div className="text-center py-32">Service not found</div>;

    const Icon = iconMap[service.icon];
    return (
      <>
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272]">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl">{service.description}</p>
          </div>
        </section>
        <section className="py-20 bg-white dark:bg-[#0A2647]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[#0A2647] dark:text-white mb-6">Our {service.title} Services</h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-[#FF6B35] flex-shrink-0" />
                      <span className="text-[#0A2647] dark:text-white">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="sticky top-32 h-fit">
                <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-4">Need {service.title}?</h3>
                <p className="text-[#64748B] dark:text-gray-400 text-sm mb-6">Contact us for a free consultation.</p>
                <a href="tel:+96892144367" className="flex items-center gap-3 text-[#0A2647] dark:text-white mb-4">
                  <Phone size={20} className="text-[#FF6B35]" />
                  +968 92144367
                </a>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold w-full hover:bg-[#FF8F5E] transition-colors">
                  Get Free Quote <ArrowRight size={18} />
                </a>
              </Card>
            </div>
          </div>
        </section>
        <CTA />
        <Contact />
      </>
    );
  }

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-white/80 text-lg">Comprehensive engineering solutions</p>
        </div>
      </section>
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Services" subtitle="Comprehensive engineering solutions" />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServicesData.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card hover className="h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center mb-6">
                      {Icon && <Icon size={28} className="text-[#FF6B35]" />}
                    </div>
                    <h3 className="text-xl font-bold text-[#0A2647] dark:text-white mb-3">{service.title}</h3>
                    <p className="text-[#64748B] dark:text-gray-400 text-sm mb-6">{service.description}</p>
                    <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-[#FF6B35] font-medium hover:gap-3 transition-all">
                      Learn More <ArrowRight size={18} />
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Process />
      <CTA />
      <Contact />
    </>
  );
}