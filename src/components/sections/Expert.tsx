"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Wrench, CalendarCheck, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useI18n } from "@/lib/i18n";

export default function Expert() {
  const { t } = useI18n();

  const stats = [
    { value: t("expert.stat1"), label: t("expert.stat1l") },
    { value: t("expert.stat2"), label: t("expert.stat2l") },
    { value: t("expert.stat3"), label: t("expert.stat3l") },
  ];

  return (
    <section
      id="experto"
      aria-labelledby="expert-heading"
      className="bg-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(255,214,10,0.08) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl pl-12 pr-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-black/10 shadow-2xl bg-vv-cream">
              <Image
                src="/team/victor-van.jpg"
                alt="Victor, fundador de V&V Auto Glass, junto a su van de servicio en San Diego"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vv-black/45 via-transparent to-transparent" />

              {/* Name badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg">
                <div className="text-vv-black font-extrabold text-xl">Victor</div>
                <div className="text-vv-yellow-deep text-xs font-semibold uppercase tracking-wider">
                  {t("expert.role")}
                </div>
              </div>
            </div>

            {/* Floating quote bubble */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-4 -right-2 md:-right-6 max-w-[240px] bg-vv-yellow text-vv-black rounded-2xl rounded-tr-none px-4 py-3 shadow-xl"
            >
              <Quote className="h-5 w-5 mb-1 text-vv-black/70" />
              <p className="text-xs font-semibold leading-snug">
                {t("expert.quote")}
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="kicker text-vv-yellow-deep mb-3">{t("expert.kicker")}</p>
            <h2
              id="expert-heading"
              className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight leading-tight"
            >
              {t("expert.title")}
            </h2>

            <div className="mt-6 space-y-4 text-vv-black/75 text-base md:text-lg leading-relaxed">
              <p>{t("expert.p1")}</p>
              <p>{t("expert.p2")}</p>
              <p>{t("expert.p3")}</p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((s, i) => {
                const Icon = [Award, Wrench, CalendarCheck][i];
                return (
                  <div
                    key={i}
                    className="bg-vv-cream border border-black/5 rounded-2xl p-4 md:p-5 text-center"
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-vv-yellow-deep mx-auto mb-2" />
                    <div className="text-vv-black font-extrabold text-xl md:text-2xl leading-none">
                      {s.value}
                    </div>
                    <div className="text-vv-black/60 text-[10px] md:text-xs uppercase tracking-wider mt-1.5">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="bg-vv-green text-white hover:bg-vv-green/90 font-bold h-14 px-6">
                <a
                  href={whatsappLink(
                    `Hola Victor, vi tu página y necesito una cotización para mi vidrio`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 32 32" className="h-5 w-5 mr-2 fill-current">
                    <path d="M16.04 4c-6.6 0-12 5.36-12 11.97 0 2.11.55 4.16 1.6 5.97L4 28l6.22-1.62a11.95 11.95 0 0 0 5.82 1.49h.01c6.6 0 12-5.36 12-11.97C28.05 9.36 22.65 4 16.04 4zm5.41 13.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
                  </svg>
                  {t("expert.cta")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
