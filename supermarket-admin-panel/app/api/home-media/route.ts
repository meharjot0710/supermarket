import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { HomeMediaContent } from "@/types/cms";

const COLLECTION = "home_media";
const DOC_KEY = "home";

function defaultContent(): HomeMediaContent {
  return {
    services: {
      columns: [
        { title: "Wholesale range & distribution", images: [] },
        { title: "Field sales & in-store execution", images: [] },
        { title: "Partnership & service", images: [] },
      ],
    },
    featuredProducts: { items: [] },
    newsletterCatalogue: { items: [] },
  };
}

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ key: DOC_KEY });
    return NextResponse.json((doc?.content as HomeMediaContent | undefined) ?? defaultContent());
  } catch (error) {
    console.error("[home-media:get]", error);
    return NextResponse.json({ error: "Failed to load home media." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as HomeMediaContent;
    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { key: DOC_KEY },
      {
        $set: {
          key: DOC_KEY,
          content: body,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[home-media:put]", error);
    return NextResponse.json({ error: "Failed to save home media." }, { status: 500 });
  }
}
