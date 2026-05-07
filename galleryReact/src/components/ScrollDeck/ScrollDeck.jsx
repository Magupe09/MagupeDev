import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useParallaxCard } from '../../hooks/useParallaxDeck';
import styles from './ScrollDeck.module.css';

/**
 * ParallaxLayer
 *
 * Envuelve una carta del deck aplicándole los transforms parallax
 * calculados por useParallaxCard. Cada layer es fixed, cubre todo
 * el viewport y se transforma según su distancia al focus.
 *
 * @param {Object} props
 * @param {import('framer-motion').MotionValue<number>} props.scrollYProgress
 * @param {number} props.index
 * @param {number} props.totalCards
 * @param {React.ReactNode} props.children
 */
function ParallaxLayer({ scrollYProgress, index, totalCards, children }) {
  const { y, scale, opacity, filter, zIndex } = useParallaxCard(
    scrollYProgress,
    index,
    totalCards,
  );

  return (
    <motion.div
      className={styles.layer}
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollDeck
 *
 * Deck de cartas con efecto parallax. Cada carta (capa fixed) se
 * transforma suavemente al scrollear: las cartas cercanas al focus
 * están centradas y nítidas, las lejanas se desenfocan y desplazan
 * hacia los bordes. Ninguna desaparece — siempre hay contexto visual
 * de dónde venís y hacia dónde vas.
 *
 * @param {Object} props
 * @param {React.ReactNode[]} props.cards — Array de componentes de carta
 */
function ScrollDeck({ cards = [] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = cards.length;

  return (
    <div
      ref={containerRef}
      className={styles.scrollDeck}
      style={{ height: `${totalCards * 100}vh` }}
    >
      {cards.map((cardContent, index) => (
        <ParallaxLayer
          key={index}
          scrollYProgress={scrollYProgress}
          index={index}
          totalCards={totalCards}
        >
          {cardContent}
        </ParallaxLayer>
      ))}
    </div>
  );
}

export default ScrollDeck;
