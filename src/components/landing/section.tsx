import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

import { landingMax, sectionPad } from '@/components/landing/styles';

type Border = 'x-b' | 'x-y' | 'full' | 'none';

type LandingSectionProps = {
  children: ReactNode;
  className?: string;
  border?: Border;
  padded?: boolean;
};

const borderClass: Record<Border, string | null> = {
  'x-b': 'border-border border-b md:border-x',
  'x-y': 'border-border border-y md:border-x',
  full: 'border-border border-b md:border',
  none: null
};

export const LandingSection = ({
  children,
  className,
  border = 'x-b',
  padded = true
}: LandingSectionProps) => {
  return (
    <section
      className={cn(
        landingMax,
        padded && sectionPad,
        borderClass[border],
        className
      )}
    >
      {children}
    </section>
  );
};

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
  align?: 'start' | 'center';
};

export const SectionIntro = ({
  eyebrow,
  title,
  description,
  className,
  align = 'start'
}: SectionIntroProps) => {
  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className
      )}
    >
      <p className="text-primary text-sm font-medium">{eyebrow}</p>
      <h2
        className={cn(
          'mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl',
          align === 'start' && 'max-w-lg'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'mt-4 text-pretty text-muted',
          align === 'start' ? 'max-w-xl' : 'mx-auto max-w-xl'
        )}
      >
        {description}
      </p>
    </div>
  );
};
