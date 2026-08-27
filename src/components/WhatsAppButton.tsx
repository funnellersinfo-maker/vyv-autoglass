"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import { trackWhatsApp } from "@/lib/track";

export default function WhatsAppButton() {
  const { t } = useI18n();
  const [tip, setTip] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 800);
    let tipShown = false;
    let tipTimer: ReturnType<typeof setTimeout> | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    // El tooltip solo aparece cuando el usuario ya pasó el hero (scroll > 380px):
    // así nunca tapa el CTA principal "Agendar Cita" en móvil.
    const onScroll = () => {
      if (tipShown || window.scrollY <= 380) return;
      tipShown = true;
      window.removeEventListener("scroll", onScroll);
      tipTimer = setTimeout(() => {
        setTip(true);
        hideTimer = setTimeout(() => setTip(false), 5200);
      }, 900);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t1);
      if (tipTimer) clearTimeout(tipTimer);
      if (hideTimer) clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-20 right-3 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2"
        >
          <AnimatePresence>
            {tip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="relative mb-1 max-w-[190px] md:max-w-[240px] bg-white text-vv-black text-sm font-medium rounded-2xl rounded-br-none px-4 py-3 shadow-xl border border-black/5"
              >
                <button
                  aria-label="Cerrar"
                  onClick={() => setTip(false)}
                  className="absolute -top-2 -left-2 bg-vv-black text-white rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
                <span className="font-bold text-vv-black">{t("wa.tip.title")}</span>
                <br />
                <span className="text-vv-black/70 text-xs">
                  {t("wa.tip.body")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink(
              "Hola V&V Auto Glass, necesito una cotización gratis"
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("wa.tip.title")}
            onClick={() => trackWhatsApp("float")}
            className="relative grid place-items-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-vv-green text-white shadow-2xl pulse-whatsapp hover:scale-105 transition-transform"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 md:h-9 md:w-9 fill-current"
              aria-hidden="true"
            >
              <path d="M16.04 4c-6.6 0-12 5.36-12 11.97 0 2.11.55 4.16 1.6 5.97L4 28l6.22-1.62a11.95 11.95 0 0 0 5.82 1.49h.01c6.6 0 12-5.36 12-11.97C28.05 9.36 22.65 4 16.04 4zm0 21.8h-.01a9.84 9.84 0 0 1-5-1.37l-.36-.21-3.69.97.99-3.6-.24-.37a9.8 9.8 0 0 1-1.5-5.25c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.89 6.96c0 5.43-4.43 9.85-9.86 9.85zm5.41-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
