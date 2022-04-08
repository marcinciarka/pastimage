import {
  createTheme
} from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'transparent'
    },
    text: {
      primary: '#5e7581',
      secondary: '#a1bcc9',
    },
    primary: {
      main: '#7794a1',
    },
    secondary: {
      main: '#d2f1ff',
    },
  },
});

export default lightTheme;