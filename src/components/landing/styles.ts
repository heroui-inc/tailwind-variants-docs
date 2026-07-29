import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from 'tailwind-variants';

export const easeOut = 'duration-150 ease-out-quint';

export const interactive = 'cursor-pointer select-none';

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background';

export const focusRingAccent =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export const landingMax = 'mx-auto w-full max-w-landing';

export const sectionPad = 'px-6 md:px-12';

type LandingButtonOptions = {
  variant?: 'primary' | 'outline';
  rounded?: 'full' | 'xl';
  className?: string;
};

export function landingButtonClass({
  variant = 'primary',
  rounded = 'full',
  className
}: LandingButtonOptions = {}) {
  return cn(
    buttonVariants({
      variant,
      className: rounded === 'full' ? 'rounded-full' : 'rounded-xl'
    }),
    'inline-flex min-h-11 w-fit items-center justify-center gap-2 px-5',
    variant === 'primary' && 'text-accent-foreground',
    interactive,
    className
  );
}
