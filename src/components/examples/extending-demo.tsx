import { tv } from 'tailwind-variants';

import { DemoRow } from '@/components/examples/demo-layout';

const baseButton = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
      secondary:
        'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
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

const iconButton = tv({
  extend: baseButton,
  base: 'gap-2',
  variants: {
    iconOnly: {
      true: 'aspect-square px-0',
      false: ''
    }
  }
});

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
    </svg>
  );
}

export function ExtendingDemo() {
  return (
    <DemoRow>
      <button type="button" className={baseButton()}>
        Base button
      </button>
      <button type="button" className={iconButton({ iconOnly: false })}>
        <StarIcon className="size-4" />
        With icon
      </button>
      <button
        type="button"
        aria-label="Icon only"
        className={iconButton({ variant: 'secondary', iconOnly: true })}
      >
        <StarIcon className="size-4" />
      </button>
    </DemoRow>
  );
}
