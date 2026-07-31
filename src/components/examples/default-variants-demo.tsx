import { tv } from 'tailwind-variants';

import { DemoRow } from '@/components/examples/demo-layout';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
      secondary:
        'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
      tertiary:
        'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

export function DefaultVariantsDemo() {
  return (
    <DemoRow>
      <button type="button" className={button()}>
        Primary, medium
      </button>
      <button type="button" className={button({ size: 'sm' })}>
        Primary, small
      </button>
      <button type="button" className={button({ variant: 'secondary' })}>
        Secondary, medium
      </button>
      <button
        type="button"
        className={button({ variant: 'tertiary', size: 'sm' })}
      >
        Tertiary, small
      </button>
    </DemoRow>
  );
}
