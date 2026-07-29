import Link from 'next/link';

import { BookIcon, LogoGithubIcon } from '@/components/icons';
import { HeroVisual } from '@/components/landing/hero-visual';
import { InstallCommand } from '@/components/landing/install-command';
import { LandingSection } from '@/components/landing/section';
import { landingButtonClass } from '@/components/landing/styles';

export function LandingHero() {
  return (
    <LandingSection
      border="full"
      padded={false}
      className="relative mt-4 grid min-h-svh/2 grid-cols-1 overflow-hidden lg:grid-cols-2 lg:divide-x lg:divide-fd-border"
    >
      <div className="flex flex-col px-6 py-12 md:px-12 md:py-24">
        <p className="text-fd-muted-foreground">
          By <span className="text-fd-foreground">HeroUI</span>
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          A{' '}
          <span className="bg-linear-to-b from-fd-primary to-fd-foreground/75 bg-clip-text text-transparent dark:to-white">
            first-class
          </span>{' '}
          variant API
          <br />
          for Tailwind CSS.
        </h1>
        <p className="text-fd-muted-foreground mt-8 max-w-xl text-pretty text-base sm:text-lg">
          Fully typed for TypeScript, with trusted class merging across any
          framework.
        </p>
        <div className="mt-8 mb-8 flex flex-wrap items-center gap-3">
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
        <InstallCommand />
      </div>

      <HeroVisual />
    </LandingSection>
  );
}
