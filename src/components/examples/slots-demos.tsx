import { tv } from 'tailwind-variants';

import { DemoRow, DemoStack } from '@/components/examples/demo-layout';

const alert = tv({
  slots: {
    base: 'flex w-full max-w-md gap-3 rounded-lg p-4',
    icon: 'size-5 shrink-0',
    title: 'font-semibold',
    description: 'text-sm opacity-80'
  },
  variants: {
    color: {
      default: {
        base: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
        icon: 'text-zinc-500 dark:text-zinc-400',
        title: 'text-zinc-900 dark:text-zinc-100'
      },
      danger: {
        base: 'bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-100',
        icon: 'text-red-500',
        title: 'text-red-900 dark:text-red-100'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SlotsAlertDemo() {
  const defaultSlots = alert({ color: 'default' });
  const dangerSlots = alert({ color: 'danger' });

  return (
    <DemoStack>
      <div className={defaultSlots.base()}>
        <AlertIcon className={defaultSlots.icon()} />
        <div className="min-w-0">
          <p className={defaultSlots.title()}>Heads up</p>
          <p className={defaultSlots.description()}>
            Slot styles keep each part independent.
          </p>
        </div>
      </div>
      <div className={dangerSlots.base()}>
        <AlertIcon className={dangerSlots.icon()} />
        <div className="min-w-0">
          <p className={dangerSlots.title()}>Something went wrong</p>
          <p className={dangerSlots.description()}>
            Danger variant updates base, icon, and title together.
          </p>
        </div>
      </div>
    </DemoStack>
  );
}

const card = tv({
  slots: {
    base: 'w-full max-w-xs rounded-xl border border-border bg-surface p-4',
    header: 'font-bold text-foreground'
  },
  variants: {
    elevated: {
      true: {},
      false: {}
    }
  },
  compoundSlots: [
    {
      elevated: true,
      slots: ['base'],
      class: 'shadow-lg border-transparent'
    }
  ]
});

export function SlotsCompoundDemo() {
  const flat = card({ elevated: false });
  const elevated = card({ elevated: true });

  return (
    <DemoRow align="stretch">
      <div className={flat.base()}>
        <p className={flat.header()}>Flat card</p>
        <p className="mt-1 text-sm text-muted">No compound slot styles.</p>
      </div>
      <div className={elevated.base()}>
        <p className={elevated.header()}>Elevated card</p>
        <p className="mt-1 text-sm text-muted">compoundSlots adds shadow.</p>
      </div>
    </DemoRow>
  );
}
