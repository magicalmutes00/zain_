import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRODUCTS, BRANDS } from "@/data/company";
import { CheckCircle2, Shield, Zap, Thermometer, Radio, Eye } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield, Zap, Thermometer, Radio, Eye, CheckCircle2
};

const productCategories = [
  {
    title: "Fire Detection",
    items: ["Fire Alarm Panels", "Smoke Detectors", "Heat Detectors", "Manual Call Points", "Notification Devices"],
    icon: Eye
  },
  {
    title: "Fire Protection",
    items: ["Fire Pumps", "Sprinkler Systems", "Fire Hydrants", "FM-200 Systems", "Fire Extinguishers"],
    icon: Shield
  },
  {
    title: "Electrical",
    items: ["Circuit Breakers", "Power Distribution", "Emergency Lighting", "Fire Alarm Cabling", "Conduit & Trunking"],
    icon: Zap
  },
  {
    title: "CCTV & Security",
    items: ["CCTV Cameras", "DVR/NVR Systems", "Access Control", "Monitor Systems", "Structured Cabling"],
    icon: Radio
  }
];

export default function ProductsPage() {
  return (
    <>
      <SEO
        title="Fire Safety Products Oman | ZAIN Technical"
        description="Shop fire safety products in Oman: alarm panels, detectors, pumps, extinguishers, hose reels & suppression from Honeywell, Gent, Tyco & NAFFCO."
      />
      
      <section className="pt-32 pb-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Products"
            subtitle="Quality products from internationally recognized brands"
            description="We supply and install premium fire safety, electrical, CCTV, and plumbing equipment from trusted manufacturers."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-navy-deep rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-brand/10 dark:bg-brand/20 flex items-center justify-center mb-4">
                  <category.icon size={28} className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Brands We Work With"
            subtitle="Trusted Partners"
            description="We partner with industry-leading brands to ensure the highest quality products for our clients."
          />
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {BRANDS.map((brand) => (
              <div
                key={brand}
                className="px-8 py-4 bg-white dark:bg-navy-deep rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-semibold text-navy dark:text-white">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}