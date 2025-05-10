import VideoLessonCard from '@/components/video-lesson-card';
import { videoLessons } from '@/data/mock-data';
import { Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function VideosPage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32 pr-8">
        <Video className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Sign in to continue</h1>
        <p className="text-lg text-muted-foreground mb-4">You must be signed in to watch video lessons.</p>
        <Link href="/auth" className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-bold shadow hover:bg-accent/80 transition-colors">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32 pr-8">
      <section className="text-center">
        <Video className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Video Lessons</h1>
        <p className="text-lg text-muted-foreground">
          Watch fun educational videos and test your knowledge with quizzes!
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoLessons.map((lesson) => (
          <VideoLessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 