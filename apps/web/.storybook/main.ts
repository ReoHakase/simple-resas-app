import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/nextjs';
import path, { dirname, join } from 'path';
import type { Configuration } from 'webpack';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  env: (config) => ({ ...config, IS_STORYBOOK: 'true' }),
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  features: {
    experimentalRSC: true,
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
