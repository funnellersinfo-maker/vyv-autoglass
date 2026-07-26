"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Clock, CalendarCheck } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/button";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroBottom = 600; // hide on hero
      setShow(y > heroBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:rounded-2xl"
        >
          <div className="bg-vv-black/95 backdrop-blur-lg border-t border-vv-yellow/40 md:border md:border-vv-yellow/40 shadow-2xl">
            <div className="mx-auto max-w-5xl flex items-center justify-between gap-3 px-4 py-3 md:px-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="hidden sm:flex relative h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-vv-green opacity-70 pulse-green-dot" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vv-green" />
                </span>
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold leading-tight flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-vv-yellow shrink-0" />
                    <span className="truncate">Abierto ahora · Mismo día</span>
                  </div>
                  <div className="text-white/60 text-[11px] truncate">
                    Respuesta en menos de 15 min
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden sm:inline-flex border-white/30 text-white hover:bg-white hover:text-vv-black bg-transparent h-11"
                >
                  <a href={`tel:${BUSINESS.phoneTel}`}>
                    <Phone className="mr-1.5 h-4 w-4" />
                    Llamar
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-11 px-4 pulse-yellow-glow"
                >
                  <a href="#agendar">
                    <CalendarCheck className="mr-1.5 h-4 w-4" />
                    Agendar Gratis
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
