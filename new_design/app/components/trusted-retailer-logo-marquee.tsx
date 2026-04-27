"use client";

import Image from "next/image";

const RETAILER_LOGO_BY_NAME: Record<string, string> = {
  Ritchies: "79543ritchies-igaliquor-2021.png",
  Champions: "96811champions-iga-logo--rebuilt-2019--blue-l.png",
  Supabarn: "26570sup0046supabarnlogool7.jpg",
  Michael: "50508michael.png",
  RedDrop: "30021reddroplogo.png",
  "Le-Max Group": "51129le-max-group-supermarkets.png",
  "IGA Ryan": "40425ryans-logo.png",
  Carlos: "79879carlos-iga.jpg",
  Bernardis: "38111bernardis.png",
  "Supamart IGA": "32331supamartpmswithtaglogo.png",
  "Ahmedi Group": "Ahmedi group.PNG",
  "Country Grocers": "Country grocers.PNG",
  FoodWorks: "FoodWorks_Supermarket_logo.jpg",
  OTR: "OTR.JPG",
  "Khans Group": "kHANS GROUP.PNG",
  "Llyods Group": "Llyods group.PNG",
  IGA: "89383iga-1.png",
  "Retail Partner": "WhatsApp Image 2026-04-27 at 11.42.52 AM.jpeg",
};

function logoSrc(filename: string) {
  return `/Trusted%20and%20Long%20term%20Relationships/${encodeURIComponent(filename)}`;
}

export function TrustedRetailerLogoMarquee({ names }: { names: readonly string[] }) {
  const logos = names
    .map((name) => {
      const file = RETAILER_LOGO_BY_NAME[name];
      return file ? { name, file } : null;
    })
    .filter((x): x is { name: string; file: string } => x !== null);

  const loop = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="trusted-brand-marquee flex w-max gap-4 py-1">
        {loop.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-16 w-[190px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white px-2 shadow-sm"
          >
            <div className="relative h-14 w-full">
              <Image
                src={logoSrc(logo.file)}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="190px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
