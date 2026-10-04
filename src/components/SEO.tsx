import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

export function SEO({
  title = "Fire Protection Company in Oman | ZAIN Technical",
  description = "Civil Defense-aligned fire protection company in Oman for alarms, sprinklers, suppression, testing & AMC. Serving Muscat, Barka & Sohar. Get a free quote.",
  image = "/og-image.png",
  type = "website",
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://zaintechoman.com${location.pathname}`;
  const pageTitle = title.includes("ZAIN") ? title : `${title} | ZAIN Technical`;
  const absoluteImage = image.startsWith("http") ? image : `https://zaintechoman.com${image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zaintechoman.com/#org",
        name: "ZAIN Technical & Integrated Services LLC",
        url: "https://zaintechoman.com/",
        logo: "https://zaintechoman.com/images/logo-z.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+968-92144367",
          contactType: "customer service",
          areaServed: "OM",
          availableLanguage: ["en", "ar"],
        },
        sameAs: [
          "https://facebook.com/zaintechnicaloman",
          "https://instagram.com/zaintechnicaloman",
          "https://linkedin.com/company/zaintechnicaloman",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://zaintechoman.com/#local",
        name: "ZAIN Technical & Integrated Services LLC",
        image: "https://zaintechoman.com/images/logo-z.png",
        url: "https://zaintechoman.com/",
        priceRange: "$$",
        telephone: "+968-92144367",
        email: "info@zaintechoman.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "P.O. Box 124, Barka, Sumuhan",
          addressLocality: "Barka",
          addressRegion: "South Al Batinah",
          postalCode: "122",
          addressCountry: "OM",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 23.67,
          longitude: 57.26,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "18:00",
        },
        areaServed: ["Muscat", "Barka", "Sohar", "Salalah", "Nizwa", "Duqm"],
      },
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
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="ZAIN Technical" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
