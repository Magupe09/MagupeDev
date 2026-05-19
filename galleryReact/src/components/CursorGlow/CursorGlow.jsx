import { useRef, useEffect, useState } from 'react';
import styles from './CursorGlow.module.css';

/**
 * Capas del efecto trailing.
 * Cada capa persigue al cursor con distinta velocidad (lerp),
 * creando una estela de luz multicolor sobre el fondo negro.
 *
 * Sin filter:blur — el suavizado se logra con gradientes multi-stop.
 * spread: [inicio, medio, final] como fracciones 0→1 para los stops del gradiente.
 *
 * Orden: lento (estela exterior) → rápido (núcleo brillante).
 */
const LAYERS = [
  { size: 920, opacity: 0.08, speed: 0.03, color: '65,209,255', stops: [0, 0.22, 0.48, 0.8] },  // cyan trail — slowest
  { size: 600, opacity: 0.10, speed: 0.06, color: '189,52,254', stops: [0, 0.25, 0.52, 0.8] },  // purple trail
  { size: 330, opacity: 0.14, speed: 0.10, color: '255,197,23', stops: [0, 0.28, 0.55, 0.8] },  // gold mid
  { size: 150, opacity: 0.22, speed: 0.18, color: '255,197,23', stops: [0, 0.30, 0.55, 0.8] },  // gold
  { size: 50,  opacity: 0.40, speed: 0.35, color: '255,255,255', stops: [0, 0.35, 0.60, 0.8] }, // white core — fastest
];

/**
 * CursorGlow
 *
 * Efecto de estela de luz que sigue al mouse/touch compuesto por
 * múltiples capas radiales. Cada capa interpola su posición hacia
 * el cursor/dedo con lerp, generando el efecto "trailing" natural.
 *
 * Optimizado para Safari: usa transform:translate3d en vez de left/top,
 * gradientes multi-stop en vez de filter:blur, y threshold de movimiento
 * para evitar renders innecesarios.
 *
 * Desktop: sigue el mouse (mousemove).
 * Mobile:  sigue el dedo al deslizar (touchmove).
 */
function CursorGlow() {
  const targetRef = useRef({ x: -500, y: -500 });
  const positionsRef = useRef(
    LAYERS.map(() => ({ x: -500, y: -500 })),
  );
  const [, forceRender] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouchDevice = !window.matchMedia('(hover: hover)').matches;

    const updateTarget = (x, y) => {
      targetRef.current = { x, y };
    };

    const handleMouseMove = (e) => {
      updateTarget(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Desktop: mouse; Mobile: touch
    if (isTouchDevice) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    } else {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let rafId;
    const MOVEMENT_THRESHOLD = 2; // px — ignora micro-movimientos

    const animate = () => {
      const target = targetRef.current;
      let changed = false;

      positionsRef.current.forEach((pos, i) => {
        const speed = LAYERS[i].speed;
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;

        // Solo actualizar si el cursor se movió significativamente
        if (Math.abs(dx) > MOVEMENT_THRESHOLD || Math.abs(dy) > MOVEMENT_THRESHOLD) {
          pos.x += dx * speed;
          pos.y += dy * speed;
          changed = true;
        }
      });

      if (changed) forceRender(Date.now());
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (isTouchDevice) {
        window.removeEventListener('touchmove', handleTouchMove);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.glow} aria-hidden="true">
      {positionsRef.current.map((pos, i) => {
        const layer = LAYERS[i];
        const [s0, s1, s2, s3] = layer.stops;
        return (
          <div
            key={i}
            className={styles.layer}
            style={{
              width: layer.size,
              height: layer.size,
              transform: `translate3d(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%), 0)`,
              background: `
                radial-gradient(
                  circle at center,
                  rgba(${layer.color},${layer.opacity}) ${s0 * 100}%,
                  rgba(${layer.color},${layer.opacity * 0.5}) ${s1 * 100}%,
                  rgba(${layer.color},${layer.opacity * 0.1}) ${s2 * 100}%,
                  transparent ${s3 * 100}%
                )
              `,
            }}
          />
        );
      })}
    </div>
  );
}

export default CursorGlow;
