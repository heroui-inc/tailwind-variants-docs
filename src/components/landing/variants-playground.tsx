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
    description:
      'Declare variant, size, and state axes once as a first-class, fully typed API.'
  },
  {
    id: 'slots',
    name: 'Slots',
    description:
      'Style every part of a multi-part component from one shared, variant-aware recipe.'
  },
  {
    id: 'compound',
    name: 'Compound',
    description:
      'Apply extra classes only when specific variant combinations match, declared in the recipe.'
  },
  {
    id: 'defaults',
    name: 'Defaults',
    description:
      'Set sensible defaults once so every call site stays concise and easy to override.'
  },
  {
    id: 'extend',
    name: 'Extend',
    description:
      'Compose one or more parent recipes into new components without copying any definitions.'
  },
  {
    id: 'types',
    name: 'Types',
    description:
      'Infer typed props from any recipe so components stay in sync automatically.'
  }
] as const;

type FeatureId = (typeof features)[number]['id'];

const requiresVariants = new Set<FeatureId>(['compound', 'defaults']);

const initialSelected = ['variants', 'defaults'] satisfies FeatureId[];

const extendParentsBlock = `const focusRing = tv({
  base: 'outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
});

const animated = tv({
  base: 'transition-colors duration-150',
});
`;

const slotsBlock = `  slots: {
    base: 'inline-flex cursor-pointer items-center gap-2 rounded-full font-medium select-none',
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
  const hasExtend = selected.includes('extend');
  const hasTypes = selected.includes('types');
  const parts: Array<string | null> = [
    hasTypes
      ? `import { tv, type VariantProps } from 'tailwind-variants';`
      : `import { tv } from 'tailwind-variants';`,
    '',
    hasExtend ? extendParentsBlock : null,
    'export const button = tv({',
    hasExtend ? '  extend: [focusRing, animated],' : null,
    hasSlots
      ? slotsBlock
      : `  base: 'inline-flex cursor-pointer items-center rounded-full font-medium select-none',`,
    selected.includes('variants') ? variantsBlock(hasSlots) : null,
    selected.includes('compound') ? compoundBlock(hasSlots) : null,
    selected.includes('defaults') ? defaultsBlock : null,
    '});',
    hasTypes
      ? '\nexport type ButtonVariants = VariantProps<typeof button>;'
      : null
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
    <LandingSection className="grid grid-cols-1 items-stretch gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-14">
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

        <div className="@md:grid-cols-2 mt-8 grid grid-cols-1 gap-3">
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
                  'group rounded-xl border p-4 text-start',
                  'transition-[background-color,border-color]',
                  easeOut,
                  focusRing,
                  interactive,
                  isSelected
                    ? 'border-border bg-default text-default-foreground'
                    : 'border-transparent text-muted hover:border-border/70 hover:bg-default/40 hover:text-foreground'
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'text-sm font-medium tracking-tight',
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
                      'flex size-5 shrink-0 items-center justify-center rounded-md',
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
                <span className="mt-2 block text-sm/relaxed text-muted">
                  {feature.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <CodeWindow
        filename="button.styles.ts"
        code={code}
        className="flex h-full min-h-88 flex-col md:min-h-full"
      >
        <MagicCode code={code} />
      </CodeWindow>
    </LandingSection>
  );
};
