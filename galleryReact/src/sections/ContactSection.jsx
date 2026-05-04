import React from 'react';
import styles from './SectionPlaceholder.module.css';

function ContactSection() {
  return (
    <div className={styles.section}>
      <span className={styles.number}>04</span>
      <h2 className={styles.title}>Contacto</h2>
      <p className={styles.subtitle}>
        ¿Tenés un proyecto en mente? Hablemos.
      </p>
    </div>
  );
}

export default ContactSection;
