import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { loadSeoByPageKey } from "@/lib/seo-cms";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const seo = await loadSeoByPageKey("home", {
    title: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
    description:
      "Australia's trusted FMCG wholesaler supplying independent supermarkets with quality products, competitive pricing, and reliable national distribution.",
  });
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: [
      "FMCG wholesaler Australia",
      "independent supermarket supplier",
      "supermarket distribution Australia",
      "FMCG distributor",
      "retail merchandising services",
      "brand agent Australia",
    ],
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      siteName: "SuperMarketing",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="bg-white text-neutral-900">{children}</body>
    </html>
  );
}
