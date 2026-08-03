import type { Metadata } from 'next';

import {
  CoreConcepts,
  LandingCta,
  LandingFooter,
  LandingHero,
  VariantsPlayground
} from '@/components/landing';
import { getCanonicalUrl, siteUrl } from '@/lib/site';

const TITLE = 'Tailwind Variants | A first-class variant API for Tailwind CSS';
const DESCRIPTION =
  'A first-class variant API for Tailwind CSS — typed recipes, slots, and conflict-safe class merging for design systems.';

export const metadata: Metadata = {
  title: {
    absolute: TITLE
  },
  description: DESCRIPTION,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: getCanonicalUrl('/')
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION
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
