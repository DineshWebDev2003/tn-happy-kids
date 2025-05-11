"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const cardEmojis = ['🍎', '🚗', '🐶', '🌟', '🍌', '🐱'];
const shuffledCards = () => {
  const cards = [...cardEmojis, ...cardEmojis].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export default function MemoryCardGame() {
  const [cards, setCards] = useState(shuffledCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [lock, setLock] = useState(false);

  const handleFlip = (idx: number) => {
    if (lock || cards[idx].flipped || cards[idx].matched) return;
    const newFlipped = [...flippedIndices, idx];
    const newCards = cards.map((card, i) => i === idx ? { ...card, flipped: true } : card);
    setCards(newCards);
    setFlippedIndices(newFlipped);
    if (newFlipped.length === 2) {
      setLock(true);
      setTimeout(() => {
        const [i1, i2] = newFlipped;
        if (newCards[i1].emoji === newCards[i2].emoji) {
          const matched = newCards.map((card, i) => (i === i1 || i === i2) ? { ...card, matched: true } : card);
          setCards(matched);
          setMatchedCount(matchedCount + 1);
        } else {
          setCards(newCards.map((card, i) => (i === i1 || i === i2) ? { ...card, flipped: false } : card));
        }
        setFlippedIndices([]);
        setLock(false);
      }, 900);
    }
  };

  const handleRestart = () => {
    setCards(shuffledCards());
    setFlippedIndices([]);
    setMatchedCount(0);
    setLock(false);
  };

  const allMatched = cards.every(card => card.matched);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">Memory Card Game</h1>
      <p className="text-lg text-muted-foreground mb-6">Flip cards to find all the matching pairs!</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleFlip(idx)}
            className={`w-16 h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl text-white font-bold transition-all duration-200 ${card.flipped || card.matched ? 'bg-primary' : 'bg-gray-300'} ${card.matched ? 'opacity-50' : ''}`}
            disabled={card.flipped || card.matched || lock}
            aria-label={card.flipped || card.matched ? card.emoji : 'Hidden card'}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </button>
        ))}
      </div>
      {allMatched && (
        <div className="text-2xl font-bold text-green-500 mb-4 animate-bounce">You did it! 🎉</div>
      )}
      <div className="flex gap-4">
        <Button onClick={handleRestart} className="mt-2">Restart</Button>
        <Button asChild className="mt-2">
          <Link href="/learn/games">Back to Games</Link>
        </Button>
      </div>
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
}
