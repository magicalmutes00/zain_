import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SEO } from "@/components/SEO";
import { CTA, Contact, Process } from "@/components/sections/HomeSections";
import { SERVICES as ServicesData } from "@/data/company";
import { Flame, Shield, Zap, Video, Droplets, CheckCircle2, Phone, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = { Flame, Shield, Zap, Video, Droplets };

const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "fire-detection": {
    title: "Fire Alarm Installation Oman | ZAIN Technical",
    description: "Fire alarm installation in Oman: addressable & conventional systems, emergency lighting, testing, commissioning & AMC. Call +968 92144367 now.",
  },
  "fire-protection": {
    title: "Fire Fighting Contractors Muscat | ZAIN",
    description: "Fire fighting contractors in Muscat for hydrants, sprinklers, pumps, FM-200 & extinguishers installed to NFPA standards. Get a free quote today.",
  },
  electrical: {
    title: "Electrical Contractor Oman | ZAIN Technical",
    description: "Electrical contractor in Oman for commercial, industrial & residential installations, power distribution & emergency repairs. Call +968 92144367 today.",
  },
  cctv: {
    title: "CCTV Installation Oman | ZAIN Technical",
    description: "CCTV installation in Oman: HD cameras, NVR, access control & structured cabling for villas, offices & plants. Book a free site survey today.",
  },
  plumbing: {
    title: "Plumbing Services Oman | ZAIN Technical",
    description: "Plumbing services in Oman for homes, offices & plants: leak detection, water heaters, drain cleaning & 24/7 emergency support. Call +968 92144367.",
  },
};

export default function ServicesPage() {
  const { slug } = useParams();

  if (slug) {
    const service = ServicesData.find((s) => s.slug === slug);
    if (!service) return <div className="text-center py-32">Service not found</div>;

    const Icon = iconMap[service.icon];
    const seo = SERVICE_SEO[service.slug] ?? { title: service.title, description: service.description };
    return (
      <>
        <SEO title={seo.title} description={seo.description} />
        <section className="pt-32 pb-20 bg-gradient-to-br from-navy to-navy-deep">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{service.title} in Oman</h1>
            <p className="text-white/80 text-lg max-w-2xl">{service.description}</p>
          </div>
        </section>
        <section className="py-20 bg-white dark:bg-navy">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-6">Our {service.title} Services</h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-brand flex-shrink-0" />
                      <span className="text-navy dark:text-white">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="sticky top-32 h-fit">
                <h3 className="text-xl font-bold text-navy dark:text-white mb-4">Need {service.title}?</h3>
                <p className="text-[#64748B] dark:text-gray-400 text-sm mb-6">Contact us for a free consultation.</p>
                <a href="tel:+96892144367" className="flex items-center gap-3 text-navy dark:text-white mb-4">
                  <Phone size={20} className="text-brand" />
                  +968 92144367
                </a>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-semibold w-full hover:bg-brand-soft transition-colors">
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
      <SEO
        title="Fire Safety Services Oman | ZAIN Technical"
        description="Fire safety services in Oman: detection, protection, electrical, CCTV & plumbing. Design, installation, testing, commissioning & AMC. Get a free quote."
      />
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy to-navy-deep">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Services in Oman</h1>
          <p className="text-white/80 text-lg">Comprehensive fire safety & engineering solutions across Oman</p>
        </div>
      </section>
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="What We Offer" subtitle="Design, installation, testing, commissioning & maintenance" />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServicesData.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card hover className="h-full">
                    <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                      {Icon && <Icon size={28} className="text-brand" />}
                    </div>
                    <h3 className="text-xl font-bold text-navy dark:text-white mb-3">{service.title}</h3>
                    <p className="text-[#64748B] dark:text-gray-400 text-sm mb-6">{service.description}</p>
                    <Link to={`/services/${service.slug}`} aria-label={`Learn more about ${service.title} in Oman`} className="inline-flex items-center gap-2 text-brand-ember dark:text-brand-soft font-medium hover:gap-3 transition-all">
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