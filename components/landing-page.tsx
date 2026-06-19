import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Brain, Flame, TrendingUp, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Spaced Repetition",
    body: "Our algorithm surfaces cards right before you forget them.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    body: "Visual stats keep you motivated and show mastery over time.",
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    body: "Build a study habit with streak tracking and reminders.",
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          FlashyCard
        </h1>
        <p className="max-w-md text-lg text-zinc-400">
          Study smarter with spaced-repetition flashcards. Sign up to create
          decks, track your progress, and master any subject.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 text-left max-w-2xl w-full">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-2"
          >
            <Icon className="h-5 w-5 text-zinc-300" />
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-zinc-400">{body}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Show when="signed-out">
          <SignUpButton>
            <Button size="lg" className="rounded-full px-8">
              Get Started Free
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/20 text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </SignInButton>
        </Show>
      </div>
    </div>
  );
}
