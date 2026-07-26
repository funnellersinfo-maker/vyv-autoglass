"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function ServiceArea() {
  const { t, lang } = useI18n();
  return (
    <section
      id="ubicacion"
      aria-labelledby="area-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">{t("area.kicker")}</p>
          <h2
            id="area-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("area.title.a")} <span className="text-gradient-yellow">{t("area.title.b")}</span>
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            {t("area.sub")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-white"
          >
            <iframe
              title="Mapa de San Diego — V&V Auto Glass"
              src={BUSINESS.mapEmbed}
              className="w-full h-[360px] md:h-[440px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-vv-black rounded-2xl p-6 md:p-8 text-white flex flex-col"
          >
            <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-vv-yellow" />
              V&amp;V Auto Glass
            </h3>

            <div className="space-y-4 text-sm flex-1">
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-wider mb-1">
                  {t("area.address")}
                </div>
                <div className="font-medium">{BUSINESS.address}</div>
              </div>

              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-vv-yellow" />
                  {t("area.hours")}
                </div>
                <div className="space-y-1">
                  {BUSINESS.hours.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-xs md:text-sm"
                    >
                      <span className="text-white/70">
                        {lang === "en" ? h.dayEn : h.day}
                      </span>
                      <span className="font-medium">
                        {lang === "en" ? h.timeEn ?? h.time : h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-wider mb-2">
                  {t("area.contact")}
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={`tel:${BUSINESS.phoneTel}`}
                    className="font-bold text-vv-yellow hover:underline inline-flex items-center gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {BUSINESS.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink("Hola V&V Auto Glass, necesito información")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-vv-yellow transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-vv-green pulse-green-dot" />
                    WhatsApp: {BUSINESS.whatsappDisplay}
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-white/80 hover:text-vv-yellow transition-colors"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12 flex-1">
                <a href={BUSINESS.mapDirections} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2 h-4 w-4" />
                  {t("area.directions")}
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-vv-black bg-transparent h-12 flex-1">
                <a href={`tel:${BUSINESS.phoneTel}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {t("area.call")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Service area pills */}
        <div className="mt-10">
          <p className="text-center text-vv-black/60 text-sm mb-4 font-semibold uppercase tracking-wider">
            {t("area.zones")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {BUSINESS.serviceAreas.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (i % 7) * 0.03 }}
                className="inline-flex items-center gap-1 bg-white border border-black/5 text-vv-black/75 text-xs md:text-sm font-medium rounded-full px-3 py-1.5 shadow-sm hover:border-vv-yellow hover:text-vv-black transition-colors"
              >
                <MapPin className="h-3 w-3 text-vv-yellow-deep" />
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
