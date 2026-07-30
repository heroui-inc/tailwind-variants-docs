import { tv } from 'tailwind-variants';

import { DemoStack } from '@/components/examples/demo-layout';

const button = tv({
  base: 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white'
    }
  }
});

export function OverridesDemo() {
  return (
    <DemoStack className="max-w-md">
      <button type="button" className={button({ variant: 'primary' })}>
        Default width
      </button>
      <button
        type="button"
        className={button({ variant: 'primary', class: 'w-full' })}
      >
        Full width override
      </button>
    </DemoStack>
  );
}
