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
    }
  },
});

export default lightTheme;