import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const MathGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({
    num1: Math.floor(Math.random() * 10),
    num2: Math.floor(Math.random() * 10),
    operation: '+'
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateNewProblem = () => {
    setCurrentProblem({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10),
      operation: '+'
    });
  };

  const handleAnswer = (answer: number) => {
    const correctAnswer = currentProblem.num1 + currentProblem.num2;
    const isAnswerCorrect = answer === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowFeedback(false);
      generateNewProblem();
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Math Magic!
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
            key={`${currentProblem.num1}-${currentProblem.num2}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" color="primary" gutterBottom>
              {currentProblem.num1} + {currentProblem.num2} = ?
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
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleAnswer(num)}
                    sx={{ minWidth: 60 }}
                  >
                    {num}
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

export default MathGame; 