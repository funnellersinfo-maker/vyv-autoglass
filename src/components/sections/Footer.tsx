"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="bg-vv-black text-white border-t border-vv-yellow/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-vv-yellow/40 bg-white">
                <Image
                  src="/logos/vv-auto-glass.png"
                  alt="V&V Auto Glass logo"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-lg">
                  V&amp;V <span className="text-vv-yellow">Auto Glass</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                  San Diego · CA
                </div>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              Reemplazo y reparación de vidrios automotrices en San Diego. Vidrios
              nuevos y usados para todas las marcas. Cotización gratis, servicio
              móvil y garantía de por vida.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/vvautoglass"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-9 w-9 rounded-full bg-white/10 hover:bg-vv-yellow hover:text-vv-black transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/vvautoglass"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-9 w-9 rounded-full bg-white/10 hover:bg-vv-yellow hover:text-vv-black transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://g.page/vvautoglass"
                aria-label="Google Business"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center h-9 w-9 rounded-full bg-white/10 hover:bg-vv-yellow hover:text-vv-black transition-colors"
              >
                <Star className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-vv-yellow">
              Enlaces
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#servicios" className="hover:text-vv-yellow transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#agendar" className="hover:text-vv-yellow transition-colors">
                  Agendar Cita
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-vv-yellow transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#antes-despues" className="hover:text-vv-yellow transition-colors">
                  Antes y Después
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-vv-yellow transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-vv-yellow transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-vv-yellow">
              Servicios
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Reemplazo de Parabrisas</li>
              <li>Reparación de Grietas</li>
              <li>Cristales Laterales</li>
              <li>Vidrio Trasero</li>
              <li>Vehículos Vandalizados</li>
              <li>Servicio Móvil</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-vv-yellow">
              Contacto
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex items-center gap-2 hover:text-vv-yellow transition-colors font-semibold text-white"
                >
                  <Phone className="h-4 w-4 text-vv-yellow" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hola V&V Auto Glass")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-vv-yellow transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-vv-green pulse-green-dot" />
                  WhatsApp · {BUSINESS.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="inline-flex items-center gap-2 hover:text-vv-yellow transition-colors"
                >
                  <Mail className="h-4 w-4 text-vv-yellow" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="h-4 w-4 text-vv-yellow mt-0.5 shrink-0" />
                <span>{BUSINESS.address}</span>
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[10px] bg-white/10 rounded-md px-2 py-1 text-white/70">
                {BUSINESS.license}
              </span>
              <span className="text-[10px] bg-white/10 rounded-md px-2 py-1 text-white/70">
                Asegurado
              </span>
              <span className="text-[10px] bg-white/10 rounded-md px-2 py-1 text-white/70">
                BBB A+
              </span>
            </div>
          </div>
        </div>

        {/* SEO footer text */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[11px] leading-relaxed text-center mb-4">
            Auto Glass Near Me · Windshield Replacement San Diego · Windshield
            Repair · Car Window Replacement · Mobile Auto Glass · Windshield
            Crack Repair · Parabrisas San Diego · Cristales Automotrices ·
            Cambio de Parabrisas · Auto Glass Chula Vista · Auto Glass La Mesa ·
            Auto Glass El Cajon · Auto Glass National City
          </p>
          <p className="text-white/50 text-xs text-center">
            © 2026 V&amp;V Auto Glass. Todos los derechos reservados. · Lic.
            #CA-AG-12345 · Asegurado · Better Business Bureau A+
          </p>
        </div>
      </div>
    </footer>
  );
}
