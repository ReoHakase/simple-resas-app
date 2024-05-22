'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps): ReactNode => (
  <NextThemesProvider attribute="data-theme" themes={['light', 'dark']} enableSystem>
    {children}
  </NextThemesProvider>
);
