import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { generateStaticParamsFor, importPage } from 'nextra/pages';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

interface PageParams {
  mdxPath?: string[];
}

interface PageProps {
  params: Promise<PageParams>;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');

const isReservedPath = (mdxPath?: string[]) => {
  if (!mdxPath?.length) return false;

  return mdxPath.some(
    (segment) =>
      segment.startsWith('_') ||
      segment.startsWith('.') ||
      segment.includes('.')
  );
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  if (isReservedPath(params.mdxPath)) {
    notFound();
  }

  const { metadata } = await importPage(params.mdxPath);

  return metadata;
}

const Wrapper = getMDXComponents({}).wrapper!;

export default async function Page(props: PageProps) {
  const params = await props.params;

  if (isReservedPath(params.mdxPath)) {
    notFound();
  }

  const result = await importPage(params.mdxPath);
  const { default: MDXContent, ...rest } = result;

  return (
    <Wrapper {...rest}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
