import React from 'react';
import styles from './ProjectsSection.module.css';

// ── Datos de proyectos (misma fuente que NarrativeDeck) ────────────────────

const projects = [
  {
    id: 1,
    title: 'Gual-Tech',
    desc: 'App para gestión de máquinas industriales en tiempo real. Monitoreo, alertas y dashboard.',
    tech: 'React · TypeScript · Vercel',
    url: 'https://github.com/Magupe09/Gual-Tech',
  },
  {
    id: 2,
    title: 'Sintenedor.com',
    desc: 'App web para dark kitchen. Pedidos online, menú dinámico y gestión en tiempo real.',
    tech: 'React · TypeScript · PostgreSQL',
    url: 'https://github.com/Magupe09/Sintenedor.com',
  },
  {
    id: 3,
    title: 'Pizza App',
    desc: 'PWA con Next.js para emprendimiento online. Catálogo, pedidos y notificaciones push.',
    tech: 'Next.js · TypeScript · PWA',
    url: 'https://github.com/Magupe09/pizza-app',
  },
];

// ── SVG arrow para "Ver código" ────────────────────────────────────────────

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
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

function ProjectsSection() {
  return (
    <div className={styles.container}>
      {/* Watermark + título */}
      <span className={styles.number}>03</span>
      <h2 className={styles.title}>Proyectos</h2>

      {/* Tarjetas */}
      <div className={styles.cardList}>
        {projects.map((project, i) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            {/* Número watermark */}
            <span className={styles.cardNumber}>0{i + 1}</span>

            {/* Contenido */}
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.desc}</p>
            <span className={styles.cardTech}>{project.tech}</span>

            {/* Link indicator */}
            <span className={styles.cardLink}>
              Ver código
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
