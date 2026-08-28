import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const threshold = Math.max(900, window.innerHeight * 1.1);
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  function goTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      className="fixed bottom-[max(4.75rem,calc(3.5rem+env(safe-area-inset-bottom,0px)))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[45] inline-flex h-11 w-11 items-center justify-center rounded-full border border-dark/15 bg-surface/95 text-ink shadow-card md:bottom-8 md:right-6"
      aria-label="Наверх"
      onClick={goTop}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 12.5V3.5M8 3.5 3.5 8M8 3.5 12.5 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
