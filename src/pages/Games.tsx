import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';

const basicGames = [
  {
    title: 'Alphabet Adventure',
    description: 'Learn letters and words through fun interactive games!',
    image: '/images/alphabet-game.png',
    path: '/games/alphabet'
  },
  {
    title: 'Math Magic',
    description: 'Master numbers and basic mathematics with exciting challenges!',
    image: '/images/math-game.png',
    path: '/games/math'
  },
  {
    title: 'Safety First',
    description: 'Learn about personal safety in a fun, engaging way',
    image: '/images/safety-game.png',
    path: '/games/safety'
  }
];

const premiumGames = [
  {
    title: 'Story Time',
    description: 'Interactive storytelling with moral lessons',
    image: '/images/story-game.png',
    path: '/games/story'
  },
  {
    title: 'Word Wizard',
    description: 'Expand your vocabulary with fun word challenges',
    image: '/images/word-game.png',
    path: '/games/word'
  },
  {
    title: 'Science Explorer',
    description: 'Discover the wonders of science through fun experiments',
    image: '/images/science-game.png',
    path: '/games/science'
  },
  {
    title: 'History Quest',
    description: 'Travel through time and learn about historical events',
    image: '/images/history-game.png',
    path: '/games/history'
  },
  {
    title: 'Geography Adventure',
    description: 'Explore the world and learn about different countries',
    image: '/images/geography-game.png',
    path: '/games/geography'
  }
];

const GameCard: React.FC<{
  title: string;
  description: string;
  image: string;
  path: string;
  isPremium?: boolean;
}> = ({ title, description, image, path, isPremium }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleClick = () => {
    if (isPremium && !currentUser) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          opacity: isPremium && !currentUser ? 0.7 : 1,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
          }
        }}
      >
        {isPremium && !currentUser && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 1,
              backdropFilter: 'blur(2px)',
              borderRadius: 4
            }}
          >
            <Typography variant="h6" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Sign in to play!
            </Typography>
          </Box>
        )}
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography gutterBottom variant="h5" component="h2" sx={{ color: 'primary.main' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
            sx={{ 
              mt: 2,
              py: 1.5,
              borderRadius: '30px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
              }
            }}
          >
            {isPremium && !currentUser ? 'Sign in to Play' : 'Play Now!'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Games: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          mb: 4
        }}
      >
        Educational Games
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Basic Games
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {basicGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.title}>
            <GameCard {...game} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Premium Games
      </Typography>
      <Grid container spacing={3}>
        {premiumGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.title}>
            <GameCard {...game} isPremium />
          </Grid>
        ))}
      </Grid>

      {!currentUser && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Want to access all games?
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Games; 