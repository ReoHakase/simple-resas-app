/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['custom-next'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
