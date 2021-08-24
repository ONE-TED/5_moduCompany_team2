import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
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
      strongDarkBgHover: string;
      darkBg: string;
      formBg: string;
    };
  }
}
