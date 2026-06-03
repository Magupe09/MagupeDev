import React from 'react';
import { OrbitingAvatar } from '@magupe/orbiting-avatar';
import { useResponsive } from '../hooks/useResponsive';
import styles from './HeroCard.module.css';

// ── Assets ────────────────────────────────────────────────────────────────
import avatarImage from '../assets/AvatarPortafolio2.webp';
import htmlLogo from '../assets/sKills/HTML5.png';
import typescriptLogo from '../assets/sKills/Typescript.png';
import figmaLogo from '../assets/sKills/figma.png';
import jsLogo from '../assets/sKills/javascript.svg';
import reactLogo from '../assets/sKills/logo-react.svg';
import sqlLogo from '../assets/sKills/sql.svg';

const skills = [
  { name: 'JavaScript', icon: jsLogo, distance: 0.9, speed: 10, selfRotate: 2, direction: 1 },
  { name: 'React', icon: reactLogo, distance: 1.1, speed: 12, selfRotate: 1.5, direction: -1 },
  { name: 'Figma', icon: figmaLogo, distance: 0.75, speed: 8, selfRotate: 3, direction: 1 },
  { name: 'HTML', icon: htmlLogo, distance: 1.0, speed: 11, selfRotate: 2.5, direction: -1 },
  { name: 'TypeScript', icon: typescriptLogo, distance: 0.85, speed: 9, selfRotate: 1.8, direction: 1 },
  { name: 'SQL', icon: sqlLogo, distance: 1.2, speed: 13, selfRotate: 3.5, direction: -1 },
];

// ── Componente ─────────────────────────────────────────────────────────────

function HeroCard() {
  const { isMobile } = useResponsive();

  return (
    <div className={styles.card}>
      {/* Avatar con skills orbitando — parámetros reducidos en mobile */}
      <div className={styles.avatarWrap}>
        <OrbitingAvatar
          avatarSrc={avatarImage}
          avatarAlt="MagupeDev"
          avatarSize={isMobile ? 200 : 240}
          skills={skills}
          orbitCenter="bottom"
          shadow={{ opacity: 0.5, blur: 4, offsetY: -6 }}
          trail={{ copies: isMobile ? 2 : 5, opacity: 0.3, minScale: 0.1 }}
        />
      </div>

      {/* Texto */}
      <h1 className={styles.name}>MagupeDev</h1>
      <p className={styles.role}>Front-End Developer</p>
      <hr className={styles.divider} />
      <p className={styles.tagline}>
        Transformo ideas en experiencias digitales
      </p>
      <a
        href="MagupeDev/Mauricio_Gualteros_Pereira_Developer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cvLink}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>Hoja de Vida</span>
      </a>
    </div>
  );
}

export default HeroCard;
