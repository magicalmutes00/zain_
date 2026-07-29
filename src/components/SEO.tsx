import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

export function SEO({
  title = "ZAIN Technical & Integrated Services LLC",
  description = "Professional fire detection, fire protection, electrical, CCTV, and plumbing services in Oman. Design, supply, installation, testing, commissioning, and maintenance.",
  image = "/og-image.svg",
  type = "website",
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://zaintechoman.com${location.pathname}`;
  const pageTitle = title.includes("ZAIN") ? title : `${title} | ZAIN Technical`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZAIN Technical & Integrated Services LLC",
    url: "https://zaintechoman.com",
    logo: "https://zaintechoman.com/images/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "P.O.Box: 124, P.C:112, Barka, Sumuhan",
      addressLocality: "South Al Batinah",
      addressCountry: "OM",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+968-92144367",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://facebook.com/zaintechnicaloman",
      "https://instagram.com/zaintechnicaloman",
      "https://linkedin.com/company/zaintechnicaloman",
    ],
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="fire protection oman, fire detection systems, fire alarm installation, electrical contractor, cctv installation, plumbing services oman" />
      <meta name="author" content="ZAIN Technical" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ZAIN Technical" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

export function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ZAIN Technical & Integrated Services LLC",
    image: "https://zaintechoman.com/images/logo.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barka",
      addressRegion: "South Al Batinah",
      addressCountry: "OM",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.67",
      longitude: "57.26",
    },
    telephone: "+968-92144367",
    email: "info@zaintechoman.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Oman",
    },
    serviceType: ["Fire Detection", "Fire Protection", "Electrical", "CCTV", "Plumbing"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
