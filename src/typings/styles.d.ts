import { CSSProperties } from '@material-ui/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Custom {
    fontFamily: {
      roboto: CSSProperties;
      metropolis: CSSProperties;
    };
    icon: {
      iconColor: string;
      iconBorderColor: string;
      iconHighlight: string;
    };
    questionBackground: {
      shared: string;
      pre: string;
      post: string;
    };
  }

  interface CustomOptions {
    fontFamily?: {
      roboto?: CSSProperties;
      metropolis?: CSSProperties;
    };
    icon?: {
      iconColor?: string;
      iconBorderColor?: string;
      iconHighlight?: string;
    };
    questionBackground?: {
      shared?: string;
      pre?: string;
      post?: string;
    };
  }

  interface Theme {
    type: string;
    custom: Custom;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    type?: string;
    custom?: CustomOptions;
  }
}

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    drawer: CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  interface MixinOptions {
    drawer?: CSSProperties;
  }
}
