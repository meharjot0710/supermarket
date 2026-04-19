import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromiseNewDesign: Promise<MongoClient> | undefined;
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromiseNewDesign) {
      client = new MongoClient(uri, options);
      global._mongoClientPromiseNewDesign = client.connect();
    }
    clientPromise = global._mongoClientPromiseNewDesign;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDb(): Promise<Db | null> {
  if (!uri || !clientPromise) return null;
  const c = await clientPromise;
  return c.db(process.env.MONGODB_DB_NAME || "supermarket_cms");
}
