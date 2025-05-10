import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import type { Game } from '@/data/mock-data';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const IconComponent = (LucideIcons as any)[game.IconName] || LucideIcons.Gamepad2;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <IconComponent className="w-8 h-8 text-accent" />
          <CardTitle className="text-xl font-semibold text-primary">{game.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
         <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden bg-secondary/20">
          <Image
            src={`https://picsum.photos/seed/${game.id}/200/120`}
            alt={game.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={game.imageHint}
          />
        </div>
        <CardDescription className="text-sm text-muted-foreground">{game.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={game.href} passHref className="w-full">
          <Button variant="secondary" className="w-full">
            Play Now <LucideIcons.Play className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
