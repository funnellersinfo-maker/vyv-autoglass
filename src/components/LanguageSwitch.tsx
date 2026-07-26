"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className={`absolute right-3 top-2 z-30 select-none ${className}`}
      aria-label="Language selector"
    >
      <div className="flex items-center bg-vv-black/90 backdrop-blur-md border border-vv-yellow/40 rounded-full p-1 shadow-lg">
        <button
          onClick={() => setLang("es")}
          className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all ${
            lang === "es"
              ? "bg-vv-yellow text-vv-black"
              : "text-white/70 hover:text-white"
          }`}
          aria-pressed={lang === "es"}
        >
          ES
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all ${
            lang === "en"
              ? "bg-vv-yellow text-vv-black"
              : "text-white/70 hover:text-white"
          }`}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
      </div>
    </motion.div>
  );
}
