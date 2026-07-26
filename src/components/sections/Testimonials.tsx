"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

type T = {
  name: string;
  initials: string;
  city: string;
  text: string;
  situation: string;
  service: string;
};

const testimonials: T[] = [
  {
    name: "María G.",
    initials: "MG",
    city: "Chula Vista",
    text: "Vandalizaron mi camioneta en la noche y amanecí con la ventana rota. Llamé a V&V a las 8am y a las 11am ya estaba listo. El técnico llegó a mi casa, súper profesional. Cobraron justo lo que cotizaron.",
    situation: "Vandalismo",
    service: "Cristal lateral",
  },
  {
    name: "David Chen",
    initials: "DC",
    city: "La Mesa",
    text: "Una piedra voló en la 805 y me partió el parabrisas. Les mandé foto por WhatsApp y en 10 min tenía cotización. Mismo día, en mi trabajo. Increíble servicio y precio mejor que el dealer.",
    situation: "Piedra en carretera",
    service: "Parabrisas",
  },
  {
    name: "Roberto M.",
    initials: "RM",
    city: "El Cajon",
    text: "Mi seguro me mandó con ellos y fue la mejor decisión. Tramitaron todo, no pagué deductible porque resultó que tenía cobertura completa. Técnicos certificados de verdad, se nota la diferencia.",
    situation: "Aseguranza cubrió todo",
    service: "Parabrisas",
  },
  {
    name: "Jessica R.",
    initials: "JR",
    city: "National City",
    text: "Necesitaba el vidrio trasero de mi Civic. Me dieron opción de nuevo y usado. Elegí el usado y me ahorré $200. Llegó limpio, sin marcas, instalación perfecta. Garantía por escrito también.",
    situation: "Cambio de vidrio trasero",
    service: "Vidrio trasero",
  },
  {
    name: "Miguel A.",
    initials: "MA",
    city: "Encinitas",
    text: "Me cambiaron el parabrisas en el estacionamiento de mi oficina. No tuve que moverme para nada. Terminaron en 1 hora y me avisaron cuando ya podía manejar. Comunicación 10/10.",
    situation: "Servicio móvil",
    service: "Parabrisas móvil",
  },
  {
    name: "Sarah K.",
    initials: "SK",
    city: "Downtown San Diego",
    text: "Tenía una grieta enorme por todo el parabrisas y pensé que tocaba cambiarlo. Me dijeron que la podían reparar. Quedó casi invisible y me ahorré $300. Honestos de verdad, los recomiendo.",
    situation: "Reparación de grieta",
    service: "Reparación",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonials-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">Testimonios Reales</p>
          <h2
            id="testimonials-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            Conductores de San Diego que ya{" "}
            <span className="text-gradient-yellow">confían en V&amp;V</span>
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            Historias reales de clientes reales. Sin filtros, sin actores.
          </p>

          {/* Trust banner */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex items-center gap-0.5 text-vv-yellow-deep">
              {"★★★★★".split("").map((s, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-vv-black font-bold text-sm">
              Calificado 4.9/5
            </span>
            <span className="text-vv-black/60 text-sm">por 312 clientes</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
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
                “{t.text}”
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vv-yellow to-vv-yellow-deep text-vv-black grid place-items-center font-bold text-sm">
                    {t.initials}
                  </div>
                  <div className="leading-tight">
                    <div className="text-vv-black font-bold text-sm">{t.name}</div>
                    <div className="text-vv-black/50 text-xs flex items-center gap-0.5">
                      <MapPin className="h-3 w-3" />
                      {t.city}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-vv-black/40">
                    {t.situation}
                  </div>
                  <div className="text-[11px] font-semibold text-vv-yellow-deep">
                    {t.service}
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
