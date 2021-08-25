import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      white: string;
      green: string;
      red: string;
      orange: string;
      blue: string;
      dark: string;
      light: string;
      lighter: string;
      gray: string;
      darkLine: string;
      strongDarkBg: string;
      darkBg: string;
      formBg: string;
    };
  }
}
