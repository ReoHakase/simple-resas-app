/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['custom-next', 'plugin:storybook/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
