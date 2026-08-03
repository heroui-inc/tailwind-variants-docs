import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

type ContextualSwapIconProps = {
  active: boolean;
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
  className?: string;
};

/**
 * Contextual icon enter/exit without a motion library.
 * Both glyphs stay mounted so the swap is interruptible.
 */
export const ContextualSwapIcon = ({
  active,
  activeIcon,
  inactiveIcon,
  className
}: ContextualSwapIconProps) => {
  const layer = cn(
    'absolute inset-0 flex items-center justify-center',
    'transition-[opacity,filter,transform] duration-300',
    '[transition-timing-function:cubic-bezier(0.2,0,0,1)]',
    'motion-reduce:transition-none'
  );

  return (
    <span
      className={cn(
        'relative inline-flex size-4 shrink-0 items-center justify-center',
        className
      )}
    >
      <span
        aria-hidden={!active}
        className={cn(
          layer,
          active
            ? 'scale-100 opacity-100 blur-0'
            : 'pointer-events-none scale-[0.25] opacity-0 blur-[4px] motion-reduce:scale-100'
        )}
      >
        {activeIcon}
      </span>
      <span
        aria-hidden={active}
        className={cn(
          layer,
          active
            ? 'pointer-events-none scale-[0.25] opacity-0 blur-[4px] motion-reduce:scale-100'
            : 'scale-100 opacity-100 blur-0'
        )}
      >
        {inactiveIcon}
      </span>
    </span>
  );
};
