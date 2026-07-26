"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Phone, HelpCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "¿Cuánto cuesta reemplazar un parabrisas?",
    a: "El precio varía según marca, modelo y año del vehículo, y si eliges vidrio nuevo OEM, aftermarket o usado. En general, el rango va de $200 a $800. Te damos una cotización exacta en menos de 15 minutos sin compromiso. Vehículos con sensores ADAS (cámara, sensor de lluvia) pueden tener un costo adicional por recalibración.",
  },
  {
    q: "¿Aceptan seguros?",
    a: "Sí, trabajamos con todas las aseguranzas principales: State Farm, Geico, Progressive, Allstate, Farmers, USAA y más. Manejamos todo el reclamo por ti: tú solo pagas tu deducible (o nada, si tu póliza cubre vidrio sin deducible). Coordinamos directamente con la aseguradora para ahorrarte el papeleo.",
  },
  {
    q: "¿Cuánto tarda la instalación?",
    a: "La instalación toma entre 45 y 90 minutos según el vehículo. Después necesitas esperar 1 hora para que el adhesivo cure antes de poder manejar (drive-away time). En total, estás de vuelta en la carretera en menos de 2.5 horas. Te avisamos claramente cuándo es seguro mover el auto.",
  },
  {
    q: "¿Tienen vidrios usados?",
    a: "Sí, ofrecemos tanto vidrios nuevos (OEM y aftermarket) como usados en buen estado. Los vidrios usados son una excelente opción para presupuestos ajustados: te pueden ahorrar entre $100 y $300. Todos pasan por inspección de calidad antes de la instalación y tienen la misma garantía de mano de obra de por vida.",
  },
  {
    q: "¿Van a mi casa o trabajo?",
    a: "Sí, nuestro servicio móvil cubre todo San Diego County: San Diego, Chula Vista, La Mesa, El Cajon, National City, Imperial Beach, Coronado, Santee, Spring Valley, Lemon Grove, Encinitas, Carlsbad, Escondido y Oceanside. Sin costo extra en la mayoría de las zonas. Tú sigues con tu día mientras trabajamos.",
  },
  {
    q: "¿Qué garantía ofrecen?",
    a: "Garantía de por vida en la mano de obra: si el vidrio presenta fugas, ruidos o problemas de instalación, lo corregimos sin costo. Garantía del fabricante en el vidrio mismo (1 año típico). Sin letra pequeña, sin excusas, sin cobros escondidos. La garantía está por escrito en tu factura.",
  },
  {
    q: "¿Puedo manejar inmediatamente después?",
    a: "No. Necesitas esperar 1 hora después de la instalación para que el adhesivo uretano cure correctamente. Mover el auto antes puede comprometer el sellado y la seguridad. Te avisamos por escrito la hora exacta en la que es seguro manejar. Si es urgente, podemos usar adhesivo de curado rápido (cargo adicional).",
  },
  {
    q: "¿Atienden el mismo día?",
    a: "Sí. Si llamas antes de las 2pm, en la mayoría de los casos agendamos para el mismo día, especialmente si tienes el vidrio disponible en almacén. Llama al (619) 555-0199 lo antes posible para asegurar tu lugar. El servicio móvil también está disponible mismo día según cobertura.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Efectivo, todas las tarjetas (Visa, Mastercard, Amex, Discover), pago directo desde tu seguro, y ofrecemos opciones de financiamiento para reparaciones mayores. Aceptamos Zelle y Venmo también. Factura detallada disponible para tu seguro o contabilidad.",
  },
  {
    q: "¿Son licenciados y asegurados?",
    a: "Sí, estamos completamente licenciados en el estado de California (Lic. #CA-AG-12345) y asegurados. Nuestros técnicos están certificados y capacitados en las últimas tecnologías de vidrios automotrices, incluyendo ADAS, sensores de lluvia y cámaras. Miembro del Better Business Bureau con calificación A+.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">Preguntas Frecuentes</p>
          <h2
            id="faq-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            Resolvemos tus <span className="text-gradient-yellow">dudas</span>
          </h2>
          <p className="mt-4 text-vv-black/70 text-base md:text-lg">
            Si tienes otra pregunta, escríbenos por WhatsApp y te respondemos al
            instante.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion
            type="single"
            collapsible
            className="bg-white rounded-2xl border border-black/5 shadow-sm px-4 md:px-6"
          >
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/5 last:border-0"
              >
                <AccordionTrigger className="text-left text-vv-black font-semibold hover:no-underline hover:text-vv-yellow-deep text-base md:text-lg py-5">
                  <span className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-vv-yellow-deep shrink-0 mt-0.5" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-vv-black/70 text-sm md:text-base leading-relaxed pb-5 pl-8">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-vv-black/70 text-sm mb-4">
            ¿Aún tienes preguntas? Estamos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-14 px-7">
              <a href={`tel:${BUSINESS.phoneTel}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-vv-black/30 text-vv-black hover:bg-vv-black hover:text-white bg-transparent font-semibold h-14 px-7">
              <a href="#agendar">Agendar cita gratis →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
