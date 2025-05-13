"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const rules = [
  {
    title: 'Red Light Means Stop',
    image: '🚦',
    text: 'When the light is red, all vehicles must stop.'
  },
  {
    title: 'Green Light Means Go',
    image: '🚦',
    text: 'When the light is green, vehicles can go.'
  },
  {
    title: 'Cross at the Zebra Crossing',
    image: '🚸',
    text: 'Always cross the road at the zebra crossing.'
  },
  {
    title: 'Drive on the Left Side',
    image: '⬅️🚗',
    text: 'In some countries, cars drive on the left side of the road.'
  },
  {
    title: 'Look Both Ways',
    image: '👀',
    text: 'Always look left and right before crossing.'
  },
];

const questions = [
  {
    scenario: 'The light is red. What should the car do?',
    image: '🚦🚗',
    options: ['Go', 'Stop'],
    answer: 'Stop',
  },
  {
    scenario: 'Where should you cross the road?',
    image: '🚸',
    options: ['Anywhere', 'At the zebra crossing'],
    answer: 'At the zebra crossing',
  },
  {
    scenario: 'Which side should the car drive on (in India/UK)?',
    image: '⬅️🚗',
    options: ['Left', 'Right'],
    answer: 'Left',
  },
  {
    scenario: 'The light is green. What should the car do?',
    image: '🚦🚗',
    options: ['Go', 'Stop'],
    answer: 'Go',
  },
  {
    scenario: 'Before crossing, what should you do?',
    image: '👀',
    options: ['Look both ways', 'Just run'],
    answer: 'Look both ways',
  },
];

export default function TrafficRulesGame() {
  const [stage, setStage] = useState('welcome'); // 'welcome', 'learn', 'quiz'
  const [learnIndex, setLearnIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Stage 1: Learn rules
  const handleNextLearn = () => {
    if (learnIndex < rules.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage('quiz');
    }
  };

  // Stage 2: Quiz
  const currentQ = questions[quizIndex];
  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => {
      if (option === currentQ.answer) {
        if (quizIndex < questions.length - 1) {
          setQuizIndex(quizIndex + 1);
          setSelected(null);
        } else {
          setCompleted(true);
        }
      } else {
        setSelected(null);
      }
    }, 700);
  };

  const handleRestart = () => {
    setLearnIndex(0);
    setQuizIndex(0);
    setSelected(null);
    setCompleted(false);
    setStage('learn');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'tamil' : 'english');
  };

  // Tamil translations for rules
  const getTamilTitle = (index: number): string => {
    const tamilTitles = [
      'சிவப்பு விளக்கு நிற்கவும் என்று அர்த்தம்',
      'பச்சை விளக்கு செல்லலாம் என்று அர்த்தம்',
      'சீப்ரா கடவை வழியாக சாலையைக் கடக்கவும்',
      'இடது புறமாக வாகனம் ஓட்டுங்கள்',
      'இரு புறமும் பார்க்கவும்'
    ];
    return tamilTitles[index] || '';
  };

  const getTamilText = (index: number): string => {
    const tamilTexts = [
      'விளக்கு சிவப்பாக இருக்கும்போது, அனைத்து வாகனங்களும் நிற்க வேண்டும்.',
      'விளக்கு பச்சையாக இருக்கும் போது, வாகனங்கள் செல்லலாம்.',
      'எப்போதும் சீப்ரா கடவை வழியாக சாலையைக் கடக்கவும்.',
      'சில நாடுகளில், கார்கள் சாலையின் இடது பக்கத்தில் ஓட்டுகின்றன.',
      'கடப்பதற்கு முன் எப்போதும் இடது மற்றும் வலது புறம் பார்க்கவும்.'
    ];
    return tamilTexts[index] || '';
  };

  // Tamil translations for quiz questions
  const getTamilScenario = (index: number): string => {
    const tamilScenarios = [
      'விளக்கு சிவப்பாக உள்ளது. கார் என்ன செய்ய வேண்டும்?',
      'எங்கே சாலையைக் கடக்க வேண்டும்?',
      'கார் எந்தப் பக்கம் ஓட்ட வேண்டும் (இந்தியா/UK இல்)?',
      'விளக்கு பச்சையாக உள்ளது. கார் என்ன செய்ய வேண்டும்?',
      'கடப்பதற்கு முன், நீங்கள் என்ன செய்ய வேண்டும்?'
    ];
    return tamilScenarios[index] || '';
  };

  const getTamilOption = (option: string): string => {
    const optionMap: Record<string, string> = {
      'Go': 'செல்லுங்கள்',
      'Stop': 'நிறுத்துங்கள்',
      'Anywhere': 'எங்கும்',
      'At the zebra crossing': 'சீப்ரா கடவையில்',
      'Left': 'இடது',
      'Right': 'வலது',
      'Look both ways': 'இரு புறமும் பார்க்கவும்',
      'Just run': 'வெறுமனே ஓடுங்கள்'
    };
    return optionMap[option] || option;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {stage === 'welcome' && (
        <div className="bg-gradient-to-b from-indigo-100 to-purple-100 p-8 rounded-xl shadow-xl max-w-md w-full border-4 border-indigo-200">
          {/* Game banner/thumbnail */}
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src="/game-thumbnails/6.jpg" 
                alt="Traffic Rules - Road Safety Game" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {language === 'english' ? 'Traffic Rules' : 'போக்குவரத்து விதிகள்'}
          </h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-indigo-700">
              {language === 'english' ? 'Select Language:' : 'மொழியைத் தேர்ந்தெடுக்கவும்:'}
            </h2>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-lg ${language === 'english' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-indigo-200'}`}
              >
                English
              </Button>
              <Button
                onClick={() => setLanguage('tamil')}
                className={`px-4 py-2 rounded-lg ${language === 'tamil' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-600 border border-indigo-200'}`}
              >
                தமிழ் (Tamil)
              </Button>
            </div>
          </div>
          
          <p className="text-lg text-center mb-6">
            {language === 'english' 
              ? 'Learn important traffic rules and road safety guidelines. Practice your knowledge with fun quizzes!'
              : 'முக்கியமான போக்குவரத்து விதிகளையும் சாலை பாதுகாப்பு வழிகாட்டுதல்களையும் கற்றுக்கொள்ளுங்கள். வேடிக்கையான வினாடி வினாக்களுடன் உங்கள் அறிவைப் பயிற்சி செய்யுங்கள்!'}
          </p>
          
          <Button
            onClick={() => setStage('learn')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transform transition hover:scale-105"
          >
            {language === 'english' ? 'Start Learning' : 'கற்க தொடங்கு'}
          </Button>
          
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setAnimationsEnabled(prev => !prev)}
              variant="outline"
              className="text-sm border border-indigo-200"
            >
              {language === 'english' 
                ? `Animations: ${animationsEnabled ? 'ON' : 'OFF'}`
                : `அசைவூட்டங்கள்: ${animationsEnabled ? 'ON' : 'OFF'}`}
            </Button>
          </div>
        </div>
      )}
      
      {stage === 'learn' && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Traffic Rules Game' : 'போக்குவரத்து விதிகள் விளையாட்டு'}
          </h1>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl 
              shadow-lg border-4 border-purple-300 p-8 flex items-center justify-center 
              h-72 w-full max-w-md mb-8 relative">
            <div className="flex flex-col items-center">
              <div className={`text-6xl mb-2 ${animationsEnabled ? 'animate-bounce' : ''}`}>
                {rules[learnIndex].image}
              </div>
              <div className="text-2xl font-bold mt-2">
                {language === 'english' ? rules[learnIndex].title : getTamilTitle(learnIndex)}
              </div>
              <div className="text-lg mt-2 text-muted-foreground">
                {language === 'english' ? rules[learnIndex].text : getTamilText(learnIndex)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button 
              onClick={handleNextLearn} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {learnIndex < rules.length - 1 
                ? (language === 'english' ? 'Next' : 'அடுத்து') 
                : (language === 'english' ? 'Start Quiz' : 'வினாடி வினா தொடங்கு')}
            </Button>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
            
            <Button 
              onClick={() => setStage('welcome')} 
              variant="outline" 
              className="border-2 border-red-300 hover:bg-red-50"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
          </div>
        </>
      )}
      
      {stage === 'quiz' && !completed && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Traffic Rules Quiz' : 'போக்குவரத்து விதிகள் வினாடி வினா'}
          </h1>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl 
              shadow-lg border-4 border-amber-300 p-6 min-h-[300px] w-full max-w-md mb-8
              relative flex flex-col items-center justify-center">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-green-300/20"></div>
            <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full bg-blue-300/20"></div>
            
            <div className="flex flex-col items-center mb-6">
              <div className={`text-5xl mb-2 ${animationsEnabled ? 'animate-pulse' : ''}`}>
                {currentQ.image}
              </div>
              <div className="text-xl font-bold mt-2 mb-4">
                {language === 'english' ? currentQ.scenario : getTamilScenario(quizIndex)}
              </div>
            </div>
            
            <div className="flex flex-row gap-4 justify-center mb-4">
              {currentQ.options.map(option => (
                <Button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`
                    ${selected === option && option === currentQ.answer
                      ? 'bg-green-500 hover:bg-green-600' 
                      : selected === option && option !== currentQ.answer
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600'
                    }
                    text-white px-4 py-2 rounded-lg transform transition-all
                    ${animationsEnabled ? 'hover:scale-105' : ''}
                  `}
                  disabled={selected !== null}
                >
                  {language === 'english' ? option : getTamilOption(option)}
                </Button>
              ))}
            </div>
            
            {selected && selected === currentQ.answer && 
              <div className="text-green-500 font-bold mb-2 animate-bounce">
                {language === 'english' ? 'Correct!' : 'சரியான பதில்!'}
              </div>
            }
            {selected && selected !== currentQ.answer && 
              <div className="text-red-500 font-bold mb-2 animate-shake">
                {language === 'english' ? 'Try again!' : 'மீண்டும் முயற்சிக்கவும்!'}
              </div>
            }
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
            
            <Button 
              onClick={() => setStage('welcome')} 
              variant="outline" 
              className="border-2 border-red-300 hover:bg-red-50"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
          </div>
        </>
      )}
      
      {stage === 'quiz' && completed && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            {language === 'english' ? 'Traffic Rules Quiz' : 'போக்குவரத்து விதிகள் வினாடி வினா'}
          </h1>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl 
              shadow-lg border-4 border-green-300 p-6 min-h-[200px] w-full max-w-md mb-8
              relative flex flex-col items-center justify-center">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            
            <div className={`text-2xl font-bold text-green-500 mb-4 ${animationsEnabled ? 'animate-bounce' : ''}`}>
              {language === 'english' ? 'You did it! 🚦🎉' : 'நீங்கள் செய்து முடித்தீர்கள்! 🚦🎉'}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={handleRestart} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Play Again' : 'மீண்டும் விளையாடு'}
            </Button>
            
            <Button 
              onClick={() => setStage('welcome')} 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {language === 'english' ? 'Main Menu' : 'முதன்மை பட்டி'}
            </Button>
            
            <Button 
              onClick={toggleLanguage} 
              variant="outline" 
              className="border-2 border-purple-300 hover:bg-purple-50"
            >
              {language === 'english' ? 'Switch to Tamil' : 'Switch to English'}
            </Button>
          </div>
        </>
      )}
      
      {stage !== 'welcome' && (
        <Button asChild className="mt-4">
          <Link href="/learn/games">
            {language === 'english' ? 'Exit Game' : 'விளையாட்டை வெளியேறு'}
          </Link>
        </Button>
      )}
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 