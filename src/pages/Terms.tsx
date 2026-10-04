import { CTA } from "@/components/sections/HomeSections";
import { Contact } from "@/components/sections/HomeSections";
import { PageHero } from "@/components/ui/PageHero";

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" />
      <section className="py-20 bg-gray-50 dark:bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-navy-deep p-8 rounded-2xl border border-gray-100 dark:border-white/10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#64748B] dark:text-gray-400">By accessing or using our services, you agree to be bound by these Terms and Conditions.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">2. Services</h2>
              <p className="text-[#64748B] dark:text-gray-400">We provide fire safety, electrical, CCTV, and plumbing services as described on our website.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">3. Contact</h2>
              <p className="text-[#64748B] dark:text-gray-400">For questions regarding these Terms, contact us at info@zaintechoman.com</p>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Contact />
    </>
  );
}