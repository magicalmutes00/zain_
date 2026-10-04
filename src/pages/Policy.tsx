import { CTA } from "@/components/sections/HomeSections";
import { Contact } from "@/components/sections/HomeSections";

export default function PolicyPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy to-navy-deep">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-navy-deep p-8 rounded-2xl border border-gray-100 dark:border-white/10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-[#64748B] dark:text-gray-400">We collect information you provide directly to us, including your name, email address, phone number, company name, and project details.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-[#64748B] dark:text-gray-400">We use the information to respond to inquiries, provide services, send quotes, and comply with legal obligations.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">3. Contact Us</h2>
              <p className="text-[#64748B] dark:text-gray-400">For questions about this Privacy Policy, contact us at info@zaintechoman.com</p>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Contact />
    </>
  );
}