import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { Home } from "./pages/Home";

const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const ServicesIndex = lazy(() => import("./pages/ServicesIndex").then((m) => ({ default: m.ServicesIndex })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then((m) => ({ default: m.ServiceDetail })));
const Products = lazy(() => import("./pages/Products").then((m) => ({ default: m.Products })));
const Projects = lazy(() => import("./pages/Projects").then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="container section" aria-busy="true" aria-label="Loading page">
      <p className="lead">Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<PageFallback />}><ServicesIndex /></Suspense>} />
          <Route path="services/:slug" element={<Suspense fallback={<PageFallback />}><ServiceDetail /></Suspense>} />
          <Route path="products" element={<Suspense fallback={<PageFallback />}><Products /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageFallback />}><Projects /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
