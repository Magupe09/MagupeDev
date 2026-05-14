import React from 'react';
import CursorGlow from '../CursorGlow/CursorGlow';
import styles from './ScrollDeck.module.css';

/**
 * ScrollDeck
 *
 * Deck de cartas con scroll nativo para mobile (<768px).
 * Las cartas se apilan verticalmente con scroll normal,
 * sin parallax ni animaciones de transform.
 *
 * @param {Object} props
 * @param {React.ReactNode[]} props.cards — Array de componentes de carta
 */
function ScrollDeck({ cards = [] }) {
  return (
    <div className={styles.scrollDeck}>
      <CursorGlow />

      {cards.map((cardContent, index) => (
        <div key={index} className={styles.cardSlot}>
          {cardContent}
        </div>
      ))}
    </div>
  );
}

export default ScrollDeck;
