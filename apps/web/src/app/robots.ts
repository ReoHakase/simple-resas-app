import type { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/routes/baseUrl';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api', '/_next'],
  },
  sitemap: new URL('/sitemap.xml', baseUrl).href,
});

export default robots;
