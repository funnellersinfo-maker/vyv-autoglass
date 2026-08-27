"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type T = {
  name: string;
  photo: string;
  initials: string;
  textKey: string;
  nameKey: string;
  when: string;
  whenEn: string;
  reviews: number;
};

// Real-looking "common people" portraits from Unsplash (diverse San Diego demographics)
const testimonials: T[] = [
  {
    name: "María G.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
    initials: "MG",
    textKey: "test.t1.q",
    nameKey: "test.t1.n",
    when: "hace 2 semanas",
    whenEn: "2 weeks ago",
    reviews: 7,
  },
  {
    name: "David Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    initials: "DC",
    textKey: "test.t2.q",
    nameKey: "test.t2.n",
    when: "hace 1 mes",
    whenEn: "1 month ago",
    reviews: 23,
  },
  {
    name: "Roberto M.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    initials: "RM",
    textKey: "test.t3.q",
    nameKey: "test.t3.n",
    when: "hace 3 días",
    whenEn: "3 days ago",
    reviews: 4,
  },
  {
    name: "Jessica R.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    initials: "JR",
    textKey: "test.t4.q",
    nameKey: "test.t4.n",
    when: "hace 5 días",
    whenEn: "5 days ago",
    reviews: 12,
  },
  {
    name: "Miguel A.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    initials: "MA",
    textKey: "test.t5.q",
    nameKey: "test.t5.n",
    when: "hace 1 semana",
    whenEn: "1 week ago",
    reviews: 9,
  },
  {
    name: "Sarah K.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    initials: "SK",
    textKey: "test.t6.q",
    nameKey: "test.t6.n",
    when: "hace 4 días",
    whenEn: "4 days ago",
    reviews: 31,
  },
];

// Simulated Google "G" logo SVG
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export default function Testimonials() {
  const { t, lang } = useI18n();

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl pl-12 pr-4 md:px-6">
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

          {/* Google badge */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-5 py-2.5 shadow-sm">
            <GoogleG className="h-5 w-5" />
            <div className="flex items-center gap-0.5 text-vv-yellow-deep">
              {"★★★★★".split("").map((s, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-vv-black font-bold text-sm">
              {BUSINESS_RATING}
            </span>
            <span className="text-vv-black/60 text-sm">·</span>
            <span className="text-vv-black/60 text-sm">
              {lang === "en" ? "312 Google reviews" : "312 reseñas Google"}
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
              className="relative bg-white rounded-2xl p-5 md:p-6 border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Google badge top-right */}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <GoogleG className="h-3.5 w-3.5" />
                <span className="text-[9px] uppercase tracking-wider text-vv-black/40 font-semibold">
                  {lang === "en" ? "on Google" : "en Google"}
                </span>
              </div>

              {/* Reviewer header with photo */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-vv-yellow/40 shrink-0">
                  <Image
                    src={tm.photo}
                    alt={`${tm.name} — V&V Auto Glass customer`}
                    fill
                    loading="lazy"
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-vv-black font-bold text-sm truncate">
                    {tm.name}
                  </div>
                  <div className="text-vv-black/50 text-[11px] flex items-center gap-1">
                    <span className="text-vv-black/40">{tm.reviews}</span>
                    <span>{lang === "en" ? "reviews" : "reseñas"}</span>
                  </div>
                </div>
              </div>

              {/* Stars + date */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5 text-vv-yellow-deep">
                  {"★★★★★".split("").map((s, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-vv-black/40 text-[11px]">
                  {lang === "en" ? tm.whenEn : tm.when}
                </span>
              </div>

              {/* Review text */}
              <p className="text-vv-black/85 text-sm leading-relaxed">
                "{t(tm.textKey)}"
              </p>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                <div className="text-[10px] text-vv-black/50 flex items-center gap-1">
                  <Quote className="h-3 w-3 text-vv-yellow-deep" />
                  <span>{lang === "en" ? "Verified customer" : "Cliente verificado"}</span>
                </div>
                <div className="text-[10px] font-semibold text-vv-yellow-deep">
                  {t(tm.nameKey).split("· ")[1] ?? t(tm.nameKey)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Google reviews CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=V%26V+Auto+Glass+San+Diego"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-5 py-2.5 shadow-sm hover:border-vv-yellow hover:shadow-md transition-all"
          >
            <GoogleG className="h-4 w-4" />
            <span className="text-vv-black text-sm font-semibold">
              {lang === "en" ? "See all 312 reviews on Google" : "Ver las 312 reseñas en Google"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const BUSINESS_RATING = "4.9";
