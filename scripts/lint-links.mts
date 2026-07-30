import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles
} from 'next-validate-link';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

const walkMarkdownFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(absolutePath);
    }
  }

  return files;
};

const toSlugs = (absolutePath: string): string[] => {
  const relativePath = path
    .relative(CONTENT_DIR, absolutePath)
    .replaceAll('\\', '/');
  const withoutExt = relativePath.replace(/\.mdx?$/, '');

  if (withoutExt === 'index') {
    return [];
  }

  return withoutExt.split('/');
};

const getHashes = (content: string): string[] => {
  const hashes: string[] = [];
  const seen = new Map<string, number>();

  for (const match of content.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const text = match[1]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/<\/?[^>]+>/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s+/g, '-');

    if (!text) continue;

    const count = seen.get(text) ?? 0;
    seen.set(text, count + 1);
    hashes.push(count === 0 ? text : `${text}-${count}`);
  }

  return hashes;
};

const getFiles = async (): Promise<FileObject[]> => {
  const paths = await walkMarkdownFiles(CONTENT_DIR);

  return Promise.all(
    paths.map(async (absolutePath) => {
      const content = await readFile(absolutePath, 'utf8');
      const slugs = toSlugs(absolutePath);

      return {
        path: absolutePath,
        content,
        url: slugs.length === 0 ? '/docs' : `/docs/${slugs.join('/')}`,
        data: {}
      };
    })
  );
};

const checkLinks = async () => {
  const files = await getFiles();

  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      'docs/[[...slug]]': files.map((file) => {
        const slugs = toSlugs(file.path);

        return {
          value: {
            slug: slugs
          },
          hashes: getHashes(file.content)
        };
      })
    }
  });

  printErrors(
    await validateFiles(files, {
      scanned,
      checkRelativePaths: 'as-url'
    }),
    true
  );
};

checkLinks().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
