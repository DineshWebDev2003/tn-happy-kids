"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const shapes = [
  { name: 'Circle', color: '#60a5fa', svg: <circle cx="40" cy="40" r="35" fill="#60a5fa" /> },
  { name: 'Square', color: '#fbbf24', svg: <rect x="10" y="10" width="60" height="60" fill="#fbbf24" /> },
  { name: 'Triangle', color: '#34d399', svg: <polygon points="40,10 70,70 10,70" fill="#34d399" /> },
];

export default function ShapeGameStages() {
  const [stage, setStage] = useState(1); // 1: Learn, 2: Identify, 3: Match
  const [learnIndex, setLearnIndex] = useState(0);
  const [identifyIndex, setIdentifyIndex] = useState(0);
  const [identifyResult, setIdentifyResult] = useState<null | boolean>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: boolean }>({});

  // Stage 1: Learn shape names
  const handleNextLearn = () => {
    if (learnIndex < shapes.length - 1) {
      setLearnIndex(learnIndex + 1);
    } else {
      setStage(2);
    }
  };

  // Stage 2: Identify shape by name (multiple choice)
  const currentShape = shapes[identifyIndex];
  const options = [
    currentShape.name,
    ...shapes.filter(s => s.name !== currentShape.name).map(s => s.name)
  ].sort(() => Math.random() - 0.5);

  const handleIdentify = (name: string) => {
    const correct = name === currentShape.name;
    setIdentifyResult(correct);
    setTimeout(() => {
      setIdentifyResult(null);
      if (identifyIndex < shapes.length - 1) {
        setIdentifyIndex(identifyIndex + 1);
      } else {
        setStage(3);
      }
    }, 900);
  };

  // Stage 3: Match shapes (drag-and-drop)
  const handleDragStart = (name: string) => setDragged(name);
  const handleDrop = (name: string) => {
    if (dragged === name) {
      setMatches((prev) => ({ ...prev, [name]: true }));
    }
    setDragged(null);
  };

  // UI for each stage
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      {stage === 1 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn Shapes</h1>
          <div className="flex flex-col items-center mb-6 animate-bounce">
            <svg width="120" height="120">{shapes[learnIndex].svg}</svg>
            <div className="text-2xl font-bold mt-4" style={{ color: shapes[learnIndex].color }}>{shapes[learnIndex].name}</div>
          </div>
          <Button onClick={handleNextLearn} className="mt-4">{learnIndex < shapes.length - 1 ? 'Next' : 'Start Quiz'}</Button>
        </>
      )}
      {stage === 2 && (
        <>
          <h1 className="text-4xl font-bold text-foreground mb-4">Which Shape Is This?</h1>
          <div className="flex flex-col items-center mb-6 animate-pulse">
            <svg width="100" height="100">{currentShape.svg}</svg>
          </div>
          <div className="flex flex-row gap-4 justify-center mb-4">
            {options.map(option => (
              <Button
                key={option}
                onClick={() => handleIdentify(option)}
                className={
                  identifyResult !== null && option === currentShape.name
                    ? 'bg-green-400 text-white'
                    : identifyResult === false && option !== currentShape.name
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Shape Matching Game</h1>
          <p className="text-lg text-muted-foreground mb-6">Drag each shape to its matching outline!</p>
          <div className="flex flex-row gap-8 mb-8">
            {shapes.map((shape) => (
              <div
                key={shape.name}
                draggable={!matches[shape.name]}
                onDragStart={() => handleDragStart(shape.name)}
                className={`cursor-grab transition-transform ${matches[shape.name] ? 'opacity-30' : 'hover:scale-110'}`}
                style={{ width: 80, height: 80 }}
                aria-label={shape.name}
              >
                <svg width="80" height="80">{shape.svg}</svg>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-8 mb-8">
            {shapes.map((shape) => (
              <div
                key={shape.name + '-target'}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(shape.name)}
                className={`w-20 h-20 border-4 rounded-lg flex items-center justify-center transition-colors ${matches[shape.name] ? 'border-green-400 bg-green-100' : 'border-dashed border-gray-400 bg-white'}`}
                aria-label={shape.name + ' target'}
              >
                <svg width="60" height="60" style={{ opacity: 0.3 }}>{shape.svg}</svg>
              </div>
            ))}
          </div>
          {Object.keys(matches).length === shapes.length && (
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
