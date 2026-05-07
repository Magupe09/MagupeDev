import { useTransform } from 'framer-motion';

/**
 * useParallaxCard
 *
 * Calcula los transforms de parallax para una carta dentro del deck.
 * Modelo: cada carta tiene un "ancla" fija. El "focus" se mueve con el scroll.
 * Cuanto más cerca está una carta del focus, más grande, nítida y centrada.
 * Cuanto más lejos, más chica, borrosa y desplazada hacia los bordes.
 * Las cartas NUNCA desaparecen completamente — siempre son visibles.
 *
 * @param {import('framer-motion').MotionValue<number>} scrollYProgress — 0 → 1
 * @param {number} index — Índice de la carta (0-based)
 * @param {number} totalCards — Total de cartas en el deck
 * @returns {{ y, scale, opacity, filter, zIndex }}
 */
export function useParallaxCard(scrollYProgress, index, totalCards) {
  // ── Ancla: posición ideal donde la carta está perfectamente centrada ──
  // Las cartas se distribuyen uniformemente en el rango del scroll.
  const anchor = totalCards > 1 ? index / (totalCards - 1) : 0;

  // ── Distancia al focus ────────────────────────────────────────────────
  //   distance < 0 : la carta está DEBAJO del focus (el usuario aún no llegó)
  //   distance = 0 : la carta está EN el focus (centrada, protagonista)
  //   distance > 0 : la carta está ARRIBA del focus (el usuario ya la pasó)
  const distance = useTransform(
    scrollYProgress,
    [0, 1],
    [-anchor, 1 - anchor],
  );

  // ═══════════════════════════════════════════════════════════════════════
  //  Transforms derivados
  // ═══════════════════════════════════════════════════════════════════════

  // --- translateY: empuja las cartas hacia los bordes según su distancia ---
  //     En focus (distance=0): centrada (0vh)
  //     Lejos arriba (distance=+1): flota arriba (-60vh)
  //     Lejos abajo (distance=-1): espera abajo (+60vh)
  const y = useTransform(distance, [-1, 0, 1], ['60vh', '0vh', '-60vh']);

  // --- scale: achica las cartas alejadas para dar profundidad ---
  const scale = useTransform(distance, [-1, 0, 1], [0.65, 1, 0.65]);

  // --- opacity: atenúa sin desaparecer ---
  const opacity = useTransform(distance, [-1, 0, 1], [0.3, 1, 0.3]);

  // --- blur: desenfoque progresivo = sensación de profundidad ---
  const blur = useTransform(distance, [-1, 0, 1], [8, 0, 8]);

  // --- brightness: cartas lejanas más oscuras ---
  const brightness = useTransform(distance, [-1, 0, 1], [0.45, 1, 0.45]);

  // --- filter combinado: blur + brightness ---
  const filter = useTransform(
    [blur, brightness],
    ([b, br]) => `blur(${b}px) brightness(${br})`,
  );

  // --- z-index: la carta activa siempre arriba de todo ---
  const zIndex = useTransform(
    distance,
    [-0.25, 0, 0.25],
    [1, 10, 1],
  );

  return { y, scale, opacity, filter, zIndex };
}
