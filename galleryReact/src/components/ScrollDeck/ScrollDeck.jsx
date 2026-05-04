import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollDeck, useSectionProgress } from '../../hooks/useScrollDeck';
import styles from './ScrollDeck.module.css';

/**
 * Section
 *
 * Envuelve el contenido de una sección aplicándole los efectos de
 * profundidad (scale, blur, opacity) calculados por useSectionProgress.
 *
 * @param {Object} props
 * @param {MotionValue<number>} props.scrollYProgress
 * @param {number} props.index
 * @param {number} props.totalSections
 * @param {React.ReactNode} props.children
 */
function Section({ scrollYProgress, index, totalSections, children }) {
  const { scale, opacity, filterValue, zIndex, rawProgress } =
    useSectionProgress(scrollYProgress, index, totalSections);

  // Solo la sección "activa" (rawProgress entre 30% y 70%) recibe eventos
  const activeClass = rawProgress.get
    ? undefined
    : undefined; // MotionValue no soporta class toggling directo

  // Usamos el z-index dinámico para stacking
  // pointer-events: auto solo cuando scale ≈ 1 y opacity ≈ 1
  // Lo manejamos con un useTransform sobre opacity

  return (
    <motion.div
      className={styles.section}
      style={{
        scale,
        opacity,
        filter: filterValue,
        zIndex,
        pointerEvents: 'none', // default off
      }}
      // El content wrapper maneja pointer-events internamente si es necesario
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollDeck
 *
 * Contenedor principal. Proporciona el espacio de scroll (altura falsa)
 * y renderiza todas las secciones como capas fixed que se transforman
 * en profundidad al scrollear.
 *
 * @param {Object} props
 * @param {React.ReactNode[]} props.sections - Array de componentes de sección
 */
function ScrollDeck({ sections = [] }) {
  const containerRef = useRef(null);
  const scrollYProgress = useScrollDeck(containerRef);
  const totalSections = sections.length;

  return (
    <div
      ref={containerRef}
      className={styles.scrollDeck}
      style={{ height: `${totalSections * 100}vh` }}
    >
      {sections.map((sectionContent, index) => (
        <Section
          key={index}
          scrollYProgress={scrollYProgress}
          index={index}
          totalSections={totalSections}
        >
          {sectionContent}
        </Section>
      ))}
    </div>
  );
}

export default ScrollDeck;
