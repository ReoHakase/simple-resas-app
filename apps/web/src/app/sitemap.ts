import type { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/routes/baseUrl';

function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', baseUrl).href,
      lastModified: new Date(),
    },
  ];
}

export default sitemap;
