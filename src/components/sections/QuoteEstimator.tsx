"use client";

/**
 * QuoteEstimator — Cotizador Express 100% client-side (sitio estático).
 *
 * El usuario elige 3 cosas (tipo de vidrio, gama del vehículo, año) y un
 * rango de precio aparece al instante con animación count-up. El CTA abre
 * WhatsApp con un mensaje pre-armado que incluye las selecciones y el
 * estimado, para que el negocio solo confirme precio y disponibilidad.
 *
 * Sin backend, sin API: ideal para export estático en Cloudflare Pages.
 */

import { useEffect, useMemo, useState, type CSSProperties, type ComponentType } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  BadgeDollarSign,
  CarFront,
  Check,
  Phone,
  RectangleHorizontal,
  ShieldCheck,
  Sparkles,
  Spline,
  SquareStack,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import { trackCall, trackWhatsApp } from "@/lib/track";

type GlassKey = "windshield" | "side" | "back" | "chip";
type TierKey = "eco" | "mid" | "premium";
type YearKey = "old" | "mid" | "new";

const GLASS: { key: GlassKey; icon: ComponentType<{ className?: string }>; min: number; max: number }[] = [
  { key: "windshield", icon: CarFront, min: 249, max: 420 },
  { key: "side", icon: SquareStack, min: 149, max: 280 },
  { key: "back", icon: RectangleHorizontal, min: 189, max: 340 },
  { key: "chip", icon: Spline, min: 69, max: 120 },
];

const TIERS: { key: TierKey; mult: number }[] = [
  { key: "eco", mult: 1 },
  { key: "mid", mult: 1.25 },
  { key: "premium", mult: 1.6 },
];

const YEARS: { key: YearKey; mult: number }[] = [
  { key: "old", mult: 0.9 },
  { key: "mid", mult: 1 },
  { key: "new", mult: 1.15 },
];

const round5 = (n: number) => Math.round(n / 5) * 5;

export default function QuoteEstimator() {
  const { t, lang } = useI18n();
  const [glass, setGlass] = useState<GlassKey | null>(null);
  const [tier, setTier] = useState<TierKey | null>(null);
  const [year, setYear] = useState<YearKey | null>(null);

  const estimate = useMemo(() => {
    const g = GLASS.find((x) => x.key === glass);
    const tm = TIERS.find((x) => x.key === tier)?.mult ?? 0;
    const ym = YEARS.find((x) => x.key === year)?.mult ?? 0;
    if (!g || !tm || !ym) return null;
    return {
      min: round5(g.min * tm * ym),
      max: round5(g.max * tm * ym),
    };
  }, [glass, tier, year]);

  const progress = [glass, tier, year].filter(Boolean).length;
  const ready = estimate !== null;

  // ---- Count-up con MotionValues (sin re-renders por frame) ----
  const minMv = useMotionValue(0);
  const maxMv = useMotionValue(0);
  const minText = useTransform(minMv, (v) => `$${Math.round(v)}`);
  const maxText = useTransform(maxMv, (v) => `$${Math.round(v)}`);

  useEffect(() => {
    if (!estimate) {
      animate(minMv, 0, { duration: 0.35 });
      animate(maxMv, 0, { duration: 0.35 });
      return;
    }
    const c1 = animate(minMv, estimate.min, { stiffness: 90, damping: 20, type: "spring" });
    const c2 = animate(maxMv, estimate.max, { stiffness: 90, damping: 20, type: "spring" });
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [estimate, minMv, maxMv]);

  const waMessage = useMemo(() => {
    const gLabel = glass ? t(`quote.glass.${glass}`) : "—";
    const tLabel = tier ? t(`quote.tier.${tier}`) : "—";
    const yLabel = year ? t(`quote.year.${year}`) : "—";
    const price = estimate ? `$${estimate.min}–$${estimate.max}` : "—";
    if (lang === "en") {
      return `Hi V&V! I come from the web estimator:\n• Glass: ${gLabel}\n• Vehicle: ${tLabel}\n• Year: ${yLabel}\n• Web estimate: ${price}\nCan you confirm exact price and availability today?`;
    }
    return `Hola V&V! Vengo del cotizador web:\n• Vidrio: ${gLabel}\n• Vehículo: ${tLabel}\n• Año: ${yLabel}\n• Estimado web: ${price}\n¿Me confirman precio exacto y disponibilidad para hoy?`;
  }, [glass, tier, year, estimate, lang, t]);

  return (
    <section
      id="cotizador"
      aria-labelledby="quote-heading"
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(255,214,10,0.14) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(255,195,0,0.10) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl pl-12 pr-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">{t("quote.kicker")}</p>
          <h2
            id="quote-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("quote.title")}
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">{t("quote.sub")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-vv-black/5 bg-white shadow-2xl"
        >
          {/* Barra de acento superior */}
          <div className="h-1.5 w-full bg-gradient-to-r from-vv-yellow via-vv-yellow-deep to-vv-yellow" />

          <div className="p-5 md:p-8">
            {/* Paso 1: tipo de vidrio */}
            <fieldset className="mb-6">
              <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-vv-black">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-vv-yellow text-[11px] font-extrabold text-vv-black">
                  1
                </span>
                {t("quote.glass")}
              </legend>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {GLASS.map((g) => {
                  const active = glass === g.key;
                  return (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGlass(active ? null : g.key)}
                      aria-pressed={active}
                      className={
                        "group relative flex min-h-[44px] flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition-all duration-200 " +
                        (active
                          ? "border-vv-yellow bg-vv-yellow/10 shadow-[0_4px_18px_rgba(255,195,0,0.25)]"
                          : "border-vv-black/10 bg-white hover:border-vv-black/30 hover:-translate-y-0.5")
                      }
                    >
                      <g.icon
                        className={
                          "h-5 w-5 transition-colors " +
                          (active ? "text-vv-yellow-deep" : "text-vv-black/50 group-hover:text-vv-black")
                        }
                      />
                      <span className="text-xs font-bold leading-tight text-vv-black">
                        {t(`quote.glass.${g.key}`)}
                      </span>
                      {active && (
                        <span className="absolute right-2 top-2 grid h-4.5 w-4.5 place-items-center rounded-full bg-vv-yellow">
                          <Check className="h-3 w-3 text-vv-black" strokeWidth={3.5} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Paso 2: gama del vehículo */}
            <fieldset className="mb-6">
              <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-vv-black">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-vv-yellow text-[11px] font-extrabold text-vv-black">
                  2
                </span>
                {t("quote.brand")}
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {TIERS.map((tr) => {
                  const active = tier === tr.key;
                  return (
                    <button
                      key={tr.key}
                      type="button"
                      onClick={() => setTier(active ? null : tr.key)}
                      aria-pressed={active}
                      className={
                        "relative flex min-h-[44px] flex-col items-start gap-0.5 rounded-xl border-2 p-3 text-left transition-all duration-200 " +
                        (active
                          ? "border-vv-yellow bg-vv-yellow/10 shadow-[0_4px_18px_rgba(255,195,0,0.25)]"
                          : "border-vv-black/10 bg-white hover:border-vv-black/30 hover:-translate-y-0.5")
                      }
                    >
                      <span className="flex items-center gap-1.5 text-sm font-extrabold text-vv-black">
                        {t(`quote.tier.${tr.key}`)}
                        {active && (
                          <Check className="h-3.5 w-3.5 text-vv-yellow-deep" strokeWidth={3.5} />
                        )}
                      </span>
                      <span className="text-[10px] font-medium text-vv-black/50">
                        {t(`quote.tier.${tr.key}.ex`)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Paso 3: año */}
            <fieldset className="mb-6">
              <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-vv-black">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-vv-yellow text-[11px] font-extrabold text-vv-black">
                  3
                </span>
                {t("quote.year")}
              </legend>
              <div className="grid grid-cols-3 gap-2.5">
                {YEARS.map((y) => {
                  const active = year === y.key;
                  return (
                    <button
                      key={y.key}
                      type="button"
                      onClick={() => setYear(active ? null : y.key)}
                      aria-pressed={active}
                      className={
                        "grid min-h-[44px] place-items-center rounded-xl border-2 py-2.5 text-sm font-extrabold transition-all duration-200 " +
                        (active
                          ? "border-vv-yellow bg-vv-yellow/10 text-vv-black shadow-[0_4px_18px_rgba(255,195,0,0.25)]"
                          : "border-vv-black/10 bg-white text-vv-black/70 hover:border-vv-black/30 hover:-translate-y-0.5 hover:text-vv-black")
                      }
                    >
                      {t(`quote.year.${y.key}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Resultado */}
            <div className="relative overflow-hidden rounded-2xl bg-vv-black px-4 py-6 text-center md:py-7">
              <div
                aria-hidden="true"
                className="vv-shimmer pointer-events-none absolute inset-0"
              />
              <div className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tabular-nums text-white/70 ring-1 ring-white/15">
                {progress} {t("quote.of")}
              </div>
              <p className="mb-1 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-vv-yellow">
                <BadgeDollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                {t("quote.result.label")}
              </p>
              {ready ? (
                <p
                  className="font-extrabold tabular-nums text-vv-yellow text-4xl md:text-5xl tracking-tight"
                  aria-live="polite"
                >
                  <motion.span>{minText}</motion.span>
                  <span className="mx-1.5 text-white/40">–</span>
                  <motion.span>{maxText}</motion.span>
                </p>
              ) : (
                <p className="font-extrabold tabular-nums text-white/30 text-4xl md:text-5xl tracking-tight">
                  $——<span className="mx-1.5">–</span>$——
                </p>
              )}
              <p className="mt-2 text-[11px] md:text-xs text-white/60">
                {ready ? t("quote.result.micro") : t("quote.result.hint")}
              </p>
              <Sparkles
                className="absolute left-3 top-3 h-4 w-4 text-vv-yellow/40"
                aria-hidden="true"
              />
            </div>

            {/* CTAs */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                asChild
                className={
                  "h-12 font-bold text-white " +
                  (ready
                    ? "bg-vv-green hover:brightness-110 pulse-whatsapp"
                    : "bg-vv-black/80 hover:bg-vv-black")
                }
              >
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsApp("cotizador", ready ? `${glass}/${tier}/${year}` : undefined)
                  }
                >
                  <svg viewBox="0 0 32 32" className="mr-2 h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M16.04 4c-6.6 0-12 5.36-12 11.97 0 2.11.55 4.16 1.6 5.97L4 28l6.22-1.62a11.95 11.95 0 0 0 5.82 1.49h.01c6.6 0 12-5.36 12-11.97C28.05 9.36 22.65 4 16.04 4zm0 21.8h-.01a9.84 9.84 0 0 1-5-1.37l-.36-.21-3.69.97.99-3.6-.24-.37a9.8 9.8 0 0 1-1.5-5.25c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.89 6.96c0 5.43-4.43 9.85-9.86 9.85zm5.41-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
                  </svg>
                  {t("quote.cta.wa")}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-2 border-vv-black/20 font-bold text-vv-black hover:bg-vv-black hover:text-vv-yellow hover:border-vv-black"
              >
                <a href={`tel:${BUSINESS.phoneTel}`} onClick={() => trackCall("cotizador")}>
                  <Phone className="mr-2 h-4.5 w-4.5" />
                  {t("quote.cta.call")}
                </a>
              </Button>
            </div>

            {/* Confianza */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] font-semibold text-vv-black/60">
              <span className="flex items-center gap-1">
                <BadgeDollarSign className="h-3.5 w-3.5 text-vv-yellow-deep" aria-hidden="true" />
                {t("quote.trust.free")}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-3.5 w-3.5 text-vv-yellow-deep" aria-hidden="true" />
                {t("quote.trust.minute")}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-vv-yellow-deep" aria-hidden="true" />
                {t("quote.trust.warranty")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
