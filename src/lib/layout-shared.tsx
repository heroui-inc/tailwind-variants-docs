import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { LogoGithubIcon } from '@/components/icons';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import pkg from '../../package.json';

const DEFAULT_VERSION = '0.1.14';

export function getVersion() {
  return (
    pkg.dependencies?.['tailwind-variants']?.replace(/^\^/, '') ??
    DEFAULT_VERSION
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex h-6 items-center gap-2 text-nowrap">
          <Logo height={22} width={23} className="shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Tailwind Variants
          </span>
          <span className="bg-fd-secondary text-fd-muted-foreground shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium leading-none">
            v{getVersion()}
          </span>
        </span>
      )
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs/introduction',
        active: 'nested-url',
        on: 'nav'
      },
      {
        text: 'Releases',
        url: '/docs/release-notes',
        active: 'url',
        on: 'nav'
      },
      {
        type: 'icon',
        url: 'https://github.com/heroui-inc/tailwind-variants',
        text: 'GitHub',
        label: 'GitHub',
        icon: <LogoGithubIcon size={16} className="size-4" />,
        external: true,
        on: 'nav'
      }
    ],
    slots: {
      themeSwitch: ThemeToggle
    }
  };
}
