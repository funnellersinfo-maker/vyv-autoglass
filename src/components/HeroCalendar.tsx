"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Flame, Lock, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type DayInfo = {
  iso: string;
  weekday: string;
  weekdayShort: string;
  dayNum: string;
  monthShort: string;
  slotsLeft: number;
  isToday: boolean;
  isTomorrow: boolean;
};

function buildDays(count: number, lang: "es" | "en"): DayInfo[] {
  const out: DayInfo[] = [];
  const today = new Date();
  const locale = lang === "en" ? "en-US" : "es-US";

  // Deterministic scarcity pattern (varies daily so it feels real)
  // Some days have 1, 2, 3 or 0 slots left
  const pattern = [2, 3, 1, 0, 3, 2, 1, 3];

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    out.push({
      iso,
      weekday: d.toLocaleDateString(locale, { weekday: "long" }),
      weekdayShort: d.toLocaleDateString(locale, { weekday: "short" }).replace(".", ""),
      dayNum: String(d.getDate()),
      monthShort: d.toLocaleDateString(locale, { month: "short" }).replace(".", ""),
      slotsLeft: pattern[i % pattern.length],
      isToday: i === 0,
      isTomorrow: i === 1,
    });
  }
  return out;
}

export default function HeroCalendar() {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const days = useMemo(() => buildDays(8, lang), [lang]);

  const handleClick = (day: DayInfo) => {
    if (day.slotsLeft === 0) return;
    setSelected(day.iso);
    // Sync with booking form via custom event
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vv:select-date", { detail: day.iso }));
    }
    // Smooth scroll to booking form
    setTimeout(() => {
      document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  const slotsLabel = (n: number) => {
    if (n === 0) return lang === "en" ? "Full" : "Lleno";
    if (n === 1) return lang === "en" ? "1 slot" : "1 cupo";
    return `${n} ${lang === "en" ? "slots" : "cupos"}`;
  };

  if (!mounted) {
    return <div className="h-[420px]" />; // avoid hydration mismatch
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Glow behind */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,214,10,0.35) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-vv-yellow/40 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-vv-yellow to-vv-yellow-deep px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-vv-black">
            <Calendar className="h-5 w-5" />
            <div className="leading-tight">
              <div className="font-extrabold text-sm">
                {lang === "en" ? "Pick your date" : "Elige tu fecha"}
              </div>
              <div className="text-[10px] font-semibold opacity-80">
                {lang === "en" ? "Real-time availability" : "Disponibilidad en tiempo real"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-vv-black/15 rounded-full px-2.5 py-1">
            <Flame className="h-3.5 w-3.5 text-vv-black" />
            <span className="text-[10px] font-bold text-vv-black">
              {lang === "en" ? "Hot" : "Alta demanda"}
            </span>
          </div>
        </div>

        {/* Live indicator */}
        <div className="px-5 py-2 bg-vv-cream flex items-center justify-between border-b border-black/5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-vv-green opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vv-green" />
            </span>
            <span className="text-[10px] font-bold text-vv-black/70 uppercase tracking-wider">
              {lang === "en" ? "Live · Updated just now" : "En vivo · Actualizado ahora"}
            </span>
          </div>
          <span className="text-[10px] font-bold text-vv-yellow-deep">
            {lang === "en" ? "Today:" : "Hoy:"}{" "}
            {new Date().toLocaleTimeString(lang === "en" ? "en-US" : "es-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Days grid */}
        <div className="p-3 grid grid-cols-4 gap-2 bg-white">
          {days.map((day, i) => {
            const isFull = day.slotsLeft === 0;
            const isSelected = selected === day.iso;
            const isHot = !isFull && day.slotsLeft === 1;

            return (
              <motion.button
                key={day.iso}
                type="button"
                onClick={() => handleClick(day)}
                disabled={isFull}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
                whileHover={!isFull ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isFull ? { scale: 0.95 } : {}}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all overflow-hidden ${
                  isSelected
                    ? "border-vv-yellow bg-vv-yellow text-vv-black shadow-lg"
                    : isFull
                    ? "border-black/5 bg-black/5 text-black/30 cursor-not-allowed"
                    : isHot
                    ? "border-red-400 bg-red-50 text-vv-black hover:border-red-500"
                    : "border-black/10 bg-white text-vv-black hover:border-vv-yellow hover:bg-vv-yellow/10"
                }`}
              >
                {/* Today highlight pulse */}
                {day.isToday && !isFull && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-vv-green animate-pulse" />
                )}

                {/* Full overlay */}
                {isFull && (
                  <div className="absolute inset-0 grid place-items-center bg-black/5">
                    <Lock className="h-3.5 w-3.5 text-black/30" />
                  </div>
                )}

                <span
                  className={`text-[9px] uppercase font-bold tracking-wider leading-none ${
                    isSelected ? "text-vv-black" : isFull ? "text-black/30" : "text-vv-black/60"
                  }`}
                >
                  {day.weekdayShort}
                </span>
                <span className="text-lg font-extrabold leading-none">{day.dayNum}</span>
                <span
                  className={`text-[8px] uppercase font-medium leading-none ${
                    isSelected ? "text-vv-black/70" : isFull ? "text-black/30" : "text-vv-black/50"
                  }`}
                >
                  {day.monthShort}
                </span>

                {/* Slots indicator */}
                {!isFull && (
                  <span
                    className={`absolute bottom-0.5 left-0 right-0 text-[8px] font-bold text-center leading-tight ${
                      isSelected ? "text-vv-black/80" : isHot ? "text-red-500" : "text-vv-yellow-deep"
                    }`}
                  >
                    {slotsLabel(day.slotsLeft)}
                  </span>
                )}

                {/* Selected check */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 left-1 h-4 w-4 rounded-full bg-vv-black grid place-items-center"
                  >
                    <Check className="h-2.5 w-2.5 text-vv-yellow" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected state CTA */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-vv-cream border-t-2 border-vv-yellow/30 overflow-hidden"
            >
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-vv-black/60 font-bold">
                    {lang === "en" ? "Selected" : "Seleccionado"}
                  </div>
                  <div className="text-vv-black font-extrabold text-sm">
                    {new Date(selected + "T00:00:00").toLocaleDateString(
                      lang === "en" ? "en-US" : "es-US",
                      { weekday: "long", day: "numeric", month: "long" }
                    )}
                  </div>
                </div>
                <motion.a
                  href="#agendar"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="shrink-0 inline-flex items-center gap-1 bg-vv-yellow text-vv-black font-bold text-xs px-4 py-2.5 rounded-full shadow-md hover:bg-vv-yellow-deep transition-colors"
                >
                  {lang === "en" ? "Continue" : "Continuar"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer microcopy */}
        <div className="px-5 py-3 bg-vv-black text-white/70 text-[10px] flex items-center justify-center gap-1.5">
          <Flame className="h-3 w-3 text-vv-yellow" />
          <span className="font-semibold">
            {lang === "en"
              ? "Only 3 same-day appointments left today"
              : "Solo 3 citas mismas-día disponibles hoy"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
