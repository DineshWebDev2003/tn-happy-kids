import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const GeographyGame: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Geography Game
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" color="secondary" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1" paragraph>
            Embark on a journey around the world with our upcoming geography game!
            Stay tuned for this exciting adventure.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default GeographyGame; 