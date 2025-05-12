"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Trophy, Settings, LanguagesIcon } from 'lucide-react';
import EndlessRunner from './EndlessRunner';

export default function SchoolRunnerGame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState<'english' | 'tamil'>('english');

  // Game messages based on language
  const messages = {
    english: {
      title: "Run to School!",
      description: "Help the girl reach school while avoiding obstacles and collecting school supplies!",
      controls: "Controls",
      settings: "Settings",
      restart: "Play Again",
      quit: "Back to Games",
      gameOver: "Game Over!",
      finalScore: "Your final score:",
      tryAgain: "Try again to beat your high score!",
      difficultyLabel: "Difficulty",
      soundLabel: "Sound",
      languageLabel: "Language"
    },
    tamil: {
      title: "பள்ளிக்கு ஓடு!",
      description: "பெண் பள்ளிக்கு செல்லும்போது தடைகளைத் தவிர்த்து, பள்ளி பொருட்களைச் சேகரிக்க உதவுங்கள்!",
      controls: "கட்டுப்பாடுகள்",
      settings: "அமைப்புகள்",
      restart: "மீண்டும் விளையாடு",
      quit: "விளையாட்டுகளுக்குத் திரும்பு",
      gameOver: "விளையாட்டு முடிந்தது!",
      finalScore: "உங்கள் இறுதி மதிப்பெண்:",
      tryAgain: "உங்கள் உயர் மதிப்பெண்ணை வெல்ல மீண்டும் முயற்சிக்கவும்!",
      difficultyLabel: "கடினம்",
      soundLabel: "ஒலி",
      languageLabel: "மொழி"
    }
  };
  
  // Difficulty settings
  const difficultyOptions = {
    english: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard"
    },
    tamil: {
      easy: "எளிது",
      medium: "நடுத்தரம்",
      hard: "கடினம்"
    }
  };

  // Handle game over
  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
  };

  // Handle score updates during gameplay
  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  // Reset game state
  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-9rem)] pb-16 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {messages[language].title}
        </motion.h1>
        
        <motion.p 
          className="text-lg text-center text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {messages[language].description}
        </motion.p>
        
        {/* Game area */}
        <div className="relative bg-white rounded-xl shadow-lg p-4 overflow-hidden">
          <div className="flex justify-end space-x-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  {messages[language].soundLabel}
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 mr-2" />
                  {messages[language].soundLabel}
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              {messages[language].settings}
            </Button>
          </div>
          
          {/* Settings panel */}
          {showSettings && (
            <motion.div 
              className="mb-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold mb-3">{messages[language].settings}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">{messages[language].difficultyLabel}</h4>
                  <div className="flex space-x-2">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <Button
                        key={level}
                        variant={difficulty === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty(level)}
                      >
                        {difficultyOptions[language][level]}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">{messages[language].languageLabel}</h4>
                  <div className="flex space-x-2">
                    <Button
                      variant={language === 'english' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage('english')}
                      className="flex items-center"
                    >
                      <LanguagesIcon className="h-4 w-4 mr-1" />
                      English
                    </Button>
                    <Button
                      variant={language === 'tamil' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage('tamil')}
                      className="flex items-center"
                    >
                      <LanguagesIcon className="h-4 w-4 mr-1" />
                      தமிழ்
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Game component */}
          <div className="relative rounded-lg overflow-hidden">
            <EndlessRunner
              difficulty={difficulty}
              soundEnabled={soundEnabled}
              language={language}
              onGameOver={handleGameOver}
              onUpdateScore={handleScoreUpdate}
            />
          </div>
          
          {/* Score display */}
          {gameStarted && !gameOver && (
            <div className="mt-4 text-center">
              <span className="text-xl font-bold">Score: {score}</span>
            </div>
          )}
          
          {/* Game over screen */}
          {gameOver && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-pink-50"
            >
              <div className="flex justify-center mb-4">
                <Trophy className="text-yellow-500 w-12 h-12" />
                <h2 className="text-3xl font-bold text-purple-800 ml-2">
                  {messages[language].gameOver}
                </h2>
              </div>
              
              <p className="mb-4 text-lg text-center">
                {messages[language].finalScore} <span className="font-bold text-xl">{score}</span>
              </p>
              
              <p className="mb-6 text-center text-gray-600">
                {messages[language].tryAgain}
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={resetGame} className="bg-indigo-600 hover:bg-indigo-700">
                  {messages[language].restart}
                </Button>
                
                <Button asChild variant="outline">
                  <Link href="/learn/games">{messages[language].quit}</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-3 text-indigo-700">{messages[language].controls}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <h3 className="font-bold mb-2">Keyboard:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>UP ARROW or SPACE = Jump</li>
                <li>DOWN ARROW = Slide</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h3 className="font-bold mb-2">Touch:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tap top half of screen = Jump</li>
                <li>Tap bottom half of screen = Slide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 