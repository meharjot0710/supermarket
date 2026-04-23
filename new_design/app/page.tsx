import MacMerchandisingLanding from "./components/mac-merchandising-landing";
import { loadHeroFromDb } from "@/lib/hero-cms";

/** Hero CMS content must be read on request, not at build time. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const heroContent = await loadHeroFromDb();
  return <MacMerchandisingLanding heroContent={heroContent} />;
}
