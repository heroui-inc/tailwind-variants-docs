'use client';

import type { ComponentProps } from 'react';

import Link from 'fumadocs-core/link';

import { LogoGithubIcon } from '@/components/icons';
import { iconButtonClass } from '@/lib/styles';

export const GITHUB_URL = 'https://github.com/heroui-inc/tailwind-variants';

export const GitHubIconLink = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'>) => {
  return (
    <Link
      href={GITHUB_URL}
      external
      aria-label="GitHub"
      className={iconButtonClass(className)}
      {...props}
    >
      <LogoGithubIcon size={16} className="size-4" />
    </Link>
  );
};
