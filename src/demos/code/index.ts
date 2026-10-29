export const introButton = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100',
      tertiary: 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950'
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
});`;

export const quickStartButton = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100',
      tertiary: 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950'
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

<button className={button()}>Default button</button>
<button className={button({ variant: 'secondary', size: 'sm' })}>
  Click me
</button>
<button className={button({ class: 'w-full' })}>Full width</button>`;

export const variantsColor = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100',
      tertiary: 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950'
    }
  }
});

button({ variant: 'secondary' });`;

export const variantsMulti = `const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-5 text-base'
    }
  }
});

button({ variant: 'primary', size: 'lg' });`;

export const variantsBoolean = `const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white select-none',
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-45',
      false: ''
    }
  }
});

button({ disabled: true });`;

export const variantsBadge = `const badge = tv({
  base: 'inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-sm font-medium',
  variants: {
    color: {
      primary: ['bg-zinc-100', 'text-zinc-800', 'border-zinc-300']
    }
  }
});`;

export const defaultVariants = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700'
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

<button className={button()}>Primary, medium</button>
<button className={button({ size: 'sm' })}>Primary, small</button>
<button className={button({ variant: 'secondary' })}>Secondary, medium</button>`;

export const compoundVariants = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700'
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
      class: 'shadow-lg shadow-zinc-900/20'
    },
    {
      variant: 'secondary',
      size: 'lg',
      className: 'shadow-md shadow-zinc-900/10'
    }
  ]
});`;

export const slotsAlert = `import { tv } from 'tailwind-variants';

const alert = tv({
  slots: {
    base: 'flex gap-3 rounded-lg p-4',
    icon: 'size-5 shrink-0',
    title: 'font-semibold',
    description: 'text-sm opacity-80'
  },
  variants: {
    color: {
      default: {
        base: 'bg-zinc-100 text-zinc-900',
        icon: 'text-zinc-500',
        title: 'text-zinc-900'
      },
      danger: {
        base: 'bg-red-50 text-red-900',
        icon: 'text-red-500',
        title: 'text-red-900'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

const slots = alert({ color: 'danger' });
slots.base();
slots.icon();`;

export const slotsCompound = `const card = tv({
  slots: { base: 'rounded-xl p-4', header: 'font-bold' },
  variants: {
    elevated: { true: {}, false: {} }
  },
  compoundSlots: [
    {
      elevated: true,
      slots: ['base'],
      class: 'shadow-lg'
    }
  ]
});`;

export const overridesButton = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-sm font-medium select-none',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white'
    }
  }
});

button({ variant: 'primary' });
button({ variant: 'primary', class: 'w-full' });`;

export const extendingButton = `import { tv } from 'tailwind-variants';

const baseButton = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700'
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
});`;

export const extendingMultiButton = `import { tv } from 'tailwind-variants';

const focusRing = tv({
  base: 'outline-none focus-visible:ring-2 focus-visible:ring-zinc-400'
});

const pressable = tv({
  base: 'transition active:scale-95'
});

const baseButton = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700'
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

const actionButton = tv({
  extend: [baseButton, focusRing, pressable]
});

actionButton(); // base + focus ring + press feedback
actionButton({ variant: 'secondary' });`;

export const recipesButton = `import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center gap-2 select-none',
    'rounded-lg font-medium transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100',
      tertiary: 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    }
  },
  compoundVariants: [
    { variant: 'primary', size: 'lg', class: 'shadow-lg shadow-zinc-900/15' },
    { variant: 'secondary', size: 'lg', class: 'shadow-sm' }
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

export type ButtonVariants = VariantProps<typeof button>;`;

export const recipesAlert = `import { tv, type VariantProps } from 'tailwind-variants';

export const alert = tv({
  slots: {
    base: 'flex gap-3 rounded-lg p-4 border',
    icon: 'size-5 shrink-0 mt-0.5',
    content: 'flex-1 min-w-0',
    title: 'font-semibold leading-snug',
    description: 'text-sm mt-1 opacity-90'
  },
  variants: {
    color: {
      default: {
        base: 'bg-zinc-50 border-zinc-200 text-zinc-900',
        icon: 'text-zinc-500'
      },
      success: {
        base: 'bg-green-50 border-green-200 text-green-900',
        icon: 'text-green-600'
      },
      warning: {
        base: 'bg-amber-50 border-amber-200 text-amber-900',
        icon: 'text-amber-600'
      },
      danger: {
        base: 'bg-red-50 border-red-200 text-red-900',
        icon: 'text-red-600'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

export type AlertVariants = VariantProps<typeof alert>;`;

export const recipesBadge = `import { tv, type VariantProps } from 'tailwind-variants';

export const badge = tv({
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
    { variant: 'solid', color: 'default', class: 'bg-zinc-900 text-white' },
    { variant: 'solid', color: 'primary', class: 'bg-blue-600 text-white' },
    { variant: 'solid', color: 'success', class: 'bg-green-600 text-white' },
    { variant: 'solid', color: 'danger', class: 'bg-red-600 text-white' },
    { variant: 'soft', color: 'default', class: 'bg-zinc-100 text-zinc-700' },
    { variant: 'soft', color: 'primary', class: 'bg-blue-100 text-blue-700' },
    { variant: 'outline', color: 'default', class: 'border-zinc-300 text-zinc-700' },
    { variant: 'outline', color: 'primary', class: 'border-blue-300 text-blue-700' }
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'default',
    size: 'sm'
  }
});

export type BadgeVariants = VariantProps<typeof badge>;`;

export const responsiveBase = `import { tv } from 'tailwind-variants';

const stay = tv({
  base: 'rounded-xl border p-3.5 sm:p-4 md:p-5'
});

const media = tv({
  base: 'flex h-28 items-center justify-center rounded-lg bg-zinc-100 sm:h-36 md:h-40'
});

const details = tv({
  base: [
    'mt-3 flex flex-col gap-2.5',
    'sm:mt-3.5 sm:flex-row sm:items-end sm:justify-between'
  ]
});

const place = tv({
  base: 'text-[0.9375rem] font-semibold tracking-tight sm:text-lg md:text-xl'
});

const price = tv({
  base: 'text-[0.8125rem] sm:shrink-0 sm:text-right sm:text-sm'
});`;

export const responsiveVariants = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium select-none transition-colors',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'border border-zinc-300 bg-zinc-50 text-zinc-900',
      tertiary: 'text-zinc-700 hover:bg-zinc-200/70'
    },
    size: {
      sm: 'h-9 px-3 text-[0.8125rem] sm:px-3.5 sm:text-sm',
      lg: 'h-10 w-full px-4 text-sm sm:w-auto sm:min-w-36'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm'
  }
});

button({ size: 'lg' });
// full-width CTA → inline from sm`;

export const responsiveSlots = `import { tv } from 'tailwind-variants';

const event = tv({
  slots: {
    root: [
      'flex flex-col gap-3.5 rounded-xl border p-3.5 sm:p-4',
      'md:flex-row md:items-center md:gap-4'
    ],
    time: [
      'flex w-fit flex-col self-start rounded-lg bg-zinc-100 px-3 py-2.5',
      'md:min-w-[4.5rem] md:items-center md:self-auto md:px-2.5 md:py-3'
    ],
    hour: 'text-sm font-semibold tracking-tight sm:text-[0.9375rem]',
    day: 'mt-0.5 text-[0.6875rem] text-zinc-500',
    body: [
      'flex min-w-0 flex-1 flex-col gap-0.5',
      'sm:flex-row sm:items-baseline sm:gap-2',
      'md:flex-col md:items-stretch md:gap-0.5'
    ],
    title: 'shrink-0 text-[0.875rem] font-medium sm:text-[0.9375rem]',
    place: [
      'min-w-0 text-[0.75rem] text-zinc-500',
      'sm:truncate sm:text-[0.8125rem]',
      'md:overflow-visible md:text-clip'
    ],
    actions: 'flex w-full gap-2 md:w-auto md:shrink-0'
  }
});

const { root, time, hour, day, body, title, place, actions } = event();`;
