// src/App.jsx
import React from 'react';
import './index.css';
import ScrollDeck from './components/ScrollDeck/ScrollDeck';
import NarrativeDeck from './components/NarrativeDeck/NarrativeDeck';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const sections = [
  <HeroSection key="hero" />,
  <AboutSection key="about" />,
  <ProjectsSection key="projects" />,
  <ContactSection key="contact" />,
];

function App() {
  return (
    <>
      {/* Desktop (≥1024px): narrativa de scroll con elementos que se posicionan */}
      <div className="deck-desktop">
        <NarrativeDeck />
      </div>

      {/* Mobile (<1024px): secciones que aparecen de a una */}
      <div className="deck-mobile">
        <ScrollDeck sections={sections} />
      </div>
    </>
  );
}

export default App;
