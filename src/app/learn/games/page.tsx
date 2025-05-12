import GameCard from '@/components/game-card';
import { games } from '@/data/mock-data';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100 shadow-sm">
        <h2 className="text-xl font-bold text-green-800 mb-2">New! 2D Village Game</h2>
        <p className="text-gray-700 mb-4">
          Explore a 2D village landscape in this fun and simple game. Move around with arrow keys or WASD,
          visit houses, and avoid obstacles!
        </p>
        <Link href="/learn/games/2d-village">
          <Button className="bg-green-600 hover:bg-green-700">
            Play 2D Village Game
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
