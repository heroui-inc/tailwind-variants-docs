'use client';

import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { cn } from 'tailwind-variants';

const MIN_WIDTH = 280;
const DEFAULT_WIDTH = 420;

type DemoResizerProps = {
  children: ReactNode;
  className?: string;
  defaultWidth?: number;
};

export function DemoResizer({
  children,
  className,
  defaultWidth = DEFAULT_WIDTH
}: DemoResizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const maxWidthRef = useRef(Number.POSITIVE_INFINITY);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  const [width, setWidth] = useState(defaultWidth);
  // Infinity until measured so first paint isn't capped at defaultWidth
  const [maxWidth, setMaxWidth] = useState(Number.POSITIVE_INFINITY);
  const [dragging, setDragging] = useState(false);

  const clampWidth = useCallback((next: number, max: number) => {
    const upper = Math.max(MIN_WIDTH, max);
    return Math.round(Math.min(Math.max(next, MIN_WIDTH), upper));
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncMax = () => {
      const styles = getComputedStyle(container);
      const paddingX =
        (Number.parseFloat(styles.paddingLeft) || 0) +
        (Number.parseFloat(styles.paddingRight) || 0);
      const nextMax = Math.floor(container.clientWidth - paddingX);
      maxWidthRef.current = nextMax;
      setMaxWidth(nextMax);
      setWidth((prev) => clampWidth(prev, nextMax));
    };

    syncMax();

    const observer = new ResizeObserver(syncMax);
    observer.observe(container);
    return () => observer.disconnect();
  }, [clampWidth]);

  const endDrag = useCallback((event?: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (event && event.pointerId !== drag.pointerId) return;

    const handle = handleRef.current;
    dragRef.current = null;
    document.body.classList.remove('dragging-ew');
    setDragging(false);

    if (handle && event && handle.hasPointerCapture(event.pointerId)) {
      handle.releasePointerCapture(event.pointerId);
    }
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const frame = frameRef.current;
    if (!frame) return;

    event.currentTarget.focus({ preventScroll: true });
    event.preventDefault();

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: frame.getBoundingClientRect().width
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    document.body.classList.add('dragging-ew');
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const delta = event.clientX - drag.startX;
    setWidth(clampWidth(drag.startWidth + delta, maxWidthRef.current));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    endDrag(event);
  };

  const onLostPointerCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    if (event.pointerId !== dragRef.current.pointerId) return;
    dragRef.current = null;
    document.body.classList.remove('dragging-ew');
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && dragRef.current) {
      event.preventDefault();
      const handle = handleRef.current;
      const pointerId = dragRef.current.pointerId;
      dragRef.current = null;
      document.body.classList.remove('dragging-ew');
      setDragging(false);
      if (handle?.hasPointerCapture(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }
      return;
    }

    const step = event.shiftKey ? 32 : 16;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setWidth(clampWidth(width - step, maxWidth));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setWidth(clampWidth(width + step, maxWidth));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setWidth(MIN_WIDTH);
    } else if (event.key === 'End') {
      event.preventDefault();
      setWidth(Number.isFinite(maxWidth) ? maxWidth : defaultWidth);
    }
  };

  const resolvedWidth = clampWidth(width, maxWidth);
  const isMax = Number.isFinite(maxWidth) && resolvedWidth >= maxWidth - 1;

  return (
    <div
      ref={containerRef}
      className={cn('demo-resizer relative w-full', className)}
    >
      <div
        ref={frameRef}
        className={cn(
          'demo-resizer-shell relative',
          dragging && 'is-dragging',
          isMax && 'is-max'
        )}
        style={{
          width: isMax ? '100%' : resolvedWidth,
          maxWidth: '100%'
        }}
      >
        <div className="demo-resizer-frame">{children}</div>

        <div
          ref={handleRef}
          role="separator"
          aria-orientation="vertical"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={Number.isFinite(maxWidth) ? maxWidth : defaultWidth}
          aria-valuenow={resolvedWidth}
          aria-label="Resize preview"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onLostPointerCapture={onLostPointerCapture}
          onKeyDown={onKeyDown}
          className="demo-resizer-handle"
        >
          <span className="demo-resizer-handle-grip" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  );
}
