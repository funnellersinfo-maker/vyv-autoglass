"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal, Clock, Quote } from "lucide-react";

type Pair = {
  before: string;
  after: string;
  vehicle: string;
  service: string;
  timeSaved: string;
  quote: string;
};

const pairs: Pair[] = [
  {
    before:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    vehicle: "Toyota Camry 2019",
    service: "Reemplazo de parabrisas",
    timeSaved: "Atendido en 1h 20min",
    quote:
      "Llegué con el parabrisas estallado y salí manejarando. Servicio impecable.",
  },
  {
    before:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    vehicle: "Honda Civic 2021",
    service: "Cristal lateral por vandalismo",
    timeSaved: "Mismo día · 2h total",
    quote:
      "Me robaron la ventana en la noche. V&V la cambió en mi trabajo al día siguiente.",
  },
  {
    before:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    vehicle: "Ford F-150 2018",
    service: "Reemplazo de vidrio trasero",
    timeSaved: "Servicio móvil · 1h 45min",
    quote:
      "El técnico vino a mi casa. Trabajo limpio, sellado perfecto, sin fugas.",
  },
];

function Slider({ pair }: { pair: Pair }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
      <div
        ref={ref}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        onMouseMove={(e) => dragging.current && update(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={(e) => {
          dragging.current = true;
          update(e.touches[0].clientX);
        }}
        onTouchMove={(e) => update(e.touches[0].clientX)}
        onTouchEnd={() => (dragging.current = false)}
      >
        {/* AFTER (base layer) */}
        <Image
          src={pair.after}
          alt={`Después — ${pair.vehicle}`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover pointer-events-none"
        />
        <span className="absolute top-3 right-3 bg-vv-green text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10">
          Después
        </span>

        {/* BEFORE (clipped overlay via clip-path) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`Antes — ${pair.vehicle}`}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 bg-vv-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
            Antes
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-vv-yellow pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 h-9 w-9 rounded-full bg-vv-yellow text-vv-black grid place-items-center shadow-lg">
            <MoveHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div className="text-vv-black font-bold text-base">{pair.vehicle}</div>
            <div className="text-vv-black/60 text-xs">{pair.service}</div>
          </div>
          <div className="inline-flex items-center gap-1 bg-vv-yellow/15 text-vv-black text-[11px] font-semibold rounded-full px-2.5 py-1">
            <Clock className="h-3 w-3 text-vv-yellow-deep" />
            {pair.timeSaved}
          </div>
        </div>
        <p className="flex items-start gap-2 text-vv-black/75 text-sm">
          <Quote className="h-4 w-4 text-vv-yellow-deep shrink-0 mt-0.5" />
          {pair.quote}
        </p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section
      id="antes-despues"
      aria-labelledby="ba-heading"
      className="bg-vv-black py-16 md:py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,214,10,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p className="kicker text-vv-yellow mb-3">Resultados Reales</p>
          <h2
            id="ba-heading"
            className="text-white font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            Resultados Reales.{" "}
            <span className="text-gradient-yellow">Antes y Después.</span>
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Arrastra el control amarillo para ver la transformación. Esto es lo
            que pasa cuando llamas a V&amp;V Auto Glass.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pairs.map((p, i) => (
            <motion.div
              key={p.vehicle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Slider pair={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
