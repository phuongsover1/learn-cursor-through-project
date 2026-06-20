import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Brain, Flame, Plus, Star, Zap } from "lucide-react";

const QUICK_ACTIONS = [
  {
    label: "Create Deck",
    description: "Start a new flashcard deck",
    icon: Plus,
    href: "#",
    primary: true,
  },
  {
    label: "Study Now",
    description: "Continue where you left off",
    icon: Zap,
    href: "#",
    primary: false,
  },
  {
    label: "Browse Decks",
    description: "Explore your existing decks",
    icon: BookOpen,
    href: "#",
    primary: false,
  },
];

interface DashboardPageProps {
  firstName: string;
  deckCount: number;
  cardCount: number;
  decks: {
    id: number;
    name: string;
    cardCount: number;
    updatedAt: Date;
  }[];
}

export function DashboardPage({
  firstName,
  deckCount,
  cardCount,
  decks,
}: DashboardPageProps) {
  const stats = [
    {
      label: "Decks",
      value: deckCount.toString(),
      icon: BookOpen,
      description: "card decks created",
    },
    {
      label: "Cards",
      value: cardCount.toString(),
      icon: Brain,
      description: "total flashcards",
    },
    {
      label: "Streak",
      value: "0",
      icon: Flame,
      description: "days in a row",
    },
    {
      label: "Mastered",
      value: "0%",
      icon: Star,
      description: "cards mastered",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8 px-6 py-10 max-w-5xl mx-auto w-full">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-zinc-400 mt-1">
            Ready to study? Pick up where you left off.
          </p>
        </div>
        <Badge
          variant="outline"
          className="hidden sm:flex items-center gap-1.5 border-white/20 text-zinc-300 px-3 py-1.5"
        >
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          0 day streak
        </Badge>
      </div>

      <Separator className="bg-white/10" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, description }) => (
          <Card key={label} className="bg-white/5 border-white/10 text-white">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {label}
              </CardTitle>
              <Icon className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily goal */}
      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Daily goal
            </CardTitle>
            <span className="text-xs text-zinc-500">0 / 20 cards</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Progress value={0} className="h-2 bg-white/10" />
          <p className="text-xs text-zinc-500">
            Study 20 cards today to keep your streak alive.
          </p>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Quick actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map(({ label, description, icon: Icon, href, primary }) => (
            <a
              key={label}
              href={href}
              className={`flex flex-col gap-3 rounded-xl border p-5 transition-colors ${
                primary
                  ? "border-white/20 bg-white text-black hover:bg-zinc-100"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <Icon className={`h-5 w-5 ${primary ? "text-black" : "text-zinc-300"}`} />
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className={`text-xs mt-0.5 ${primary ? "text-zinc-600" : "text-zinc-400"}`}>
                  {description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent decks */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Recent decks
        </h2>
        {decks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {decks.map((deck) => (
              <Card
                key={deck.id}
                className="bg-white/5 border-white/10 text-white"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{deck.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    {deck.cardCount} {deck.cardCount === 1 ? "card" : "cards"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Updated {deck.updatedAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent className="py-6">
              <p className="font-medium">No decks yet</p>
              <p className="text-sm text-zinc-400 mt-1">
                Create your first deck to start tracking cards here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
