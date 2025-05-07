import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThirukkuralSearch from '../components/ThirukkuralSearch';

interface LearningProps {}

const Learning: React.FC<LearningProps> = () => {
  const theme = useTheme();
  // TODO: Get language from context or props. For now, default to Tamil:
  const language: 'ta' | 'en' | 'hi' = 'ta';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Learning Center
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore educational content and resources
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Alphabet Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              background: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Alphabet Learning
            </Typography>
            <Typography variant="body2">
              Learn the alphabet through interactive lessons and games
            </Typography>
          </Paper>
        </Grid>

        {/* Thirukkural Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3, background: '#fffbe7' }}>
            <Typography variant="h5" gutterBottom color="primary">
              திருக்குறள் Thirukkural Learning
            </Typography>
            <ThirukkuralSearch language={language} />
          </Paper>
        </Grid>

        {/* Math Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Math Skills
            </Typography>
            <Typography variant="body2">
              Develop basic math skills with fun exercises
            </Typography>
          </Paper>
        </Grid>

        {/* Science Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              background: theme.palette.success.light,
              color: theme.palette.success.contrastText,
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Science Discovery
            </Typography>
            <Typography variant="body2">
              Explore basic science concepts through interactive lessons
            </Typography>
          </Paper>
        </Grid>

        {/* Safety Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              background: theme.palette.warning.light,
              color: theme.palette.warning.contrastText,
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Safety Education
            </Typography>
            <Typography variant="body2">
              Learn important safety rules and practices
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learning; 