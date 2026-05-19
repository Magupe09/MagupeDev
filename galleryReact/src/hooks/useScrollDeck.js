import { useScroll, useTransform } from 'framer-motion';

/**
 * useScrollDeck
 *
 * Hook principal: lee el progreso del scroll de un contenedor.
 *
 * @param {React.RefObject} containerRef - Ref al contenedor scrolleable
 * @returns {MotionValue<number>}  0 → 1  (progreso total del scroll)
 */
export function useScrollDeck(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return scrollYProgress;
}

/**
 * useSectionProgress
 *
 * Dado el progreso global del scroll, el índice de la sección y el total,
 * devuelve MotionValues de scale y opacity
 * para el efecto de "profundidad".
 *
 * Cada sección tiene una "ventana activa" de ancho 1/totalSections.
 * Dentro de esa ventana:
 *   - 0% → 30%  : entrada  (scale sube, opacity sube)
 *   - 30% → 70% : activa   (todo estable)
 *   - 70% → 100%: salida   (scale baja, opacity baja)
 *
 * Optimizado: sin filter:blur — la profundidad se logra con scale + opacity.
 *
 * @param {MotionValue<number>} scrollYProgress
 * @param {number} index
 * @param {number} totalSections
 * @returns {{ scale, opacity, zIndex, rawProgress }}
 */
export function useSectionProgress(scrollYProgress, index, totalSections) {
  const sectionStart = index / totalSections;
  const sectionEnd = (index + 1) / totalSections;

  // Progreso crudo dentro de la ventana de esta sección (0 → 1)
  const rawProgress = useTransform(
    scrollYProgress,
    [sectionStart, sectionEnd],
    [0, 1],
  );

  // La primera sección (index === 0) arranca totalmente visible:
  // no tiene fase de "entrada", solo se anima al salir.
  const isFirst = index === 0;

  const scale = useTransform(
    rawProgress,
    isFirst ? [0, 0.7, 1] : [0, 0.3, 0.7, 1],
    isFirst ? [1, 1, 0.85] : [0.85, 1, 1, 0.85],
  );
  const opacity = useTransform(
    rawProgress,
    isFirst ? [0, 0.8, 1] : [0, 0.2, 0.8, 1],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0],
  );

  // z-index: pico en el centro de la ventana
  const zIndex = useTransform(rawProgress, [0, 0.5, 1], [index + 1, index + 100, index + 1]);

  return { scale, opacity, zIndex, rawProgress };
}
