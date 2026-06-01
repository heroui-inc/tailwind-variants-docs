import type { MetaRecord } from 'nextra';

export default {
  index: {
    title: 'Home',
    type: 'page',
    display: 'hidden',
    theme: {
      copyPage: false,
      toc: false,
      timestamp: false,
      layout: 'full'
    }
  },
  docs: {
    title: 'Docs',
    type: 'page',
    theme: {
      footer: false
    }
  }
} satisfies MetaRecord;
