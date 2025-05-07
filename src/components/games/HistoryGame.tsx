import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const HistoryGame: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" gutterBottom>
          History Game
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" color="secondary" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1" paragraph>
            Get ready to travel through time and explore historical events!
            This exciting game will be available soon.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HistoryGame; 