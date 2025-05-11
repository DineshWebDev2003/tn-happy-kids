"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const patterns = [
  {
    sequence: ['🍎', '🍌', '🍎', '🍌', '❓'],
    answer: '🍎',
    options: ['🍎', '🍌', '🍉'],
  },
  {
    sequence: ['🔵', '🔴', '🔵', '🔴', '❓'],
    answer: '🔵',
    options: ['🔵', '🟢', '🟡'],
  },
  {
    sequence: ['🐶', '🐱', '🐶', '🐱', '❓'],
    answer: '🐶',
    options: ['🐶', '🐭', '🐰'],
  },
];

export default function PatternRecognitionGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const current = patterns[index];

  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => {
      if (option === current.answer) {
        if (index < patterns.length - 1) {
          setIndex(index + 1);
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
      <h1 className="text-4xl font-bold text-foreground mb-4">Pattern Recognition</h1>
      <p className="text-lg text-muted-foreground mb-6">What comes next in the pattern?</p>
      {!completed ? (
        <>
          <div className="flex flex-row gap-2 justify-center mb-8 text-4xl">
            {current.sequence.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {current.options.map(option => (
              <Button
                key={option}
                onClick={() => handleSelect(option)}
                className={
                  selected === option && option === current.answer
                    ? 'bg-green-400 text-white'
                    : selected === option && option !== current.answer
                    ? 'bg-red-400 text-white'
                    : ''
                }
                disabled={selected !== null}
              >
                <span className="text-2xl">{option}</span>
              </Button>
            ))}
          </div>
          {selected && selected === current.answer && <div className="text-green-500 font-bold mb-2 animate-bounce">Correct!</div>}
          {selected && selected !== current.answer && <div className="text-red-500 font-bold mb-2 animate-shake">Try again!</div>}
        </>
      ) : (
        <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">You did it! 🎉</div>
      )}
      <Button asChild className="mt-4">
        <Link href="/learn/games">Back to Games</Link>
      </Button>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 