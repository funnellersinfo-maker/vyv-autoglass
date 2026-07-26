"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/business";
import { useI18n } from "@/lib/i18n";

export default function Brands() {
  const { t } = useI18n();
  return (
    <section
      aria-labelledby="brands-heading"
      className="bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="kicker text-vv-yellow-deep mb-3">{t("brands.kicker")}</p>
          <h2
            id="brands-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("brands.title")}
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            {t("brands.sub")}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {BUSINESS.brands.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
              className="group grid place-items-center h-16 md:h-20 rounded-xl bg-vv-cream border border-black/5 hover:bg-vv-black hover:border-vv-yellow transition-colors"
            >
              <span className="text-vv-black/70 group-hover:text-white font-bold text-sm md:text-base tracking-tight transition-colors">
                {b}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-vv-black/60 text-sm">
          <a
            href="#agendar"
            className="text-vv-black font-bold underline decoration-vv-yellow decoration-2 underline-offset-4 hover:text-vv-yellow-deep"
          >
            {t("brands.cta")}
          </a>
        </p>
      </div>
    </section>
  );
}
