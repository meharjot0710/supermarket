import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
  description:
    "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
  authors: [{ name: "SuperMarketing" }],
  openGraph: {
    title: "SuperMarketing | Australia's Trusted FMCG Wholesaler",
    description:
      "Australia's trusted FMCG wholesaler supplying Independent Supermarkets with quality products, competitive pricing, and reliable national distribution.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
