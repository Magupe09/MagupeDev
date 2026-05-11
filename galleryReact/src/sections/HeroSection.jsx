import React from 'react';
import { OrbitingAvatar } from '@magupe/orbiting-avatar';
import styles from './HeroSection.module.css';

// --- Assets ---
import avatarImage from '../assets/AvatarPortafolio2.png';
import htmlLogo from '../assets/sKills/HTML5.png';
import typescriptLogo from '../assets/sKills/Typescript.png';
import figmaLogo from '../assets/sKills/figma.png';
import jsLogo from '../assets/sKills/javascript.svg';
import reactLogo from '../assets/sKills/logo-react.svg';
import sqlLogo from '../assets/sKills/sql.svg';

const skills = [
  { name: 'JavaScript',  icon: jsLogo,          distance: 0.9,  speed: 10,  selfRotate: 2,   direction: 1 },
  { name: 'React',       icon: reactLogo,       distance: 1.1,  speed: 12,  selfRotate: 1.5, direction: -1 },
  { name: 'Figma',       icon: figmaLogo,       distance: 0.75, speed: 8,   selfRotate: 3,   direction: 1 },
  { name: 'HTML',        icon: htmlLogo,        distance: 1.0,  speed: 11,  selfRotate: 2.5, direction: -1 },
  { name: 'TypeScript',  icon: typescriptLogo,  distance: 0.85, speed: 9,   selfRotate: 1.8, direction: 1 },
  { name: 'SQL',         icon: sqlLogo,         distance: 1.2,  speed: 13,  selfRotate: 3.5, direction: -1 },
];

function HeroSection() {
  return (
    <div className={styles.hero}>
      {/* Avatar + Skills */}
      <div className={styles.avatarColumn}>
        <OrbitingAvatar
          avatarSrc={avatarImage}
          avatarAlt="MagupeDev"
          avatarSize={300}
          skills={skills}
          orbitCenter="bottom"
          shadow={{ opacity: 0.5, blur: 4, offsetY: -6 }}
          trail={{ copies: 5, opacity: 0.3, minScale: 0.1 }}
        />
      </div>

      {/* Tipografía */}
      <div className={styles.textColumn}>
        <h1 className={styles.name}>MagupeDev</h1>
        <p className={styles.role}>Front-End Developer</p>
        <hr className={styles.divider} />
        <p className={styles.tagline}>
          Transformo ideas en experiencias digitales
        </p>
      </div>

      {/* Scroll hint: solo visible en el hero */}
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </div>
  );
}

export default HeroSection;
