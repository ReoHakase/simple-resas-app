'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  return (
    <NextThemesProvider attribute="data-theme" themes={['light', 'dark']} enableSystem>
      {children}
    </NextThemesProvider>
  );
}
