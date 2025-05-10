import GameCard from '@/components/game-card';
import { games } from '@/data/mock-data';
import { Brain } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <Brain className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Educational Games</h1>
        <p className="text-lg text-muted-foreground">
          Sharpen your skills with these fun and challenging games!
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
