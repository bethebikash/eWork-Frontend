import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#001155',
      light: '#FFF'
    },
    secondary: {
      main: '#FF5500',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#e3e3e3',
    },
  },
});

export default theme;