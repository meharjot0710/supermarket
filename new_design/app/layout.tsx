import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
  description:
    "Australia's trusted FMCG wholesaler supplying independent supermarkets with quality products, competitive pricing, and reliable national distribution.",
  openGraph: {
    title: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
    description:
      "Australia's trusted FMCG wholesaler supplying independent supermarkets with quality products, competitive pricing, and reliable national distribution.",
    type: "website",
  },
};

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
