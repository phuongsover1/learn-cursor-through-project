import { currentUser } from "@clerk/nextjs/server";
import { DashboardPage } from "@/components/dashboard-page";
import { LandingPage } from "@/components/landing-page";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <LandingPage />;
  }

  return <DashboardPage firstName={user.firstName ?? "there"} />;
}
