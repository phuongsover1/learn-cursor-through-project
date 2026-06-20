import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { cardsTable, decksTable } from "./db/schema";

async function main() {
  const clerkUserId = "user_example123";

  const [japaneseDeck] = await db
    .insert(decksTable)
    .values({
      userId: clerkUserId,
      name: "Japanese",
    })
    .returning();
  console.log("New deck created:", japaneseDeck);

  await db.insert(cardsTable).values({
    deckId: japaneseDeck.id,
    front: "こんにちは",
    back: "Xin chào",
  });
  console.log("Card added to Japanese deck!");

  const [awsDeck] = await db
    .insert(decksTable)
    .values({
      userId: clerkUserId,
      name: "AWS Questions",
    })
    .returning();

  await db.insert(cardsTable).values({
    deckId: awsDeck.id,
    front:
      "A company has a requirement to store application logs that are accessed frequently for the first 30 days, then rarely accessed, but must be available immediately if needed. What is the most cost-effective storage solution?",
    back: "S3 Lifecycle policies and storage classes (S3 Standard, S3 Standard-IA, S3 Intelligent-Tiering)",
  });
  console.log("Card added to AWS deck!");

  const decks = await db.select().from(decksTable);
  console.log("All decks:", decks);

  const cards = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.deckId, japaneseDeck.id));
  console.log("Japanese deck cards:", cards);
}

main();
