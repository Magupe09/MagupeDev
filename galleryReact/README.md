# 🚀 MagupeDev — Portfolio Interactivo

Portfolio personal con scroll narrativo, sistema planetario de skills y diseño glassmorphism. Construido con React, Framer Motion y Three.js.

**[🌐 Ver Demo](https://Magupe09.github.io/GalleryReact)**

---

## ✨ Características

- **🎬 Scroll Narrativo** — Los elementos (avatar, texto, proyectos) se posicionan progresivamente al scrollear, creando una experiencia cinematográfica en desktop y tablet
- **🪐 Skills Orbitantes** — Las tecnologías orbitan alrededor del avatar como un sistema planetario, con React Three Fiber y animaciones fluidas
- **📱 Responsive Adaptativo** — Tres breakpoints con experiencias distintas:
  - **Mobile (<768px):** Efecto de profundidad con secciones que emergen + menú lateral glassmorphism
  - **Tablet (768-1023px):** Scroll narrativo con tamaños optimizados
  - **Desktop (≥1024px):** Experiencia completa con elementos a mayor escala
- **🎨 Glassmorphism** — Diseño translúcido con blur, bordes sutiles y paleta oscura con acentos cyan
- **🔗 Proyectos Reales** — Cards clickeables con datos de repositorios GitHub, hover effects y links directos

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | React 19 |
| **Bundler** | Vite 7 |
| **Animaciones** | Framer Motion 12 |
| **3D / Órbitas** | React Three Fiber + Drei |
| **Estilos** | CSS Modules + CSS Custom Properties |
| **Deploy** | GitHub Pages (`gh-pages`) |
| **Linting** | ESLint 9 |

## 📂 Estructura del Proyecto

```
src/
├── App.jsx                          # Switcher responsive NarrativeDeck / ScrollDeck
├── index.css                        # Estilos globales + breakpoints
├── main.jsx                         # Punto de entrada
├── assets/                          # Imágenes, SVGs, logos de skills
├── components/
│   ├── NarrativeDeck/               # Scroll narrativo (tablet/desktop)
│   │   ├── NarrativeDeck.jsx        # 6 fases de animación en 600vh
│   │   └── NarrativeDeck.module.css
│   ├── OrbitingAvatar/              # Avatar + skills orbitando (reutilizable)
│   │   ├── OrbitingAvatar.jsx
│   │   └── OrbitingAvatar.module.css
│   ├── ScrollDeck/                  # Efecto de profundidad (mobile)
│   │   ├── ScrollDeck.jsx
│   │   └── ScrollDeck.module.css
│   └── SideMenu/                    # Menú lateral mobile
│       ├── SideMenu.jsx
│       └── SideMenu.module.css
├── hooks/
│   ├── useResponsive.js             # Detección de viewport (mobile/tablet/desktop)
│   └── useScrollDeck.js             # Progreso de scroll + profundidad
└── sections/
    ├── HeroSection.jsx              # Avatar + tipografía
    ├── AboutSection.jsx             # Bio y skills
    └── ProjectsSection.jsx          # Grid de proyectos (mobile)
```

## 🚀 Ejecutar Localmente

```bash
# Clonar el repositorio
git clone https://github.com/Magupe09/GalleryReact.git
cd GalleryReact/galleryReact

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🌍 Deploy

El proyecto se despliega automáticamente en GitHub Pages:

```bash
npm run deploy
```

Esto ejecuta `vite build` y publica el directorio `dist/` en la rama `gh-pages`.

## 🎯 Roadmap

- [ ] Animación de opacidad en la fase final del scroll
- [ ] Extraer SVGs de redes sociales a un módulo compartido
- [ ] Agregar más proyectos al portfolio
- [ ] Modo claro/oscuro

---

<div align="center">

Hecho con ❤️ por **[MagupeDev](https://github.com/Magupe09)**

</div>
