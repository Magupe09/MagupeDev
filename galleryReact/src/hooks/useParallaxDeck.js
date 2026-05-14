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
  //     Plateau en [-0.12, 0.12]: la carta se mantiene centrada (0vh) un instante
  //     Lejos arriba (distance=+1): flota arriba (-120vh), sale de pantalla
  //     Lejos abajo (distance=-1): espera abajo (+120vh), sale de pantalla
  const y = useTransform(distance, [-1, -0.12, 0.12, 1], ['120vh', '0vh', '0vh', '-120vh']);

  // --- scale: achica las cartas alejadas para dar profundidad ---
  //     Plateau reducido: la carta empieza a alejarse antes, evita solapamiento
  const scale = useTransform(distance, [-1, -0.12, 0.12, 1], [0.35, 1.2, 1.2, 0.35]);

  // --- opacity: atenúa sin desaparecer ---
  //     Plateau reducido al 24% central del recorrido
  const opacity = useTransform(distance, [-1, -0.12, 0.12, 1], [0.06, 1, 1, 0.06]);

  // --- blur: desenfoque progresivo = sensación de profundidad ---
  //     Plateau reducido: la carta se desenfoca antes
  const blur = useTransform(distance, [-1, -0.12, 0.12, 1], [18, 0, 0, 18]);

  // --- brightness: cartas lejanas más oscuras ---
  //     Plateau reducido: la carta se oscurece antes
  const brightness = useTransform(distance, [-1, -0.12, 0.12, 1], [0.2, 1, 1, 0.2]);

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
