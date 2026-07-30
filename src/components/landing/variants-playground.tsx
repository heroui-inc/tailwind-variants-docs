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
    description: 'Declare variant, size, and state once as a first-class API.'
  },
  {
    id: 'slots',
    name: 'Slots',
    description: 'Style multi-part components from one shared recipe.'
  },
  {
    id: 'compound',
    name: 'Compound',
    description: 'Styles that only show when variants combine.'
  },
  {
    id: 'defaults',
    name: 'Defaults',
    description: 'Sensible defaults so every call stays concise.'
  }
] as const;

type FeatureId = (typeof features)[number]['id'];

const requiresVariants = new Set<FeatureId>(['compound', 'defaults']);

const initialSelected = ['variants', 'defaults'] satisfies FeatureId[];

const slotsBlock = `  slots: {
    base: 'inline-flex items-center gap-2 rounded-full font-medium',
    icon: 'size-4 shrink-0',
    label: 'truncate',
  },`;

const defaultsBlock = `  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },`;

const variantsBlock = (hasSlots: boolean) => {
  if (hasSlots) {
    return `  variants: {
    variant: {
      primary: {
        base: 'bg-zinc-900 text-white',
        icon: 'text-white',
      },
      secondary: {
        base: 'bg-zinc-100 text-zinc-900',
        icon: 'text-zinc-900',
      },
      tertiary: {
        base: 'text-zinc-600',
        icon: 'text-zinc-600',
      },
    },
    size: {
      sm: {
        base: 'text-sm px-3 py-1',
        icon: 'size-3.5',
      },
      md: {
        base: 'text-base px-4 py-2',
        icon: 'size-4',
      },
    },
  },`;
  }

  return `  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'bg-zinc-100 text-zinc-900',
      tertiary: 'text-zinc-600',
    },
    size: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
    },
  },`;
};

const compoundBlock = (hasSlots: boolean) => {
  if (hasSlots) {
    return `  compoundVariants: [
    {
      variant: 'primary',
      size: 'sm',
      class: {
        base: 'uppercase tracking-wide',
        label: 'tracking-wide',
      },
    },
  ],`;
  }

  return `  compoundVariants: [
    {
      variant: 'primary',
      size: 'sm',
      class: 'uppercase tracking-wide',
    },
  ],`;
};

const createTvCode = (selected: readonly FeatureId[]) => {
  const hasSlots = selected.includes('slots');
  const parts: Array<string | null> = [
    `import { tv } from 'tailwind-variants';`,
    '',
    'export const button = tv({',
    hasSlots
      ? slotsBlock
      : `  base: 'inline-flex items-center rounded-full font-medium',`,
    selected.includes('variants') ? variantsBlock(hasSlots) : null,
    selected.includes('compound') ? compoundBlock(hasSlots) : null,
    selected.includes('defaults') ? defaultsBlock : null,
    '});'
  ];

  return parts.filter((line) => line !== null).join('\n');
};

const toggleFeature = (current: FeatureId[], id: FeatureId): FeatureId[] => {
  const isSelected = current.includes(id);

  if (isSelected) {
    let next = current.filter((item) => item !== id);

    if (id === 'variants') {
      next = next.filter((item) => !requiresVariants.has(item));
    }

    return next;
  }

  const next = new Set<FeatureId>([...current, id]);

  if (requiresVariants.has(id)) {
    next.add('variants');
  }

  return features.map((feature) => feature.id).filter((item) => next.has(item));
};

export const VariantsPlayground = () => {
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

        <div className="@md:grid-cols-2 mt-8 grid grid-cols-1 gap-2">
          {features.map((feature) => {
            const isSelected = selected.includes(feature.id);

            return (
              <button
                type="button"
                key={feature.id}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelected((current) => toggleFeature(current, feature.id));
                }}
                className={cn(
                  'group rounded-xl p-4 text-start',
                  'transition-[background-color,color,box-shadow]',
                  easeOut,
                  focusRing,
                  interactive,
                  isSelected
                    ? 'bg-default text-default-foreground'
                    : 'bg-transparent text-muted hover:bg-default/60 hover:text-foreground'
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'text-sm font-medium tracking-tight sm:text-[0.9375rem]',
                      isSelected
                        ? 'text-foreground'
                        : 'group-hover:text-foreground'
                    )}
                  >
                    {feature.name}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full',
                      'transition-[background-color,color]',
                      easeOut,
                      isSelected
                        ? 'bg-foreground text-background'
                        : 'bg-default text-muted group-hover:text-foreground'
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
                      ? 'text-muted'
                      : 'text-muted/80 group-hover:text-muted'
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
};
