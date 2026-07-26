"use client";

import { motion } from "framer-motion";
import { Camera, MessageCircle, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: 1,
    icon: Camera,
    title: "Cuéntanos tu vehículo",
    desc: "Subes una foto del daño y nos dices marca, modelo y año. Cuanta más información compartas, más exacta será tu cotización. No te llevará más de un par de minutos. Lo puedes hacer desde tu celular en cualquier momento, las 24 horas.",
    micro: "Toma menos de 2 minutos.",
  },
  {
    n: 2,
    icon: MessageCircle,
    title: "Recibe tu cotización en 15 min",
    desc: "Te contactamos por WhatsApp con precio exacto y disponibilidad de vidrio. Si tienes seguro, te decimos cuánto cubre y qué te toca pagar. Sin letra pequeña. Si aceptas, agendamos al instante. Si no, no hay compromiso ni cobro.",
    micro: "Respuesta garantizada en 15 min.",
  },
  {
    n: 3,
    icon: CalendarClock,
    title: "Agenda y nosotros vamos",
    desc: "Tú eliges el día y la franja horaria. Vamos a tu casa, a tu trabajo o nos visitas en el taller. El técnico certificado llega con todo listo: vidrio, adhesivo y herramientas. En 45–90 minutos tu vehículo estará listo para regresar a la carretera.",
    micro: "Tú sigues con tu día.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="kicker text-vv-yellow-deep mb-3">Cómo Funciona</p>
          <h2
            id="how-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            De vidrio roto a{" "}
            <span className="text-gradient-yellow">vidrio nuevo</span> en 3 pasos.
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            Sin complicaciones. Sin esperas. Sin sorpresas. Así de simple es
            trabajar con V&amp;V Auto Glass.
          </p>
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
              <h3 className="text-vv-black font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-vv-black/70 text-sm leading-relaxed mb-4">{s.desc}</p>
              <p className="inline-block bg-vv-yellow/15 text-vv-black/80 text-xs font-semibold rounded-full px-3 py-1">
                ⏱️ {s.micro}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold text-base h-14 px-8 pulse-yellow-glow">
            <a href="#agendar">Empezar ahora — Cotización gratis →</a>
          </Button>
          <p className="mt-3 text-vv-black/55 text-xs">
            📲 Respuesta en 15 min · 🔒 Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
