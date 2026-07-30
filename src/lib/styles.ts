import { cn } from 'tailwind-variants';

export const easeOut = 'duration-150 ease-out';

export const interactive = 'cursor-pointer select-none';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export const iconButtonClass = (className?: string) => {
  return cn(
    'inline-flex size-8 shrink-0 items-center justify-center rounded-md',
    'text-muted transition-colors',
    'hover:bg-default hover:text-foreground',
    'active:bg-default/80',
    interactive,
    focusRing,
    easeOut,
    className
  );
};

export const popoverContentClass = (className?: string) => {
  return cn(
    'select-none border-border bg-surface text-foreground shadow-lg',
    className
  );
};
