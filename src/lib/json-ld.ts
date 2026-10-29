import { getCanonicalUrl, siteUrl } from '@/lib/site';

type JsonLd = Record<string, unknown>;

export const toJsonLdScript = (data: JsonLd | JsonLd[]) => {
  return {
    __html: JSON.stringify(data)
  };
};

// Mirrors the Organization schema published on heroui.com.
export const getOrganizationJsonLd = (): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HeroUI',
    url: 'https://heroui.com',
    logo: 'https://heroui.com/icons/favicon.svg',
    sameAs: [
      'https://github.com/heroui-inc',
      'https://x.com/hero_ui',
      'https://discord.gg/9b6yyZKmH4'
    ]
  };
};

export const getWebsiteJsonLd = (): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tailwind Variants',
    url: siteUrl,
    description: 'A first-class variant API for Tailwind CSS.',
    publisher: {
      '@type': 'Organization',
      name: 'HeroUI',
      url: 'https://www.heroui.com'
    }
  };
};

export const getSoftwareApplicationJsonLd = (): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'tailwind-variants',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: siteUrl,
    description:
      'A first-class variant API for Tailwind CSS — typed, composable, and built for design systems.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'HeroUI'
    }
  };
};

export const getTechArticleJsonLd = ({
  title,
  description,
  path
}: {
  title: string;
  description?: string;
  path: string;
}): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: getCanonicalUrl(path),
    mainEntityOfPage: getCanonicalUrl(path),
    author: {
      '@type': 'Organization',
      name: 'HeroUI'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HeroUI',
      url: 'https://www.heroui.com'
    }
  };
};

export const getFaqPageJsonLd = (
  items: Array<{ question: string; answer: string }>
): JsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

export const faqJsonLdItems = [
  {
    question: 'Is Tailwind Variants free?',
    answer: 'Yes. MIT licensed. Use it in commercial and open-source projects.'
  },
  {
    question: 'Default build or lite?',
    answer:
      'Use the default build (tailwind-variants) when you want automatic Tailwind conflict resolution. Use lite (tailwind-variants/lite) when bundle size matters and you do not need merge.'
  },
  {
    question: 'Do I need tailwind-merge?',
    answer:
      'No — not for Tailwind Variants on v3.3+. Merge is built into the default build. Keep tailwind-merge only if your app imports it directly.'
  },
  {
    question: 'Framework support?',
    answer:
      'Tailwind Variants is framework-agnostic. It returns class strings — use with React, Vue, Svelte, Solid, or vanilla JS.'
  }
];
