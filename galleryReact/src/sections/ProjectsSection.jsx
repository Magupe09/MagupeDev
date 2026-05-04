import React from 'react';
import styles from './SectionPlaceholder.module.css';

function ProjectsSection() {
  return (
    <div className={styles.section}>
      <span className={styles.number}>03</span>
      <h2 className={styles.title}>Proyectos</h2>
      <p className={styles.subtitle}>
        Una selección de trabajos donde el código se encuentra con el diseño.
      </p>
    </div>
  );
}

export default ProjectsSection;
