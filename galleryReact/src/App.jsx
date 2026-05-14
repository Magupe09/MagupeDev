// src/App.jsx
import React from 'react';
import './index.css';
import ScrollDeck from './components/ScrollDeck/ScrollDeck';
import NarrativeDeck from './components/NarrativeDeck/NarrativeDeck';
import SideMenu from './components/SideMenu/SideMenu';

import HeroCard from './sections/HeroCard';
import ProjectCard from './sections/ProjectCard';

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

// ── Deck de cartas: Hero + cada proyecto es una carta independiente ────────

const cards = [
  <HeroCard key="hero" />,
  ...projects.map((project, i) => (
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
  return (
    <>
      {/* Tablet y Desktop (≥768px): narrativa de scroll con elementos que se posicionan */}
      <div className="deck-desktop">
        <NarrativeDeck />
      </div>

      {/* Mobile (<768px): deck de cartas con parallax + menú lateral */}
      <div className="deck-mobile">
        <ScrollDeck cards={cards} />
        <SideMenu />
      </div>
    </>
  );
}

export default App;
