import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'sans-serif',
});

const baseSize = 16;
const lineHeightMultiplier = 1.5;

export const typography = {
  // Headers
  h1: {
    fontFamily,
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  
  // Body text
  body: {
    fontFamily,
    fontSize: baseSize,
    lineHeight: baseSize * lineHeightMultiplier,
  },
  bodySmall: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
  },
  
  // Buttons
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  
  // Caption
  caption: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    color: '#6c757d',
  },
  
  // Overline
  overline: {
    fontFamily,
    fontSize: 10,
    fontWeight: '500' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  
  // Helper for creating responsive font sizes
  scale: (factor: number) => ({
    fontFamily,
    fontSize: baseSize * factor,
    lineHeight: baseSize * factor * lineHeightMultiplier,
  }),
} as const;
