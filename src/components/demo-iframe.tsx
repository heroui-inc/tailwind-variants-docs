'use client';

import { useTheme } from 'next-themes';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from 'tailwind-variants';

const STYLE_MARKER_ID = 'tv-demo-iframe-styles';
const ROOT_ID = 'tv-demo-iframe-root';
const MESSAGE_READY = 'tv-demo-ready';
const MESSAGE_THEME = 'tv-demo-theme';

export type DemoIframeProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  minHeight?: number;
};

function findParentSheet(href: string | null) {
  if (!href) return null;
  return [...document.styleSheets].find((sheet) => sheet.href === href) ?? null;
}

/** Prefer inlining CSS text so styles apply synchronously (avoids FOUC). */
function injectStyleNode(from: Element, to: Document, after: ChildNode) {
  if (from instanceof HTMLStyleElement) {
    const style = to.createElement('style');
    style.textContent = from.textContent ?? '';
    for (const attr of from.attributes) {
      if (attr.name === 'id') continue;
      style.setAttribute(attr.name, attr.value);
    }
    after.after(style);
    return style;
  }

  if (from instanceof HTMLLinkElement && from.rel === 'stylesheet') {
    const parentSheet = findParentSheet(from.href);
    if (parentSheet) {
      try {
        const cssText = [...parentSheet.cssRules]
          .map((rule) => rule.cssText)
          .join('\n');
        const style = to.createElement('style');
        style.dataset.href = from.href;
        style.textContent = cssText;
        after.after(style);
        return style;
      } catch {
        // Cross-origin sheet — fall through to cloned <link>.
      }
    }

    const link = from.cloneNode(true) as HTMLLinkElement;
    after.after(link);
    return link;
  }

  after.after(from.cloneNode(true));
  return null;
}

function syncStyleSheets(from: Document, to: Document) {
  const marker = to.getElementById(STYLE_MARKER_ID);
  if (!marker) return [] as HTMLLinkElement[];

  while (marker.nextSibling) {
    marker.nextSibling.remove();
  }

  const pendingLinks: HTMLLinkElement[] = [];
  let insertAfter: ChildNode = marker;

  from.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
    const injected = injectStyleNode(node, to, insertAfter);
    if (injected) {
      insertAfter = injected;
      if (injected instanceof HTMLLinkElement) {
        pendingLinks.push(injected);
      }
    }
  });

  return pendingLinks;
}

function waitForLinks(links: HTMLLinkElement[]) {
  if (links.length === 0) return Promise.resolve();

  return Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          if (link.sheet) {
            resolve();
            return;
          }

          const done = () => resolve();
          link.addEventListener('load', done, { once: true });
          link.addEventListener('error', done, { once: true });
        })
    )
  ).then(() => undefined);
}

function applyTheme(doc: Document, theme: string | undefined) {
  const parentClasses = Array.from(document.documentElement.classList);
  const isDark = theme === 'dark' || (!theme && parentClasses.includes('dark'));

  const next = parentClasses.filter(
    (token) => token !== 'dark' && token !== 'light'
  );
  if (isDark) next.push('dark');

  doc.documentElement.className = next.join(' ');
  doc.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

  for (const name of ['--font-sans', '--font-mono']) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      name
    );
    if (value) {
      doc.documentElement.style.setProperty(name, value);
    }
  }
}

export function DemoIframe({
  children,
  className,
  title = 'Demo preview',
  minHeight = 240
}: DemoIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const setupTokenRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(minHeight);
  const { resolvedTheme } = useTheme();
  const resolvedThemeRef = useRef(resolvedTheme);
  resolvedThemeRef.current = resolvedTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupDocument = useCallback(async () => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;

    const token = ++setupTokenRef.current;

    doc.documentElement.lang = document.documentElement.lang || 'en';
    // Hide until styles apply — prevents FOUC on fast refresh.
    doc.documentElement.style.visibility = 'hidden';

    if (!doc.getElementById(STYLE_MARKER_ID)) {
      const marker = doc.createElement('meta');
      marker.id = STYLE_MARKER_ID;
      doc.head.appendChild(marker);
    }

    const pendingLinks = syncStyleSheets(document, doc);
    applyTheme(doc, resolvedThemeRef.current);

    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.background = 'transparent';
    doc.body.style.minHeight = '100%';
    doc.body.style.overflow = 'hidden';

    let root = doc.getElementById(ROOT_ID);
    if (!root) {
      root = doc.createElement('div');
      root.id = ROOT_ID;
      root.dataset.demoIframeRoot = '';
      doc.body.appendChild(root);
    }

    await waitForLinks(pendingLinks);
    // Two frames: ensure layout + paint use the new CSSOM.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    if (token !== setupTokenRef.current) return;

    doc.documentElement.style.visibility = '';
    setMountNode((prev) => (prev === root ? prev : root));
    setReady(true);
    iframe.contentWindow?.parent.postMessage(
      { type: MESSAGE_READY },
      window.location.origin
    );
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (iframe.contentDocument?.readyState === 'complete') {
      void setupDocument();
    }
  }, [mounted, setupDocument]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc?.getElementById(ROOT_ID)) return;

    applyTheme(doc, resolvedTheme);
    iframeRef.current?.contentWindow?.postMessage(
      { type: MESSAGE_THEME, theme: resolvedTheme ?? 'dark' },
      window.location.origin
    );
  }, [resolvedTheme, mountNode]);

  useEffect(() => {
    if (!mountNode) return;

    const updateHeight = () => {
      const next = Math.ceil(
        Math.max(minHeight, mountNode.getBoundingClientRect().height)
      );
      setHeight((prev) => (prev === next ? prev : next));
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(mountNode);

    return () => resizeObserver.disconnect();
  }, [mountNode, minHeight]);

  useEffect(() => {
    if (!mountNode) return;

    let timer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        const pending = syncStyleSheets(document, doc);
        void waitForLinks(pending);
      }, 50);
    });

    observer.observe(document.head, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [mountNode]);

  return (
    <div
      className={cn('relative w-full', className)}
      style={{ minHeight: height }}
    >
      {!ready ? (
        <div
          aria-hidden
          className="demo-iframe-placeholder absolute inset-0 z-10"
          style={{ minHeight }}
        />
      ) : null}

      {mounted ? (
        <iframe
          ref={iframeRef}
          title={title}
          src="about:blank"
          className={cn(
            'block w-full border-0 bg-transparent',
            ready ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          style={{ height, minHeight }}
          onLoad={() => {
            void setupDocument();
          }}
        />
      ) : null}

      {/* Portal only after styles are ready — avoids painting unstyled demos. */}
      {ready && mountNode ? createPortal(children, mountNode) : null}
    </div>
  );
}
