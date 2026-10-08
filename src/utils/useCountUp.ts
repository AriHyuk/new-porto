'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  /** Target numeric value */
  target: number;
  /** Duration of animation in milliseconds */
  duration?: number;
  /** Number of decimal places to display */
  decimals?: number;
  /** Easing function — defaults to easeOut cubic */
  easing?: (t: number) => number;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to `target` when the ref element enters the viewport.
 * Returns both the current display value and a ref to attach to the container.
 */
export function useCountUp({
  target,
  duration = 1800,
  decimals = 0,
  easing = easeOutCubic,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const current = easedProgress * target;

            setCount(parseFloat(current.toFixed(decimals)));

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            }
          };

          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, decimals, easing]);

  const display = count.toFixed(decimals);

  return { display, ref };
}
