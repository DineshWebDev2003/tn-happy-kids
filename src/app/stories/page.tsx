'use client'; // Needed if StoryCard has client-side interactions like onReadMore prop passed to quiz page

import StoryCard from '@/components/story-card';
import { stories } from '@/data/mock-data';
import { LibraryBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function StoriesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleReadAndQuiz = (storyContent: string, storyTitle: string) => {
    // Option 1: Store in localStorage/sessionStorage and redirect (simple)
    // Option 2: Use query params (can be messy for long content)
    // Option 3: Use a state management solution (overkill for this)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('quizStoryContent', storyContent);
        localStorage.setItem('quizStoryTitle', storyTitle);
        router.push('/quiz?source=story');
      } else {
        throw new Error("localStorage is not available.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not prepare story for quiz. Please try copying the text manually.",
        variant: "destructive",
      });
       console.error("Error in handleReadAndQuiz:", error);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <LibraryBig className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Story Time Adventures</h1>
        <p className="text-lg text-muted-foreground">
          Listen to wonderful stories and let your imagination soar!
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} onReadMore={handleReadAndQuiz} />
        ))}
      </div>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
