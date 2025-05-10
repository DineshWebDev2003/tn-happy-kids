import { Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function NumberNinjasPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <Hash className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-4">Number Ninjas</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This game is coming soon! Get ready to count and calculate.
      </p>
      <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden shadow-lg bg-secondary/30 flex items-center justify-center">
         <Image 
            src="https://picsum.photos/seed/numbersgame/400/250" 
            alt="Number game placeholder" 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint="numbers blocks" />
      </div>
       <Button asChild className="mt-8">
        <Link href="/learn/games">Back to Games</Link>
      </Button>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
