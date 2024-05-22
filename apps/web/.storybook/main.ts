import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import type { Configuration } from 'webpack';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  stories: ['../src/**/*.story.tsx', '../src/**/*.stories.tsx'],
  webpackFinal: (config) => {
    const finalConfig: Configuration = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../src'),
          '@public': path.resolve(__dirname, '../public'),
          'styled-system': path.resolve(__dirname, '../styled-system'),
          'contentlayer/generated': path.resolve(__dirname, '../.contentlayer/generated'),
        },
      },
    };

    return finalConfig;
  },
};

export default config;
