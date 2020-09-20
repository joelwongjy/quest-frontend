import { orange, red, grey } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Fonts from 'assets/fonts';

const fontFamilyRoboto = {
  fontFamily: [
    'Roboto',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
};

const fontFamilyMetropolis = {
  fontFamily: [
    'Metropolis',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  letterSpacing: '0.015rem',
};

const muiTheme = createMuiTheme({
  type: 'light',
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: orange[500],
      light: '#feefc3',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFF',
      highlight: '#F1F3F4',
    },
  },
  typography: {
    ...fontFamilyRoboto,
    overline: {
      fontWeight: 500,
      fontSize: '0.7rem',
    },
  },
  shape: {
    borderRadius: '0.5rem',
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  mixins: {
    drawer: {
      minWidth: 280,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          Fonts.MetropolisRegular,
          Fonts.MetropolisBold,
          Fonts.RobotoRegular,
          Fonts.RobotoMedium,
          Fonts.RobotoBold,
        ],
      },
    },
    MuiListItemText: {
      primary: {
        ...fontFamilyMetropolis,
        fontWeight: 500,
        fontSize: '0.87rem',
      },
    },
  },
  custom: {
    fontFamily: {
      roboto: fontFamilyRoboto,
      metropolis: fontFamilyMetropolis,
    },
    palette: {
      iconColor: '#5f6368',
      itemBorderColor: '#DDDDDD',
      iconHighlight: grey[900],
    },
  },
});

export const theme = responsiveFontSizes(muiTheme);
