/**
 * Breakpoints are declared separately from the rest of PandaCSS tokens in order to use them in <Image> component.
 * Panda uses **a mobile-first breakpoint system** and leverages min-width media queries \@media(min-width) when you write responsive styles.
 *
 * @see https://panda-css.com/docs/concepts/responsive-design
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const satisfies Record<string, `${number}px`>;
