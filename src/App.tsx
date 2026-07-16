import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { AnimationProvider } from "@/components/AnimationProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary, PageLoader } from "@/components/ErrorBoundary";
import { SEO } from "@/components/SEO";
import { useScrollProgress } from "@/hooks/useCustomHooks";
import Home from "@/pages/Home";
import AboutPage from "@/pages/About";
import ServicesPage from "@/pages/Services";
import ContactPage from "@/pages/Contact";
import ProjectsPage from "@/pages/Projects";
import FAQPage from "@/pages/FAQ";
import PolicyPage from "@/pages/Policy";
import TermsPage from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import ProductsPage from "@/pages/Products";
import IndustriesPage from "@/pages/Industries";
import CertificationsPage from "@/pages/Certifications";

function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

function AppContent() {
  return (
    <>
      <SEO />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServicesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AnimationProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AnimationProvider>
    </ErrorBoundary>
  );
}