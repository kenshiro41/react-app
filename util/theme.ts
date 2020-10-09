import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const TEXT_COLOR = '#e0e0e0';
const MAIN_COLOR = '#4dabf5';
const BG_COLOR = '#383636';
const ERR_COLOR = '#ce1f1f';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export { TEXT_COLOR, MAIN_COLOR, BG_COLOR, ERR_COLOR, theme };
