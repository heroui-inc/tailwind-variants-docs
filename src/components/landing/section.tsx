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
  'x-b': 'border-fd-border border-x border-b',
  'x-y': 'border-fd-border border-x border-y',
  full: 'border-fd-border border',
  none: null
};

export function LandingSection({
  children,
  className,
  border = 'x-b',
  padded = true
}: LandingSectionProps) {
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
}

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
  align?: 'start' | 'center';
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
  align = 'start'
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className
      )}
    >
      <p className="text-fd-primary text-sm font-medium">{eyebrow}</p>
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
          'text-fd-muted-foreground mt-4 text-pretty',
          align === 'start' ? 'max-w-xl' : 'mx-auto max-w-xl'
        )}
      >
        {description}
      </p>
    </div>
  );
}
