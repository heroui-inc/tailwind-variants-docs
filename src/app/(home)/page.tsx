import type { Metadata } from 'next';

import {
  CoreConcepts,
  LandingCta,
  LandingFooter,
  LandingHero,
  VariantsPlayground
} from '@/components/landing';

export const metadata: Metadata = {
  title: {
    absolute: 'Tailwind Variants | A first-class variant API for Tailwind CSS'
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <LandingHero />
      <VariantsPlayground />
      <CoreConcepts />
      <LandingCta />
      <LandingFooter />
    </div>
  );
}
