import React from 'react';
import { motion } from 'framer-motion';
import styles from './OrbitingAvatar.module.css';

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_TRAIL = {
  copies: 5,
  opacity: 0.3,
  fadeDuration: 1.8,
  minScale: 0.1,
};

const DEFAULT_SHADOW = {
  opacity: 0.5,
  blur: 4,
  offsetY: -6,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convierte la prop `orbitCenter` a un porcentaje usable.
 *
 *  - 'center'  →  50 %
 *  - 'bottom'  → 100 % (base del contenedor del avatar)
 *  - número    →  valor * 100  (0 = top, 1 = bottom)
 */
function resolveOrbitCenter(value) {
  if (value === 'center') return 50;
  if (value === 'bottom') return 100;
  if (typeof value === 'number') return Math.max(0, Math.min(1, value)) * 100;
  return 50; // fallback seguro
}

/**
 * Mezcla los defaults con las props del usuario.
 * Las props del usuario tienen prioridad.
 */
function mergeDefaults(user, defaults) {
  if (user === false) return null; // deshabilitado explícitamente
  if (user === true || user === undefined) return { ...defaults };
  return { ...defaults, ...user };
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

/**
 * OrbitingAvatar
 *
 * Avatar profesional rodeado de iconos de tecnologías que orbitan a su
 * alrededor como un sistema planetario. Todo encapsulado en un solo
 * componente reutilizable.
 *
 * @param {Object}   props
 * @param {string}   props.avatarSrc         - Ruta importada de la imagen del avatar
 * @param {string}   [props.avatarAlt]       - Texto alternativo para la imagen
 * @param {number}   [props.avatarSize=300]  - Alto del avatar en px (la base para todo el sistema)
 * @param {Array}    [props.skills=[]]       - Array de objetos Skill (ver abajo)
 * @param {string|number} [props.orbitCenter='bottom'] - Centro de órbita: 'center' | 'bottom' | 0-1
 * @param {boolean|Object} [props.shadow=false] - Sombra: false | true | { opacity, blur, offsetY }
 * @param {boolean|Object} [props.trail]      - Estela de las órbitas: false | { copies, opacity, fadeDuration, minScale }
 * @param {boolean}  [props.animateEntrance=true] - Animar la entrada del avatar
 * @param {string}   [props.className]        - Clases CSS adicionales
 *
 * // --- Skill shape ---
 * // {
 * //   name:       string,   // Nombre visible (no se renderiza, solo para debug)
 * //   icon:       string,   // Ruta importada (ej: import reactLogo from '...')
 * //   distance:   number,   // 1.0 = borde del avatar, 1.5 = 50 % más lejos
 * //   speed:      number,   // Segundos que tarda en dar una vuelta completa
 * //   selfRotate: number,   // Velocidad de rotación propia (icono girando sobre sí mismo)
 * //   direction:  1 | -1,   // 1 = horario, -1 = antihorario
 * // }
 */
function OrbitingAvatar({
  avatarSrc,
  avatarAlt = '',
  avatarSize = 300,
  skills = [],
  orbitCenter = 'bottom',
  shadow = false,
  trail,
  animateEntrance = true,
  className = '',
}) {
  // --- Resolver configuración final ---
  const trailCfg = mergeDefaults(trail, DEFAULT_TRAIL);
  const shadowCfg = mergeDefaults(shadow, DEFAULT_SHADOW);
  const orbitCenterPct = resolveOrbitCenter(orbitCenter);
  const avatarRadius = avatarSize / 2;

  // --- Avatar: variantes de entrada ---
  const avatarVariants = animateEntrance
    ? {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 2, ease: 'easeOut' },
        },
      }
    : {};

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div
      className={`${styles.root} ${className}`}
      style={{
        '--av-size': `${avatarSize}px`,
      }}
    >
      {/* ================================================================ */}
      {/*  Capa Avatar + Sombra                                             */}
      {/* ================================================================ */}
      <motion.div
        className={`${styles.avatarWrapper} ${shadowCfg ? styles.hasShadow : ''}`}
        style={{
          width: avatarSize,
          height: avatarSize,

          // Variables CSS para el pseudo-elemento ::after
          ...(shadowCfg && {
            '--shadow-opacity': shadowCfg.opacity,
            '--shadow-blur': `${shadowCfg.blur}px`,
            '--shadow-offset': `${shadowCfg.offsetY}px`,
            '--shadow-img': `url(${avatarSrc})`,
          }),
        }}
        variants={avatarVariants}
        initial={animateEntrance ? 'hidden' : false}
        animate={animateEntrance ? 'visible' : false}
      >
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className={styles.avatarImage}
        />
      </motion.div>

      {/* ================================================================ */}
      {/*  Capa de Órbitas (solo si hay skills)                            */}
      {/* ================================================================ */}
      {skills.length > 0 && trailCfg !== null && (
        <div className={styles.orbitLayer}>
          {skills.map((skill) => {
            const orbitRadius = avatarRadius * skill.distance;
            const totalCopies = trailCfg.copies + 1;

            return Array.from({ length: totalCopies }).map((_, copyIdx) => {
              const isMain = copyIdx === 0;
              const progress = copyIdx / trailCfg.copies;

              // Estela: opacidad y escala decrecientes
              const opacity = isMain
                ? 1
                : trailCfg.opacity * (1 - progress);
              const scale = isMain
                ? 1
                : trailCfg.minScale + (1 - progress) * (1 - trailCfg.minScale);

              // Retraso angular para que las copias "sigan" al principal
              const orbitDelay = copyIdx * 0.02 * skill.speed;

              return (
                <motion.div
                  key={`${skill.name}-${copyIdx}`}
                  className={styles.orbitWrapper}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: `${orbitCenterPct}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isMain ? 2 : 1,
                  }}
                  // Rotación de la órbita (el wrapper gira entero)
                  animate={{ rotate: 360 * skill.direction }}
                  transition={{
                    duration: skill.speed,
                    ease: 'linear',
                    repeat: Infinity,
                    delay: orbitDelay,
                  }}
                >
                  <motion.img
                    src={skill.icon}
                    alt={skill.name}
                    className={styles.skillLogo}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${orbitRadius}px)`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={
                      animateEntrance ? { opacity: 0, scale: 0.5 } : {}
                    }
                    animate={{
                      opacity,
                      scale,
                      rotate: 360 * skill.direction,
                    }}
                    transition={{
                      delay: orbitDelay,
                      duration: isMain ? 0.01 : trailCfg.fadeDuration,
                      rotate: {
                        duration: skill.selfRotate,
                        ease: 'linear',
                        repeat: Infinity,
                      },
                    }}
                  />
                </motion.div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}

export default OrbitingAvatar;
