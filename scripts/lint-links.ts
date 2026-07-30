import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles
} from 'next-validate-link';

import { source } from '../src/lib/source.ts';

const checkLinks = async () => {
  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      'docs/[[...slug]]': source.getPages().map((page) => ({
        value: {
          slug: page.slugs
        },
        hashes: getHeadings(page)
      }))
    }
  });

  printErrors(
    await validateFiles(await getFiles(), {
      scanned,
      checkRelativePaths: 'as-url'
    }),
    true
  );
};

const getHeadings = (page: (typeof source)['$inferPage']): string[] => {
  return (page.data.toc ?? []).map((item) => item.url.slice(1));
};

const getFiles = async (): Promise<FileObject[]> => {
  return Promise.all(
    source.getPages().map(async (page) => ({
      path: page.absolutePath,
      content: await page.data.getText('raw'),
      url: page.url,
      data: page.data
    }))
  );
};

await checkLinks();
