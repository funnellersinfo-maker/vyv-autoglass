"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type T = {
  name: string;
  initials: string;
  textKey: string;
  nameKey: string;
};

const testimonials: T[] = [
  { name: "María G.", initials: "MG", textKey: "test.t1.q", nameKey: "test.t1.n" },
  { name: "David Chen", initials: "DC", textKey: "test.t2.q", nameKey: "test.t2.n" },
  { name: "Roberto M.", initials: "RM", textKey: "test.t3.q", nameKey: "test.t3.n" },
  { name: "Jessica R.", initials: "JR", textKey: "test.t4.q", nameKey: "test.t4.n" },
  { name: "Miguel A.", initials: "MA", textKey: "test.t5.q", nameKey: "test.t5.n" },
  { name: "Sarah K.", initials: "SK", textKey: "test.t6.q", nameKey: "test.t6.n" },
];

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">{t("test.kicker")}</p>
          <h2
            id="testimonials-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("test.title")}
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            {t("test.sub")}
          </p>

          {/* Trust banner */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex items-center gap-0.5 text-vv-yellow-deep">
              {"★★★★★".split("").map((s, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-vv-black font-bold text-sm">
              {t("test.banner")}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((tm, i) => (
            <motion.article
              key={tm.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="relative bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-vv-yellow/30" />
              <div className="flex items-center gap-0.5 text-vv-yellow-deep mb-3">
                {"★★★★★".split("").map((s, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-vv-black/85 text-sm leading-relaxed mb-5">
                "{t(tm.textKey)}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-black/5 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vv-yellow to-vv-yellow-deep text-vv-black grid place-items-center font-bold text-sm shrink-0">
                    {tm.initials}
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-vv-black font-bold text-sm truncate">
                      {tm.name}
                    </div>
                    <div className="text-vv-black/50 text-xs flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{t(tm.nameKey).split("· ")[1] ?? t(tm.nameKey)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
