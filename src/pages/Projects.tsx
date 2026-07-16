import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const projects = [
  { title: "Al Madina Complex Fire Protection", category: "Fire Protection", location: "Muscat, Oman", year: "2024", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop" },
  { title: "Oman Hospital Fire Detection", category: "Fire Detection", location: "Salalah, Oman", year: "2024", image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop" },
  { title: "Industrial Zone Electrical", category: "Electrical", location: "Sohar, Oman", year: "2023", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop" },
  { title: "Luxury Villa CCTV", category: "CCTV", location: "Muscat, Oman", year: "2024", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" },
  { title: "Five-Star Hotel Fire Safety", category: "Fire Protection", location: "Muscat, Oman", year: "2023", image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop" },
  { title: "Warehouse Fire Protection", category: "Fire Protection", location: "Duqm, Oman", year: "2024", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop" },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A2647] to-[#144272]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Projects</h1>
          <p className="text-white/80 text-lg">Quality installations across Oman</p>
        </div>
      </section>
      <section className="py-20 lg:py-32 bg-white dark:bg-[#0A2647]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={project.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-white dark:bg-[#144272] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-56">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-[#FF6B35] text-white text-xs font-medium rounded-full">{project.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#0A2647] dark:text-white mb-3">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#64748B] dark:text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={14} aria-hidden="true" />{project.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} aria-hidden="true" />{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}