"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Car, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Benefits() {
  const { t } = useI18n();

  const benefits = [
    { icon: Zap, tKey: "b1" },
    { icon: DollarSign, tKey: "b2" },
    { icon: Car, tKey: "b3" },
    { icon: ShieldCheck, tKey: "b4" },
  ];

  return (
    <section
      aria-labelledby="benefits-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl pl-12 pr-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">{t("benefits.kicker")}</p>
          <h2
            id="benefits-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("benefits.title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.tKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vv-yellow to-vv-yellow-deep rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-4 inline-grid place-items-center h-12 w-12 rounded-xl bg-vv-yellow/15 text-vv-yellow-deep group-hover:bg-vv-yellow group-hover:text-vv-black transition-colors">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="text-vv-black font-bold text-lg mb-2">
                {t(`benefits.${b.tKey}.t`)}
              </h3>
              <p className="text-vv-black/70 text-sm leading-relaxed">
                {t(`benefits.${b.tKey}.d`)}
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-vv-yellow-deep">
                ✓ {t(`benefits.${b.tKey}.m`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
