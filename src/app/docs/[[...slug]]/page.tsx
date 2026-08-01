import type { Metadata } from 'next';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from 'fumadocs-ui/layouts/notebook/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@/components/mdx';
import { PageActions } from '@/components/page-actions';
import {
  faqJsonLdItems,
  getFaqPageJsonLd,
  getTechArticleJsonLd,
  toJsonLdScript
} from '@/lib/json-ld';
import { getCanonicalUrl } from '@/lib/site';
import { getPageImageUrl, source } from '@/lib/source';

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = `${page.url}.md`;
  const isFaq = page.slugs.join('/') === 'faq';
  const jsonLd = isFaq
    ? [
        getTechArticleJsonLd({
          title: page.data.title,
          description: page.data.description,
          path: page.url
        }),
        getFaqPageJsonLd(faqJsonLdItems)
      ]
    : getTechArticleJsonLd({
        title: page.data.title,
        description: page.data.description,
        path: page.url
      });

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      className="gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-8 xl:px-10"
      tableOfContent={{
        enabled: true,
        style: 'clerk',
        single: false
      }}
    >
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload
        dangerouslySetInnerHTML={toJsonLdScript(jsonLd)}
      />
      <header className="not-prose flex flex-col gap-4 border-b border-border pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <DocsTitle className="text-2xl font-semibold tracking-tight md:text-3xl">
            {page.data.title}
          </DocsTitle>
          <PageActions
            title={page.data.title}
            pageUrl={page.url}
            markdownUrl={markdownUrl}
          />
        </div>
        {page.data.description ? (
          <DocsDescription className="mb-0 max-w-3xl text-base text-muted md:text-lg">
            {page.data.description}
          </DocsDescription>
        ) : null}
      </header>
      <DocsBody className="pt-1">
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

export const generateStaticParams = async () => {
  return source.generateParams();
};

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const image = getPageImageUrl(page).url;
  const canonical = getCanonicalUrl(page.url);
  const markdown = `${canonical}.md`;
  const title = page.data.title;
  const description = page.data.description;

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        'text/markdown': markdown
      }
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: 'Tailwind Variants',
      url: canonical,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hero_ui',
      title,
      description,
      images: [
        {
          url: image,
          alt: title
        }
      ]
    }
  };
};
