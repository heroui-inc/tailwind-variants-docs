import type { MetaRecord } from 'nextra';

export default {
  introduction: {
    title: 'Introduction'
  },
  'why-tailwind-variants': {
    title: 'Why Tailwind Variants?',
    display: 'hidden'
  },
  'getting-started': 'Getting Started',
  migration: 'Migration to v3 (new)',
  'tailwind-v4': 'Tailwindcss v4',
  comparison: 'Comparison',
  variants: 'Variants',
  slots: 'Slots',
  'overriding-styles': 'Overriding Styles',
  'composing-components': 'Composing Components',
  examples: 'Examples',
  'intro-slots': {
    display: 'hidden',
    theme: {
      navbar: false,
      sidebar: false,
      footer: false,
      breadcrumb: false,
      pagination: false,
      toc: false,
      copyPage: false,
      timestamp: false
    }
  },
  typescript: 'Typescript',
  config: 'Config',
  'api-reference': 'API Reference',
  acknowledgements: 'Acknowledgements',
  faq: 'FAQ'
} satisfies MetaRecord;
