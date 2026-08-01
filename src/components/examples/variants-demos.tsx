import { tv } from 'tailwind-variants';

import { DemoRow } from '@/components/examples/demo-layout';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-medium select-none transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
      secondary:
        'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
      tertiary:
        'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
    }
  }
});

export function VariantsColorDemo() {
  return (
    <DemoRow>
      <button type="button" className={button({ variant: 'primary' })}>
        Primary
      </button>
      <button type="button" className={button({ variant: 'secondary' })}>
        Secondary
      </button>
      <button type="button" className={button({ variant: 'tertiary' })}>
        Tertiary
      </button>
    </DemoRow>
  );
}

const multiButton = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900',
      secondary:
        'border border-zinc-300 bg-zinc-50 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100',
      tertiary: 'text-zinc-700 dark:text-zinc-300'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-5 text-base'
    }
  }
});

export function VariantsMultiDemo() {
  return (
    <DemoRow align="end">
      <button
        type="button"
        className={multiButton({ variant: 'primary', size: 'sm' })}
      >
        Primary
      </button>
      <button
        type="button"
        className={multiButton({ variant: 'secondary', size: 'md' })}
      >
        Secondary
      </button>
      <button
        type="button"
        className={multiButton({ variant: 'tertiary', size: 'lg' })}
      >
        Tertiary
      </button>
    </DemoRow>
  );
}

const booleanButton = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-medium select-none',
    'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
  ],
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-45',
      false: ''
    }
  }
});

export function VariantsBooleanDemo() {
  return (
    <DemoRow>
      <button type="button" className={booleanButton({ disabled: false })}>
        Enabled
      </button>
      <button
        type="button"
        disabled
        className={booleanButton({ disabled: true })}
      >
        Disabled
      </button>
    </DemoRow>
  );
}

const badge = tv({
  base: 'inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-sm font-medium',
  variants: {
    color: {
      primary: [
        'border-zinc-300 bg-zinc-100 text-zinc-800',
        'dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100'
      ]
    }
  }
});

export function VariantsBadgeDemo() {
  return (
    <DemoRow>
      <span className={badge({ color: 'primary' })}>Primary</span>
    </DemoRow>
  );
}
