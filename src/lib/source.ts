import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';

import { getCanonicalUrl } from '@/lib/site';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource()
});

export const getPageImageUrl = (page: (typeof source)['$inferPage']) => {
  const segments = [...page.slugs, 'image.webp'];
  const path = `/${['og', 'docs', ...segments].join('/')}`;

  return {
    segments,
    path,
    url: getCanonicalUrl(path)
  };
};
