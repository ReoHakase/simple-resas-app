'use client';

import { Provider as JotaiProvider } from 'jotai';
import type { ReactNode } from 'react';

type StateProviderProps = {
  children: ReactNode;
};

export const StateProvider = ({ children }: StateProviderProps): ReactNode => <JotaiProvider>{children}</JotaiProvider>;
