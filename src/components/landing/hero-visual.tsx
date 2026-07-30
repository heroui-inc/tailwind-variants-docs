'use client';

import { useState } from 'react';
import { cn, tv } from 'tailwind-variants';

import {
  CircleCheckIcon,
  CircleDashedIcon,
  ThunderboltIcon,
  TriangleExclamationIcon
} from '@/components/icons';
import { HeroGrain } from '@/components/landing/hero-grain';
import { easeOut, focusRing, interactive } from '@/components/landing/styles';

const status = tv({
  slots: {
    root: [
      'inline-flex min-h-16 w-auto max-w-full items-center justify-between gap-4 overflow-hidden rounded-2xl',
      'border border-white/10 bg-landing-island ps-5 pe-3 py-3.5 text-white',
      'shadow-[0_16px_48px_-16px_color-mix(in_oklab,var(--black)_55%,transparent)]',
      'transition-[background-color,color,box-shadow] duration-200 ease-out'
    ],
    leading: 'flex min-w-0 items-center gap-3',
    icon: 'flex size-6 shrink-0 items-center justify-center',
    label:
      'min-w-0 truncate text-start text-base font-medium tracking-tight sm:text-lg',
    badge: [
      'shrink-0 rounded-md px-2.5 py-1 text-xs font-medium tracking-tight',
      'transition-colors duration-200 ease-out'
    ]
  },
  variants: {
    tone: {
      idle: {
        icon: 'text-white/55',
        label: 'text-white/70',
        badge: 'bg-white/8 text-white/70'
      },
      live: {
        root: 'bg-[color-mix(in_oklab,var(--color-landing-island)_88%,var(--primary)_12%)]',
        icon: 'text-white',
        label: 'text-white',
        badge: 'bg-white/15 text-white'
      },
      success: {
        root: 'bg-[color-mix(in_oklab,var(--color-landing-island)_88%,var(--success)_12%)]',
        icon: 'text-success',
        label: 'text-white',
        badge: 'bg-success/15 text-success'
      },
      danger: {
        root: 'bg-[color-mix(in_oklab,var(--color-landing-island)_86%,var(--danger)_14%)]',
        icon: 'text-danger',
        label: 'text-white',
        badge: 'bg-danger/15 text-danger'
      }
    }
  },
  defaultVariants: {
    tone: 'live'
  }
});

const tones = ['idle', 'live', 'success', 'danger'] as const;

type Tone = (typeof tones)[number];

const labels: Record<Tone, string> = {
  idle: 'Idle',
  live: 'Live',
  success: 'Success',
  danger: 'Danger'
};

const copy: Record<Tone, string> = {
  idle: 'Standby',
  live: 'Working',
  success: 'All set',
  danger: 'Blocked'
};

const badges: Record<Tone, string> = {
  idle: 'Idle',
  live: 'Live',
  success: 'Ready',
  danger: 'Failed'
};

const toneIcons = {
  idle: CircleDashedIcon,
  live: ThunderboltIcon,
  success: CircleCheckIcon,
  danger: TriangleExclamationIcon
} as const;

export const HeroVisual = () => {
  const [tone, setTone] = useState<Tone>('live');
  const slots = status({ tone });
  const Icon = toneIcons[tone];

  return (
    <div className="relative flex min-h-112 flex-col overflow-hidden md:min-h-full">
      <div aria-hidden className="landing-hero-glow absolute inset-0" />
      <HeroGrain className="landing-hero-grain opacity-75" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-8 py-16 pb-28 md:gap-10 md:px-12 md:py-20 md:pb-32">
        <div
          className={slots.root()}
          role="status"
          aria-label={`Badge ${labels[tone]}: ${copy[tone]}`}
        >
          <div className={slots.leading()}>
            <span className={slots.icon()} aria-hidden>
              <Icon size={20} className="size-5" />
            </span>
            <span className={slots.label()}>{copy[tone]}</span>
          </div>
          <span className={slots.badge()}>{badges[tone]}</span>
        </div>

        <div
          className="flex items-center gap-0.5"
          role="group"
          aria-label="Badge tone"
        >
          {tones.map((value) => {
            const selected = tone === value;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setTone(value)}
                className={cn(
                  'relative px-2 py-1 text-code font-medium tracking-tight outline-none',
                  'transition-colors',
                  easeOut,
                  focusRing,
                  interactive,
                  selected
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {selected ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-lg bg-default"
                  />
                ) : null}
                <span className="relative">{labels[value]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
