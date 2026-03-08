import { getDb } from "./mongodb";

const COLLECTION = "admin";

export interface AdminRecord {
  _id?: unknown;
  username: string;
  passwordHash: string;
  updatedAt: Date;
}

export async function getAdminFromDb(): Promise<AdminRecord | null> {
  const db = await getDb();
  const doc = await db.collection<AdminRecord>(COLLECTION).findOne({});
  return doc;
}

export async function saveAdminToDb(username: string, passwordHash: string): Promise<void> {
  const db = await getDb();
  await db.collection<AdminRecord>(COLLECTION).updateOne(
    {},
    {
      $set: {
        username,
        passwordHash,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
}
