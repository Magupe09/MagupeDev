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
 * Carta individual de proyecto.
 *
 * @param {Object} props
 * @param {string} props.title — Nombre del proyecto
 * @param {string} props.desc — Descripción
 * @param {string} props.tech — Stack técnico
 * @param {string} props.url — Link al repo de GitHub
 */
function ProjectCard({ title, desc, tech, url }) {
  return (
    <div className={styles.card}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inner}
        aria-label={`Ver código de ${title} en GitHub`}
      >
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
