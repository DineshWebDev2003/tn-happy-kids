import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useLanguage } from './GlobalWidgets';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
  image: string;
  type: string;
}

const games: Game[] = [
  {
    id: 'alphabet',
    title: 'Alphabet Adventure',
    description: 'Learn letters and words through fun interactive games!',
    path: '/games/alphabet',
    image: '/images/alphabet-game.png',
    type: 'alphabet'
  },
  {
    id: 'math',
    title: 'Math Magic',
    description: 'Master numbers and basic mathematics with exciting challenges!',
    path: '/games/math',
    image: '/images/math-game.png',
    type: 'math'
  },
  {
    id: 'safety',
    title: 'Safety First',
    description: 'Learn about personal safety in a fun, engaging way',
    path: '/games/safety',
    image: '/images/safety-game.png',
    type: 'safety'
  },
  {
    id: 'story',
    title: 'Story Time',
    description: 'Interactive storytelling with moral lessons',
    path: '/games/story',
    image: '/images/story-game.png',
    type: 'story'
  },
  {
    id: 'word',
    title: 'Word Wizard',
    description: 'Expand your vocabulary with fun word challenges',
    path: '/games/word',
    image: '/images/word-game.png',
    type: 'word'
  },
  {
    id: 'science',
    title: 'Science Explorer',
    description: 'Discover the wonders of science through fun experiments',
    path: '/games/science',
    image: '/images/science-game.png',
    type: 'science'
  },
  {
    id: 'history',
    title: 'History Quest',
    description: 'Travel through time and learn about historical events',
    path: '/games/history',
    image: '/images/history-game.png',
    type: 'history'
  },
  {
    id: 'geography',
    title: 'Geography Adventure',
    description: 'Explore the world and learn about different countries',
    path: '/games/geography',
    image: '/images/geography-game.png',
    type: 'geography'
  }
];

interface GameSectionProps {
  onGameSelect?: (game: Game) => void;
}

const GameSection: React.FC<GameSectionProps> = ({ onGameSelect }) => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    if (onGameSelect) {
      onGameSelect(game);
    }
    // Navigate to the game
    navigate(game.path);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {lang === 'ta' ? 'விளையாட்டுகள்' : 'Learning Games'}
      </Typography>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} key={game.id}>
            <Card 
              sx={{ 
                maxWidth: 300,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
              onClick={() => handleGameSelect(game)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {game.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  {lang === 'ta' ? 'விளையாடு' : 'Play Now'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameSection; 