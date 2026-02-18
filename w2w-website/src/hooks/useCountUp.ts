import { useEffect, useState } from 'react';

const DURATION_MS = 1800;

/**
 * Animates from 0 to target when the component mounts.
 * Returns the current value for display (e.g. for stats count-up).
 */
export function useCountUp(target: number, enabled = true): number {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled || target <= 0) {
      setValue(target);
      return;
    }

    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / DURATION_MS, 1);
      // Ease-out cubic for a smooth slowdown at the end
      const eased = 1 - (1 - t) ** 3;
      const current = Math.round(eased * target);
      setValue(current);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, enabled]);

  return value;
}
