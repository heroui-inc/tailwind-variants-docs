import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

/** Shared layout for demo rows — enables Emil-style stagger entrance. */
export function DemoRow({
  children,
  className,
  align = 'center'
}: {
  children: ReactNode;
  className?: string;
  align?: 'center' | 'end' | 'stretch';
}) {
  return (
    <div
      className={cn(
        'demo-stagger flex w-full flex-wrap gap-3',
        align === 'center' && 'items-center justify-center',
        align === 'end' && 'items-end justify-center',
        align === 'stretch' && 'items-stretch justify-center',
        className
      )}
    >
      {children}
    </div>
  );
}

export function DemoStack({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'demo-stagger flex w-full flex-col items-center gap-3',
        className
      )}
    >
      {children}
    </div>
  );
}
