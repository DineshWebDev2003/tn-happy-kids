import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const WordGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const words = [
    'ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN',
    'KANGAROO', 'ZEBRA', 'RHINOCEROS', 'HIPPOPOTAMUS'
  ];

  const generateNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const handleAnswer = (answer: string) => {
    const isAnswerCorrect = answer === currentWord;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowFeedback(false);
      generateNewWord();
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Word Challenge!
      </Typography>

      <Paper 
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          maxWidth: 600,
          mx: 'auto'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" color="primary" gutterBottom>
              {currentWord}
            </Typography>

            {showFeedback ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h4"
                  color={isCorrect ? 'success.main' : 'error.main'}
                >
                  {isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}
                </Typography>
              </motion.div>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {words.map((word) => (
                  <Button
                    key={word}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleAnswer(word)}
                    sx={{ minWidth: 120 }}
                  >
                    {word}
                  </Button>
                ))}
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Paper>

      <Typography variant="h4" color="secondary" sx={{ mt: 4 }}>
        Score: {score}
      </Typography>
    </Container>
  );
};

export default WordGame; 