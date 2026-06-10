import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/furniture-manager', '/api/'],
    },
    sitemap: 'https://www.stupendousinterior.in/sitemap.xml',
  };
}
