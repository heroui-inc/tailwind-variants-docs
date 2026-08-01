import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from 'tailwind-variants';

import { interactive } from '@/lib/styles';

export { easeOut, focusRing, interactive } from '@/lib/styles';

export const landingMax = 'mx-auto w-full max-w-landing';

export const sectionPad = 'px-6 md:px-12';

type LandingButtonOptions = {
  variant?: 'primary' | 'outline';
  className?: string;
};

export const landingButtonClass = ({
  variant = 'primary',
  className
}: LandingButtonOptions = {}) => {
  return cn(
    buttonVariants({
      variant,
      className: 'rounded-xl'
    }),
    'inline-flex min-h-11 w-fit items-center justify-center gap-2 px-5',
    variant === 'primary' && 'text-primary-foreground',
    interactive,
    className
  );
};
