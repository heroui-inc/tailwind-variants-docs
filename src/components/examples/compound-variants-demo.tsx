import { tv } from 'tailwind-variants';

import { DemoRow } from '@/components/examples/demo-layout';

const button = tv({
  base: 'inline-flex items-center justify-center rounded-full font-medium transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
      secondary:
        'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
      tertiary: 'text-zinc-600 dark:text-zinc-400'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      lg: 'h-11 px-6 text-base'
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/10'
    },
    {
      variant: 'secondary',
      size: 'lg',
      class: 'shadow-md shadow-zinc-900/10 dark:shadow-black/30'
    }
  ]
});

export function CompoundVariantsDemo() {
  return (
    <DemoRow align="end">
      <button
        type="button"
        className={button({ variant: 'primary', size: 'sm' })}
      >
        Primary sm
      </button>
      <button
        type="button"
        className={button({ variant: 'primary', size: 'lg' })}
      >
        Primary lg
      </button>
      <button
        type="button"
        className={button({ variant: 'secondary', size: 'lg' })}
      >
        Secondary lg
      </button>
      <button
        type="button"
        className={button({ variant: 'tertiary', size: 'lg' })}
      >
        Tertiary lg
      </button>
    </DemoRow>
  );
}
