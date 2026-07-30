import { tv } from 'tailwind-variants';

import { PictureIcon } from '@/components/icons';

const stay = tv({
  base: [
    'w-full overflow-hidden rounded-xl border border-border bg-surface',
    'p-3.5 sm:p-4 md:p-5'
  ]
});

const media = tv({
  base: [
    'flex items-center justify-center rounded-lg bg-default text-subtle',
    'h-28 sm:h-36 md:h-40'
  ]
});

const details = tv({
  base: [
    'mt-3 flex flex-col gap-2.5',
    'sm:mt-3.5 sm:flex-row sm:items-end sm:justify-between sm:gap-6',
    'md:mt-4'
  ]
});

const copy = tv({
  base: 'min-w-0'
});

const place = tv({
  base: [
    'font-semibold tracking-tight text-foreground',
    'text-[0.9375rem] sm:text-lg md:text-xl'
  ]
});

const meta = tv({
  base: [
    'mt-1 text-muted',
    'text-[0.75rem]/relaxed sm:text-[0.8125rem]/relaxed'
  ]
});

const price = tv({
  base: [
    'text-foreground',
    'text-[0.8125rem] sm:shrink-0 sm:text-right sm:text-sm'
  ]
});

export function ResponsiveBaseDemo() {
  return (
    <article className={stay()}>
      <div className={media()} aria-hidden>
        <PictureIcon className="size-6 opacity-70 sm:size-7" />
      </div>
      <div className={details()}>
        <div className={copy()}>
          <h3 className={place()}>Harbor loft · Lisbon</h3>
          <p className={meta()}>2 guests · River view · Self check-in</p>
        </div>
        <p className={price()}>
          <span className="font-semibold">$148</span>
          <span className="text-muted"> / night</span>
        </p>
      </div>
    </article>
  );
}

const order = tv({
  base: [
    'flex w-full flex-col rounded-xl border border-border bg-surface',
    'gap-3.5 p-3.5 sm:gap-4 sm:p-4'
  ]
});

const summary = tv({
  base: 'flex items-start justify-between gap-3'
});

const label = tv({
  base: 'text-[0.8125rem] leading-snug text-muted sm:text-sm'
});

const total = tv({
  base: [
    'shrink-0 font-semibold tracking-tight text-foreground',
    'text-lg sm:text-xl'
  ]
});

const button = tv({
  base: [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'transition-colors duration-150'
  ],
  variants: {
    variant: {
      primary: 'bg-foreground text-background hover:opacity-90',
      secondary: 'bg-default text-foreground hover:bg-border/70',
      tertiary:
        'bg-transparent text-muted hover:bg-default hover:text-foreground'
    },
    size: {
      sm: ['h-9 px-3 text-[0.8125rem]', 'sm:h-9 sm:px-3.5 sm:text-sm'],
      lg: ['h-10 w-full px-4 text-sm', 'sm:h-10 sm:w-auto sm:min-w-36 sm:px-4']
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm'
  }
});

export function ResponsiveVariantsDemo() {
  return (
    <div className={order()}>
      <div className={summary()}>
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium text-foreground sm:text-sm">
            Green bowl · pickup
          </p>
          <p className={label()}>Ready in about 15 minutes</p>
        </div>
        <p className={total()}>$18.40</p>
      </div>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
        <button
          type="button"
          className={button({ variant: 'tertiary', size: 'sm' })}
        >
          Edit order
        </button>
        <button type="button" className={button({ size: 'lg' })}>
          Place order
        </button>
      </div>
    </div>
  );
}

const event = tv({
  slots: {
    root: [
      'flex w-full flex-col gap-3.5 rounded-xl border border-border bg-surface',
      'p-3.5 sm:gap-3 sm:p-4',
      'md:flex-row md:items-center md:gap-4'
    ],
    time: [
      'flex w-fit shrink-0 flex-col justify-center self-start rounded-lg bg-default',
      'px-3 py-2.5',
      'md:min-w-[4.5rem] md:items-center md:self-auto md:px-2.5 md:py-3'
    ],
    hour: [
      'font-semibold tracking-tight text-foreground',
      'text-sm sm:text-[0.9375rem]'
    ],
    day: 'mt-0.5 text-[0.6875rem] text-subtle sm:text-[0.75rem]',
    body: [
      'flex min-w-0 flex-1 flex-col gap-0.5',
      'sm:flex-row sm:items-baseline sm:gap-2',
      'md:flex-col md:items-stretch md:gap-0.5'
    ],
    title: [
      'shrink-0 font-medium text-foreground',
      'text-[0.875rem] sm:text-[0.9375rem]'
    ],
    place: [
      'min-w-0 text-[0.75rem] text-muted',
      'sm:truncate sm:text-[0.8125rem]',
      'md:overflow-visible md:text-clip'
    ],
    actions: ['flex w-full gap-2', 'md:w-auto md:shrink-0']
  }
});

const eventAction = tv({
  base: [
    'inline-flex h-9 flex-1 items-center justify-center rounded-lg px-3',
    'text-[0.8125rem] font-medium transition-colors duration-150',
    'sm:text-sm sm:px-3.5',
    'md:flex-none'
  ],
  variants: {
    variant: {
      primary: 'bg-foreground text-background hover:opacity-90',
      secondary: 'bg-default text-foreground hover:bg-border/70'
    }
  }
});
export function ResponsiveSlotsDemo() {
  const slots = event();

  return (
    <div className={slots.root()}>
      <div className={slots.time()}>
        <span className={slots.hour()}>9:30</span>
        <span className={slots.day()}>Tue</span>
      </div>
      <div className={slots.body()}>
        <p className={slots.title()}>Studio walkthrough</p>
        <p className={slots.place()}>Room 4B · 45 min</p>
      </div>
      <div className={slots.actions()}>
        <button type="button" className={eventAction({ variant: 'secondary' })}>
          Details
        </button>
        <button type="button" className={eventAction({ variant: 'primary' })}>
          Join
        </button>
      </div>
    </div>
  );
}
