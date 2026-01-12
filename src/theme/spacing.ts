const baseUnit = 4;

export const spacing = {
  none: 0,
  xxxsmall: baseUnit * 1, // 4
  xxsmall: baseUnit * 2,  // 8
  xsmall: baseUnit * 3,   // 12
  small: baseUnit * 4,    // 16
  medium: baseUnit * 6,   // 24
  large: baseUnit * 8,    // 32
  xlarge: baseUnit * 12,  // 48
  xxlarge: baseUnit * 16, // 64
  xxxlarge: baseUnit * 24,// 96
  
  // Aliases for common usage
  xs: baseUnit * 2,
  sm: baseUnit * 3,
  md: baseUnit * 4,
  lg: baseUnit * 6,
  xl: baseUnit * 8,
  xxl: baseUnit * 12,
  
  // Layout spacing
  container: baseUnit * 6,
  gutter: baseUnit * 4,
  
  // Component spacing
  buttonPadding: baseUnit * 2,
  inputPadding: baseUnit * 3,
  sectionPadding: baseUnit * 8,
} as const;
