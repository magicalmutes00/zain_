import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Building, Factory, Home as HomeIcon, Hospital, GraduationCap, Hotel, Building2, MapPin, Phone, Mail, Shield } from "lucide-react";
import {
  IconFlame,
  IconShield,
  IconBolt,
  IconCamera,
  IconDroplet,
  IconGasStation,
  IconBell
} from "@tabler/icons-react";
import { INDUSTRIES, COMPANY, BRANDS } from "@/data/company";
import { CountUp } from "@/components/ui/CountUp";
import { Input, Textarea, Select } from "@/components/ui/forms";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy dark:bg-navy-abyss flex items-center lg:h-[56.25vw] lg:max-h-[860px] lg:min-h-[620px]">
      <div className="absolute inset-0">
        <img
          src="/images/Outdoor%20Diesel%20Fire%20Pump%20Station%20Maintenance%20with%20Fire%20Water%20Storage%20Tank.webp"
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div               className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-7">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="text-white/90 text-sm font-semibold tracking-wide">Oman Civil Defense-aligned contractor</span>
              <span className="text-white/40 text-sm font-arabic" lang="ar" dir="rtl">شريك موثوق في السلامة من الحرائق في عمان</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.06] text-white mb-6"
            >
              Fire Protection Company in Oman —{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-soft">Detection, Suppression &amp; Engineering</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-base lg:text-lg text-white/75 leading-relaxed mb-10 max-w-xl"
            >
              ZAIN Technical designs, supplies, installs, tests, commissions, and maintains fire detection, suppression, electrical, CCTV, and plumbing systems for commercial, industrial, government, and residential projects across Oman — with 24/7 emergency support.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold hover:bg-brand-soft shadow-glow transition-all">
                Get a Free Quote
                <span aria-hidden="true" className="cta-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </button>
              <a href={`tel:${COMPANY.phones[0]}`} className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/25 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand/20" aria-hidden="true">
                  <Phone size={15} className="text-brand-soft" />
                </span>
                {COMPANY.phones[0]}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 mt-10"
              aria-label="Certifications and standards"
            >
              {["UL", "FM Approved", "LPCB", "BSI", "NFPA", "TÜV"].map((c) => (
                <span key={c} className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wider text-white/85">
                  {c}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.a
            href={`tel:${COMPANY.phones[0]}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="hidden lg:inline-flex items-center gap-3 absolute bottom-12 right-8 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-md px-5 py-4 hover:bg-white/[0.12] transition-colors"
            aria-label={`Emergency line ${COMPANY.phones[0]}`}
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-white/55">24/7 Emergency</span>
              <span className="block font-display text-lg font-bold text-white">{COMPANY.phones[0]}</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export function ProofBand() {
  const stats = [
    { value: "5+", label: "Years experience" },
    { value: "200+", label: "Projects completed" },
    { value: "100+", label: "Happy clients" },
    { value: "24/7", label: "Emergency support" },
  ];
  return (
    <section className="bg-white dark:bg-navy border-b border-gray-100 dark:border-white/10" aria-label="Company track record">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center lg:border-l lg:first:border-0 border-gray-200 dark:border-white/10"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} className="font-display text-4xl lg:text-[2.75rem] font-bold tracking-tight text-navy dark:text-white" />
              </dd>
              <dd className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-ember dark:text-brand-soft">{stat.label}</dd>
            </motion.div>
          ))}
        </dl>
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-gray-500">Equipment partners</span>
          {BRANDS.map((b) => (
            <span key={b} className="font-display text-sm font-semibold text-slate-500 dark:text-gray-400">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="py-24 lg:py-36 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />
              <div className="relative bg-gradient-to-br from-navy to-navy-deep rounded-3xl p-8 lg:p-12 overflow-hidden">
                <div className="relative grid grid-cols-2 gap-6">
                  <div className="text-center p-4"><span className="font-display text-4xl font-bold text-brand-soft">2021</span><p className="text-white/70 text-sm mt-1">Established</p></div>
                  <div className="text-center p-4"><span className="font-display text-4xl font-bold text-brand-soft">Oman</span><p className="text-white/70 text-sm mt-1">Based</p></div>
                  <div className="text-center p-4"><span className="font-display text-4xl font-bold text-brand-soft">5+</span><p className="text-white/70 text-sm mt-1">Services</p></div>
                  <div className="text-center p-4"><span className="font-display text-4xl font-bold text-brand-soft">24/7</span><p className="text-white/70 text-sm mt-1">Support</p></div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-8 right-8 sm:left-12 sm:right-auto rounded-2xl bg-white dark:bg-navy-deep border border-gray-100 dark:border-white/10 shadow-lift px-5 py-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10" aria-hidden="true">
                  <Shield size={20} className="text-brand-ember dark:text-brand-soft" />
                </span>
                <p className="text-sm font-semibold text-navy dark:text-white">Civil Defense-aligned<br /><span className="font-normal text-[#64748B] dark:text-gray-400">design to lifetime maintenance</span></p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-ember dark:text-brand-soft mb-4">
              <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand" />
              Who we are
            </p>
            <h2 className="font-display text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.15] text-navy dark:text-white mb-5">About Our Company</h2>
            <p className="text-[#64748B] dark:text-gray-400 leading-relaxed mb-4">{COMPANY.name} is a professional engineering, contracting, and integrated technical services company specializing in complete fire detection and fire protection solutions.</p>
            <p className="text-[#64748B] dark:text-gray-400 leading-relaxed">We offer complete design, supply, installation, testing, commissioning, maintenance, inspection, and engineering services for commercial, industrial, government, and residential projects throughout Oman.</p>
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
    { title: "Plumbing", desc: "Plumbing services in Oman with 24/7 emergency support", link: "/services/plumbing", linkText: "Plumbing services in Oman", Icon: IconDroplet },
    { title: "LPG Systems", desc: "LPG system design, installation and maintenance in Oman", link: "/services/lpg-systems", linkText: "LPG system services in Oman", Icon: IconGasStation }
  ];

  return (
    <section className="py-24 lg:py-36 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="01" title="Our Services" subtitle="Fire safety & engineering solutions across Oman" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card hover accent className="text-center dark:bg-navy-deep dark:border-white/10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto bg-navy/[0.07] dark:bg-white/10 group-hover:bg-brand transition-colors">
                  <s.Icon size={30} stroke={1.75} className="text-navy dark:text-white group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy dark:text-white mb-2">{s.title}</h3>
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

export function SlimCTA() {
  return (
    <section className="bg-gray-50 dark:bg-navy-abyss" aria-label="Request a free consultation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-navy dark:bg-navy-deep px-8 py-10 lg:px-14 lg:py-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-soft mb-3">Free site survey</p>
              <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Get in touch for a free consultation
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="px-7 py-3.5 bg-brand text-white rounded-xl font-semibold hover:bg-brand-soft shadow-glow transition-all">
                Get a Free Quote
              </button>
              <a href={`tel:${COMPANY.phones[0]}`} className="px-7 py-3.5 border border-white/25 text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                {COMPANY.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const iconList = [Building, Factory, HomeIcon, Hospital, GraduationCap, Hotel, Building2];
  return (
    <section className="py-24 lg:py-36 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="02" title="Industries We Serve" subtitle="Expertise across diverse sectors" />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map((industry, i) => {
            const Icon = iconList[i % iconList.length];
            return (
              <motion.div key={industry} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 dark:bg-navy-deep border border-gray-100 dark:border-white/10 hover:border-brand/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy/[0.07] dark:bg-white/10 flex items-center justify-center mb-4 group-hover:bg-brand transition-colors">
                  <Icon size={24} className="text-navy dark:text-white group-hover:text-white transition-colors" aria-hidden="true" />
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
    <section className="py-24 lg:py-36 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="04" title="Our Products" subtitle="High-quality equipment from trusted brands" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div key={product} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 p-5 bg-white dark:bg-navy-deep rounded-xl border border-gray-100 dark:border-white/10 hover:border-brand/30 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true"><div className="w-3 h-3 rounded-full bg-brand" /></div>
              <span className="font-medium text-navy dark:text-white text-sm">{product}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = ["Consultation", "Site Survey", "Design", "Approval", "Supply", "Install", "Test", "Commission"];
  return (
    <section className="py-24 lg:py-36 bg-navy dark:bg-[#071E36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="03" title="Our Process" subtitle="A systematic approach to excellence" light />
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
    <section className="py-24 lg:py-36 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader index="05" title="Certifications" subtitle="We adhere to the highest standards" />
        <div className="mt-16 grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certs.map((cert) => (
            <motion.div key={cert} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="group flex items-center justify-center p-4 bg-gray-50 dark:bg-navy-deep rounded-xl border border-gray-100 dark:border-white/10 hover:border-brand/40 hover:shadow-lift transition-all">
              <span className="font-display font-bold text-navy dark:text-white group-hover:text-brand-ember dark:group-hover:text-brand-soft transition-colors">{cert}</span>
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
    <section className="relative py-16 lg:py-20 bg-navy dark:bg-navy-abyss overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-1/3 w-96 h-48 bg-brand/15 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center lg:border-l lg:first:border-0 border-white/10 lg:pl-8 lg:first:pl-0">
              <CountUp value={stat.value} className="font-display text-4xl lg:text-5xl font-bold text-white" />
              <p className="text-brand-soft text-sm font-semibold uppercase tracking-[0.18em] mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-brand-ink via-brand to-brand-ink overflow-hidden">
      <div aria-hidden="true" className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/80 text-sm font-bold uppercase tracking-[0.22em] mb-4">Free consultation · No obligation</p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-white mb-5">Ready to Secure Your Property?</h2>
        <p className="text-white/90 text-lg mb-9 max-w-xl mx-auto">Get in touch for a free consultation.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="group relative overflow-hidden px-8 py-4 bg-white text-brand-ember rounded-xl font-semibold hover:bg-white/90 shadow-xl transition-colors">Get Free Quote<span aria-hidden="true" className="cta-sheen pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand/25 to-transparent" /></button>
          <a href="tel:+96892144367" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/70 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
            <Phone size={18} aria-hidden="true" />
            Call Now
          </a>
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
    <section id="contact" className="py-24 lg:py-36 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-ember dark:text-brand-soft mb-4">
              <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-brand" />
              Contact
            </p>
            <h2 className="font-display text-3xl lg:text-[2.5rem] font-bold tracking-tight text-navy dark:text-white mb-4">Get In Touch</h2>
            <p className="text-[#64748B] dark:text-gray-400 leading-relaxed mb-8">Contact us for a free consultation and quote.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy/[0.07] dark:bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <MapPin size={24} className="text-navy dark:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white">Address</h4>
                  <p className="text-[#64748B] dark:text-gray-400 text-sm">P.O.Box: 124, P.C:122, Barka, Sumuhan, South Al Batinah, Oman</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy/[0.07] dark:bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Phone size={24} className="text-navy dark:text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white mb-1">Phone</h4>
                  {COMPANY.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="text-[#64748B] dark:text-gray-400 hover:text-brand-ember dark:hover:text-brand-soft transition-colors block">{phone}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy/[0.07] dark:bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Mail size={24} className="text-navy dark:text-white" />
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
          <div className="bg-gray-50 dark:bg-navy-deep rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-lift">
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