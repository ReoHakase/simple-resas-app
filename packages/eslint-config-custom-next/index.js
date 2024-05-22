/** @type {import('eslint').Linter.Config} */
module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'next',
    'plugin:react/recommended',
    'plugin:@pandacss/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'import', 'prettier', '@pandacss'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'never'],
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': ['error', { packageDir: ['./'] }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    '@pandacss/prefer-shorthand-properties': 'error',
    '@pandacss/no-important': 'error',
    '@pandacss/no-config-function-in-source': 'off',
  },
  overrides: [
    {
      files: ['./*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['./src/app/**'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
    {
      files: ['./src/**/*.story.*', './src/**/*.stories.*'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
      },
    },
    {
      // Disable react and a11y rules for API router
      files: ['./src/app/api/**', './src/pages/api/**'],
      rules: {
        'import/no-default-export': 'off',
        'jsx-a11y/alt-text': 'off',
        '@next/next/no-img-element': 'off',
      },
    },
  ],
};
