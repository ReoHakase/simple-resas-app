import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'lib',
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },

    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
  },
  {
    rules: {
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/strict-boolean-expressions': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },
);
