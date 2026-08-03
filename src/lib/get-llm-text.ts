import type { source } from '@/lib/source';

import { renderPlaceholder } from 'fumadocs-core/mdx-plugins/remark-llms.runtime';

import * as demoCode from '@/demos/code';
import { getCanonicalUrl, siteUrl } from '@/lib/site';

export const collapseBlankLines = (text: string) => {
  return `${text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;
};

const getDemoSource = (id: string) => {
  const value = (demoCode as Record<string, unknown>)[id];

  return typeof value === 'string' ? value : undefined;
};

const resolveCodeAttribute = (value: unknown) => {
  if (typeof value === 'string') {
    return value;
  }

  if (
    value &&
    typeof value === 'object' &&
    'value' in value &&
    typeof (value as { value: unknown }).value === 'string'
  ) {
    return (value as { value: string }).value;
  }

  return undefined;
};

const resolveLangAttribute = (value: unknown) => {
  return typeof value === 'string' && value.length > 0 ? value : 'ts';
};

const toCodeFence = (lang: string, code: string) => {
  return `\`\`\`${lang}\n${code.trimEnd()}\n\`\`\``;
};

const renderDemoPreview = ({
  attributes
}: {
  attributes: Record<string, unknown>;
}) => {
  const codeAttr = resolveCodeAttribute(attributes.code);
  const lang = resolveLangAttribute(attributes.lang);

  if (!codeAttr) {
    return '';
  }

  const demoSource = getDemoSource(codeAttr) ?? codeAttr;

  if (
    demoSource === codeAttr &&
    !codeAttr.includes('\n') &&
    !codeAttr.includes(' ')
  ) {
    return '';
  }

  return toCodeFence(lang, demoSource);
};

const renderCallout = ({
  attributes,
  children
}: {
  attributes: Record<string, unknown>;
  children: string;
}) => {
  const type =
    typeof attributes.type === 'string' && attributes.type.length > 0
      ? attributes.type
      : 'info';
  const body = children.trim();

  if (!body) {
    return '';
  }

  return `> **${type}:** ${body}`;
};

const polishLLMMarkdown = (markdown: string) => {
  return markdown
    .replace(/^(#{1,6}\s.+?)\s*\[#[^\]]+\]\s*$/gm, '$1')
    .replace(/\]\((\/docs\/[^)#]+)(#[^)]*)?\)/g, (_match, path, hash = '') => {
      return `](${siteUrl}${path}${hash ?? ''})`;
    });
};

export const formatLLMMarkdown = async (markdown: string) => {
  const rendered = await renderPlaceholder(markdown, {
    DemoPreview: renderDemoPreview,
    Callout: renderCallout
  });

  return collapseBlankLines(polishLLMMarkdown(rendered));
};

export const getLLMText = async (page: (typeof source)['$inferPage']) => {
  const processed = await page.data.getText('processed');
  const body = await formatLLMMarkdown(processed);
  const description = page.data.description?.trim();
  const lead = description ? `${description}\n\n` : '';
  const url = getCanonicalUrl(page.url);

  return collapseBlankLines(`# ${page.data.title} (${url})\n\n${lead}${body}`);
};
