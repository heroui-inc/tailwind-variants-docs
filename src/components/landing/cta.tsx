import Link from 'next/link';

import { BookIcon } from '@/components/icons';
import { LandingSection, SectionIntro } from '@/components/landing/section';
import { landingButtonClass } from '@/components/landing/styles';

export const LandingCta = () => {
  return (
    <LandingSection className="py-14 md:py-20">
      <SectionIntro
        align="center"
        eyebrow="Docs"
        title="Open the variants guide."
        description="Learn the API with typed recipes, slots, and compound styles — then copy the patterns into your design system."
      />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/docs/variants" className={landingButtonClass()}>
          <BookIcon size={16} className="size-4" aria-hidden />
          Variants docs
        </Link>
        <Link
          href="/docs/introduction"
          className={landingButtonClass({ variant: 'outline' })}
        >
          Start from the beginning
        </Link>
      </div>
    </LandingSection>
  );
};
