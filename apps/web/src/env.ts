import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASE_URL: z.string().optional().default('resas.reoiam.dev'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VERCEL_URL: z.string().optional(),
    PORT: z.coerce.number().optional().default(3000),
  },
  client: {
    // example:
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // you'll have to destructure all the keys manually.
    // This is due to how Next.js bundles environment variables and
    // only explicitly accessed variables are included in the bundle.
    // Refer: https://env.t3.gg/docs/nextjs
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
  },
});
