'use client';

import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

type CodeWindowProps = {
  filename: string;
  children: ReactNode;
  className?: string;
};

export function CodeWindow({ filename, children, className }: CodeWindowProps) {
  return (
    <div
      className={cn(
        'landing-code-window relative flex flex-col overflow-x-auto overflow-y-visible rounded-2xl border',
        'border-zinc-200/90 bg-zinc-50 shadow-code-window-light',
        'dark:border-white/10 dark:bg-zinc-950 dark:shadow-code-window',
        className
      )}
    >
      <div className="via-fd-primary/60 absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-zinc-200/80 px-4 py-3 dark:border-white/5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(67%_0.18_24)]" />
          <span className="size-2.5 rounded-full bg-[oklch(76%_0.15_82)]" />
          <span className="size-2.5 rounded-full bg-[oklch(70%_0.17_150)]" />
        </div>
        <span className="font-mono text-xs tracking-tight text-zinc-500">
          {filename}
        </span>
      </div>
      {children}
    </div>
  );
}
