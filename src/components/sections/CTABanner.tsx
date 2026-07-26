"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/business";

type Props = {
  title?: string;
  subtitle?: string;
  variant?: "yellow" | "dark";
  ctaPrimary?: string;
};

export default function CTABanner({
  title = "¿Listo para tu cotización gratis?",
  subtitle = "Tu parabrisas no va a esperar. Cada minuto cuenta.",
  variant = "yellow",
  ctaPrimary = "Agendar Cita Gratis →",
}: Props) {
  const isYellow = variant === "yellow";
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className={`relative overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-12 ${
            isYellow ? "bg-vv-yellow" : "bg-vv-black-soft ring-1 ring-vv-yellow/30"
          }`}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: isYellow
                ? "radial-gradient(circle at 10% 90%, rgba(0,0,0,0.10) 0%, transparent 60%)"
                : "radial-gradient(circle at 90% 10%, rgba(255,214,10,0.18) 0%, transparent 55%)",
            }}
            aria-hidden="true"
          />
          <div className="relative grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 text-center md:text-left">
              <h3
                className={`font-extrabold text-2xl md:text-4xl tracking-tight ${
                  isYellow ? "text-vv-black" : "text-white"
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-2 text-sm md:text-base ${
                  isYellow ? "text-vv-black/75" : "text-white/75"
                }`}
              >
                {subtitle}
              </p>
              <p
                className={`mt-1 text-xs ${
                  isYellow ? "text-vv-black/60" : "text-white/55"
                }`}
              >
                ⏱️ Mismo día · 📲 Respuesta en 15 min · 🔒 Sin compromiso
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className={`font-bold h-14 px-6 ${
                  isYellow
                    ? "bg-vv-black text-white hover:bg-vv-black/85"
                    : "bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep pulse-yellow-glow"
                }`}
              >
                <a href="#agendar">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  {ctaPrimary}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`h-14 px-6 ${
                  isYellow
                    ? "border-vv-black/40 text-vv-black hover:bg-vv-black hover:text-white bg-transparent"
                    : "border-white/40 text-white hover:bg-white hover:text-vv-black bg-transparent"
                }`}
              >
                <a href={`tel:${BUSINESS.phoneTel}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar ahora
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
