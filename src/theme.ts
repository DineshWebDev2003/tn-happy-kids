import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#000000',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#000000',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#000000',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#000000',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#000000',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#000000',
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#424242',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#2196f3',
            },
          },
        },
      },
    },
  },
});

export default theme; 