import { jsxs as x, jsx as i } from "react/jsx-runtime";
import { motion as d } from "framer-motion";
const A = "_root_1gbwj_7", N = "_avatarWrapper_1gbwj_17", C = "_avatarImage_1gbwj_24", I = "_hasShadow_1gbwj_31", O = "_orbitLayer_1gbwj_57", R = "_orbitWrapper_1gbwj_69", S = "_skillLogo_1gbwj_77", r = {
  root: A,
  avatarWrapper: N,
  avatarImage: C,
  hasShadow: I,
  orbitLayer: O,
  orbitWrapper: R,
  skillLogo: S
}, M = {
  copies: 5,
  opacity: 0.3,
  fadeDuration: 1.8,
  minScale: 0.1
}, T = {
  opacity: 0.5,
  blur: 4,
  offsetY: -6
};
function F(t) {
  return t === "center" ? 50 : t === "bottom" ? 100 : typeof t == "number" ? Math.max(0, Math.min(1, t)) * 100 : 50;
}
function u(t, s) {
  return t === !1 ? null : t === !0 || t === void 0 ? { ...s } : { ...s, ...t };
}
function P({
  avatarSrc: t,
  avatarAlt: s = "",
  avatarSize: n = 300,
  skills: m = [],
  orbitCenter: g = "bottom",
  shadow: h = !1,
  trail: _,
  animateEntrance: c = !0,
  className: y = ""
}) {
  const o = u(_, M), e = u(h, T), w = F(g), v = n / 2, $ = c ? {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: "easeOut" }
    }
  } : {};
  return /* @__PURE__ */ x(
    "div",
    {
      className: `${r.root} ${y}`,
      style: {
        "--av-size": `${n}px`
      },
      children: [
        /* @__PURE__ */ i(
          d.div,
          {
            className: `${r.avatarWrapper} ${e ? r.hasShadow : ""}`,
            style: {
              width: n,
              height: n,
              // Variables CSS para el pseudo-elemento ::after
              ...e && {
                "--shadow-opacity": e.opacity,
                "--shadow-blur": `${e.blur}px`,
                "--shadow-offset": `${e.offsetY}px`,
                "--shadow-img": `url(${t})`
              }
            },
            variants: $,
            initial: c ? "hidden" : !1,
            animate: c ? "visible" : !1,
            children: /* @__PURE__ */ i(
              "img",
              {
                src: t,
                alt: s,
                className: r.avatarImage
              }
            )
          }
        ),
        m.length > 0 && o !== null && /* @__PURE__ */ i("div", { className: r.orbitLayer, children: m.map((a) => {
          const L = v * a.distance, j = o.copies + 1;
          return Array.from({ length: j }).map((U, l) => {
            const p = l === 0, f = l / o.copies, W = p ? 1 : o.opacity * (1 - f), D = p ? 1 : o.minScale + (1 - f) * (1 - o.minScale), b = l * 0.02 * a.speed;
            return /* @__PURE__ */ i(
              d.div,
              {
                className: r.orbitWrapper,
                style: {
                  position: "absolute",
                  left: "50%",
                  top: `${w}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: p ? 2 : 1
                },
                animate: { rotate: 360 * a.direction },
                transition: {
                  duration: a.speed,
                  ease: "linear",
                  repeat: 1 / 0,
                  delay: b
                },
                children: /* @__PURE__ */ i(
                  d.img,
                  {
                    src: a.icon,
                    alt: a.name,
                    className: r.skillLogo,
                    style: {
                      position: "absolute",
                      left: `calc(50% + ${L}px)`,
                      top: "50%",
                      transform: "translate(-50%, -50%)"
                    },
                    initial: c ? { opacity: 0, scale: 0.5 } : {},
                    animate: {
                      opacity: W,
                      scale: D,
                      rotate: 360 * a.direction
                    },
                    transition: {
                      delay: b,
                      duration: p ? 0.01 : o.fadeDuration,
                      rotate: {
                        duration: a.selfRotate,
                        ease: "linear",
                        repeat: 1 / 0
                      }
                    }
                  }
                )
              },
              `${a.name}-${l}`
            );
          });
        }) })
      ]
    }
  );
}
export {
  P as OrbitingAvatar
};
//# sourceMappingURL=orbiting-avatar.js.map
