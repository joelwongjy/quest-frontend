import { orange, red, grey } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import fonts from 'assets/fonts';

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
      paper: '#F1F3F4',
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
    borderRadius: 8,
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
          fonts.MetropolisRegular,
          fonts.MetropolisBold,
          fonts.RobotoRegular,
          fonts.RobotoMedium,
          fonts.RobotoBold,
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
    icon: {
      iconColor: '#5f6368',
      iconBorderColor: '#DDDDDD',
      iconHighlight: grey[900],
    },
  },
});

export const theme = responsiveFontSizes(muiTheme);
