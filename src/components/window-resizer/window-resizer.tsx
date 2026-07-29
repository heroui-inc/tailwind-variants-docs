'use client';

import type { FC, ReactNode } from 'react';

import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { tv } from 'tailwind-variants';

import { useIsomorphicLayoutEffect } from '@/hooks';

const resizer = tv({
  base: 'absolute inset-y-0 right-0 z-10 hidden w-auto items-center justify-end sm:flex',
  slots: {
    main: 'relative w-full',
    barWrapper:
      'absolute flex h-auto w-2.5 cursor-ew-resize select-none items-center justify-center active:opacity-80',
    barInner: 'relative z-10',
    bar: 'h-10 w-1.5 rounded-full bg-neutral/60',
    contentWrapper: 'w-full overflow-hidden max-sm:w-full!'
  },
  variants: {
    hasInitialWidth: {
      true: {
        base: 'justify-start'
      }
    }
  }
});

interface WindowResizerProps {
  children: ReactNode;
  height?: string | number;
  minWidth?: number;
  initialWidth?: number;
  className?: string;
}

const MIN_WIDTH = 200;

const WindowResizer: FC<WindowResizerProps> = (props) => {
  const constraintsResizerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const {
    children,
    height,
    initialWidth,
    minWidth = MIN_WIDTH,
    className
  } = props;
  const hasInitialWidth = initialWidth !== undefined;
  const hasFixedHeight = height !== undefined;

  const { main, base, barInner, barWrapper, bar, contentWrapper } = resizer({
    hasInitialWidth
  });

  const resizerX = useMotionValue(0);
  const browserWidth = useTransform(resizerX, (x) =>
    hasInitialWidth ? initialWidth + x + 14 : `calc(100% + ${x}px - 14px)`
  );

  useIsomorphicLayoutEffect(() => {
    if (!constraintsResizerRef.current || !resizerRef.current) return;

    const observer = new window.ResizeObserver(() => {
      if (!constraintsResizerRef.current || !resizerRef.current) return;

      const width =
        constraintsResizerRef.current.offsetWidth -
        resizerRef.current.offsetWidth;

      if (resizerX.get() > width) {
        resizerX.set(width);
      }
    });

    observer.observe(constraintsResizerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [resizerX]);

  useEffect(() => {
    if (!resizerRef.current) return;
    resizerRef.current.onselectstart = () => false;
  }, []);

  return (
    <div
      data-window-resizer
      className={main({ class: className })}
      style={hasFixedHeight ? { height } : { contain: 'content' }}
    >
      <motion.div
        className={contentWrapper()}
        style={{
          width: browserWidth,
          ...(hasFixedHeight ? { height } : {})
        }}
      >
        <div
          className={
            hasFixedHeight ? 'overflow-auto size-full' : 'w-full overflow-auto'
          }
        >
          {children}
        </div>
      </motion.div>
      <div
        ref={constraintsResizerRef}
        className={base()}
        style={{
          width: `calc(100% - ${
            hasInitialWidth ? initialWidth : minWidth
          }px - 20px)`
        }}
      >
        <motion.div
          ref={resizerRef}
          _dragX={resizerX}
          className={barWrapper()}
          drag="x"
          dragConstraints={constraintsResizerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x: resizerX }}
          onDragEnd={() => {
            const doc = resizerRef.current?.ownerDocument ?? document;
            doc.documentElement.classList.remove('dragging-ew');
          }}
          onDragStart={() => {
            const doc = resizerRef.current?.ownerDocument ?? document;
            doc.documentElement.classList.add('dragging-ew');
          }}
        >
          <div className={barInner()}>
            <div className={bar()} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WindowResizer;
