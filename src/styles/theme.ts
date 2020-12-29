import { red, grey } from '@material-ui/core/colors';
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
      main: '#FFF9E8',
    },
    secondary: {
      main: '#044682',
      light: '#6ba3d6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FBFBFA',
      paper: '#FFF',
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
    borderRadius: 2,
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
      iconColor: '#695F5F',
      iconBorderColor: '#FFF2E5',
      iconHighlight: grey[900],
    },
    questionBackground: {
      shared: '#ABC3BB',
      pre: '#CBE2EF',
      post: '#E1CEC9',
    },
  },
});

export const theme = responsiveFontSizes(muiTheme);
