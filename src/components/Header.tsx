"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Antes y Después", href: "#antes-despues" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-vv-black/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <div className="relative h-11 w-11 md:h-12 md:w-12 rounded-xl overflow-hidden ring-1 ring-vv-yellow/40 bg-white">
            <Image
              src="/logos/vv-auto-glass.png"
              alt="V&V Auto Glass logo"
              fill
              className="object-contain p-1"
              priority
              sizes="48px"
            />
          </div>
          <div className="leading-tight">
            <div className="text-white font-extrabold text-base md:text-lg tracking-tight">
              V&amp;V <span className="text-vv-yellow">Auto Glass</span>
            </div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60">
              San Diego · CA
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-white/80 hover:text-vv-yellow transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Phone CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white hover:text-vv-black bg-transparent"
          >
            <a href={`tel:${BUSINESS.phoneTel}`}>
              <Phone className="mr-2 h-4 w-4" />
              {BUSINESS.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="sm" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold">
            <a href="#agendar">Agendar Cita</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-vv-black/95 backdrop-blur-lg flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-white font-bold text-lg">
              V&amp;V <span className="text-vv-yellow">Auto Glass</span>
            </span>
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="text-white p-2 rounded-md hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-6 gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-white text-lg font-medium py-3 border-b border-white/5"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto p-5 flex flex-col gap-3">
            <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12">
              <a href="#agendar" onClick={() => setOpen(false)}>
                Agendar Cita Gratis
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white hover:text-vv-black bg-transparent h-12">
              <a href={`tel:${BUSINESS.phoneTel}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
