import antfu from '@antfu/eslint-config';
import next from '@next/eslint-plugin-next';
import panda from '@pandacss/eslint-plugin';
import storybook from 'eslint-plugin-storybook';

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    react: true,
  },
  {
    rules: {
      'node/prefer-global/process': ['error', 'always'],
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/unbound-method': 'off',
      'ts/strict-boolean-expressions': 'off',
    },
  },
)
  .append({
    name: 'next',
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  })
  .append({
    name: 'panda',
    plugins: {
      '@pandacss': panda,
    },
    rules: {
      ...panda.configs.recommended.rules,
    },
  })
  .append(storybook.configs['flat/recommended']);
