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

const services = [
  {
    icon: CarFront,
    title: "Reemplazo de Parabrisas",
    desc: "Cambio completo de parabrisas con adhesivo premium y tiempo de curado de 1 hora. Trabajamos con vidrios OEM y aftermarket. Mismo día en la mayoría de los casos. Garantía de por vida en la instalación.",
    price: "Desde $249",
  },
  {
    icon: Spline,
    title: "Reparación de Grietas",
    desc: "Reparamos chips y grietas de hasta 6 pulgadas antes de que se extiendan. Tecnología de resina UV que restaura la estructura del vidrio. Más económico que reemplazar. En 30 minutos estás de vuelta en la carretera.",
    price: "Desde $69",
  },
  {
    icon: SquareStack,
    title: "Cristales Laterales",
    desc: "Reemplazo de ventanas laterales para sedan, SUV, pickup y van. Vandalismo, robo o accidente: tenemos repuestos nuevos y usados. Limpieza completa de vidrios rotos dentro de la puerta. Funcionamiento del motor garantizado.",
    price: "Desde $149",
  },
  {
    icon: RectangleHorizontal,
    title: "Vidrio Trasero",
    desc: "Back glass para todos los modelos, incluyendo los que tienen defrost (desempañador) y limpiaparabrisas trasero. Sellado hermético contra lluvia. Calibración de la cámara trasera si aplica. Trabajo limpio y profesional.",
    price: "Desde $189",
  },
  {
    icon: Hammer,
    title: "Vehículos Vandalizados",
    desc: "¿Te rompieron el vidrio para robar? Te atendemos con prioridad. Removemos los vidrios rotos, reemplazamos y limpiamos el interior. Coordinamos directamente con tu seguro si lo prefieres. Servicio de emergencia disponible.",
    price: "Desde $129",
  },
  {
    icon: Truck,
    title: "Servicio Móvil",
    desc: "Vamos a tu casa, trabajo o donde estés en San Diego County. Llevamos todo: vidrio, herramientas, adhesivo. Tú sigues con tu día mientras trabajamos. Sin costo extra en la mayoría de zonas. Cubrimos desde Oceanside hasta Chula Vista.",
    price: "Gratis en la mayoría de zonas",
  },
];

export default function Services() {
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
          <p className="kicker text-vv-yellow mb-3">Nuestros Servicios</p>
          <h2
            id="services-heading"
            className="text-white font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            Todo lo que tu vehículo necesita
            <br />
            <span className="text-gradient-yellow">en vidrios automotrices.</span>
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Servicios completos para parabrisas, ventanas laterales y traseros.
            Reparación, reemplazo y servicio móvil en todo San Diego.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative glass-card rounded-2xl p-6 hover:border-vv-yellow/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-vv-yellow/15 text-vv-yellow group-hover:bg-vv-yellow group-hover:text-vv-black transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-vv-yellow">
                  {s.price}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">{s.desc}</p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-white/30 text-white hover:bg-vv-yellow hover:text-vv-black hover:border-vv-yellow bg-transparent h-11"
              >
                <a href="#agendar">
                  Agendar
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
