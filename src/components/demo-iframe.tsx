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

function syncStyleSheets(from: Document, to: Document) {
  const marker = to.getElementById(STYLE_MARKER_ID);
  if (!marker) return;

  while (marker.nextSibling) {
    marker.nextSibling.remove();
  }

  from.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
    marker.after(node.cloneNode(true));
  });
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
  minHeight = 148
}: DemoIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(minHeight);
  const { resolvedTheme } = useTheme();
  const resolvedThemeRef = useRef(resolvedTheme);
  resolvedThemeRef.current = resolvedTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupDocument = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;

    doc.documentElement.lang = document.documentElement.lang || 'en';

    if (!doc.getElementById(STYLE_MARKER_ID)) {
      const marker = doc.createElement('meta');
      marker.id = STYLE_MARKER_ID;
      doc.head.appendChild(marker);
    }

    syncStyleSheets(document, doc);
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

    setMountNode((prev) => (prev === root ? prev : root));
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
      setupDocument();
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

    const observer = new MutationObserver(() => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      syncStyleSheets(document, doc);
    });

    observer.observe(document.head, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [mountNode]);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn('w-full', className)}
        style={{ height: minHeight }}
      />
    );
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        title={title}
        src="about:blank"
        className={cn('block w-full border-0 bg-transparent', className)}
        style={{ height }}
        onLoad={setupDocument}
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  );
}
