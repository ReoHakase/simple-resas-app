import type { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/routes/baseUrl';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: new URL('/', baseUrl).href,
    lastModified: new Date(),
  },
];

export default sitemap;
