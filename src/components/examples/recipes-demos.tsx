import { tv } from 'tailwind-variants';

import { DemoRow, DemoStack } from '@/components/examples/demo-layout';

const button = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center gap-2 select-none',
    'rounded-lg font-medium transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
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
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'shadow-lg shadow-zinc-900/15 dark:shadow-zinc-100/10'
    },
    {
      variant: 'secondary',
      size: 'lg',
      class: 'shadow-sm'
    }
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

export function RecipesButtonDemo() {
  return (
    <DemoStack>
      <DemoRow className="gap-2">
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
      <DemoRow className="gap-2" align="end">
        <button
          type="button"
          className={button({ variant: 'primary', size: 'sm' })}
        >
          Small
        </button>
        <button type="button" className={button({ size: 'md' })}>
          Medium
        </button>
        <button
          type="button"
          className={button({ variant: 'primary', size: 'lg' })}
        >
          Large
        </button>
      </DemoRow>
    </DemoStack>
  );
}

const alert = tv({
  slots: {
    base: 'flex w-full max-w-md gap-3 rounded-lg p-4 border',
    icon: 'size-5 shrink-0 mt-0.5',
    content: 'flex-1 min-w-0',
    title: 'font-semibold leading-snug',
    description: 'text-sm mt-1 opacity-90'
  },
  variants: {
    color: {
      default: {
        base: 'bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100',
        icon: 'text-zinc-500'
      },
      success: {
        base: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/40 dark:border-green-800 dark:text-green-100',
        icon: 'text-green-600'
      },
      warning: {
        base: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-100',
        icon: 'text-amber-600'
      },
      danger: {
        base: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-100',
        icon: 'text-red-600'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

function AlertGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function RecipesAlertDemo() {
  const colors = ['default', 'success', 'warning', 'danger'] as const;

  return (
    <DemoStack className="gap-2.5">
      {colors.map((color) => {
        const slots = alert({ color });
        return (
          <div key={color} className={slots.base()}>
            <AlertGlyph className={slots.icon()} />
            <div className={slots.content()}>
              <p className={slots.title()}>{color}</p>
              <p className={slots.description()}>
                Alert recipe with independent slots.
              </p>
            </div>
          </div>
        );
      })}
    </DemoStack>
  );
}

const badge = tv({
  base: 'inline-flex select-none items-center rounded-full font-medium',
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: 'border bg-transparent'
    },
    color: {
      default: '',
      primary: '',
      success: '',
      danger: ''
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm'
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'default',
      class: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
    },
    { variant: 'solid', color: 'primary', class: 'bg-blue-600 text-white' },
    { variant: 'solid', color: 'success', class: 'bg-green-600 text-white' },
    { variant: 'solid', color: 'danger', class: 'bg-red-600 text-white' },
    {
      variant: 'soft',
      color: 'default',
      class: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
    },
    {
      variant: 'soft',
      color: 'primary',
      class: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      variant: 'outline',
      color: 'default',
      class:
        'border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-200'
    },
    {
      variant: 'outline',
      color: 'primary',
      class:
        'border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300'
    }
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'default',
    size: 'sm'
  }
});

export function RecipesBadgeDemo() {
  return (
    <DemoStack>
      <DemoRow className="gap-2">
        <span className={badge()}>Default soft</span>
        <span className={badge({ color: 'primary' })}>Primary soft</span>
        <span className={badge({ variant: 'solid', color: 'success' })}>
          Success
        </span>
        <span className={badge({ variant: 'solid', color: 'danger' })}>
          Danger
        </span>
      </DemoRow>
      <DemoRow className="gap-2">
        <span className={badge({ variant: 'outline', color: 'default' })}>
          Outline
        </span>
        <span className={badge({ variant: 'outline', color: 'primary' })}>
          Outline primary
        </span>
        <span
          className={badge({ variant: 'solid', color: 'primary', size: 'md' })}
        >
          Medium
        </span>
      </DemoRow>
    </DemoStack>
  );
}
