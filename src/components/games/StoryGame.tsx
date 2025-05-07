import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPage {
  id: number;
  text: string;
  image: string;
  choices: {
    text: string;
    nextPage: number;
  }[];
}

const storyPages: StoryPage[] = [
  {
    id: 1,
    text: "Once upon a time, there was a little rabbit named Hop. Hop loved to play in the garden with his friends.",
    image: "/images/story/rabbit-garden.png",
    choices: [
      { text: "Hop went to play with his friends", nextPage: 2 },
      { text: "Hop decided to explore alone", nextPage: 3 }
    ]
  },
  {
    id: 2,
    text: "Hop and his friends had a wonderful time playing hide and seek in the garden. They learned that playing together is more fun!",
    image: "/images/story/rabbit-friends.png",
    choices: [
      { text: "The End - Play again", nextPage: 1 }
    ]
  },
  {
    id: 3,
    text: "While exploring alone, Hop got lost! But he remembered his mother's advice and asked a friendly butterfly for help.",
    image: "/images/story/rabbit-lost.png",
    choices: [
      { text: "Hop found his way home", nextPage: 4 },
      { text: "Hop continued exploring", nextPage: 5 }
    ]
  },
  {
    id: 4,
    text: "Hop learned that it's important to stay with friends and ask for help when needed. He promised to be more careful next time!",
    image: "/images/story/rabbit-home.png",
    choices: [
      { text: "The End - Play again", nextPage: 1 }
    ]
  },
  {
    id: 5,
    text: "Hop's adventure taught him that being brave is good, but being safe is even better. He decided to go home and play with his friends.",
    image: "/images/story/rabbit-adventure.png",
    choices: [
      { text: "The End - Play again", nextPage: 1 }
    ]
  }
];

const StoryGame: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChoice = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const currentStoryPage = storyPages.find(page => page.id === currentPage);

  return (
    <Container maxWidth="lg" sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Story Time!
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
            key={currentPage}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              {currentStoryPage?.text}
            </Typography>

            {currentStoryPage && (
              <Box
                component="img"
                src={currentStoryPage.image}
                alt="Story illustration"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  my: 4,
                  borderRadius: 2,
                  display: 'block',
                  mx: 'auto'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Story+Illustration';
                }}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              {currentStoryPage?.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => handleChoice(choice.nextPage)}
                  sx={{ 
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    px: 4
                  }}
                >
                  {choice.text}
                </Button>
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Container>
  );
};

export default StoryGame; 