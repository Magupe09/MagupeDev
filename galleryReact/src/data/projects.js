/**
 * Datos de proyectos del portafolio.
 *
 * Fuente única de verdad compartida entre:
 *   - App.jsx           → mobile (ScrollDeck → ProjectCard)
 *   - NarrativeDeck.jsx → tablet / desktop
 *   - ProjectsSection.jsx → sin uso actual (código muerto)
 *
 * Para agregar un proyecto nuevo solo se edita este archivo.
 */

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

export default projects;
