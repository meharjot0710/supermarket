import MacMerchandisingLanding from "./components/mac-merchandising-landing";
import { loadHeroFromDb } from "@/lib/hero-cms";
import { loadHomeMediaFromDb } from "@/lib/home-media-cms";
import { getSiteUrl } from "@/lib/site-url";

/** Hero CMS content must be read on request, not at build time. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const [heroContent, homeMedia] = await Promise.all([loadHeroFromDb(), loadHomeMediaFromDb()]);
  const siteUrl = getSiteUrl();
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SuperMarketing",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+61-3-9894-2212",
        email: "info@supermarketing.com.au",
        areaServed: "AU",
        availableLanguage: ["en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 6/29 Business Park Drive",
      addressLocality: "Notting Hill",
      addressRegion: "VIC",
      postalCode: "3168",
      addressCountry: "AU",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <MacMerchandisingLanding heroContent={heroContent} homeMedia={homeMedia} />
    </>
  );
}
