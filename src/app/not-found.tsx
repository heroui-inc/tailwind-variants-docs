import Link from 'next/link';

import { landingButtonClass } from '@/components/landing/styles';

export const metadata = {
  title: 'Page not found'
};

const recoveryLinks = [
  { href: '/docs/introduction', label: 'Documentation' },
  { href: '/docs/api-reference', label: 'API reference' },
  { href: '/llms.txt', label: 'llms.txt' },
  { href: '/sitemap.xml', label: 'Sitemap' }
] as const;

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-lg text-muted">This page could not be found.</p>
      <Link className={landingButtonClass()} href="/">
        Go home
      </Link>
      <nav aria-label="Where to look next">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted">
          {recoveryLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NotFound;
