"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Award, Wrench, Sparkles, Undo2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BUSINESS } from "@/lib/business";

export default function Guarantee() {
  const { t } = useI18n();

  const pillars = [
    { icon: BadgeCheck, key: "p1" },
    { icon: Wrench, key: "p2" },
    { icon: Sparkles, key: "p3" },
  ];

  return (
    <section
      aria-labelledby="guarantee-heading"
      className="bg-vv-black py-16 md:py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,214,10,0.12) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl pl-12 pr-4 md:px-6 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-grid place-items-center h-24 w-24 md:h-28 md:w-28 rounded-full bg-vv-yellow text-vv-black mb-6 shadow-2xl"
        >
          <ShieldCheck className="h-12 w-12 md:h-14 md:w-14" strokeWidth={2.2} />
        </motion.div>

        <p className="kicker text-vv-yellow mb-3">{t("guarantee.kicker")}</p>
        <h2
          id="guarantee-heading"
          className="text-white font-extrabold text-3xl md:text-5xl tracking-tight"
        >
          {t("guarantee.title")}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-white/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          {t("guarantee.desc")}
        </motion.p>

        <div className="mt-6 inline-flex items-center gap-2 bg-vv-yellow/15 border border-vv-yellow/30 rounded-full px-4 py-2 text-vv-yellow text-sm font-semibold">
          <Undo2 className="h-4 w-4" />
          {t("guarantee.moneyback")}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-left"
            >
              <div className="inline-grid place-items-center h-11 w-11 rounded-xl bg-vv-yellow text-vv-black mb-3">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">
                {t(`guarantee.${p.key}`)}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">
                {t("guarantee.desc")}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/60 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Award className="h-4 w-4 text-vv-yellow" />
            BBB A+
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-vv-yellow" />
            {BUSINESS.license}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-vv-yellow" />
            Fully Insured
          </span>
        </div>
      </div>
    </section>
  );
}
