import MetropolisMediumFont from './fonts/Metropolis-Medium.woff';
import MetropolisBoldFont from './fonts/Metropolis-SemiBold.woff';
import RobotoBoldFont from './fonts/Roboto-Bold.woff';
import RobotoMediumFont from './fonts/Roboto-Medium.woff';
import RobotoRegularFont from './fonts/Roboto-Regular.woff';
import Vt323Font from './fonts/VT323-Regular.woff';

const MetropolisRegular = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  src: `
      local('Metrolpolis-Medium'),
      url(${MetropolisMediumFont}) format('woff')
    `,
};

const MetropolisBold = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 500,
  src: `
      local('Metrolpolis-Bold'),
      url(${MetropolisBoldFont}) format('woff')
    `,
};

const RobotoRegular = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  src: `
      local('Roboto-Regular'),
      url(${RobotoRegularFont}) format('woff')
    `,
};

const RobotoMedium = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 500,
  src: `
        local('Roboto-Medium'),
        url(${RobotoMediumFont}) format('woff')
      `,
};

const RobotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 700,
  src: `
      local('Roboto-Bold'),
      url(${RobotoBoldFont}) format('woff')
    `,
};

const Vt323Regular = {
  fontFamily: 'VT323',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  src: `
      local('VT323-Regular'),
      url(${Vt323Font}) format('woff')
  `,
};

export default {
  MetropolisRegular,
  MetropolisBold,
  RobotoRegular,
  RobotoMedium,
  RobotoBold,
  Vt323Regular,
};
