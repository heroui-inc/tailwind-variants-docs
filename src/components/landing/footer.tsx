import { cn } from 'tailwind-variants';

import { HeroUILogo } from '@/components/heroui-logo';
import { easeOut, interactive, landingMax } from '@/components/landing/styles';

const links = [
  { href: 'https://x.com/hero_ui', label: 'Twitter', external: true },
  { href: 'https://discord.gg/9b6yyZKmH4', label: 'Discord', external: true },
  { href: 'https://github.com/heroui-inc', label: 'GitHub', external: true }
] as const;

export const LandingFooter = () => {
  return (
    <footer className="px-6 py-10 md:py-12">
      <div
        className={cn(
          landingMax,
          'text-muted grid grid-cols-1 items-center gap-4 text-sm sm:grid-cols-3'
        )}
      >
        <a
          href="https://www.heroui.com/?utm_source=tailwind-variants.org"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex w-fit items-center justify-center gap-2 justify-self-center text-foreground transition-opacity hover:opacity-80 sm:justify-self-start',
            interactive
          )}
          title="HeroUI homepage"
        >
          <span>Powered by</span>
          <HeroUILogo size={20} className="text-foreground" />
        </a>

        <p className="text-center">
          &copy; {new Date().getFullYear()} NextUI Inc.
        </p>

        <nav
          className="flex w-fit flex-wrap items-center justify-center gap-4 justify-self-center sm:justify-self-end"
          aria-label="Footer"
        >
          {links.map(({ href, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={cn(
                'transition-colors hover:text-foreground',
                easeOut,
                interactive
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
