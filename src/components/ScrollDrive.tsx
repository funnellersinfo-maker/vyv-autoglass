"use client";

/**
 * ScrollDrive — elemento dopaminérgico ligado al scroll.
 *
 * Un carro V&V (vista superior, estilo navegación GPS) recorre una carretera
 * vertical mientras el usuario hace scroll:
 *  - Móvil: borde IZQUIERDO (WhatsApp y LanguageSwitch viven a la derecha).
 *  - Desktop: borde DERECHO (lado clásico del scrollbar), con límite inferior
 *    que despeja el botón flotante de WhatsApp.
 *  - 9 hitos = secciones reales de la página (clickeables, con scrollspy).
 *  - Líneas de velocidad + haz de faros cuando se scrollea rápido (useVelocity).
 *  - El carro gira 180° cuando se sube (spring suave).
 *  - HUD: % mientras scrolleas + chip con la sección actual al cambiarla.
 *  - "¡Ruta completa!" al llegar al 100%.
 *  - Barra de progreso superior amarilla (siempre visible).
 *  - prefers-reduced-motion: solo barra de progreso, sin carro ni springs.
 *
 * Performance: solo transforms/opacity (GPU), springs de framer-motion,
 * contenedor pointer-events-none (los botones re-activan los eventos).
 */

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Flag, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { trackMilestone, trackRoadAdvance } from "@/lib/track";

/** Secciones reales de la landing (ids existentes en el DOM). */
const SECTION_DEFS = [
  { id: "top", key: "road.home" },
  { id: "servicios", key: "nav.services" },
  { id: "cotizador", key: "road.quote" },
  { id: "como-funciona", key: "nav.how" },
  { id: "testimonios", key: "nav.testimonials" },
  { id: "antes-despues", key: "nav.beforeAfter" },
  { id: "experto", key: "nav.about" },
  { id: "agendar", key: "road.book" },
  { id: "faq", key: "nav.faq" },
  { id: "ubicacion", key: "road.area" },
] as const;

const HEADER_OFFSET = 76;
const CAR_BOX = 44; // px, touch target

/** Confetti radial para la celebración al llegar al final de la ruta. */
const BURST_PIECES = [
  { dx: -6, dy: -34, rot: 220, d: 0, c: "#FFD60A" },
  { dx: 10, dy: -30, rot: -180, d: 0.03, c: "#FFC300" },
  { dx: 22, dy: -16, rot: 140, d: 0.06, c: "#FFD60A" },
  { dx: 28, dy: 4, rot: -220, d: 0.02, c: "#FFFFFF" },
  { dx: 20, dy: 24, rot: 170, d: 0.07, c: "#FFC300" },
  { dx: 4, dy: 34, rot: -140, d: 0.04, c: "#FFD60A" },
  { dx: -14, dy: 30, rot: 200, d: 0.09, c: "#0A0A0A" },
  { dx: -26, dy: 16, rot: -170, d: 0.05, c: "#FFD60A" },
  { dx: -32, dy: -6, rot: 150, d: 0.08, c: "#FFC300" },
  { dx: -22, dy: -24, rot: -210, d: 0.01, c: "#FFFFFF" },
  { dx: 2, dy: -20, rot: 180, d: 0.1, c: "#FFC300" },
  { dx: 16, dy: 12, rot: -160, d: 0.02, c: "#FFD60A" },
  { dx: -12, dy: 6, rot: 190, d: 0.06, c: "#FFD60A" },
  { dx: 8, dy: -8, rot: -200, d: 0.11, c: "#0A0A0A" },
] as const;

export default function ScrollDrive() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.5,
  });
  const velocity = useVelocity(smooth);
  const speedOpacity = useTransform(
    velocity,
    (v) => Math.min(Math.max((Math.abs(v) - 0.22) / 0.8, 0), 1)
  );
  const beamOpacity = useTransform(
    velocity,
    (v) => Math.min(Math.max((Math.abs(v) - 0.1) / 0.9, 0), 0.85)
  );

  // Modo turbo: estelas fantasma con springs MÁS LENTOS que el carro.
  // Su opacidad hereda la MISMA señal de velocidad ya probada de las líneas
  // de velocidad (speedOpacity), atenuada — en reposo no se ven.
  const trail1 = useSpring(scrollYProgress, { stiffness: 85, damping: 22, mass: 0.9 });
  const trail2 = useSpring(scrollYProgress, { stiffness: 58, damping: 20, mass: 1.1 });
  const trailTop1 = useTransform(
    trail1,
    (v) => `calc(${(v * 100).toFixed(3)}% - ${CAR_BOX / 2}px)`
  );
  const trailTop2 = useTransform(
    trail2,
    (v) => `calc(${(v * 100).toFixed(3)}% - ${CAR_BOX / 2}px)`
  );
  const ghostOpacity1 = useTransform(speedOpacity, (o) => o * 0.4);
  const ghostOpacity2 = useTransform(speedOpacity, (o) => o * 0.22);

  // Barra superior: con spring (suave) o directa si reduced-motion
  const progressForBar = reduceMotion ? scrollYProgress : smooth;

  // ---- Estado ligero (solo cambia en eventos, nunca por frame) ----
  const [marks, setMarks] = useState<number[]>([]);
  const [pct, setPct] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0); // gamificación: hito más lejano alcanzado
  const [dir, setDir] = useState<1 | -1>(1); // 1 = bajando
  const [hudVisible, setHudVisible] = useState(false);
  const [flashLabel, setFlashLabel] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const smoothRef = useRef(0);
  const marksRef = useRef<number[]>([]);
  const sectionRef = useRef(0);
  const maxIdxRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const finishedRef = useRef(false);
  const hudTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Medición de hitos (posición real de cada sección) ----
  const measure = useCallback(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const vals = SECTION_DEFS.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return 0;
      const absTop = el.getBoundingClientRect().top + window.scrollY;
      return Math.min(1, Math.max(0, absTop / max));
    });
    marksRef.current = vals;
    setMarks(vals);
  }, []);

  useEffect(() => {
    const t0 = setTimeout(measure, 0);
    const t1 = setTimeout(measure, 1200);
    const t2 = setTimeout(measure, 3500);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  // ---- HUD helpers ----
  const pingHud = useCallback(() => {
    setHudVisible(true);
    if (hudTimer.current) clearTimeout(hudTimer.current);
    hudTimer.current = setTimeout(() => setHudVisible(false), 1100);
  }, []);

  const flashSection = useCallback(
    (label: string) => {
      setFlashLabel(label);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashLabel(null), 1700);
    },
    []
  );

  // ---- Progreso → %, sección activa, meta final ----
  useMotionValueEvent(smooth, "change", (v) => {
    smoothRef.current = v;
    pingHud();

    const next = Math.round(v * 100);
    setPct((prev) => (prev === next ? prev : next));

    let idx = 0;
    for (let i = 0; i < marksRef.current.length; i++) {
      if (v >= marksRef.current[i] - 0.015) idx = i;
    }
    if (idx !== sectionRef.current) {
      sectionRef.current = idx;
      setSectionIdx(idx);
      flashSection(t(SECTION_DEFS[idx].key));
      // Gamificación: cada hito que pisas por primera vez queda dorado.
      if (idx > maxIdxRef.current) {
        maxIdxRef.current = idx;
        setMaxIdx(idx);
      }
    }

    if (v >= 0.995 && !finishedRef.current) {
      finishedRef.current = true;
      setFinished(true);
      setTimeout(() => setFinished(false), 2800);
    } else if (v < 0.97) {
      finishedRef.current = false;
    }
  });

  // ---- Velocidad → líneas de velocidad + dirección del carro ----
  useMotionValueEvent(velocity, "change", (v) => {
    if (v > 0.06 && dirRef.current !== 1) {
      dirRef.current = 1;
      setDir(1);
    } else if (v < -0.06 && dirRef.current !== -1) {
      dirRef.current = -1;
      setDir(-1);
    }
  });

  useEffect(() => {
    return () => {
      if (hudTimer.current) clearTimeout(hudTimer.current);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  // ---- Navegación ----
  const goToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
  }, []);

  const clickMilestone = useCallback(
    (i: number) => {
      trackMilestone(SECTION_DEFS[i].id, t(SECTION_DEFS[i].key));
      // Los hitos saltados al navegar también cuentan como visitados.
      if (i > maxIdxRef.current) {
        maxIdxRef.current = i;
        setMaxIdx(i);
      }
      goToId(SECTION_DEFS[i].id);
    },
    [goToId, t]
  );

  const goNext = useCallback(() => {
    const cur = smoothRef.current;
    const nextIdx = marksRef.current.findIndex((m) => m > cur + 0.025);
    if (nextIdx === -1) {
      goToId(SECTION_DEFS[SECTION_DEFS.length - 1].id);
    } else {
      goToId(SECTION_DEFS[nextIdx].id);
    }
  }, [goToId]);

  const clickCar = useCallback(() => {
    trackRoadAdvance(Math.round(smoothRef.current * 100));
    goNext();
  }, [goNext]);

  // ---- Posición del carro (string motion value, GPU-friendly) ----
  const carTop = useTransform(
    smooth,
    (v) => `calc(${(v * 100).toFixed(3)}% - ${CAR_BOX / 2}px)`
  );

  const activeLabel =
    SECTION_DEFS[sectionIdx]?.key != null ? t(SECTION_DEFS[sectionIdx].key) : "";

  return (
    <>
      {/* ===== Barra de progreso superior (siempre visible) ===== */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[60] h-[3.5px] origin-left bg-gradient-to-r from-vv-yellow via-vv-yellow-deep to-vv-yellow shadow-[0_0_10px_rgba(255,214,10,0.55)]"
        style={{ scaleX: progressForBar }}
      />

      {/* ===== Carretera + carro (solo sin reduced-motion) ===== */}
      {!reduceMotion && (
        <div
          className={
            "pointer-events-none fixed left-[3px] top-[108px] bottom-[98px] z-30 w-[30px] " +
            "md:left-auto md:right-[7px] md:top-[96px] md:bottom-[132px] md:w-[34px]"
          }
        >
          {/* Carretera */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-1/2 -ml-[7px] w-[14px] rounded-full bg-vv-black/15 ring-1 ring-white/10 backdrop-blur-[2px] md:w-[16px] md:-ml-[8px] md:bg-vv-black/30 md:ring-white/20"
          >
            <div className="vv-road-dashes absolute top-2 bottom-2 left-1/2 -ml-[1.5px] w-[3px] rounded-full opacity-80" />
          </div>

          {/* Hitos = secciones (navegación scrollspy) */}
          {marks.length > 0 && (
            <nav
              aria-label={t("road.next")}
              className="absolute inset-0"
            >
              {marks.map((m, i) => {
                const active = i === sectionIdx;
                const visited = i <= maxIdx; // ya recorriste esta parada
                return (
                  <button
                    key={SECTION_DEFS[i].id}
                    type="button"
                    onClick={() => clickMilestone(i)}
                    aria-label={t(SECTION_DEFS[i].key)}
                    aria-current={active ? "true" : undefined}
                    className={
                      "pointer-events-auto absolute left-1/2 -ml-[22px] grid h-11 w-11 place-items-center " +
                      "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-vv-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-vv-black/60"
                    }
                    style={{ top: `calc(${(m * 100).toFixed(2)}% - 22px)` }}
                  >
                    <span
                      key={active ? "on" : visited ? "seen" : "off"}
                      className={
                        "block h-2 w-2 rounded-full transition-all duration-300 hover:scale-150 " +
                        (active
                          ? "vv-dot-pop h-2.5 w-2.5 bg-vv-yellow shadow-[0_0_12px_rgba(255,214,10,0.95)] ring-2 ring-vv-yellow/40"
                          : visited
                            ? "bg-vv-yellow/75 ring-1 ring-vv-yellow/35 shadow-[0_0_8px_rgba(255,214,10,0.45)]"
                            : "bg-white/45 ring-1 ring-white/40")
                      }
                    />
                  </button>
                );
              })}
            </nav>
          )}

          {/* Estela fantasma lejana (solo visible en modo turbo) */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 z-0"
            style={{ top: trailTop2, opacity: ghostOpacity2 }}
          >
            <div className="mx-auto grid" style={{ height: CAR_BOX, width: CAR_BOX }}>
              <CarSvg className="h-7 w-auto md:h-8 opacity-60" />
            </div>
          </motion.div>

          {/* Estela fantasma cercana (solo visible en modo turbo) */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 z-0"
            style={{ top: trailTop1, opacity: ghostOpacity1 }}
          >
            <div className="mx-auto grid" style={{ height: CAR_BOX, width: CAR_BOX }}>
              <CarSvg className="h-7 w-auto md:h-8 opacity-75" />
            </div>
          </motion.div>

          {/* Carro */}
          <motion.div
            className="absolute left-0 right-0 z-10"
            style={{ top: carTop }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
          >
            <div className="relative mx-auto" style={{ height: CAR_BOX, width: CAR_BOX }}>
              {/* Resplandor bajo el carro */}
              <div
                aria-hidden="true"
                className="absolute inset-1 rounded-full bg-vv-yellow/25 blur-md"
              />

              {/* Visual rotatorio (dirección del viaje) */}
              <motion.button
                type="button"
                onClick={clickCar}
                aria-label={t("road.next")}
                className="pointer-events-auto absolute inset-0 grid cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-vv-yellow"
                animate={{ rotate: dir === 1 ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                {/* Haz de faros (aparece con velocidad) */}
                <motion.div
                  aria-hidden="true"
                  className="absolute -bottom-7 left-1/2 -ml-[18px] h-9 w-9 bg-[radial-gradient(ellipse_at_top,rgba(255,214,10,0.55),transparent_70%)] blur-[2px]"
                  style={{ opacity: beamOpacity }}
                />

                {/* Líneas de velocidad (detrás, aparecen con velocidad) */}
                <motion.div aria-hidden="true" className="absolute inset-0" style={{ opacity: speedOpacity }}>
                  <span className="vv-speedline absolute top-0 left-[7px] h-3.5 w-[2.5px] rounded-full bg-vv-yellow/90" />
                  <span className="vv-speedline absolute top-1.5 left-1/2 -ml-[1.25px] h-5 w-[2.5px] rounded-full bg-vv-yellow/70" />
                  <span className="vv-speedline absolute top-0 right-[7px] h-3.5 w-[2.5px] rounded-full bg-vv-yellow/90" />
                </motion.div>

                {/* Carrocería con pulso de motor en reposo + wiggle al llegar a meta */}
                <motion.div
                  className="relative"
                  animate={
                    finished
                      ? { scale: [1, 1.18, 1], rotate: [0, -16, 14, -9, 0] }
                      : { scale: [1, 1.05, 1] }
                  }
                  transition={
                    finished
                      ? { duration: 0.9, ease: "easeInOut" }
                      : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <CarSvg className="h-7 w-auto md:h-8" />
                </motion.div>
              </motion.button>

              {/* Celebración confetti al completar la ruta */}
              {finished && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
                  {BURST_PIECES.map((p, i) => (
                    <span
                      key={i}
                      className="vv-burst-piece"
                      style={
                        {
                          background: p.c,
                          "--dx": `${p.dx}px`,
                          "--dy": `${p.dy}px`,
                          "--rot": `${p.rot}deg`,
                          animationDelay: `${p.d}s`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              )}

              {/* HUD: % + sección (no rota con el carro) */}
              <AnimatePresence>
                {hudVisible && (
                  <motion.div
                    className={
                      "absolute top-1/2 flex flex-col gap-1 " +
                      "left-[48px] items-start md:left-auto md:right-[48px] md:items-end"
                    }
                    initial={{ opacity: 0, y: "-30%", scale: 0.85 }}
                    animate={{ opacity: 1, y: "-50%", scale: 1 }}
                    exit={{ opacity: 0, y: "-50%", scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    <span className="rounded-full bg-vv-black/90 px-2 py-[3px] text-[10px] font-extrabold tabular-nums text-vv-yellow ring-1 ring-vv-yellow/40 shadow-lg backdrop-blur-sm">
                      {pct}%
                    </span>
                    <span
                      className={
                        "flex max-w-[150px] items-center gap-1 rounded-lg bg-vv-yellow px-2 py-1 text-[10px] font-extrabold text-vv-black ring-1 ring-black/10 shadow-xl transition-all duration-300 " +
                        (flashLabel || finished ? "opacity-100" : "opacity-0")
                      }
                    >
                      {finished ? (
                        <Flag className="h-3 w-3 shrink-0" aria-hidden="true" />
                      ) : (
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">
                        {finished ? t("road.finish") : flashLabel ?? activeLabel}
                      </span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/** Carro V&V vista superior (apunta hacia abajo = avanzando con el scroll). */
function CarSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 46" className={className} aria-hidden="true">
      {/* Ruedas */}
      <rect x="0.6" y="8" width="4.6" height="8.5" rx="2.2" fill="#0A0A0A" />
      <rect x="22.8" y="8" width="4.6" height="8.5" rx="2.2" fill="#0A0A0A" />
      <rect x="0.6" y="30" width="4.6" height="8.5" rx="2.2" fill="#0A0A0A" />
      <rect x="22.8" y="30" width="4.6" height="8.5" rx="2.2" fill="#0A0A0A" />
      {/* Espejos */}
      <rect x="1.7" y="25.6" width="3" height="2.4" rx="1.2" fill="#FFC300" stroke="#0A0A0A" strokeWidth="0.7" />
      <rect x="23.3" y="25.6" width="3" height="2.4" rx="1.2" fill="#FFC300" stroke="#0A0A0A" strokeWidth="0.7" />
      {/* Carrocería */}
      <path
        d="M14 1.2 C20.6 1.2 24.2 5 24.2 11.6 L24.2 36.4 C24.2 41.8 20 45 14 45 C8 45 3.8 41.8 3.8 36.4 L3.8 11.6 C3.8 5 7.4 1.2 14 1.2 Z"
        fill="#FFD60A"
        stroke="#0A0A0A"
        strokeWidth="1.4"
      />
      {/* Techo */}
      <rect x="7.4" y="17.8" width="13.2" height="10.2" rx="2.4" fill="#FFC300" />
      {/* Vidrio trasero */}
      <path d="M7.2 11.4 Q14 8.9 20.8 11.4 L20.5 16.6 Q14 14.5 7.5 16.6 Z" fill="#141414" />
      {/* Parabrisas (frente abajo) */}
      <path d="M7.5 29.4 Q14 27.3 20.5 29.4 L20.8 34.6 Q14 32.2 7.2 34.6 Z" fill="#141414" />
      {/* Brillo en el parabrisas */}
      <path d="M10.2 29 L12.6 28.7 L9.4 34 L8.2 33.4 Z" fill="#FFFFFF" opacity="0.35" />
      {/* Faroles */}
      <circle cx="9.4" cy="42" r="1.7" fill="#FFF8D6" />
      <circle cx="18.6" cy="42" r="1.7" fill="#FFF8D6" />
      {/* Calaveras */}
      <rect x="6.4" y="2.6" width="3.2" height="1.7" rx="0.85" fill="#0A0A0A" opacity="0.85" />
      <rect x="18.4" y="2.6" width="3.2" height="1.7" rx="0.85" fill="#0A0A0A" opacity="0.85" />
    </svg>
  );
}
