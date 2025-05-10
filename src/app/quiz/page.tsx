import QuizGeneratorClient from './quiz-generator-client';
import { Puzzle } from 'lucide-react';
import { Suspense } from 'react';

// Helper component for Suspense fallback
function QuizPageLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Puzzle className="w-16 h-16 text-primary animate-spin mb-4" />
      <p className="text-xl text-muted-foreground">Loading Quiz Generator...</p>
    </div>
  );
}


export default function QuizPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <Puzzle className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Time!</h1>
        <p className="text-lg text-muted-foreground">
          Generate fun quizzes from any text using AI.
        </p>
      </section>
      
      <Suspense fallback={<QuizPageLoading/>}>
        <QuizGeneratorClient />
      </Suspense>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
