import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Warm coral
      light: '#FF9E9E',
      dark: '#E64A4A',
    },
    secondary: {
      main: '#4ECDC4', // Mint green
      light: '#7EDCD6',
      dark: '#2E9E96',
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2D3436',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2D3436',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2D3436',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 25,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF9E9E 90%)',
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#FF6B6B',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF9E9E 90%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 