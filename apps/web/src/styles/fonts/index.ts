import localFont from 'next/font/local';

export const calSans = localFont({
  src: './CalSans-SemiBold.woff2',
  display: 'swap',
  variable: '--font-cal-sans',
  preload: false,
});

export const fontVariables = `${calSans.variable}`;
