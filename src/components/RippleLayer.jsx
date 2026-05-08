import { useEffect } from 'react';

// Ripple pulse on click of any interactive element.
// Listens at the document level, finds the nearest <a>/<button>/[data-spark]
// ancestor of the click target, injects a span at the click point, and lets
// CSS animate the expanding ring. Removes the span after the animation ends.
const isInteractive = (el) => {
  if (!el) return null;
  return el.closest('[data-spark], a, button');
};

export default function RippleLayer() {
  useEffect(() => {
    const onPointerDown = (e) => {
      const target = isInteractive(e.target);
      if (!target) return;

      // ensure the host can position the ripple
      const computed = getComputedStyle(target);
      if (computed.position === 'static') target.style.position = 'relative';
      if (computed.overflow === 'visible') target.style.overflow = 'hidden';

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // diameter = 2× distance to farthest corner (covers the element fully)
      const dx = Math.max(x, rect.width - x);
      const dy = Math.max(y, rect.height - y);
      const r = Math.sqrt(dx * dx + dy * dy);

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x - r}px`;
      ripple.style.top  = `${y - r}px`;
      ripple.style.width  = `${r * 2}px`;
      ripple.style.height = `${r * 2}px`;
      target.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return null;
}
