"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const numbers = [
  { value: 1, name: 'One', emoji: '🐶' },
  { value: 2, name: 'Two', emoji: '🐱' },
  { value: 3, name: 'Three', emoji: '🐭' },
  { value: 4, name: 'Four', emoji: '🐰' },
];

export default function NumberGameStages() {
  const [stage, setStage] = useState(1); // 1: Learn, 2: Identify, 3: Count
  const [learnIndex, setLearnIndex] = useState(0);
  const [identifyIndex, setIdentifyIndex] = useState(0);
  const [identifyResult, setIdentifyResult] = useState<null | boolean>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  // Stage 1: Learn numbers
  const handleNextLearn = () => {
    if (learnIndex < numbers.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage(2);
    }
  };

  // Stage 2: Identify number (multiple choice)
  const currentNumber = numbers[identifyIndex];
  const options = [
    currentNumber.value,
    ...numbers.filter(n => n.value !== currentNumber.value).map(n => n.value)
  ].sort(() => Math.random() - 0.5);

  const handleIdentify = (value: number) => {
    const correct = value === currentNumber.value;
    setIdentifyResult(correct);
    setTimeout(() => {
      setIdentifyResult(null);
      if (identifyIndex < numbers.length - 1) {
        setIdentifyIndex(identifyIndex + 1);
      } else {
        setStage(3);
      }
    }, 900);
  };

  // Stage 3: Count objects and match to the correct number
  const countQuestions = [
    { count: 2, emoji: '🍎' },
    { count: 3, emoji: '🌟' },
    { count: 1, emoji: '🚗' },
    { count: 4, emoji: '🐠' },
  ];
  const [countIndex, setCountIndex] = useState(0);
  const handleCountSelect = (value: number) => {
    if (value === countQuestions[countIndex].count) {
      if (countIndex < countQuestions.length - 1) {
        setCountIndex(countIndex + 1);
      } else {
        setCompleted(true);
      }
    }
    setSelected(value);
    setTimeout(() => setSelected(null), 700);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {stage === 1 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn Numbers</h1>
          <div className="flex flex-col items-center mb-6 animate-bounce">
            <div className="text-6xl mb-2">{numbers[learnIndex].value}</div>
            <div className="text-2xl font-bold mt-2">{numbers[learnIndex].name}</div>
            <div className="text-4xl mt-2">{numbers[learnIndex].emoji.repeat(numbers[learnIndex].value)}</div>
          </div>
          <Button onClick={handleNextLearn} className="mt-4">{learnIndex < numbers.length - 1 ? 'Next' : 'Start Quiz'}</Button>
        </>
      )}
      {stage === 2 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Which Number Is This?</h1>
          <div className="flex flex-col items-center mb-6 animate-pulse">
            <div className="text-6xl mb-2">{currentNumber.value}</div>
            <div className="text-4xl mt-2">{currentNumber.emoji.repeat(currentNumber.value)}</div>
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {options.map(option => (
              <Button
                key={option}
                onClick={() => handleIdentify(option)}
                className={
                  identifyResult !== null && option === currentNumber.value
                    ? 'bg-green-400 text-white'
                    : identifyResult === false && option !== currentNumber.value
                    ? 'opacity-50'
                    : ''
                }
                disabled={identifyResult !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {identifyResult === true && <div className="text-green-500 font-bold mb-2 animate-bounce">Correct!</div>}
          {identifyResult === false && <div className="text-red-500 font-bold mb-2 animate-shake">Try again!</div>}
        </>
      )}
      {stage === 3 && !completed && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Count and Match</h1>
          <p className="text-lg text-muted-foreground mb-6">How many objects do you see?</p>
          <div className="flex flex-row gap-2 justify-center mb-4 text-4xl">
            {Array(countQuestions[countIndex].count).fill(0).map((_, i) => (
              <span key={i}>{countQuestions[countIndex].emoji}</span>
            ))}
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {numbers.map(num => (
              <Button
                key={num.value}
                onClick={() => handleCountSelect(num.value)}
                className={
                  selected === num.value && num.value === countQuestions[countIndex].count
                    ? 'bg-green-400 text-white'
                    : selected === num.value && num.value !== countQuestions[countIndex].count
                    ? 'bg-red-400 text-white'
                    : ''
                }
                disabled={selected !== null}
              >
                {num.value}
              </Button>
            ))}
          </div>
        </>
      )}
      {stage === 3 && completed && (
        <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">You did it! 🎉</div>
      )}
      <Button asChild className="mt-4">
        <Link href="/learn/games">Back to Games</Link>
      </Button>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
