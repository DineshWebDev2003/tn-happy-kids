import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import GlobalWidgets from './components/GlobalWidgets';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
          <GlobalWidgets />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 