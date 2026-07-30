import Link from 'next/link';

import { BookIcon } from '@/components/icons';
import { InstallCommand } from '@/components/landing/install-command';
import { LandingSection, SectionIntro } from '@/components/landing/section';
import { landingButtonClass } from '@/components/landing/styles';

export const LandingCta = () => {
  return (
    <LandingSection className="py-14 md:py-20">
      <SectionIntro
        align="center"
        eyebrow="Get started"
        title="Ready when you are."
        description="Ship components that stay consistent as your design system grows."
      />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/introduction"
          className={landingButtonClass({ rounded: 'xl' })}
        >
          <BookIcon size={16} className="size-4" aria-hidden />
          Getting Started
        </Link>
        <Link
          href="/docs/variants"
          className={landingButtonClass({ variant: 'outline', rounded: 'xl' })}
        >
          View Variants docs
        </Link>
      </div>

      <InstallCommand fullWidth className="mx-auto mt-10 max-w-md" />
    </LandingSection>
  );
};
