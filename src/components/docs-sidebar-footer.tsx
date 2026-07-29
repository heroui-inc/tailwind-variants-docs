'use client';

import { LogoGithubIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';

export function DocsSidebarFooter() {
  return (
    <div className="flex h-9 items-center justify-between gap-2 border-t border-zinc-200/60 pt-3 dark:border-zinc-800/80">
      <a
        href="https://github.com/heroui-inc/tailwind-variants"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-fd-muted-foreground inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:text-fd-foreground"
      >
        <LogoGithubIcon size={16} />
      </a>
      <ThemeToggle
        mode="light-dark-system"
        className="text-fd-muted-foreground"
      />
    </div>
  );
}
