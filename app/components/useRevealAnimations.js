import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lightweight reveal animations for cards and panels.
 * Usage: call useRevealAnimations(containerRef) and add class names
 *  - "reveal-card" for product cards
 *  - "reveal-panel" for sidebar cards/panels
 */
export function useRevealAnimations(containerRef) {
  useEffect(() => {
    const root = containerRef?.current || document;

    // GSAP context to auto-cleanup
    const ctx = gsap.context(() => {
      // Product cards
      gsap.utils.toArray('.reveal-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 22,
          scale: 0.98,
          duration: 0.5,
          ease: 'power2.out',
          delay: Math.min(i * 0.05, 0.3),
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        });
      });

      // Sidebar panels
      gsap.utils.toArray('.reveal-panel').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 14,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [containerRef]);
}


