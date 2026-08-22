import type { Metadata } from 'next';

import {
  CoreConcepts,
  LandingCta,
  LandingFooter,
  LandingHero,
  VariantsPlayground
} from '@/components/landing';
import { getCanonicalUrl, getSiteOgImageUrl, siteUrl } from '@/lib/site';

const TITLE = 'Tailwind Variants | A first-class variant API for Tailwind CSS';
const DESCRIPTION =
  'A first-class variant API for Tailwind CSS — typed recipes, slots, and conflict-safe class merging for design systems.';
const IMAGE = getSiteOgImageUrl();

// Page metadata replaces the root layout values per key, so openGraph and
// twitter must restate type, locale, and images.
export const metadata: Metadata = {
  title: {
    absolute: TITLE
  },
  description: DESCRIPTION,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Tailwind Variants',
    title: TITLE,
    description: DESCRIPTION,
    url: getCanonicalUrl('/'),
    images: [
      {
        url: IMAGE,
        width: 1200,
        height: 630,
        alt: 'Tailwind Variants'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hero_ui',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: IMAGE,
        alt: 'Tailwind Variants'
      }
    ]
  }
};

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <LandingHero />
      <VariantsPlayground />
      <CoreConcepts />
      <LandingCta />
      <LandingFooter />
    </div>
  );
};

export default HomePage;
