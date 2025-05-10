import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle } from 'lucide-react';
import type { Story } from '@/data/mock-data';
// No Link import needed if not navigating to a detail page yet

interface StoryCardProps {
  story: Story;
  onReadMore?: (storyContent: string, storyTitle: string) => void; // For quiz generator
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onReadMore }) => {
  const handleListen = () => {
    alert(`Playing story: ${story.title} (Audio feature coming soon!)`);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-4">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-secondary/10">
          <Image
            src={story.imageUrl}
            alt={story.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={story.imageHint}
          />
        </div>
        <CardTitle className="text-xl font-semibold text-primary">{story.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground italic">{story.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-foreground line-clamp-3">{story.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={handleListen} className="w-full sm:w-auto">
          <PlayCircle className="mr-2 h-4 w-4" /> Listen (Soon!)
        </Button>
        {onReadMore && (
          <Button variant="secondary" onClick={() => onReadMore(story.content, story.title)} className="w-full sm:w-auto">
            <BookOpen className="mr-2 h-4 w-4" /> Read & Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
