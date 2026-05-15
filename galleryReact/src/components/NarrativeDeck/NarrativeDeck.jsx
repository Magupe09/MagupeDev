import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OrbitingAvatar } from '@magupe/orbiting-avatar';
import { useResponsive } from '../../hooks/useResponsive';
import CursorGlow from '../CursorGlow/CursorGlow';
import styles from './NarrativeDeck.module.css';

// ── Assets ────────────────────────────────────────────────────────────────
import avatarImage from '../../assets/AvatarPortafolio2.png';
import htmlLogo from '../../assets/sKills/HTML5.png';
import typescriptLogo from '../../assets/sKills/Typescript.png';
import figmaLogo from '../../assets/sKills/figma.png';
import jsLogo from '../../assets/sKills/javascript.svg';
import reactLogo from '../../assets/sKills/logo-react.svg';
import sqlLogo from '../../assets/sKills/sql.svg';

// ── Social Links (SVGs inline) ─────────────────────────────────────────────

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Magupe09',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/magupe',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:contacto@magupe.dev',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/magupe',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ── Skills ──────────────────────────────────────────────────────────────────

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
    // Proyectos: posición X final de cada card (separación amplia para evitar overlap)
    projects: isDesktop
      ? ['-30vw', '0vw', '30vw']
      : ['-28vw', '0vw', '28vw'],
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
      {/* ── Efecto de estela de luz al mover el mouse ────────────────── */}
      <CursorGlow />

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
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <a
            href="/MagupeDev/Mauricio_Gualteros_Pereira_Developer.pdf"
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
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.cardNumber}>0{i + 1}</span>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.desc}</p>
            <span className={styles.cardTech}>{project.tech}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );
}

export default NarrativeDeck;
