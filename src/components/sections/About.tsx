import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Target, Eye, Shield, Users, Award, Wrench, Clock } from "lucide-react";
import { COMPANY, CORE_VALUES, WHY_CHOOSE_US } from "@/data/company";

export function About() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionHeader title="About Our Company" subtitle={COMPANY.name} centered={false} />
            <div className="mt-8 space-y-4 text-[#64748B] dark:text-gray-400">
              <p>{COMPANY.name} is a professional engineering, contracting, and integrated technical services company specializing in complete fire detection and fire protection solutions.</p>
              <p>We offer complete design, supply, installation, testing, commissioning, maintenance, inspection, and engineering services for commercial, industrial, government, and residential projects throughout Oman.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["ISO Certified Standards", "Internationally Compliant", "Expert Engineering Team", "Quality Guaranteed"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-brand flex-shrink-0" />
                  <span className="text-sm text-navy dark:text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function MissionVision() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <Card padding="lg">
            <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6"><Target className="text-brand" size={28} /></div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">Our Mission</h3>
            <p className="text-[#64748B] dark:text-gray-400 leading-relaxed">To provide reliable, innovative, and internationally compliant fire safety and engineering solutions that protect lives, property, and businesses through quality workmanship and professional service.</p>
          </Card>
          <Card padding="lg">
            <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6"><Eye className="text-brand" size={28} /></div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">Our Vision</h3>
            <p className="text-[#64748B] dark:text-gray-400 leading-relaxed">To become one of the most trusted fire protection and integrated engineering solution providers in Oman by consistently delivering excellence, safety, innovation, and customer satisfaction.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function CoreValues() {
  return (
    <section className="py-20 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Core Values" subtitle="The principles that guide everything we do" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CORE_VALUES.map((value) => (
            <Card key={value} className="text-center">
              <CheckCircle2 size={24} className="text-brand mx-auto mb-2" aria-hidden="true" />
              <span className="font-medium text-navy dark:text-white text-sm">{value}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const icons = [Users, Award, Wrench, Clock, Shield];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Why Choose Us" subtitle="What sets us apart" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="text-center">
                {(() => {
                  const Icon = icons[i % icons.length];
                  return <Icon size={32} className="text-brand mx-auto mb-3" aria-hidden="true" />;
                })()}
                <span className="font-medium text-navy dark:text-white text-sm">{item}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}