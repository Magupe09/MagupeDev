import { useState, useEffect } from 'react';

/**
 * useResponsive
 *
 * Detecta el viewport actual para adaptar tamaños y posiciones.
 * Retorna el ancho y flags booleanos para mobile, tablet y desktop.
 *
 * @returns {{ width: number, isMobile: boolean, isTablet: boolean, isDesktop: boolean }}
 */
export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );

  useEffect(() => {
    let frameId;
    const handleResize = () => {
      // Debounce vía requestAnimationFrame para no disparar en cada pixel
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
