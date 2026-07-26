"use client";

import { motion } from "framer-motion";
import {
  CarFront,
  Spline,
  SquareStack,
  RectangleHorizontal,
  Hammer,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const services = [
  { icon: CarFront, key: "s1", price: "$249" },
  { icon: Spline, key: "s2", price: "$69" },
  { icon: SquareStack, key: "s3", price: "$149" },
  { icon: RectangleHorizontal, key: "s4", price: "$189" },
  { icon: Hammer, key: "s5", price: "$129" },
  { icon: Truck, key: "s6", price: null },
];

export default function Services() {
  const { t } = useI18n();

  return (
    <section
      id="servicios"
      aria-labelledby="services-heading"
      className="bg-vv-black py-16 md:py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(255,214,10,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(255,195,0,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow mb-3">{t("services.kicker")}</p>
          <h2
            id="services-heading"
            className="text-white font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("services.title")}
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            {t("services.sub")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative glass-card rounded-2xl p-6 hover:border-vv-yellow/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-vv-yellow/15 text-vv-yellow group-hover:bg-vv-yellow group-hover:text-vv-black transition-colors shrink-0">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-vv-yellow text-right">
                  {s.price ? `${t("services.from")} $${s.price.replace("$","")}` : t("services.from")}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {t(`services.${s.key}.t`)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                {t(`services.${s.key}.d`)}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-white/30 text-white hover:bg-vv-yellow hover:text-vv-black hover:border-vv-yellow bg-transparent h-11"
              >
                <a href="#agendar">
                  {t("services.book")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
