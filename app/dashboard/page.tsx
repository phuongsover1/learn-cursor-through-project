import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { count, desc, eq } from "drizzle-orm";
import { DashboardPage } from "@/components/dashboard-page";
import { db } from "@/src/db";
import { cardsTable, decksTable } from "@/src/db/schema";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const decks = await db
    .select({
      id: decksTable.id,
      name: decksTable.name,
      updatedAt: decksTable.updatedAt,
      cardCount: count(cardsTable.id),
    })
    .from(decksTable)
    .leftJoin(cardsTable, eq(cardsTable.deckId, decksTable.id))
    .where(eq(decksTable.userId, userId))
    .groupBy(decksTable.id, decksTable.name, decksTable.updatedAt)
    .orderBy(desc(decksTable.updatedAt));

  const normalizedDecks = decks.map((deck) => ({
    ...deck,
    cardCount: Number(deck.cardCount),
  }));

  return (
    <DashboardPage
      firstName={user?.firstName ?? "there"}
      deckCount={normalizedDecks.length}
      cardCount={normalizedDecks.reduce((total, deck) => total + deck.cardCount, 0)}
      decks={normalizedDecks}
    />
  );
}
