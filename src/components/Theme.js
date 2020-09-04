import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5500',
      light: '#FFF'
    },
    secondary: {
      main: '#303030',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff4f0',
    },
  },
});

export default theme;