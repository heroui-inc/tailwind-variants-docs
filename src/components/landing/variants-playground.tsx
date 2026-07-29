'use client';

import { useMemo, useState } from 'react';
import { cn } from 'tailwind-variants';

import { CheckIcon, PlusIcon } from '@/components/icons';
import { CodeWindow } from '@/components/landing/code-window';
import { MagicCode } from '@/components/landing/magic-code';
import { LandingSection, SectionIntro } from '@/components/landing/section';
import { easeOut, focusRing, interactive } from '@/components/landing/styles';

const features = [
  {
    id: 'variants',
    name: 'Variants',
    description: 'Declare color, size, and state once as a first-class API.',
    block: `  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-zinc-800 text-white',
    },
    size: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
    },
  },`
  },
  {
    id: 'slots',
    name: 'Slots',
    description: 'Style multi-part components from one shared recipe.',
    block: `  slots: {
    base: 'inline-flex items-center gap-2 rounded-full font-medium',
    icon: 'size-4 shrink-0',
    label: 'truncate',
  },`
  },
  {
    id: 'compound',
    name: 'Compound',
    description: 'Styles that only show when variants combine.',
    block: `  compoundVariants: [
    {
      color: 'primary',
      size: 'sm',
      class: 'uppercase tracking-wide',
    },
  ],`
  },
  {
    id: 'defaults',
    name: 'Defaults',
    description: 'Sensible defaults so every call stays concise.',
    block: `  defaultVariants: {
    color: 'primary',
    size: 'md',
  },`
  }
] as const;

type FeatureId = (typeof features)[number]['id'];

const initialSelected = ['variants', 'defaults'] satisfies FeatureId[];

function createTvCode(selected: readonly FeatureId[]) {
  const active = features.filter((feature) => selected.includes(feature.id));
  const hasSlots = selected.includes('slots');

  return [
    `import { tv } from 'tailwind-variants';`,
    '',
    'export const button = tv({',
    hasSlots
      ? null
      : `  base: 'inline-flex items-center rounded-full font-medium',`,
    ...active.map((feature) => feature.block),
    '});'
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export function VariantsPlayground() {
  const [selected, setSelected] = useState<FeatureId[]>(() => [
    ...initialSelected
  ]);
  const code = useMemo(() => createTvCode(selected), [selected]);

  return (
    <LandingSection
      border="x-y"
      className="grid grid-cols-1 items-stretch gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-14"
    >
      <div className="@container flex flex-col">
        <SectionIntro
          eyebrow="Features"
          title={
            <>
              Variants by default.
              <br />
              Composable by design.
            </>
          }
          description="A small API with full control over variants, slots, and compound styles."
        />

        <div className="@md:grid-cols-2 mt-8 grid grid-cols-1 gap-2.5">
          {features.map((feature) => {
            const isSelected = selected.includes(feature.id);

            return (
              <button
                type="button"
                key={feature.id}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelected((current) =>
                    current.includes(feature.id)
                      ? current.filter((item) => item !== feature.id)
                      : [...current, feature.id]
                  );
                }}
                className={cn(
                  'group relative overflow-hidden rounded-xl p-4 ps-4.5 text-start',
                  'border transition-[border-color,background-color,color]',
                  easeOut,
                  focusRing,
                  interactive,
                  isSelected
                    ? 'border-fd-border/70 bg-fd-secondary/50'
                    : 'border-fd-border/55 bg-transparent hover:border-fd-border hover:bg-fd-secondary/30'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'bg-fd-primary absolute inset-y-3 inset-s-0 w-0.5 rounded-full',
                    'origin-center transition-[opacity,transform]',
                    easeOut,
                    isSelected
                      ? 'scale-y-100 opacity-100'
                      : 'scale-y-50 opacity-0'
                  )}
                />
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'text-sm font-medium tracking-tight sm:text-[0.9375rem]',
                      isSelected
                        ? 'text-fd-foreground'
                        : 'text-fd-foreground/85 group-hover:text-fd-foreground'
                    )}
                  >
                    {feature.name}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full',
                      'transition-[background-color,color,box-shadow]',
                      easeOut,
                      isSelected
                        ? 'bg-fd-primary text-fd-primary-foreground shadow-sm shadow-fd-primary/25'
                        : 'bg-fd-secondary/80 text-fd-muted-foreground group-hover:bg-fd-secondary group-hover:text-fd-foreground'
                    )}
                  >
                    {isSelected ? (
                      <CheckIcon size={12} className="size-3" />
                    ) : (
                      <PlusIcon size={12} className="size-3" />
                    )}
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-2 block text-sm/relaxed',
                    isSelected
                      ? 'text-fd-muted-foreground'
                      : 'text-fd-muted-foreground/80 group-hover:text-fd-muted-foreground'
                  )}
                >
                  {feature.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <CodeWindow
        filename="button.styles.ts"
        className="flex h-full min-h-88 flex-col md:min-h-full"
      >
        <MagicCode code={code} />
      </CodeWindow>
    </LandingSection>
  );
}
