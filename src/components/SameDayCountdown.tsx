"use client";

/**
 * SameDayCountdown — urgencia REAL ligada a la regla del negocio
 * ("llama antes de las 2pm para servicio el mismo día").
 *
 * - Calcula el tiempo restante hasta las 14:00 de HOY en America/Los_Angeles.
 * - Antes del corte: cuenta regresiva en vivo (tictac por segundo).
 * - Después del corte: cambia a estado "agenda para mañana" (sin mentir).
 * - Sin parpadeo de hidratación: el primer render (SSR y cliente) muestra
 *   un placeholder neutro; el tiempo llega con el primer effect.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer, Sunrise } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const TZ = "America/Los_Angeles";
const CUTOFF_H = 14; // 2pm
const CUTOFF_S = CUTOFF_H * 3600;

/** Hora local (wall clock) de PT en segundos del día. */
function ptSecondsOfDay(now: Date = new Date()): number {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(now).filter((p) => p.type !== "literal").map((p) => [p.type, p.value])
  );
  const h = Number(parts.hour) % 24;
  return h * 3600 + Number(parts.minute) * 60 + Number(parts.second);
}

/** Segundos hasta el próximo corte de las 2pm (0 o negativo = ya pasó). */
function secondsUntilCutoff(now: Date = new Date()): number {
  return CUTOFF_S - ptSecondsOfDay(now);
}

export default function SameDayCountdown() {
  const { t } = useI18n();
  // null = aún no montado (placeholder estable para SSR)
  const [rem, setRem] = useState<number | null>(null);

  useEffect(() => {
    const t0 = setTimeout(() => setRem(secondsUntilCutoff()), 0);
    const id = setInterval(() => setRem(secondsUntilCutoff()), 1000);
    return () => {
      clearTimeout(t0);
      clearInterval(id);
    };
  }, []);

  if (rem === null) {
    // Misma altura visual para evitar layout shift
    return (
      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/40 opacity-0" aria-hidden="true">
        <Timer className="h-3.5 w-3.5" />
        ···
      </div>
    );
  }

  if (rem <= 0) {
    // Pasó las 2pm PT: honestidad > falsa urgencia
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-vv-green/40 bg-vv-green/10 px-3 py-1.5"
        role="timer"
      >
        <Sunrise className="h-3.5 w-3.5 text-vv-green shrink-0" />
        <span className="text-xs font-semibold text-vv-green">
          {t("countdown.after")}
        </span>
      </motion.div>
    );
  }

  const h = Math.floor(rem / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;
  const hh = `${h}h`;
  const mm = `${String(m).padStart(2, "0")}m`;
  const ss = `${String(s).padStart(2, "0")}s`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-2 inline-flex items-center gap-2 rounded-full border border-vv-yellow/35 bg-vv-yellow/10 px-3 py-1.5"
      role="timer"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-vv-yellow opacity-70 pulse-green-dot" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-vv-yellow" />
      </span>
      <Timer className="h-3.5 w-3.5 text-vv-yellow shrink-0" aria-hidden="true" />
      {/* Tabular nums: el tictac no baila */}
      <span className="text-xs font-extrabold text-vv-yellow tabular-nums tracking-tight">
        {hh} {mm} {ss}
      </span>
      <span className="text-[11px] font-medium text-white/70">
        {t("countdown.before")}
      </span>
    </motion.div>
  );
}
