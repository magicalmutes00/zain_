import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDUSTRIES } from "@/data/company";
import { Building2, Factory, Home, Hospital, Hotel, ShoppingBag, Warehouse, Building } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2, Factory, Home, Hospital, Hotel, ShoppingBag, Warehouse, Building
};

const industryDetails = [
  {
    name: "Commercial Buildings",
    icon: Building2,
    description: "Offices, retail spaces, and mixed-use developments requiring comprehensive fire safety and security systems.",
    services: ["Fire Alarm Systems", "Emergency Lighting", "CCTV Surveillance", "Access Control"]
  },
  {
    name: "Industrial Plants",
    icon: Factory,
    description: "Manufacturing facilities with specialized fire protection and electrical infrastructure needs.",
    services: ["Fire Suppression", "Industrial Electrical", "Forklift Tracking", "Area Protection"]
  },
  {
    name: "Hospitals",
    icon: Hospital,
    description: "Critical healthcare facilities requiring reliable fire safety and sensitive security systems.",
    services: ["Addressable Fire Alarms", "Medical Gas Detection", "Nurse Call Systems", "CCTV"]
  },
  {
    name: "Hotels & Hospitality",
    icon: Hotel,
    description: "Guest-facing properties needing elegant fire safety and comprehensive security solutions.",
    services: ["Fire Detection", "Guest Room Security", "Parking Surveillance", "Public Area CCTV"]
  },
  {
    name: "Residential",
    icon: Home,
    description: "Villas and residential complexes with tailored fire safety and home automation systems.",
    services: ["Smoke Detection", "Manual Call Points", "CCTV", "Video Intercom"]
  },
  {
    name: "Government Buildings",
    icon: Building,
    description: "Official facilities requiring certified fire safety and high-security access control.",
    services: ["Fire Alarm Certification", "Access Control", "Perimeter Security", "Armed Response Integration"]
  }
];

export default function IndustriesPage() {
  return (
    <>
      <SEO
        title="Industries We Serve"
        description="ZAIN Technical serves commercial, industrial, residential, and government sectors across Oman with specialized fire safety and engineering solutions."
      />
      
      <section className="pt-32 pb-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Industries We Serve"
            subtitle="Comprehensive Solutions for Every Sector"
            description="From commercial high-rises to industrial complexes, we deliver specialized fire safety and engineering services tailored to each industry's unique requirements."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {industryDetails.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-navy-deep rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand/10 dark:bg-brand/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <industry.icon size={32} className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3">{industry.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{industry.description}</p>
                <ul className="space-y-2">
                  {industry.services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We understand every industry has unique requirements. Contact us to discuss your specific fire safety and engineering needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-xl font-semibold hover:bg-[#E85A2A] transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}