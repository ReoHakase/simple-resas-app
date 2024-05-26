import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): ReactNode => <ThemeProvider>{children}</ThemeProvider>;
