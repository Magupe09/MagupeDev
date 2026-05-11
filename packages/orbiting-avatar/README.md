# @magupe/orbiting-avatar

Avatar component with orbiting tech skill icons — like a planetary system around your profile picture.

Built with React + Framer Motion.

## Install

```bash
npm install @magupe/orbiting-avatar framer-motion
```

> `react` and `framer-motion` are peer dependencies — make sure you have them installed.

## Usage

```jsx
import { OrbitingAvatar } from '@magupe/orbiting-avatar';
import '@magupe/orbiting-avatar/style.css';

// Import your assets
import avatarImg from './assets/avatar.png';
import reactLogo from './assets/react.svg';
import jsLogo from './assets/js.png';

const skills = [
  { name: 'React',   icon: reactLogo, distance: 1.1, speed: 12, selfRotate: 1.5, direction: -1 },
  { name: 'JS',      icon: jsLogo,    distance: 0.9, speed: 10, selfRotate: 2,   direction: 1  },
];

function App() {
  return (
    <OrbitingAvatar
      avatarSrc={avatarImg}
      avatarAlt="My avatar"
      avatarSize={300}
      skills={skills}
      orbitCenter="bottom"
      shadow={{ opacity: 0.5, blur: 4, offsetY: -6 }}
      trail={{ copies: 5, opacity: 0.3, minScale: 0.1 }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarSrc` | `string` | **required** | Imported image path for the avatar |
| `avatarAlt` | `string` | `''` | Alt text for the avatar image |
| `avatarSize` | `number` | `300` | Avatar height in px (base for the whole system) |
| `skills` | `Skill[]` | `[]` | Array of skill objects to orbit |
| `orbitCenter` | `'center'` \| `'bottom'` \| `0-1` | `'bottom'` | Orbit center point |
| `shadow` | `boolean` \| `ShadowConfig` | `false` | Drop shadow configuration |
| `trail` | `boolean` \| `TrailConfig` | `undefined` | Trail effect behind orbiting icons |
| `animateEntrance` | `boolean` | `true` | Animate avatar entrance |
| `className` | `string` | `''` | Additional CSS classes |

### Skill shape

```ts
interface Skill {
  name: string;        // Display name (used as key, not rendered)
  icon: string;        // Imported image path
  distance: number;    // 1.0 = avatar edge, 1.5 = 50% farther
  speed: number;       // Seconds per full orbit
  selfRotate: number;  // Icon self-rotation speed
  direction: 1 | -1;   // 1 = clockwise, -1 = counter-clockwise
}
```

### ShadowConfig

```ts
interface ShadowConfig {
  opacity?: number;    // Default: 0.5
  blur?: number;       // Default: 4 (px)
  offsetY?: number;    // Default: -6 (px)
}
```

### TrailConfig

```ts
interface TrailConfig {
  copies?: number;         // Default: 5
  opacity?: number;        // Default: 0.3
  fadeDuration?: number;   // Default: 1.8 (seconds)
  minScale?: number;       // Default: 0.1
}
```

## License

MIT
