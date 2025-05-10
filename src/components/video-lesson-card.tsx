'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Puzzle } from 'lucide-react';
import type { VideoLesson } from '@/data/mock-data';
import { useRouter } from 'next/navigation';

interface VideoLessonCardProps {
  lesson: VideoLesson;
}

const VideoLessonCard: React.FC<VideoLessonCardProps> = ({ lesson }) => {
  const router = useRouter();

  const handlePlayVideo = () => {
    // Store the video URL in localStorage for the video player page
    localStorage.setItem('currentVideoUrl', lesson.videoUrl);
    localStorage.setItem('currentVideoTitle', lesson.title);
    router.push(`/learn/video/${lesson.id}`);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-4">
        <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden bg-secondary/10">
          <Image
            src={lesson.thumbnailUrl}
            alt={lesson.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <CardTitle className="text-xl font-semibold text-primary">{lesson.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground italic">{lesson.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-foreground line-clamp-3">{lesson.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
        <Button variant="outline" onClick={handlePlayVideo} className="w-full sm:w-auto">
          <PlayCircle className="mr-2 h-4 w-4" /> Watch Video
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => router.push(`/quiz?video=${lesson.id}`)} 
          className="w-full sm:w-auto"
        >
          <Puzzle className="mr-2 h-4 w-4" /> Take Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoLessonCard; 