import { useTransform } from 'framer-motion';

/**
 * useParallaxCard
 *
 * Calcula los transforms de parallax para una carta dentro del deck.
 * Modelo: cada carta tiene un "ancla" fija. El "focus" se mueve con el scroll.
 * Cuanto más cerca está una carta del focus, más grande, nítida y centrada.
 * Cuanto más lejos, más chica y desplazada hacia los bordes.
 * Las cartas NUNCA desaparecen completamente — siempre son visibles.
 *
 * Optimizado: sin filter:blur — la profundidad se logra con scale + opacity.
 *
 * @param {import('framer-motion').MotionValue<number>} scrollYProgress — 0 → 1
 * @param {number} index — Índice de la carta (0-based)
 * @param {number} totalCards — Total de cartas en el deck
 * @returns {{ y, scale, opacity, zIndex }}
 */
export function useParallaxCard(scrollYProgress, index, totalCards) {
  // ── Ancla: posición ideal donde la carta está perfectamente centrada ──
  const anchor = totalCards > 1 ? index / (totalCards - 1) : 0;

  // ── Distancia al focus ────────────────────────────────────────────────
  const distance = useTransform(
    scrollYProgress,
    [0, 1],
    [-anchor, 1 - anchor],
  );

  // ═══════════════════════════════════════════════════════════════════════
  //  Transforms derivados
  // ═══════════════════════════════════════════════════════════════════════

  // --- translateY: empuja las cartas hacia los bordes según su distancia ---
  const y = useTransform(distance, [-1, -0.12, 0.12, 1], ['120vh', '0vh', '0vh', '-120vh']);

  // --- scale: achica las cartas alejadas para dar profundidad ---
  const scale = useTransform(distance, [-1, -0.12, 0.12, 1], [0.35, 1.2, 1.2, 0.35]);

  // --- opacity: atenúa sin desaparecer ---
  const opacity = useTransform(distance, [-1, -0.12, 0.12, 1], [0.06, 1, 1, 0.06]);

  // --- z-index: la carta activa siempre arriba de todo ---
  const zIndex = useTransform(
    distance,
    [-0.25, 0, 0.25],
    [1, 10, 1],
  );

  return { y, scale, opacity, zIndex };
}
