import type { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/routes/baseUrl';

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/_next'],
    },
    sitemap: new URL('/sitemap.xml', baseUrl).href,
  };
}

export default robots;
