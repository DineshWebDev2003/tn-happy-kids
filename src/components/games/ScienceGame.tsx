import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const ScienceGame: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Science Game
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" color="secondary" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1" paragraph>
            We're working hard to bring you an exciting science learning experience.
            Check back soon for updates!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ScienceGame; 