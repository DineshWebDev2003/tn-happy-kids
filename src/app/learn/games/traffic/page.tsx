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
  const [stage, setStage] = useState(1); // 1: Learn, 2: Quiz
  const [learnIndex, setLearnIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // Stage 1: Learn rules
  const handleNextLearn = () => {
    if (learnIndex < rules.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage(2);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">Traffic Rules Game</h1>
      {stage === 1 && (
        <>
          <div className="flex flex-col items-center mb-6 animate-bounce">
            <div className="text-6xl mb-2">{rules[learnIndex].image}</div>
            <div className="text-2xl font-bold mt-2">{rules[learnIndex].title}</div>
            <div className="text-lg mt-2 text-muted-foreground">{rules[learnIndex].text}</div>
          </div>
          <Button onClick={handleNextLearn} className="mt-4">{learnIndex < rules.length - 1 ? 'Next' : 'Start Quiz'}</Button>
        </>
      )}
      {stage === 2 && !completed && (
        <>
          <div className="flex flex-col items-center mb-6 animate-pulse">
            <div className="text-5xl mb-2">{currentQ.image}</div>
            <div className="text-xl font-bold mt-2 mb-4">{currentQ.scenario}</div>
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {currentQ.options.map(option => (
              <Button
                key={option}
                onClick={() => handleSelect(option)}
                className={
                  selected === option && option === currentQ.answer
                    ? 'bg-green-400 text-white'
                    : selected === option && option !== currentQ.answer
                    ? 'bg-red-400 text-white'
                    : ''
                }
                disabled={selected !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selected && selected === currentQ.answer && <div className="text-green-500 font-bold mb-2 animate-bounce">Correct!</div>}
          {selected && selected !== currentQ.answer && <div className="text-red-500 font-bold mb-2 animate-shake">Try again!</div>}
        </>
      )}
      {stage === 2 && completed && (
        <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">You did it! 🚦🎉</div>
      )}
      <Button asChild className="mt-4">
        <Link href="/learn/games">Back to Games</Link>
      </Button>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 