import type { ReactNode } from 'react';
import { StateProvider } from './StateProvider';
import { ThemeProvider } from './ThemeProvider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): ReactNode => (
  <ThemeProvider>
    <StateProvider>{children}</StateProvider>
  </ThemeProvider>
);
