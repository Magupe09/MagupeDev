// src/App.jsx
import React, { Suspense, lazy } from 'react';
import './index.css';
import { useResponsive } from './hooks/useResponsive';
import ScrollDeck from './components/ScrollDeck/ScrollDeck';
import SideMenu from './components/SideMenu/SideMenu';

import HeroCard from './sections/HeroCard';
import ProjectCard from './sections/ProjectCard';

// ── Lazy: NarrativeDeck solo se carga en tablet/desktop (≥768px) ────────
const NarrativeDeck = lazy(() => import('./components/NarrativeDeck/NarrativeDeck'));

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
  {
    id: 4,
    title: 'BiciControl',
    desc: 'App para registro de bicicletas en centros comerciales. Control de acceso y monitoreo en tiempo real.',
    tech: 'JavaScript · CSS · HTML',
    url: 'https://github.com/Magupe09/BiciControl',
  },
];

// ── Deck de cartas: Hero + cada proyecto es una carta independiente ────────

const cards = [
  <HeroCard key="hero" />,
  ...projects.map((project) => (
    <ProjectCard
      key={project.id}
      title={project.title}
      desc={project.desc}
      tech={project.tech}
      url={project.url}
    />
  )),
];

// ── App ────────────────────────────────────────────────────────────────────

function App() {
  const { isMobile } = useResponsive();

  return (
    <>
      {/* Tablet y Desktop (≥768px): narrativa de scroll. Solo se monta si es necesario. */}
      {!isMobile && (
        <Suspense fallback={null}>
          <NarrativeDeck />
        </Suspense>
      )}

      {/* Mobile (<768px): deck de cartas con scroll nativo + menú lateral */}
      {isMobile && (
        <>
          <ScrollDeck cards={cards} />
          <SideMenu />
        </>
      )}
    </>
  );
}

export default App;
