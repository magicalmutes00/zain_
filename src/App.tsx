import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { AnimationProvider } from "@/components/AnimationProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MotionConfig } from "framer-motion";
import { ErrorBoundary, PageLoader } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/ui/Toast";
import { useScrollProgress } from "@/hooks/useCustomHooks";

const Home = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ServicesPage = lazy(() => import("@/pages/Services"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const FAQPage = lazy(() => import("@/pages/FAQ"));
const PolicyPage = lazy(() => import("@/pages/Policy"));
const TermsPage = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const IndustriesPage = lazy(() => import("@/pages/Industries"));
const CertificationsPage = lazy(() => import("@/pages/Certifications"));
const Admin = lazy(() => import("@/pages/Admin"));

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
              <Route path="/admin/*" element={<Admin />} />
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
      <HelmetProvider>
        <AnimationProvider>
          <LanguageProvider>
            <ToastProvider>
              <MotionConfig reducedMotion="user">
                <AppContent />
              </MotionConfig>
            </ToastProvider>
          </LanguageProvider>
        </AnimationProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}