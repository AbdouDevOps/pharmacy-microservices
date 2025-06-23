import { extendTheme } from '@mui/joy/styles';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f2fce4",
          100: "#d8f6b3",
          200: "#bdf083",
          300: "#a3e952",
          400: "#8ae32a",
          500: "#84ea1a", // ta couleur principale
          600: "#74cb17",
          700: "#65ac13",
          800: "#558e10",
          900: "#46700c"
        },
        warning: {
          50: "#e3fbfd",
          100: "#b0f2fa",
          200: "#7de8f7",
          300: "#4adef4",
          400: "#23d6f0",
          500: "#49d4ee", // ta couleur principale
          600: "#1fb9d3",
          700: "#1993a6",
          800: "#136d79",
          900: "#0d4850"
        },
        danger: {
          50: "#e8fcf4",
          100: "#bdf7e1",
          200: "#91f1ce",
          300: "#66ecbb",
          400: "#3ae6a8",
          500: "#74f2c7", // ta couleur principale
          600: "#34cfa8",
          700: "#2ba488",
          800: "#227968",
          900: "#194e48"
        },
        background: {
          body: '#f7fdee', // ton background
        }
      }
    },
    dark: {
      palette: {
        // Tu peux ajouter ici des versions foncées plus tard si besoin
      }
    }
  },
  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: {
          [`&.${listItemButtonClasses.selected}`]: {
            backgroundColor: "#e8fcf4", // ou toute autre couleur adaptée à ton thème
          },
        },
      },
    },
  },
});

export default theme;
