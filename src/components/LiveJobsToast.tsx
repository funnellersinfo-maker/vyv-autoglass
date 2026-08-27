"use client";

/**
 * LiveJobsToast — prueba social rotativa ("recién atendimos a...").
 *
 * - Aparece ~7s después de cargar, visible 5.5s, oculto 16s, siguiente.
 * - Se puede cerrar (X): deja de mostrarse para siempre en la sesión.
 * - El item se fija al MOMENTO de mostrarse: la animación de salida nunca
 *   muestra contenido del siguiente item, y los textos se resuelven con
 *   t() en render (cambiar ES/EN a mitad de ciclo funciona).
 * - Móvil: abajo-izquierda, con márgenes que despejan el carril del
 *   ScrollDrive (>=48px) y el botón de WhatsApp (derecha).
 * - Desktop: abajo-izquierda (carril y WhatsApp viven a la derecha).
 * - Sin aria-live (evita ruido para lectores de pantalla cada 20s);
 *   el botón de cerrar sí es accesible.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ITEMS = [
  { key: "toast.t1", mins: 12 },
  { key: "toast.t2", mins: 26 },
  { key: "toast.t3", mins: 41 },
  { key: "toast.t4", mins: 55 },
  { key: "toast.t5", mins: 68 },
  { key: "toast.t6", mins: 121 },
] as const;

type Item = (typeof ITEMS)[number];

const FIRST_DELAY = 7000;
const VISIBLE = 5500;
const HIDDEN_GAP = 16000;

export default function LiveJobsToast() {
  const { t } = useI18n();
  const [item, setItem] = useState<Item | null>(null);
  const [visible, setVisible] = useState(false);
  const dismissed = useRef(false);
  const nextIdx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let showing = false;

    const cycle = () => {
      if (dismissed.current) return;
      if (!showing) {
        const next = ITEMS[nextIdx.current % ITEMS.length];
        nextIdx.current += 1;
        setItem(next); // congela el contenido de ESTE ciclo
        showing = true;
        setVisible(true);
        timer = setTimeout(cycle, VISIBLE);
      } else {
        showing = false;
        setVisible(false);
        timer = setTimeout(cycle, HIDDEN_GAP);
      }
    };

    timer = setTimeout(cycle, FIRST_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    dismissed.current = true;
    setVisible(false);
  };

  const ago = item
    ? item.mins < 60
      ? t("toast.ago.min").replace("{m}", String(item.mins))
      : t("toast.ago.hour").replace("{m}", String(Math.round(item.mins / 60)))
    : "";

  return (
    <div
      className="pointer-events-none fixed bottom-[84px] left-12 right-[76px] z-30 flex justify-start sm:bottom-6 sm:left-6 sm:right-auto"
      aria-hidden={!visible}
    >
      <AnimatePresence>
        {visible && item && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="pointer-events-auto relative w-full max-w-[320px] rounded-2xl bg-white text-vv-black shadow-2xl ring-1 ring-black/10 px-3.5 py-3"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar notificación"
              className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-vv-black text-white shadow-lg hover:bg-vv-yellow hover:text-vv-black transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-vv-green/15 ring-1 ring-vv-green/40">
                <BadgeCheck className="h-[18px] w-[18px] text-vv-green" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-vv-green">
                  {t("toast.kicker")}
                </div>
                <div className="text-xs font-bold leading-snug text-vv-black">
                  {t(item.key)}
                </div>
                <div className="text-[10px] text-vv-black/50 mt-0.5">{ago}</div>
              </div>
            </div>

            {/* Barrita de tiempo restante del toast */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: VISIBLE / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-[3px] origin-left rounded-b-2xl bg-vv-yellow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
