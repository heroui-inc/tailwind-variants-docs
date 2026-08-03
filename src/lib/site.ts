const PRODUCTION_SITE_URL = 'https://www.tailwind-variants.org';
const APEX_SITE_URL = 'https://tailwind-variants.org';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isVercel = process.env.VERCEL === '1';

const normalizeOrigin = (value: string) => {
  const origin = value.replace(/\/$/, '');

  if (origin === APEX_SITE_URL) {
    return PRODUCTION_SITE_URL;
  }

  return origin;
};

export const siteUrl = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL
);

const getDevOrigin = () => {
  const port = process.env.PORT ?? '3000';

  return `http://localhost:${port}`;
};

export const getSiteOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (isDev) {
    return getDevOrigin();
  }

  if (process.env.VERCEL_URL) {
    return `https://${normalizeOrigin(process.env.VERCEL_URL)}`;
  }

  return siteUrl;
};

export const getAbsoluteUrl = (path: string, origin = getSiteOrigin()) => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getCanonicalUrl = (path: string) => {
  return getAbsoluteUrl(path, siteUrl);
};

export const getSiteOgImageUrl = () => {
  return getCanonicalUrl('/og');
};
