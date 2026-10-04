import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Building, Factory, Home as HomeIcon, Hospital, GraduationCap, Hotel, Building2, MapPin, Phone, Mail } from "lucide-react";
import {
  IconFlame,
  IconShield,
  IconBolt,
  IconCamera,
  IconDroplet,
  IconBell
} from "@tabler/icons-react";
import { INDUSTRIES, COMPANY, BRANDS } from "@/data/company";
import { CountUp } from "@/components/ui/CountUp";
import { Input, Textarea, Select } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/Outdoor%20Diesel%20Fire%20Pump%20Station%20Maintenance%20with%20Fire%20Water%20Storage%20Tank.webp" alt="Fire pump station installation with water storage tank in Oman by ZAIN Technical" className="w-full h-full object-cover object-center" fetchPriority="high" width="1920" height="1080" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/90" />
      </div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-brand" aria-hidden="true">🛡️</span>
              <span className="text-white/90 text-sm font-medium font-arabic" lang="ar" dir="rtl">شريك موثوق في السلامة من الحرائق في عمان</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Fire Protection Company in Oman —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-soft">Detection, Suppression & Engineering</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-white/80 mb-8 max-w-xl">
              ZAIN Technical designs, supplies, installs, tests, commissions, and maintains fire detection, suppression, electrical, CCTV, and plumbing systems for commercial, industrial, government, and residential projects across Oman — with 24/7 emergency support.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 bg-brand text-white rounded-lg font-semibold hover:bg-brand-soft transition-colors">
                Get a Free Quote
              </button>
              <a href={`tel:${COMPANY.phones[0]}`} className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                📞 {COMPANY.phones[0]}
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div><CountUp value="5+" className="text-3xl font-bold text-white" /><p className="text-white/60 text-sm">Years</p></div>
              <div><CountUp value="200+" className="text-3xl font-bold text-white" /><p className="text-white/60 text-sm">Projects</p></div>
              <div><CountUp value="100+" className="text-3xl font-bold text-white" /><p className="text-white/60 text-sm">Clients</p></div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-xs tracking-wide text-white/50">
              Trusted equipment brands: {BRANDS.slice(0, 5).join("  ·  ")}
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-navy z-20" />
    </section>
  );
}

export function About() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />
              <div className="relative bg-gradient-to-br from-navy to-navy-deep rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4"><span className="text-4xl font-bold text-brand">2021</span><p className="text-white/70 text-sm mt-1">Established</p></div>
                  <div className="text-center p-4"><span className="text-4xl font-bold text-brand">Oman</span><p className="text-white/70 text-sm mt-1">Based</p></div>
                  <div className="text-center p-4"><span className="text-4xl font-bold text-brand">5+</span><p className="text-white/70 text-sm mt-1">Services</p></div>
                  <div className="text-center p-4"><span className="text-4xl font-bold text-brand">24/7</span><p className="text-white/70 text-sm mt-1">Support</p></div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-4">About Our Company</h2>
            <p className="text-[#64748B] dark:text-gray-400 mb-4">{COMPANY.name} is a professional engineering, contracting, and integrated technical services company specializing in complete fire detection and fire protection solutions.</p>
            <p className="text-[#64748B] dark:text-gray-400">We offer complete design, supply, installation, testing, commissioning, maintenance, inspection, and engineering services for commercial, industrial, government, and residential projects throughout Oman.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  type ServiceItem = { title: string; desc: string; link: string; linkText: string; Icon: typeof IconFlame };
  const serviceItems: ServiceItem[] = [
    { title: "Fire Detection", desc: "Addressable and conventional fire alarm installation in Oman", link: "/services/fire-detection", linkText: "Fire alarm installation in Oman", Icon: IconFlame },
    { title: "Fire Protection", desc: "Sprinklers, hydrants, pumps, and FM-200 suppression by fire fighting contractors in Muscat", link: "/services/fire-protection", linkText: "Fire fighting contractors in Muscat", Icon: IconShield },
    { title: "Electrical", desc: "Commercial, industrial, and residential electrical contractor services across Oman", link: "/services/electrical", linkText: "Electrical contractor in Oman", Icon: IconBolt },
    { title: "CCTV & ELV", desc: "CCTV installation in Oman: cameras, access control, and networking", link: "/services/cctv", linkText: "CCTV installation in Oman", Icon: IconCamera },
    { title: "Plumbing", desc: "Plumbing services in Oman with 24/7 emergency support", link: "/services/plumbing", linkText: "Plumbing services in Oman", Icon: IconDroplet }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Services" subtitle="Fire safety & engineering solutions across Oman" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card hover className="text-center dark:bg-navy-deep dark:border-white/10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: "#FF6B3515" }}>
                  <s.Icon size={32} stroke={1.5} className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{s.title}</h3>
                <p className="text-[#64748B] dark:text-gray-400 text-sm mb-4">{s.desc}</p>
                <Link to={s.link} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ember dark:text-brand-soft hover:gap-2 transition-all" aria-label={s.linkText}>
                  {s.linkText} <span aria-hidden="true">→</span>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const iconList = [Building, Factory, HomeIcon, Hospital, GraduationCap, Hotel, Building2];
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Industries We Serve" subtitle="Expertise across diverse sectors" />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map((industry, i) => {
            const Icon = iconList[i % iconList.length];
            return (
              <motion.div key={industry} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 dark:bg-navy-deep border border-gray-100 dark:border-white/10 hover:border-brand/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-brand" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-navy dark:text-white">{industry}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const products = ["Fire Pump Controllers", "FM-200 Systems", "Fire Alarm Panels", "Fire Extinguishers", "Fire Hydrant Equipment", "Fire Pumps", "Fire Cabinets", "Fire Hose Reels", "Emergency Lights", "Smoke Detectors", "Heat Detectors", "Suppression Systems"];

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Products" subtitle="High-quality equipment from trusted brands" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div key={product} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 p-5 bg-white dark:bg-navy-deep rounded-xl border border-gray-100 dark:border-white/10 hover:border-brand/30 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true"><div className="w-3 h-3 rounded-full bg-brand" /></div>
              <span className="font-medium text-navy dark:text-white text-sm">{product}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 overflow-hidden marquee-mask" aria-label="Brands we work with">
          <div className="flex gap-4 w-max animate-marquee">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={`${b}-${i}`} aria-hidden={i >= BRANDS.length} className="px-6 py-3 rounded-xl bg-white dark:bg-navy-deep border border-gray-100 dark:border-white/10 text-sm font-semibold text-navy dark:text-white whitespace-nowrap">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = ["Consultation", "Site Survey", "Design", "Approval", "Supply", "Install", "Test", "Commission"];
  return (
    <section className="py-20 lg:py-32 bg-navy dark:bg-[#071E36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Process" subtitle="A systematic approach to excellence" light />
        <div className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div aria-hidden="true" className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-white/20" />
          {steps.map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold mx-auto mb-4" aria-hidden="true">{i + 1}</div>
              <span className="text-sm font-medium text-white">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const certs = ["UL", "FM Approved", "LPCB", "BSI", "NFPA", "TÜV"];
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Certifications" subtitle="We adhere to the highest standards" />
        <div className="mt-16 grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certs.map((cert) => (
            <motion.div key={cert} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center p-4 bg-gray-50 dark:bg-navy-deep rounded-xl border border-gray-100 dark:border-white/10">
              <span className="font-bold text-navy dark:text-white">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [{ value: "5+", label: "Years" }, { value: "200+", label: "Projects" }, { value: "100+", label: "Clients" }, { value: "24/7", label: "Support" }];
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <CountUp value={stat.value} className="text-4xl lg:text-5xl font-bold text-brand" />
              <p className="text-[#64748B] dark:text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-brand to-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to Secure Your Property?</h2>
        <p className="text-white/90 text-lg mb-8">Get in touch for a free consultation.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="group relative overflow-hidden px-8 py-4 bg-white text-brand-ember rounded-xl font-semibold hover:bg-white/90 shadow-xl transition-colors">Get Free Quote<span aria-hidden="true" className="cta-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand/25 to-transparent" /></button>
          <a href="tel:+96892144367" className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">Call Now</a>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const { api, apiConfigured } = await import("@/lib/api");
      if (!apiConfigured) throw new Error("not-configured");
      await api.submitInquiry(formData);
      setIsSuccess(true);
      toast("Message sent! Our team will contact you shortly.", "success");
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setSubmitError("Could not send your message online. Please call us directly at +968 92144367.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-4">Get In Touch</h2>
            <p className="text-[#64748B] dark:text-gray-400 mb-8">Contact us for a free consultation and quote.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <MapPin size={24} className="text-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white">Address</h4>
                  <p className="text-[#64748B] dark:text-gray-400 text-sm">P.O.Box: 124, P.C:112, Barka, Sumuhan, South Al Batinah, Oman</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Phone size={24} className="text-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white mb-1">Phone</h4>
                  {COMPANY.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="text-[#64748B] dark:text-gray-400 hover:text-brand-ember dark:hover:text-brand-soft transition-colors block">{phone}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Mail size={24} className="text-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white">Email</h4>
                  {COMPANY.emails.map((email) => (
                    <p key={email} className="text-[#64748B] dark:text-gray-400">{email}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-navy-deep rounded-3xl p-8">
            {isSuccess && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg" role="alert">
                Thank you! Message sent successfully.
              </div>
            )}
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg" role="alert">
                {submitError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
              <Input type="text" placeholder="Full Name *" required aria-label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input type="email" placeholder="Email *" required aria-label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <Input type="tel" placeholder="Phone *" required aria-label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <Select required aria-label="Service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                <option value="">Select a service</option>
                <option value="fire-detection">Fire Detection</option>
                <option value="fire-protection">Fire Protection</option>
                <option value="electrical">Electrical</option>
                <option value="cctv">CCTV & ELV</option>
                <option value="plumbing">Plumbing</option>
              </Select>
              <Textarea placeholder="Message *" required aria-label="Message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              <Button type="submit" loading={isSubmitting} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}