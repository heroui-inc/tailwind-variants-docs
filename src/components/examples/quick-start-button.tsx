import { tv } from 'tailwind-variants';

import { DemoRow } from '@/components/examples/demo-layout';

const button = tv({
  base: 'inline-flex items-center justify-center rounded-full font-medium transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
      secondary:
        'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
      tertiary:
        'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
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

export function QuickStartButtonDemo() {
  return (
    <DemoRow className="max-w-sm flex-col items-stretch sm:max-w-none sm:flex-row sm:items-center">
      <button type="button" className={button()}>
        Default
      </button>
      <button
        type="button"
        className={button({ variant: 'secondary', size: 'sm' })}
      >
        Secondary
      </button>
      <button type="button" className={button({ class: 'w-full sm:w-auto' })}>
        Full width
      </button>
    </DemoRow>
  );
}
