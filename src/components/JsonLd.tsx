import { site } from "@/lib/site";

/** LocalBusiness / DrivingSchool structured data for local SEO */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: site.name,
    description:
      "NTSA-certified driving school in Lumakanda, Kakamega County — Category A (motorcycles) and Category B (light vehicles) training.",
    url: "https://mkombozidrivingschool.co.ke",
    telephone: site.phoneTel,
    email: site.email,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chevaywa-Matete Road, Lumakanda",
      addressLocality: "Lumakanda",
      addressRegion: "Kakamega County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.mapLat,
      longitude: site.mapLng,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.areaServed,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    hasMap: `https://www.openstreetmap.org/?mlat=${site.mapLat}&mlon=${site.mapLng}#map=16/${site.mapLat}/${site.mapLng}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
