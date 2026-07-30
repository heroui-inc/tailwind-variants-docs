'use client';

import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

type CodeWindowProps = {
  filename: string;
  children: ReactNode;
  className?: string;
};

export const CodeWindow = ({
  filename,
  children,
  className
}: CodeWindowProps) => {
  return (
    <div
      className={cn(
        'landing-code-window relative flex flex-col overflow-x-auto overflow-y-visible rounded-2xl border',
        'border-border bg-code-window shadow-code-window-light',
        'dark:shadow-code-window',
        className
      )}
    >
      <div className="via-primary/50 absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-separator px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-code-traffic-red" />
          <span className="size-2.5 rounded-full bg-code-traffic-yellow" />
          <span className="size-2.5 rounded-full bg-code-traffic-green" />
        </div>
        <span className="font-mono text-xs tracking-tight text-muted">
          {filename}
        </span>
      </div>
      {children}
    </div>
  );
};
