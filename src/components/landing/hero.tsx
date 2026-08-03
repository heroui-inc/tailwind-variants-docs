import Link from 'next/link';
import { cn } from 'tailwind-variants';

import { BookIcon, LogoGithubIcon } from '@/components/icons';
import { HeroVisual } from '@/components/landing/hero-visual';
import { InstallCommand } from '@/components/landing/install-command';
import { LandingSection } from '@/components/landing/section';
import {
  easeOut,
  interactive,
  landingButtonClass
} from '@/components/landing/styles';

export const LandingHero = () => {
  return (
    <LandingSection
      border="full"
      padded={false}
      className="relative mt-4 grid min-h-svh/2 grid-cols-1 overflow-hidden lg:grid-cols-2 lg:divide-x lg:divide-border"
    >
      <div className="flex flex-col px-6 py-12 md:px-12 md:py-24">
        <p className="text-sm font-semibold tracking-tight text-foreground">
          Tailwind Variants
          <a
            href="https://www.heroui.com/?utm_source=tailwind-variants.org"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'ms-2 font-normal text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline',
              easeOut,
              interactive
            )}
          >
            by HeroUI
          </a>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          A first-class variant API
          <br />
          for Tailwind CSS.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">
          Fully typed for TypeScript, with trusted class merging across any
          framework.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/docs/introduction" className={landingButtonClass()}>
            <BookIcon size={16} className="size-4" aria-hidden />
            Getting Started
          </Link>
          <Link
            href="https://github.com/heroui-inc/tailwind-variants"
            target="_blank"
            rel="noreferrer"
            className={landingButtonClass({ variant: 'outline' })}
          >
            <LogoGithubIcon size={16} className="size-4" aria-hidden />
            GitHub
          </Link>
        </div>
        <InstallCommand className="mt-10" />
      </div>

      <HeroVisual />
    </LandingSection>
  );
};
