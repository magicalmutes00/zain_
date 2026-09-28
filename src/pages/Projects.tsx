import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MapPin, Calendar, Building2, Factory, Warehouse, Hotel, Hospital, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const statusTabs = ["Completed", "Ongoing"];

const categories = ["All", "Fire Protection", "Fire Detection", "Electrical", "CCTV"];

const projects = [
  { title: "Al Madina Complex Fire Protection", category: "Fire Protection", location: "Muscat, Oman", year: "2024", client: "Al Madina Group", scope: "Complete fire protection system design, supply & installation", status: "completed", image: "/images/Diesel Fire Pump Installation with Fire Protection Piping and Control Panel.webp" },
  { title: "Royal Hospital Fire Detection Upgrade", category: "Fire Detection", location: "Salalah, Oman", year: "2024", client: "Ministry of Health", scope: "Addressable fire alarm system & emergency lighting", status: "completed", image: "/images/Modern Institutional Building Under Construction.webp" },
  { title: "Sohar Industrial Zone Electrical", category: "Electrical", location: "Sohar, Oman", year: "2023", client: "Sohar Industrial Estate", scope: "Power distribution & electrical infrastructure", status: "completed", image: "/images/Industrial Fire Pump Room Installation.webp" },
  { title: "Al Mouj Villa CCTV Installation", category: "CCTV", location: "Muscat, Oman", year: "2024", client: "Private Client", scope: "HD CCTV system with remote monitoring", status: "completed", image: "/images/Completed Mid-Rise Commercial and Residential Building Exterior.webp" },
  { title: "Grand Hotel Fire Safety System", category: "Fire Protection", location: "Muscat, Oman", year: "2023", client: "Grand Hotel Group", scope: "Sprinkler system, hydrants & fire pumps", status: "completed", image: "/images/HALA HOTEL SUITES – Modern Hotel Building Exterior.webp" },
  { title: "Duqm Warehouse Fire Protection", category: "Fire Protection", location: "Duqm, Oman", year: "2024", client: "Duqm Logistics", scope: "Warehouse sprinkler & suppression systems", status: "completed", image: "/images/Modern Industrial Warehouse and Factory Building Exterior.webp" },
  { title: "Nizwa Fort Fire Detection System", category: "Fire Detection", location: "Nizwa, Oman", year: "2025", client: "Ministry of Heritage & Tourism", scope: "Heritage building addressable fire detection & alarm system", status: "ongoing", image: "/images/Multi-Story Building with Exterior Scaffolding During Facade Finishing.webp" },
  { title: "Ibri Industrial City Electrical Infrastructure", category: "Electrical", location: "Ibri, Oman", year: "2025", client: "Ibri Industrial Estate", scope: "High voltage power distribution & substation installation", status: "ongoing", image: "/images/industrial-fire-pump-room-oman.webp" },
  { title: "Sur Corniche CCTV Surveillance Project", category: "CCTV", location: "Sur, Oman", year: "2025", client: "Sur Municipality", scope: "Public area CCTV surveillance & monitoring system", status: "ongoing", image: "/images/Modern Commercial Building Exterior with Glass Facade.webp" },
];

const stats = [
  { icon: Building2, value: "200+", label: "Projects Completed" },
  { icon: ShieldCheck, value: "50+", label: "Happy Clients" },
  { icon: MapPin, value: "10+", label: "Cities Across Oman" },
  { icon: Calendar, value: "5+", label: "Years of Excellence" },
];

export default function ProjectsPage() {
  const [activeStatus, setActiveStatus] = useState("Completed");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((p) => {
    const statusMatch = p.status === activeStatus.toLowerCase();
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <>
      <SEO
        title="Fire Safety Projects Oman | ZAIN Technical"
        description="Explore our portfolio of completed fire protection, fire detection, electrical, CCTV, and plumbing projects across Oman. Quality installations you can trust."
      />

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF6B35]/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FF6B35] font-medium mb-4 tracking-wider uppercase"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Projects We've Delivered
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            From iconic commercial buildings to critical industrial facilities, our work speaks for itself.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#0A2647]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveStatus(tab); setActiveCategory("All"); }}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeStatus === tab
                    ? "bg-[#0A2647] dark:bg-[#FF6B35] text-white shadow-lg"
                    : "bg-gray-100 dark:bg-[#144272] text-[#64748B] dark:text-gray-300 hover:bg-[#0A2647]/10 hover:text-[#0A2647] dark:hover:text-white"
                }`}
              >
                {tab}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeStatus === tab
                    ? "bg-white/20 text-white"
                    : "bg-[#0A2647]/10 dark:bg-white/10 text-[#64748B] dark:text-gray-400"
                }`}>
                  {projects.filter((p) => p.status === tab.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25"
                    : "bg-gray-100 dark:bg-[#144272] text-[#64748B] dark:text-gray-300 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/90 via-[#0A2647]/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs font-semibold rounded-full shadow-lg">
                        {project.category}
                      </span>
                      <span className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg ${
                        project.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                      }`}>
                        {project.status === "completed" ? "Completed" : "Ongoing"}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-[#64748B] dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#FF6B35]" aria-hidden="true" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#FF6B35]" aria-hidden="true" />
                        {project.year}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 dark:border-white/10">
                      <p className="text-sm text-[#64748B] dark:text-gray-400">
                        <span className="font-semibold text-[#0A2647] dark:text-white">Client:</span> {project.client}
                      </p>
                      <p className="text-sm text-[#64748B] dark:text-gray-400 mt-1">
                        <span className="font-semibold text-[#0A2647] dark:text-white">Scope:</span> {project.scope}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Impact by the Numbers"
            subtitle="Project Statistics"
            description="A track record of successful project deliveries across Oman"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} className="text-[#FF6B35]" aria-hidden="true" />
                </div>
                <span className="text-3xl lg:text-4xl font-bold text-[#0A2647] dark:text-white block">
                  {stat.value}
                </span>
                <p className="text-[#64748B] dark:text-gray-400 mt-2 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-[#0A2647] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-8"
          >
            Let's discuss your requirements and provide a tailored solution for your project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#FF8F5E] transition-colors shadow-xl"
            >
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Our Services
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}