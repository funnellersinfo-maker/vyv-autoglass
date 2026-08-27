"use client";

import { motion } from "framer-motion";
import { Camera, MessageCircle, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { n: 1, icon: Camera, key: "s1" },
    { n: 2, icon: MessageCircle, key: "s2" },
    { n: 3, icon: CalendarClock, key: "s3" },
  ];

  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl pl-12 pr-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="kicker text-vv-yellow-deep mb-3">{t("how.kicker")}</p>
          <h2
            id="how-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("how.title")}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="relative mb-14 max-w-4xl mx-auto px-4">
          <div className="absolute top-7 left-0 right-0 h-1 bg-black/10 rounded-full" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute top-7 left-0 right-0 h-1 bg-gradient-to-r from-vv-yellow to-vv-yellow-deep rounded-full"
          />
          <div className="relative grid grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-vv-yellow text-vv-black font-extrabold text-xl grid place-items-center ring-4 ring-white relative z-10">
                  {s.n}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="bg-vv-cream rounded-2xl p-6 md:p-7 border border-black/5 text-center"
            >
              <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-vv-black text-vv-yellow mb-4 mx-auto">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="text-vv-black font-bold text-xl mb-3">
                {t(`how.${s.key}.t`)}
              </h3>
              <p className="text-vv-black/70 text-sm leading-relaxed mb-4">
                {t(`how.${s.key}.d`)}
              </p>
              <p className="inline-block bg-vv-yellow/15 text-vv-black/80 text-xs font-semibold rounded-full px-3 py-1">
                ⏱️ {t(`how.${s.key}.m`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold text-base h-14 px-6 md:px-8 pulse-yellow-glow">
            <a href="#agendar">{t("how.cta")}</a>
          </Button>
          <p className="mt-3 text-vv-black/55 text-xs">
            📲 {t("top.response")} · 🔒 {t("cta.secondary") === "Call now" ? "No commitment" : "Sin compromiso"}
          </p>
        </div>
      </div>
    </section>
  );
}
