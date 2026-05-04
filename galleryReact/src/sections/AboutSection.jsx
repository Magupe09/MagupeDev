import React from 'react';
import styles from './SectionPlaceholder.module.css';

function AboutSection() {
  return (
    <div className={styles.section}>
      <span className={styles.number}>02</span>
      <h2 className={styles.title}>Sobre mí</h2>
      <p className={styles.subtitle}>
        Desarrollador Front-End apasionado por crear interfaces que no solo
        funcionan, sino que se sienten bien. Especializado en React,
        TypeScript y arquitecturas escalables.
      </p>
    </div>
  );
}

export default AboutSection;
