'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, Globe, ChevronRight, Tag } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
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
        title: language === 'english' ? "Story Not Found" : "கதை கிடைக்கவில்லை",
        description: language === 'english' 
          ? "The story you're looking for couldn't be found." 
          : "நீங்கள் தேடும் கதையைக் கண்டுபிடிக்க முடியவில்லை.",
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
      
      // Ensure we have at least one page to prevent undefined scene
      if (pages.length === 0) {
        pages.push({
          content: language === 'english' ? "Story content not available." : "கதை உள்ளடக்கம் கிடைக்கவில்லை.",
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
          title: language === 'english' ? "Error" : "பிழை",
          description: language === 'english'
            ? "Could not prepare story for quiz. Please try again."
            : "விளக்கக்காட்சிக்காக கதையைத் தயாரிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
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
    return <div className="text-center py-12">{language === 'english' ? 'Loading...' : 'ஏற்றுகிறது...'}</div>;
  }

  const displayTitle = language === 'english' ? story.title : (story.titleTamil || story.title);
  const displayExcerpt = language === 'english' ? story.excerpt : (story.excerptTamil || story.excerpt);
  const currentScene = storyPages[currentPage];
  
  // Determine content based on language
  const getSceneContent = (scene: StoryScene | undefined) => {
    if (!scene) return '';
    if (language === 'tamil' && scene.contentTamil) {
      return scene.contentTamil;
    }
    return scene.content;
  };

  // Get scene caption based on language
  const getSceneCaption = (scene: StoryScene | undefined) => {
    if (!scene) return '';
    if (language === 'tamil' && scene.captionTamil) {
      return scene.captionTamil;
    }
    return scene.caption;
  };

  // Categories translation for Tamil
  const getCategoryTranslation = (category: string): string => {
    const translations: Record<string, string> = {
      'Honesty': 'நேர்மை',
      'Kindness': 'கருணை',
      'Wisdom': 'ஞானம்',
      'Friendship': 'நட்பு',
      'Perseverance': 'விடாமுயற்சி',
      'Sharing': 'பகிர்தல்',
      'Gratitude': 'நன்றி',
      'Respect': 'மரியாதை',
      'Humility': 'பணிவு',
      'Courage': 'தைரியம்',
      'Responsibility': 'பொறுப்புணர்வு'
    };
    
    return translations[category] || category;
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
            {language === 'english' ? 'தமிழில் படிக்க' : 'Read in English'}
          </Button>
          <Button 
            variant="default" 
            onClick={handleGenerateQuiz}
            className="flex-1 sm:flex-auto"
          >
            <BookOpen className="mr-2 h-4 w-4" /> {language === 'english' ? 'Take Quiz' : 'வினாடி வினா'}
          </Button>
        </div>
      </div>
      
      {/* Story Header */}
      <div className="mb-6 text-center">
        <Link 
          href={`/stories/categories/${story.category.toLowerCase()}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-2"
        >
          <Tag size={14} />
          {language === 'english' ? story.category : getCategoryTranslation(story.category)}
        </Link>
        <h1 className="text-3xl font-bold mb-2">{displayTitle}</h1>
        <p className="text-muted-foreground">{displayExcerpt}</p>
      </div>

      {/* Story Book */}
      <div 
        ref={bookRef}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden storybook my-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-2 right-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {currentPage + 1} / {storyPages.length}
        </div>
        
        {currentScene?.imageUrl && (
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
            <Image
              src={currentScene.imageUrl}
              alt={getSceneCaption(currentScene) || displayTitle}
              fill
              className="object-cover"
            />
            {/* Image Caption */}
            {getSceneCaption(currentScene) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs text-center">
                {getSceneCaption(currentScene)}
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="prose prose-sm sm:prose max-w-none">
            {currentScene && getSceneContent(currentScene)?.split('\n\n').map((paragraph, i) => (
              <p key={i} className={language === 'tamil' ? 'text-base font-normal leading-7' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="outline" 
          onClick={prevPage} 
          disabled={currentPage === 0 || isFlipping}
          className="w-[100px]"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {language === 'english' ? 'Previous' : 'முந்தைய'}
        </Button>
        
        <div className="flex-1 flex justify-center">
          {storyPages.length > 0 && (
            <div className="flex gap-1">
              {storyPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-primary' : 'bg-gray-300'}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={nextPage} 
          disabled={currentPage === storyPages.length - 1 || isFlipping}
          className="w-[100px]"
        >
          {language === 'english' ? 'Next' : 'அடுத்து'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Mobile Swipe Hint */}
      <div className="text-center text-xs text-muted-foreground mt-4 md:hidden">
        {language === 'english' ? 'Swipe left or right to navigate' : 'செல்ல இடது அல்லது வலது புறமாக ஸ்வைப் செய்யவும்'}
      </div>
      
      {/* Add some custom styles for the storybook */}
      <style jsx global>{`
        .storybook {
          transition: transform 0.5s ease;
        }
        
        .flipping-right {
          transform: translateX(-100px);
          opacity: 0;
          transition: all 0.5s ease;
        }
        
        .flipping-left {
          transform: translateX(100px);
          opacity: 0;
          transition: all 0.5s ease;
        }
        
        /* Tamil font optimizations */
        .text-tamil {
          font-family: 'Arial', 'Noto Sans Tamil', sans-serif;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
} 