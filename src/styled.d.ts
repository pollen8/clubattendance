// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    onBackground: string;
    danger100: string;
    danger300: string;
    danger400: string;
    danger500: string;
    grey100: string;
    grey200: string;
    grey300: string;
    grey400: string;
    grey500: string;
    grey600: string;
    grey700: string;
    grey800: string;
    grey900: string;
    primary100: string;
    primary200: string;
    primary300: string;
    primary500: string;
    primary700: string;
    primary800: string;
    primary900: string;
    success500: string;
    blue100: string;
    blue500: string;
  }
}
