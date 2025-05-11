"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const colors = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Green', hex: '#22c55e' },
];

const objects = [
  { name: 'Apple', color: 'Red', emoji: '🍎' },
  { name: 'Banana', color: 'Yellow', emoji: '🍌' },
  { name: 'Leaf', color: 'Green', emoji: '🍃' },
  { name: 'Ball', color: 'Blue', emoji: '🔵' },
];

export default function ColorGameStages() {
  const [stage, setStage] = useState(1); // 1: Learn, 2: Identify, 3: Match
  const [learnIndex, setLearnIndex] = useState(0);
  const [identifyIndex, setIdentifyIndex] = useState(0);
  const [identifyResult, setIdentifyResult] = useState<null | boolean>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: boolean }>({});

  // Stage 1: Learn color names
  const handleNextLearn = () => {
    if (learnIndex < colors.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage(2);
    }
  };

  // Stage 2: Identify color by name (multiple choice)
  const currentColor = colors[identifyIndex];
  const options = [
    currentColor.name,
    ...colors.filter(c => c.name !== currentColor.name).map(c => c.name)
  ].sort(() => Math.random() - 0.5);

  const handleIdentify = (name: string) => {
    const correct = name === currentColor.name;
    setIdentifyResult(correct);
    setTimeout(() => {
      setIdentifyResult(null);
      if (identifyIndex < colors.length - 1) {
        setIdentifyIndex(identifyIndex + 1);
      } else {
        setStage(3);
      }
    }, 900);
  };

  // Stage 3: Match objects to colors (drag-and-drop)
  const handleDragStart = (name: string) => setDragged(name);
  const handleDrop = (color: string) => {
    if (dragged && objects.find(obj => obj.name === dragged)?.color === color) {
      setMatches((prev) => ({ ...prev, [dragged]: true }));
    }
    setDragged(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {stage === 1 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn Colors</h1>
          <div className="flex flex-col items-center mb-6 animate-bounce">
            <div className="w-24 h-24 rounded-full mb-4" style={{ background: colors[learnIndex].hex }}></div>
            <div className="text-2xl font-bold mt-2" style={{ color: colors[learnIndex].hex }}>{colors[learnIndex].name}</div>
          </div>
          <Button onClick={handleNextLearn} className="mt-4">{learnIndex < colors.length - 1 ? 'Next' : 'Start Quiz'}</Button>
        </>
      )}
      {stage === 2 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Which Color Is This?</h1>
          <div className="flex flex-col items-center mb-6 animate-pulse">
            <div className="w-20 h-20 rounded-full mb-2" style={{ background: currentColor.hex }}></div>
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {options.map(option => (
              <Button
                key={option}
                onClick={() => handleIdentify(option)}
                className={
                  identifyResult !== null && option === currentColor.name
                    ? 'bg-green-400 text-white'
                    : identifyResult === false && option !== currentColor.name
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
      {stage === 3 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Color Match Game</h1>
          <p className="text-lg text-muted-foreground mb-6">Drag each object to its matching color!</p>
          <div className="flex flex-row gap-8 mb-8">
            {objects.map((obj) => (
              <div
                key={obj.name}
                draggable={!matches[obj.name]}
                onDragStart={() => handleDragStart(obj.name)}
                className={`cursor-grab transition-transform text-5xl ${matches[obj.name] ? 'opacity-30' : 'hover:scale-110'}`}
                style={{ width: 64, height: 64 }}
                aria-label={obj.name}
              >
                {obj.emoji}
                <div className="text-xs mt-1">{obj.name}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-8 mb-8">
            {colors.map((color) => (
              <div
                key={color.name + '-target'}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(color.name)}
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-colors ${Object.values(matches).filter(Boolean).length === objects.length ? 'border-green-400 bg-green-100' : 'border-dashed border-gray-400 bg-white'}`}
                style={{ background: color.hex, opacity: 0.7 }}
                aria-label={color.name + ' target'}
              >
                <span className="text-xs font-bold text-black drop-shadow">{color.name}</span>
              </div>
            ))}
          </div>
          {Object.keys(matches).length === objects.length && (
            <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">You did it! 🎉</div>
          )}
          <Button asChild className="mt-4">
            <Link href="/learn/games">Back to Games</Link>
          </Button>
        </>
      )}
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
