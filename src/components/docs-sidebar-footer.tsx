'use client';

import { LogoGithubIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';

export function DocsSidebarFooter() {
  return (
    <div className="flex h-9 items-center justify-between gap-2 border-t border-separator pt-3">
      <a
        href="https://github.com/heroui-inc/tailwind-variants"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:text-foreground"
      >
        <LogoGithubIcon size={16} />
      </a>
      <ThemeToggle mode="light-dark-system" className="text-muted" />
    </div>
  );
}
