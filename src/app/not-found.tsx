import Link from 'next/link';

export const metadata = {
  title: 'Page not found'
};

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="text-lg text-muted">This page could not be found.</p>
      <Link
        className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-90"
        href="/"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
