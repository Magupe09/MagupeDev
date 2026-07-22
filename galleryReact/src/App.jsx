// src/App.jsx
import React, { Suspense, lazy } from 'react';
import './index.css';
import { useResponsive } from './hooks/useResponsive';
import ScrollDeck from './components/ScrollDeck/ScrollDeck';
import SideMenu from './components/SideMenu/SideMenu';

import HeroCard from './sections/HeroCard';
import ProjectCard from './sections/ProjectCard';
import projects from './data/projects';

// ── Lazy: NarrativeDeck solo se carga en tablet/desktop (≥768px) ────────
const NarrativeDeck = lazy(() => import('./components/NarrativeDeck/NarrativeDeck'));

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
