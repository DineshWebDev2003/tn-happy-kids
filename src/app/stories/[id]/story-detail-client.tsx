'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, Globe, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Story } from '@/data/mock-data';

// Define the scene structure for stories with custom scenes
interface StoryScene {
  content: string;
  contentTamil?: string;
  imageUrl?: string;
  caption?: string;
  captionTamil?: string;
}

interface StoryDetailClientProps {
  story: Story | undefined;
}

export default function StoryDetailClient({ story }: StoryDetailClientProps) {
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [currentPage, setCurrentPage] = useState(0);
  const [storyPages, setStoryPages] = useState<StoryScene[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!story) {
      toast({
        title: "Story Not Found",
        description: "The story you're looking for couldn't be found.",
        variant: "destructive",
      });
      router.push('/stories');
      return;
    }
    
    // Special handling for "The Boy Who Cried Wolf" - ID 1
    if (story.id === '1') {
      const wolfStoryScenes: StoryScene[] = [
        {
          content: "Once upon a time, there was a shepherd boy who watched his flock of sheep near a village. He would often get bored while watching the sheep.",
          contentTamil: "ஒரு காலத்தில், ஒரு கிராமத்திற்கு அருகில் தனது ஆடுகளை மேய்த்துக் கொண்டிருந்த ஒரு இடையன் சிறுவன் இருந்தான். ஆடுகளைப் பார்த்துக்கொண்டிருக்கும்போது அவனுக்கு அடிக்கடி சலிப்பு ஏற்படும்.",
          imageUrl: "/stories/wolf_scene1.jpg",
          caption: "A cheerful young shepherd boy watching his flock of sheep on a hillside.",
          captionTamil: "மலைச்சரிவில் ஆடு மந்தையை கவனித்துக் கொண்டிருக்கும் மகிழ்ச்சியான இளம் இடையன் சிறுவன்."
        },
        {
          content: "One day, he thought of a plan to get some excitement. He cried out loudly, 'Wolf! Wolf! A wolf is chasing the sheep!' The villagers heard his cries and rushed to help him. But when they arrived, they found no wolf, only the boy laughing at them. The boy played this trick several times, and each time the villagers came running to help him.",
          contentTamil: "ஒரு நாள், சற்று உற்சாகம் பெற ஒரு திட்டம் நினைத்தான். அவன் உரக்க கத்தினான், 'ஓநாய்! ஓநாய்! ஓநாய் ஆடுகளைத் துரத்துகிறது!' கிராமத்தினர் அவனது அலறலைக் கேட்டு அவனுக்கு உதவ ஓடி வந்தனர். ஆனால் அவர்கள் வந்தபோது, ஓநாய் எதுவும் இல்லை, அவர்களைப் பார்த்து சிரித்துக்கொண்டிருந்த சிறுவனை மட்டுமே கண்டனர். சிறுவன் இந்த விளையாட்டை பல முறை விளையாடினான், ஒவ்வொரு முறையும் கிராமத்தினர் அவனுக்கு உதவ ஓடி வந்தனர்.",
          imageUrl: "/stories/wolf_scene2.jpg",
          caption: "The shepherd boy yelling 'Wolf!' as the villagers run up the hill, while the sheep graze calmly.",
          captionTamil: "கிராமத்தவர்கள் மலைமேல் ஓடிவரும்போது, ஆடுகள் அமைதியாக மேய்ந்துகொண்டிருக்க, இடையன் சிறுவன் 'ஓநாய்!' என்று கத்துகிறான்."
        },
        {
          content: "One day, a real wolf actually came. The boy cried out, 'Wolf! Wolf!' But the villagers thought he was playing the same trick again and didn't come to help. The wolf attacked the flock and ate many sheep.",
          contentTamil: "ஒரு நாள், உண்மையிலேயே ஒரு ஓநாய் வந்தது. சிறுவன், 'ஓநாய்! ஓநாய்!' என்று கத்தினான். ஆனால் கிராமத்தினர் அவன் மீண்டும் அதே விளையாட்டை விளையாடுகிறான் என்று நினைத்து உதவ வரவில்லை. ஓநாய் மந்தையைத் தாக்கி பல ஆடுகளை தின்றது.",
          imageUrl: "/stories/wolf_scene3.jpg",
          caption: "A real wolf appears while the shepherd boy cries for help, but no one comes.",
          captionTamil: "இடையன் சிறுவன் உதவிக்காக கதறுகையில் உண்மையான ஓநாய் தோன்றுகிறது, ஆனால் யாரும் வரவில்லை."
        },
        {
          content: "The boy learned a valuable lesson that day about the importance of telling the truth. Nobody believes a liar, even when they tell the truth.",
          contentTamil: "உண்மையைச் சொல்வதன் முக்கியத்துவத்தைப் பற்றி அன்று சிறுவன் ஒரு மதிப்புமிக்க பாடத்தைக் கற்றுக்கொண்டான். பொய்யர் உண்மையைச் சொன்னாலும் யாரும் நம்ப மாட்டார்கள்.",
          imageUrl: "/stories/wolf_scene4.jpg",
          caption: "The sad shepherd boy sits alone, having learned his lesson about honesty.",
          captionTamil: "நேர்மையைப் பற்றிய பாடத்தைக் கற்றுக்கொண்ட, சோகமான இடையன் சிறுவன் தனியாக அமர்ந்திருக்கிறான்."
        }
      ];
      
      // Add moral as the last page
      const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
      if (moral) {
        wolfStoryScenes.push({
          content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
          imageUrl: story.imageUrl
        });
      }
      
      setStoryPages(wolfStoryScenes);
    } else {
      // Default handling for other stories
      const content = language === 'english' ? story.content : (story.contentTamil || story.content);
      const paragraphs = content.split('\n').filter(p => p.trim() !== '');
      
      // Group paragraphs into pages (2-3 paragraphs per page)
      const paragraphsPerPage = 2;
      const pages: StoryScene[] = [];
      
      for (let i = 0; i < paragraphs.length; i += paragraphsPerPage) {
        pages.push({
          content: paragraphs.slice(i, i + paragraphsPerPage).join('\n\n'),
          imageUrl: story.imageUrl
        });
      }
      
      // Add moral as the last page if it exists
      const moral = language === 'english' ? story.moral : (story.moralTamil || story.moral);
      if (moral) {
        pages.push({
          content: `${language === 'english' ? 'Moral:' : 'நீதி:'}\n\n${moral}`,
          imageUrl: story.imageUrl
        });
      }
      
      setStoryPages(pages);
    }
    
    setCurrentPage(0);
  }, [story, language, router, toast]);

  const handleGenerateQuiz = () => {
    if (story) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('quizStoryContent', story.content);
          localStorage.setItem('quizStoryTitle', story.title);
          router.push('/quiz?source=story');
        } else {
          throw new Error("localStorage is not available.");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not prepare story for quiz. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  const nextPage = () => {
    if (currentPage < storyPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      if (bookRef.current) {
        bookRef.current.classList.add('flipping-right');
      }
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        if (bookRef.current) {
          bookRef.current.classList.remove('flipping-right');
        }
        setIsFlipping(false);
      }, 500);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      if (bookRef.current) {
        bookRef.current.classList.add('flipping-left');
      }
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        if (bookRef.current) {
          bookRef.current.classList.remove('flipping-left');
        }
        setIsFlipping(false);
      }, 500);
    }
  };

  const goToPage = (index: number) => {
    if (index !== currentPage && !isFlipping) {
      setIsFlipping(true);
      if (bookRef.current) {
        bookRef.current.classList.add(index > currentPage ? 'flipping-right' : 'flipping-left');
      }
      setTimeout(() => {
        setCurrentPage(index);
        if (bookRef.current) {
          bookRef.current.classList.remove('flipping-right', 'flipping-left');
        }
        setIsFlipping(false);
      }, 500);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isFlipping) {
      nextPage();
    }
    
    if (isRightSwipe && !isFlipping) {
      prevPage();
    }
  };

  if (!story) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const displayTitle = language === 'english' ? story.title : (story.titleTamil || story.title);
  const currentScene = storyPages[currentPage];
  
  // Determine content based on language
  const getSceneContent = (scene: StoryScene) => {
    if (language === 'tamil' && scene.contentTamil) {
      return scene.contentTamil;
    }
    return scene.content;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/stories')}
          className="w-full sm:w-auto justify-start"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {language === 'english' ? 'Back to Stories' : 'கதைகளுக்குத் திரும்பு'}
        </Button>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button 
            variant="outline" 
            onClick={toggleLanguage}
            className="flex-1 sm:flex-auto items-center"
          >
            <Globe className="mr-2 h-4 w-4" /> 
            {language === 'english' ? 'தமிழ்' : 'English'}
          </Button>
        </div>
      </div>

      {/* Book with Page Turning Animation */}
      <div className="book-container">
        <div 
          ref={bookRef}
          className="book"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-card rounded-lg shadow-lg overflow-hidden mb-6">
            {/* Header section */}
            <div className="bg-primary/10 p-4 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-primary">{displayTitle}</h1>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/90" variant="secondary">
                    {story.category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Page content with text overlay on image */}
            {currentScene && currentScene.imageUrl && (
              <div className="relative w-full h-[500px]">
                <Image
                  src={currentScene.imageUrl}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  style={{objectFit: "cover"}}
                  priority
                />
                
                {/* Text overlay */}
                <div className="absolute inset-0 bg-black/50 p-6 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    {getSceneContent(currentScene).split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-base sm:text-lg text-white">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Page navigation controls */}
            <div className="flex justify-between items-center p-4 bg-muted/20 border-t">
              <Button 
                variant="ghost" 
                onClick={prevPage}
                disabled={currentPage === 0 || isFlipping}
                className="w-12 h-12 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {language === 'english' ? 'Page' : 'பக்கம்'} {currentPage + 1}/{storyPages.length}
              </div>
              
              <Button 
                variant="ghost" 
                onClick={nextPage}
                disabled={currentPage === storyPages.length - 1 || isFlipping}
                className="w-12 h-12 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnails for navigation */}
        <div className="mt-4 mb-6">
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {storyPages.map((scene, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer transition-all ${
                    currentPage === index 
                      ? 'ring-4 ring-primary scale-105' 
                      : 'ring-2 ring-muted hover:ring-primary/50'
                  }`}
                  onClick={() => goToPage(index)}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden rounded-md">
                    {scene.imageUrl ? (
                      <Image
                        src={scene.imageUrl}
                        alt={`Page ${index + 1}`}
                        fill
                        sizes="80px"
                        style={{objectFit: "cover"}}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz button */}
        {currentPage === storyPages.length - 1 && (
          <div className="flex justify-center mt-6">
            <Button 
              size="lg"
              onClick={handleGenerateQuiz}
              className="bg-accent hover:bg-accent/90"
            >
              <BookOpen className="mr-2 h-5 w-5" /> {language === 'english' ? 'Generate Quiz' : 'வினாடி வினா உருவாக்கு'}
            </Button>
          </div>
        )}
      </div>

      {/* CSS for book flipping animation */}
      <style jsx global>{`
        .book-container {
          perspective: 1200px;
        }
        
        .book {
          transform-style: preserve-3d;
          transition: transform 0.5s ease-in-out;
        }
        
        .book.flipping-right {
          transform: rotateY(-15deg);
          animation: flipPageRight 0.5s ease-in-out;
        }
        
        .book.flipping-left {
          transform: rotateY(15deg);
          animation: flipPageLeft 0.5s ease-in-out;
        }
        
        @keyframes flipPageRight {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-15deg); }
          100% { transform: rotateY(0deg); }
        }
        
        @keyframes flipPageLeft {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(15deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
} 