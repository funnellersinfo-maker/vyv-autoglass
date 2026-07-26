"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  CalendarCheck,
  Star,
  ShieldCheck,
  Wrench,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import DopamineBackground from "@/components/DopamineBackground";

export default function Hero() {
  const { t } = useI18n();

  const trust = [
    { icon: Star, label: t("hero.trust.rating"), sub: t("hero.trust.reviews") },
    { icon: Wrench, label: t("hero.trust.installs"), sub: t("hero.trust.installsSub") },
    { icon: Building2, label: t("hero.trust.insurance"), sub: t("hero.trust.insuranceSub") },
    { icon: ShieldCheck, label: t("hero.trust.warranty"), sub: t("hero.trust.warrantySub") },
    { icon: Clock, label: t("hero.trust.sameDay"), sub: t("hero.trust.sameDaySub") },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-vv-black"
    >
      <DopamineBackground />

      {/* Top ultra-thin bar */}
      <div className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-1.5 flex items-center justify-center gap-2 md:gap-3 text-[11px] md:text-xs text-white/80 text-center">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-vv-green opacity-70 pulse-green-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-vv-green" />
          </span>
          <span className="font-medium whitespace-nowrap">
            🟢 {t("top.open")}
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="hidden sm:inline whitespace-nowrap">{t("top.response")}</span>
          <span className="sm:hidden whitespace-nowrap">{t("top.response.short")}</span>
          <span className="text-white/30">·</span>
          <span className="font-bold text-vv-yellow whitespace-nowrap">{t("top.free")}</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 pt-10 md:pt-16 pb-14 md:pb-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-vv-yellow/40 bg-vv-yellow/10 px-3 py-1 text-xs font-semibold text-vv-yellow mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-vv-yellow" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-white font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            {t("hero.h1a")}{" "}
            <span className="yellow-underline">{t("hero.h1b")}</span> {t("hero.h1c")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 text-white/75 text-base md:text-lg max-w-2xl"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl"
          >
            <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold text-base h-14 px-6 pulse-yellow-glow w-full">
              <a href="#agendar">
                <CalendarCheck className="mr-2 h-5 w-5 shrink-0" />
                <span className="text-left leading-tight">{t("hero.cta.primary")}</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-vv-black bg-transparent font-semibold text-base h-14 px-6 w-full">
              <a href={`tel:${BUSINESS.phoneTel}`}>
                <Phone className="mr-2 h-5 w-5 shrink-0" />
                {t("hero.cta.secondary")}
              </a>
            </Button>
          </motion.div>

          <p className="mt-3 text-white/55 text-xs">
            {t("hero.microcopy")}
          </p>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {trust.map((tr) => (
              <div
                key={tr.label}
                className="glass-card rounded-xl p-3 flex flex-col items-center text-center gap-1"
              >
                <tr.icon className="h-5 w-5 text-vv-yellow" />
                <div className="text-white text-sm font-bold leading-tight">
                  {tr.label}
                </div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider leading-tight">
                  {tr.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80&auto=format&fit=crop"
              alt={t("alt.hero")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vv-black/80 via-transparent to-transparent" />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-vv-yellow" />
              <div className="text-white text-xs">
                <div className="font-bold">{t("hero.response")}</div>
                <div className="text-vv-yellow font-extrabold">{t("hero.1min")}</div>
              </div>
              <span className="ml-1 relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-vv-green opacity-70 pulse-green-dot" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vv-green" />
              </span>
            </motion.div>

            {/* Bottom rating badge */}
            <div className="absolute bottom-4 left-4 right-4 glass-card rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["MG", "DC", "RM", "JR"].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full bg-vv-yellow text-vv-black grid place-items-center text-[10px] font-bold ring-2 ring-vv-black"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-white text-xs leading-tight">
                <div className="flex items-center gap-0.5 text-vv-yellow">
                  {"★★★★★"}
                  <span className="text-white font-bold ml-1">{BUSINESS.rating}</span>
                </div>
                <div className="text-white/70">
                  {t("hero.ratedBy")}
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-5 -left-5 hidden md:flex bg-vv-yellow text-vv-black rounded-2xl px-4 py-3 shadow-xl items-center gap-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            <div className="text-xs leading-tight">
              <div className="font-extrabold">{t("hero.confirmed")}</div>
              <div className="opacity-80">{t("hero.mobile")}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
