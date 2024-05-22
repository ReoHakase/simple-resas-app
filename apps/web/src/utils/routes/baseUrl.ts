import { env } from '@/env';
// When VERCEL_URL is detected: https://${process.env.VERCEL_URL}
// If there's no environment variable VERCEL_URL is set, will always fallback to http://localhost:${process.env.PORT || 3000}.
// Refer: https://beta.nextjs.org/docs/api-reference/metadata#metadatabase

/**
 * Returns the base URL based on the current environment.
 * If it is production, it will return `https://${process.env.BASE_URL}`. default: `https://resas.reoiam.dev`
 * If it is development, it will return `https://${process.env.VERCEL_URL}`. default: `http://localhost:${process.env.PORT || 3000}`
 *
 * @returns {URL} The base URL.
 */
const getBaseUrl = (): URL => {
  if (env.NODE_ENV === 'production') {
    return new URL(`https://${env.BASE_URL}`);
  }
  if (env.VERCEL_URL) {
    return new URL(`https://${env.VERCEL_URL}`);
  }
  return new URL(`http://localhost:${env.PORT}`);
};

/**
 * The base URL based on the current environment.
 * If it is production, it will return `https://${process.env.BASE_URL}`. default: `https://resas.reoiam.dev`
 * If it is development, it will return `https://${process.env.VERCEL_URL}`. default: `http://localhost:${process.env.PORT || 3000}`
 */
export const baseUrl = getBaseUrl();
