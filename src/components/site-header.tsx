'use client';

import type { ComponentProps } from 'react';

import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'fumadocs-ui/components/ui/popover';
import { SidebarTrigger } from 'fumadocs-ui/layouts/notebook/slots/sidebar';
import { useState } from 'react';
import { cn } from 'tailwind-variants';

import { GitHubIconLink } from '@/components/header-actions';
import { HeroUIIsotipo } from '@/components/heroui-logo';
import { ChevronDownIcon } from '@/components/icons';
import { Logo } from '@/components/logo';
import {
  SearchTriggerFull,
  SearchTriggerSm
} from '@/components/search-trigger';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  iconButtonClass,
  interactive,
  popoverContentClass
} from '@/lib/styles';
import pkg from '../../package.json';

const DEFAULT_VERSION = '0.1.14';

const getVersion = () => {
  return (
    pkg.dependencies?.['tailwind-variants']?.replace(/^\^/, '') ??
    DEFAULT_VERSION
  );
};

const homeLinks = [
  {
    text: 'Documentation',
    url: '/docs/introduction'
  }
];

const isDocsActive = (pathname: string) => {
  return pathname.startsWith('/docs');
};

const Brand = () => {
  return (
    <div className="inline-flex items-center gap-2.5 font-semibold text-foreground">
      <a
        href="https://www.heroui.com/?utm_source=tailwind-variants.org"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex shrink-0 transition-opacity hover:opacity-80',
          interactive
        )}
        title="HeroUI homepage"
      >
        <HeroUIIsotipo height={22} className="shrink-0" />
        <span className="sr-only">HeroUI</span>
      </a>
      <svg
        aria-hidden
        className="size-4 shrink-0 text-muted"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
        />
      </svg>
      <Link href="/" className="inline-flex h-6 items-center gap-2 text-nowrap">
        <Logo height={22} width={23} className="shrink-0" />
        <span className="text-sm font-semibold tracking-tight">
          Tailwind Variants
        </span>
        <span className="bg-default text-muted shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs font-medium leading-none tabular-nums">
          v{getVersion()}
        </span>
      </Link>
    </div>
  );
};

const HomeNavLinks = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2 px-6 max-sm:hidden',
        className
      )}
    >
      {homeLinks.map((item) => {
        const active = isDocsActive(pathname);

        return (
          <Link
            key={item.url}
            href={item.url}
            data-active={active}
            className={cn(
              'inline-flex items-center gap-1 p-2 text-sm text-muted transition-colors',
              'hover:text-foreground data-[active=true]:text-foreground data-[active=true]:font-medium'
            )}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
};

const HomeMobileMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Toggle Menu"
        className={cn(
          buttonVariants({
            size: 'icon',
            color: 'ghost',
            className: 'group [&_svg]:size-5.5'
          })
        )}
      >
        <ChevronDownIcon
          size={20}
          className="size-5.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={popoverContentClass('flex w-64 flex-col gap-3 p-4')}
      >
        <div className="flex flex-col gap-1 sm:hidden">
          {homeLinks.map((item) => {
            const active = isDocsActive(pathname);

            return (
              <Link
                key={item.url}
                href={item.url}
                data-active={active}
                onClick={() => setOpen(false)}
                className={cn(
                  'inline-flex cursor-pointer select-none items-center gap-2 py-1.5 text-sm transition-colors',
                  'hover:text-foreground/70 data-[active=true]:font-medium data-[active=true]:text-foreground'
                )}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5">
          <GitHubIconLink />
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DocsMobileSidebar = () => {
  return (
    <SidebarTrigger
      aria-label="Open Sidebar"
      className={iconButtonClass('lg:hidden')}
    >
      <svg
        viewBox="0 0 16 16"
        width={16}
        height={16}
        fill="currentColor"
        aria-hidden
        className="size-4"
      >
        <path d="M2 3.25h12v1.5H2v-1.5Zm0 4h12v1.5H2V7.25Zm0 4h12v1.5H2v-1.5Z" />
      </svg>
    </SidebarTrigger>
  );
};

const DocsMobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Toggle Menu"
        className={cn(
          buttonVariants({
            size: 'icon',
            color: 'ghost',
            className: 'group [&_svg]:size-5.5'
          })
        )}
      >
        <ChevronDownIcon
          size={20}
          className="size-5.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={popoverContentClass('flex w-56 flex-col gap-3 p-4')}
      >
        <div className="flex items-center gap-1.5">
          <GitHubIconLink />
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const HeaderShell = ({
  variant,
  children,
  ...props
}: ComponentProps<'header'> & { variant: 'home' | 'docs' }) => {
  return (
    <header
      id={variant === 'home' ? 'nd-nav' : 'nd-subnav'}
      {...props}
      className={cn(
        'sticky overflow-x-clip',
        variant === 'home' && 'top-0 z-40',
        variant === 'docs' &&
          // +1px so sticky offset includes border-b
          'top-(--fd-docs-row-1) z-30 col-span-full row-start-1 layout:[--fd-header-height:calc(--spacing(14)+1px)]',
        props.className
      )}
    >
      <div
        data-header-body=""
        className="border-border relative border-b bg-background"
      >
        <div className="mx-auto flex h-14 w-full max-w-(--fd-layout-width) items-center px-4">
          {children}
        </div>
      </div>
    </header>
  );
};

export type SiteHeaderProps = {
  variant: 'home' | 'docs';
};

export const SiteHeader = ({ variant }: SiteHeaderProps) => {
  return (
    <HeaderShell variant={variant}>
      <Brand />

      {variant === 'home' ? <HomeNavLinks /> : null}

      <div className="ms-auto flex flex-row items-center gap-1.5">
        {variant === 'docs' ? (
          <>
            <SearchTriggerFull
              hideIfDisabled
              className="me-1 hidden w-44 lg:flex xl:w-56"
            />
            <DocsMobileSidebar />
          </>
        ) : null}

        <div className="hidden items-center gap-1.5 md:flex">
          {variant === 'docs' ? (
            <SearchTriggerSm className="lg:hidden" hideIfDisabled />
          ) : (
            <SearchTriggerSm hideIfDisabled />
          )}
          <GitHubIconLink />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <SearchTriggerSm hideIfDisabled />
          {variant === 'home' ? <HomeMobileMenu /> : <DocsMobileMenu />}
        </div>
      </div>
    </HeaderShell>
  );
};

export { getVersion };
