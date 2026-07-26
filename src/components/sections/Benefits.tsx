"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Car, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Atención el Mismo Día",
    desc: "Tu parabrisas roto no puede esperar. Atendemos hoy mismo en San Diego y áreas cercanas, incluyendo Chula Vista, La Mesa, El Cajon y National City. Si llamas antes de las 2pm, agendamos para el mismo día. Tu seguridad y la de tu familia es nuestra prioridad. No dejes el problema para mañana.",
    micro: "Sin letra pequeña.",
  },
  {
    icon: DollarSign,
    title: "Cotización Gratis",
    desc: "Sin costo, sin compromiso. Te damos el precio exacto antes de empezar cualquier trabajo. Comparar es libre: evalúa opciones, consulta con tu seguro y decide con calma. Nuestros precios son transparentes y competitivos en todo San Diego County. Sabemos que el dinero importa y respetamos tu presupuesto.",
    micro: "Precio justo, sin sorpresas.",
  },
  {
    icon: Car,
    title: "Todas las Marcas y Modelos",
    desc: "Desde Honda hasta BMW, desde una camioneta RAM hasta un Tesla. Vidrios nuevos y usados disponibles para mantener precios accesibles. Trabajamos con autos nacionales, asiáticos, europeos y de lujo. Tenemos inventario en almacén o lo conseguimos en 24 horas. Si tiene vidrio, lo reemplazamos.",
    micro: "Si tiene vidrio, lo reemplazamos.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía por Escrito",
    desc: "Respaldamos cada instalación con garantía de por vida en la mano de obra. Si el vidrio presenta fugas, ruidos o problemas de instalación, lo corregimos sin costo. Garantía del fabricante en el vidrio también incluida. Sin letra pequeña, sin excusas, sin cobros escondidos. Tu tranquilidad es parte del servicio.",
    micro: "Si algo falla, lo arreglamos sin costo.",
  },
];

export default function Benefits() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">Por qué V&amp;V Auto Glass</p>
          <h2
            id="benefits-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            No solo cambiamos vidrios.
            <br />
            <span className="text-gradient-yellow">Cambiamos tu experiencia.</span>
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            Cinco razones por las que más de 5,000 conductores en San Diego nos
            han elegido para proteger lo que más importa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
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
              <h3 className="text-vv-black font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-vv-black/70 text-sm leading-relaxed">{b.desc}</p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-vv-yellow-deep">
                ✓ {b.micro}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
