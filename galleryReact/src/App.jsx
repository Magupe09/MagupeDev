// src/App.jsx
import React from 'react';
import './index.css';
import ScrollDeck from './components/ScrollDeck/ScrollDeck';
import NarrativeDeck from './components/NarrativeDeck/NarrativeDeck';
import SideMenu from './components/SideMenu/SideMenu';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';

const sections = [
  <HeroSection key="hero" />,
  <AboutSection key="about" />,
  <ProjectsSection key="projects" />,
];

function App() {
  return (
    <>
      {/* Tablet y Desktop (≥768px): narrativa de scroll con elementos que se posicionan */}
      <div className="deck-desktop">
        <NarrativeDeck />
      </div>

      {/* Mobile (<768px): secciones con efecto de profundidad + menú lateral */}
      <div className="deck-mobile">
        <ScrollDeck sections={sections} />
        <SideMenu />
      </div>
    </>
  );
}

export default App;
