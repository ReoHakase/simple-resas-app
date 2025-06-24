import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { Preview } from '@storybook/nextjs';
import React from 'react';
import { AppProvider } from '../src/providers';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
