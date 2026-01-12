
declare module '../theme/colors' {
  export const colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    white: string;
    lightGray: string;
    gray: string;
    mediumGray: string;
    darkGray: string;
    black: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    border: string;
    transparent: string;
  };
}

declare module '../theme/spacing' {
  export const spacing: {
    none: number;
    xxxsmall: number;
    xxsmall: number;
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
    xxxlarge: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    container: number;
    gutter: number;
    buttonPadding: number;
    inputPadding: number;
    sectionPadding: number;
  };
}

declare module '../theme/typography' {
  type TypographyStyle = {
    fontFamily: string;
    fontSize: number;
    lineHeight?: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    letterSpacing?: number;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    color?: string;
  };

  export const typography: {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    body: TypographyStyle;
    bodySmall: TypographyStyle;
    bodyLarge: TypographyStyle;
    button: TypographyStyle;
    buttonSmall: TypographyStyle;
    caption: TypographyStyle;
    overline: TypographyStyle;
    scale: (factor: number) => TypographyStyle;
  };
}
