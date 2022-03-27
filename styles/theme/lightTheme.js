import {
  createTheme
} from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'transparent'
    }
  },
});

export default lightTheme;