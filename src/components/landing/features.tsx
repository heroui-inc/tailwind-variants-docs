import { Card } from '@heroui/react';

import {
  CodeMergeIcon,
  FontCaseIcon,
  LayersIcon,
  ShapesIcon
} from '@/components/icons';

const features = [
  {
    icon: ShapesIcon,
    title: 'Variants',
    description:
      'First-class variant API for color, size, state, and anything else your design system needs.'
  },
  {
    icon: LayersIcon,
    title: 'Slots',
    description:
      'Style multi-part components with independent slots that stay type-safe and composable.'
  },
  {
    icon: FontCaseIcon,
    title: 'Type-safe',
    description:
      'Full TypeScript inference for variants, slots, and props — without boilerplate.'
  },
  {
    icon: CodeMergeIcon,
    title: 'Conflict resolution',
    description:
      'Automatic Tailwind class merging so the last intent wins, not the stylesheet order.'
  }
];

export function LandingFeatures() {
  return (
    <section className="border-fd-border border-t px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for design systems
          </h2>
          <p className="text-fd-muted-foreground mt-3 text-pretty">
            Everything you need to express component variants with Tailwind —
            without fighting the cascade.
          </p>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card className="h-full">
                <Card.Header className="gap-3">
                  <div className="text-fd-muted-foreground flex size-8 shrink-0 items-center justify-center">
                    <Icon size={16} className="size-4" />
                  </div>
                  <Card.Title className="text-base">{title}</Card.Title>
                  <Card.Description className="text-sm/relaxed">
                    {description}
                  </Card.Description>
                </Card.Header>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
