import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SITE_URL, metaFor } from "../data/seo";

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function applyMeta(pathname: string) {
  const meta = metaFor(pathname);
  const indexable = meta.indexable !== false;
  document.title = meta.title;

  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  upsertMeta('meta[name="description"]', "name", "description", meta.description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[name="robots"]', "name", "robots", indexable ? "index, follow" : "noindex, follow");

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (indexable) {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  } else if (canonical) {
    canonical.remove();
  }
}

export function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyMeta(pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
