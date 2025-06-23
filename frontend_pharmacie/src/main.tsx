import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// MUI setup
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6', // blue-500
    },
    secondary: {
      main: '#14B8A6', // teal-500
    },
    error: {
      main: '#EF4444', // red-500
    },
    warning: {
      main: '#F59E0B', // amber-500
    },
    success: {
      main: '#10B981', // emerald-500
    },
    info: {
      main: '#6366F1', // indigo-500
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </StrictMode>
);