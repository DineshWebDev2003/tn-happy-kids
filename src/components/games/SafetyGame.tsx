import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface SafetyScenario {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    question: "If someone you don't know offers you candy, what should you do?",
    options: [
      "Take the candy and say thank you",
      "Say no and tell a trusted adult",
      "Take the candy but don't eat it",
      "Ask them for more candy"
    ],
    correctAnswer: 1,
    explanation: "Always say no to strangers offering treats and tell a trusted adult about it."
  },
  {
    id: 2,
    question: "If someone touches you in a way that makes you uncomfortable, what should you do?",
    options: [
      "Keep it a secret",
      "Tell them to stop and tell a trusted adult",
      "Touch them back",
      "Ignore it"
    ],
    correctAnswer: 1,
    explanation: "It's important to say 'NO' and tell a trusted adult about any uncomfortable touching."
  },
  {
    id: 3,
    question: "If you're lost in a store, what should you do?",
    options: [
      "Cry and hide",
      "Ask any stranger for help",
      "Find a store employee or security guard",
      "Leave the store"
    ],
    correctAnswer: 2,
    explanation: "Stay calm and find a store employee or security guard - they can help you find your family."
  }
];

const SafetyGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === safetyScenarios[currentIndex].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setShowExplanation(true);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setShowExplanation(false);
      if (currentIndex < safetyScenarios.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Safety First!
      </Typography>

      <Paper 
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              {safetyScenarios[currentIndex].question}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              {safetyScenarios[currentIndex].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  sx={{ 
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    px: 4
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>

            {showFeedback && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h5"
                  color={isCorrect ? 'success.main' : 'error.main'}
                  sx={{ mt: 4 }}
                >
                  {isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}
                </Typography>
              </motion.div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  {safetyScenarios[currentIndex].explanation}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </Paper>

      <Typography variant="h4" color="secondary" sx={{ mt: 4 }}>
        Score: {score}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Progress: {currentIndex + 1} / {safetyScenarios.length}
      </Typography>
    </Container>
  );
};

export default SafetyGame; 