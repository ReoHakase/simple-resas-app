/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'turbo',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.turbo', 'node_modules', 'dist', '**/*.js', '**/*.mjs', '**/*.jsx', 'tsup.config.ts'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
  },
};
