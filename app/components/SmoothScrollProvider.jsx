import {useEffect, useRef, useState} from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({children}) {
  const lenisRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure hydration completes before initializing smooth scroll
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Initialize Lenis with proper configuration
    const lenis = new Lenis({
      duration: 1.6, // slower, more noticeable smoothing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: true,
      touchMultiplier: 1.2,
      infinite: false,
      // Prevent Lenis from interfering with scrollable elements like cart sidebar
      prevent: (node) => {
        // Check if the node or any parent has specific classes that should scroll natively
        let element = node;
        while (element) {
          if (
            element.classList?.contains('cart-main') ||
            element.classList?.contains('overlay') ||
            element.getAttribute?.('role') === 'dialog'
          ) {
            return true; // Prevent Lenis from handling scroll in these elements
          }
          element = element.parentElement;
        }
        return false;
      },
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [isMounted]);

  return <>{children}</>;
}

