export const screenSizes: {
  [key: string]: number;
} = {
    xsm: 375,
    sm: 560,
    md: 768,
    lg: 960,
    xl: 1200,
    xxl: 1600,
};


export const isMobile = (screen = '768'): boolean => !window.matchMedia(`(min-width: ${screen}px)`).matches;
