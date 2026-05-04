import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OrbitingAvatar from '../OrbitingAvatar/OrbitingAvatar';
import { useResponsive } from '../../hooks/useResponsive';
import styles from './NarrativeDeck.module.css';

// ── Assets ────────────────────────────────────────────────────────────────
import avatarImage from '../../assets/AvatarPortafolio2.png';
import htmlLogo from '../../assets/sKills/HTML5.png';
import typescriptLogo from '../../assets/sKills/Typescript.png';
import figmaLogo from '../../assets/sKills/figma.png';
import jsLogo from '../../assets/sKills/javascript.svg';
import reactLogo from '../../assets/sKills/logo-react.svg';
import sqlLogo from '../../assets/sKills/sql.svg';

// ── Data ──────────────────────────────────────────────────────────────────

const skills = [
  { name: 'JavaScript', icon: jsLogo, distance: 0.9, speed: 10, selfRotate: 2, direction: 1 },
  { name: 'React', icon: reactLogo, distance: 1.1, speed: 12, selfRotate: 1.5, direction: -1 },
  { name: 'Figma', icon: figmaLogo, distance: 0.75, speed: 8, selfRotate: 3, direction: 1 },
  { name: 'HTML', icon: htmlLogo, distance: 1.0, speed: 11, selfRotate: 2.5, direction: -1 },
  { name: 'TypeScript', icon: typescriptLogo, distance: 0.85, speed: 9, selfRotate: 1.8, direction: 1 },
  { name: 'SQL', icon: sqlLogo, distance: 1.2, speed: 13, selfRotate: 3.5, direction: -1 },
];

const projects = [
  {
    id: 1,
    title: 'Gallery React',
    desc: 'Portfolio interactivo con scroll narrativo y efectos de profundidad.',
    tech: 'React · Framer Motion · CSS',
  },
  {
    id: 2,
    title: 'E-Commerce',
    desc: 'Dashboard con analytics en tiempo real y gestión de productos.',
    tech: 'Next.js · TypeScript · D3',
  },
  {
    id: 3,
    title: 'TaskFlow',
    desc: 'App de productividad con drag & drop y colaboración en equipo.',
    tech: 'React · Zustand · Firebase',
  },
];

// ── Storyboard ────────────────────────────────────────────────────────────
//
//  0% ─────  Avatar enorme centrado (único elemento visible)
//  0% → 25%  Avatar se encoge y desliza al cuadrante superior izquierdo
// 15% → 40%  Texto (nombre + bio + redes) aparece y se desliza al superior derecho
// 35% → 50%  Proyecto 1 sube desde abajo al footer
// 50% → 65%  Proyecto 2 sube desde abajo al footer
// 65% → 80%  Proyecto 3 sube desde abajo al footer
// 80% →100%  Todo asentado – layout final visible
//
// Layout final (tablet 768-1023px / desktop ≥1024px):
//   ┌──────────────────────────────────────┐
//   │  ┌──────────┐  ┌──────────────────┐  │  60vh
//   │  │  Avatar  │  │  MagupeDev       │  │
//   │  │ + skills │  │  Mi historia     │  │
//   │  │          │  │  + redes         │  │
//   │  └──────────┘  └──────────────────┘  │
//   ├──────────────────────────────────────┤
//   │  ┌──────┐  ┌──────┐  ┌──────┐       │  40vh
//   │  │ Pro 1│  │ Pro 2│  │ Pro 3│       │
//   │  └──────┘  └──────┘  └──────┘       │
//   └──────────────────────────────────────┘
// ───────────────────────────────────────────────────────────────────────────

function NarrativeDeck() {
  const { isDesktop } = useResponsive();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Config adaptativa por viewport ──────────────────────────────────────
  const cfg = useMemo(() => ({
    avatarSize: isDesktop ? 380 : 260,
    // Avatar: 0% → 25%
    avatar: {
      xEnd: isDesktop ? '-28vw' : '-22vw',
      yEnd: isDesktop ? '-18vh' : '-20vh',
      scaleStart: isDesktop ? 1.2 : 1.15,
      scaleEnd: isDesktop ? 0.75 : 0.65,
    },
    // Texto: 15% → 40%
    text: {
      xEnd: isDesktop ? '26vw' : '20vw',
      yEnd: isDesktop ? '-18vh' : '-20vh',
    },
    // Proyectos: posición X final de cada card
    projects: isDesktop
      ? ['-26vw', '0vw', '26vw']
      : ['-20vw', '0vw', '20vw'],
  }), [isDesktop]);

  // ═══════════════════════════════════════════════════════════════════════
  //  Avatar — 0 % → 25 %
  // ═══════════════════════════════════════════════════════════════════════
  const avatarX = useTransform(scrollYProgress, [0, 0.25], ['0vw', cfg.avatar.xEnd]);
  const avatarY = useTransform(scrollYProgress, [0, 0.25], ['0vh', cfg.avatar.yEnd]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.25], [cfg.avatar.scaleStart, cfg.avatar.scaleEnd]);

  // ═══════════════════════════════════════════════════════════════════════
  //  Texto — 15 % → 40 %
  // ═══════════════════════════════════════════════════════════════════════
  const textX = useTransform(scrollYProgress, [0.15, 0.40], ['10vw', cfg.text.xEnd]);
  const textY = useTransform(scrollYProgress, [0.15, 0.40], ['6vh', cfg.text.yEnd]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.22, 0.40], [0, 0.8, 1]);
  const textBlur = useTransform(scrollYProgress, [0.15, 0.40], [10, 0]);
  const textBrightness = useTransform(scrollYProgress, [0.15, 0.40], [0.4, 1]);
  const textFilter = useTransform(
    [textBlur, textBrightness],
    ([b, br]) => `blur(${b}px) brightness(${br})`,
  );

  // ═══════════════════════════════════════════════════════════════════════
  //  Proyectos — cada uno con su ventana de animación
  // ═══════════════════════════════════════════════════════════════════════
  const projectPhases = [
    { start: 0.35, end: 0.50, x: cfg.projects[0] },  // izquierda
    { start: 0.50, end: 0.65, x: cfg.projects[1] },  // centro
    { start: 0.65, end: 0.80, x: cfg.projects[2] },  // derecha
  ];

  const projectMotionValues = projectPhases.map((phase) => {
    const y = useTransform(scrollYProgress, [phase.start, phase.end], ['60vh', '24vh']);
    const opacity = useTransform(
      scrollYProgress,
      [phase.start, phase.start + (phase.end - phase.start) * 0.3, phase.end],
      [0, 0.6, 1],
    );
    const scale = useTransform(scrollYProgress, [phase.start, phase.end], [0.8, 1]);
    const blur = useTransform(scrollYProgress, [phase.start, phase.end], [16, 0]);
    const brightness = useTransform(scrollYProgress, [phase.start, phase.end], [0.3, 1]);
    const filter = useTransform(
      [blur, brightness],
      ([b, br]) => `blur(${b}px) brightness(${br})`,
    );
    return { x: phase.x, y, opacity, scale, filter };
  });

  // ═══════════════════════════════════════════════════════════════════════
  //  Render
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div ref={containerRef} className={styles.deck} style={{ height: '600vh' }}>
      {/* ── Avatar ──────────────────────────────────────────────────── */}
      <motion.div
        className={styles.layer}
        style={{ x: avatarX, y: avatarY, scale: avatarScale }}
      >
        <OrbitingAvatar
          avatarSrc={avatarImage}
          avatarAlt="MagupeDev"
          avatarSize={cfg.avatarSize}
          skills={skills}
          orbitCenter="bottom"
          shadow={{ opacity: 0.5, blur: 4, offsetY: -6 }}
          trail={{ copies: 5, opacity: 0.3, minScale: 0.1 }}
          animateEntrance={false}
        />
      </motion.div>

      {/* ── Texto ───────────────────────────────────────────────────── */}
      <motion.div
        className={styles.layer}
        style={{
          x: textX,
          y: textY,
          opacity: textOpacity,
          filter: textFilter,
        }}
      >
        <div className={styles.textBlock}>
          <h1 className={styles.name}>MagupeDev</h1>
          <p className={styles.role}>Front-End Developer</p>
          <hr className={styles.divider} />
          <p className={styles.bio}>
            Transformo ideas en experiencias digitales que no solo funcionan,
            sino que se sienten bien. Especializado en React, TypeScript y
            arquitecturas escalables.
          </p>
          <div className={styles.socials}>
            <a
              href="https://github.com/magupe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/magupe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Proyectos ───────────────────────────────────────────────── */}
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          className={styles.layer}
          style={{
            x: projectMotionValues[i].x,
            y: projectMotionValues[i].y,
            scale: projectMotionValues[i].scale,
            opacity: projectMotionValues[i].opacity,
            filter: projectMotionValues[i].filter,
          }}
        >
          <div className={styles.card}>
            <span className={styles.cardNumber}>0{i + 1}</span>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.desc}</p>
            <span className={styles.cardTech}>{project.tech}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default NarrativeDeck;
