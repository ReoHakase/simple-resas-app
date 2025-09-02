import { defineConfig } from 'pncat';

export default defineConfig({
  catalogRules: [
    {
      name: 'default',
      match: [/.+/],
    },
  ],
});
