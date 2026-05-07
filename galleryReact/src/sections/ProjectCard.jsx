import React from 'react';
import styles from './ProjectCard.module.css';

// ── SVG arrow ──────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Componente ─────────────────────────────────────────────────────────────

/**
 * ProjectCard
 *
 * Carta individual de proyecto para el deck parallax.
 * Cada proyecto tiene su propia carta y su momento de brillar al centro.
 *
 * @param {Object} props
 * @param {number} props.index — Posición en el deck (para el número watermark)
 * @param {string} props.title — Nombre del proyecto
 * @param {string} props.desc — Descripción
 * @param {string} props.tech — Stack técnico
 * @param {string} props.url — Link al repo de GitHub
 */
function ProjectCard({ index, title, desc, tech, url }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className={styles.card}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inner}
        aria-label={`Ver código de ${title} en GitHub`}
      >
        <span className={styles.number}>{num}</span>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{desc}</p>
        <span className={styles.tech}>{tech}</span>

        <span className={styles.linkRow}>
          Ver código fuente
          <ArrowIcon />
        </span>
      </a>
    </div>
  );
}

export default ProjectCard;
