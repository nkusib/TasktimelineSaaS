'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface RevealWrapperProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  threshold?: number;
  className?: string;
}

export default function RevealWrapper({
  children,
  delay = 0,
  threshold = 0.12,
  className = '',
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';
  return (
    <div ref={ref} className={`reveal-hidden ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
