import { useRef, useEffect, useState } from 'react';
import styles from './CursorGlow.module.css';

/**
 * Capas del efecto trailing.
 * Cada capa persigue al cursor con distinta velocidad (lerp),
 * creando una estela de luz multicolor sobre el fondo negro.
 *
 * Orden: lento (estela exterior) → rápido (núcleo brillante).
 */
const LAYERS = [
  { size: 700, blur: 110, opacity: 0.08, speed: 0.03, color: '65,209,255' },  // cyan trail — slowest
  { size: 450, blur: 75,  opacity: 0.10, speed: 0.06, color: '189,52,254' },  // purple trail
  { size: 250, blur: 45,  opacity: 0.14, speed: 0.10, color: '255,197,23' },  // gold mid
  { size: 120, blur: 20,  opacity: 0.22, speed: 0.18, color: '255,197,23' },  // gold
  { size: 40,  blur: 6,   opacity: 0.40, speed: 0.35, color: '255,255,255' }, // white core — fastest
];

/**
 * CursorGlow
 *
 * Efecto de estela de luz que sigue al mouse/touch compuesto por
 * múltiples capas radiales con distinto blur, tamaño y velocidad.
 * Cada capa interpola su posición hacia el cursor/dedo con lerp,
 * lo que genera el efecto "trailing" natural.
 *
 * Desktop: sigue el mouse (mousemove).
 * Mobile:  sigue el dedo al deslizar (touchmove).
 */
function CursorGlow() {
  const targetRef = useRef({ x: -300, y: -300 });
  const positionsRef = useRef(
    LAYERS.map(() => ({ x: -300, y: -300 })),
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
    const animate = () => {
      const target = targetRef.current;
      let changed = false;

      positionsRef.current.forEach((pos, i) => {
        const speed = LAYERS[i].speed;
        const newX = pos.x + (target.x - pos.x) * speed;
        const newY = pos.y + (target.y - pos.y) * speed;

        if (Math.abs(pos.x - newX) > 0.1 || Math.abs(pos.y - newY) > 0.1) {
          pos.x = newX;
          pos.y = newY;
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
      {positionsRef.current.map((pos, i) => (
        <div
          key={i}
          className={styles.layer}
          style={{
            left: pos.x,
            top: pos.y,
            width: LAYERS[i].size,
            height: LAYERS[i].size,
            background: `radial-gradient(circle, rgba(${LAYERS[i].color},${LAYERS[i].opacity}) 0%, transparent 70%)`,
            filter: `blur(${LAYERS[i].blur}px)`,
          }}
        />
      ))}
    </div>
  );
}

export default CursorGlow;
