import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';

const GameSelection: React.FC = () => {
  const { currentUser } = useAuth();

  const basicGames = [
    { 
      id: 'alphabet', 
      name: 'Alphabet Game', 
      description: 'Learn the alphabet in a fun way!',
      image: '/images/alphabet-game.png'
    },
    { 
      id: 'math', 
      name: 'Math Game', 
      description: 'Practice basic math skills',
      image: '/images/math-game.png'
    },
    {
      id: 'safety',
      name: 'Safety Game',
      description: 'Learn about good touch, bad touch, and safe behaviors',
      image: '/images/safety-game.png'
    },
    {
      id: 'story',
      name: 'Story Game',
      description: 'Listen to stories and answer questions to test your understanding',
      image: '/images/story-game.png'
    }
  ];

  const premiumGames = [
    { 
      id: 'word', 
      name: 'Word Game', 
      description: 'Expand your vocabulary with fun word challenges',
      image: '/images/word-game.png'
    },
    { 
      id: 'science', 
      name: 'Science Game', 
      description: 'Explore scientific concepts through interactive games',
      image: '/images/science-game.png'
    },
    { 
      id: 'history', 
      name: 'History Game', 
      description: 'Travel through time and learn about historical events',
      image: '/images/history-game.png'
    },
    { 
      id: 'geography', 
      name: 'Geography Game', 
      description: 'Discover the world and learn about different countries',
      image: '/images/geography-game.png'
    }
  ];

  const allGames = currentUser ? [...basicGames, ...premiumGames] : basicGames;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" color="primary" align="center" gutterBottom>
        Educational Games
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          {currentUser ? 'All Games' : 'Available Games'}
        </Typography>
        <Grid container spacing={4}>
          {allGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={game.image}
                  alt={game.name}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.200'
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Game+Image';
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {game.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {game.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/games/${game.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Play Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {!currentUser && (
        <Card sx={{ mt: 4, bgcolor: 'warning.light' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Want More Games?
            </Typography>
            <Typography variant="body1" paragraph>
              Sign in to access premium games and track your progress!
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default GameSelection; 