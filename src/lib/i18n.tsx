"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

// Central dictionary. Every user-visible string is keyed here.
// Components consume via `t("key")`.
export const DICT: Dict = {
  // Top bar
  "top.open": { es: "Abierto ahora", en: "Open now" },
  "top.response": { es: "Respuesta en menos de 1 min", en: "Reply in under 1 min" },
  "top.response.short": { es: "Respuesta en 1 min", en: "Reply in 1 min" },
  "top.free": { es: "Cotización GRATIS", en: "FREE Quote" },

  // Header
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.how": { es: "Cómo Funciona", en: "How It Works" },
  "nav.testimonials": { es: "Testimonios", en: "Testimonials" },
  "nav.beforeAfter": { es: "Antes y Después", en: "Before & After" },
  "nav.faq": { es: "FAQ", en: "FAQ" },
  "nav.about": { es: "El Experto", en: "The Expert" },
  "header.book": { es: "Agendar Cita", en: "Book Now" },

  // Hero
  "hero.badge": { es: "#1 Auto Glass en San Diego · 5,000+ instalaciones", en: "#1 Auto Glass in San Diego · 5,000+ installs" },
  "hero.h1a": { es: "Parabrisas Roto en San Diego?", en: "Broken Windshield in San Diego?" },
  "hero.h1b": { es: "Lo Reemplazamos HOY", en: "We Replace It TODAY" },
  "hero.h1c": { es: "Mismo.", en: "Same Day." },
  "hero.sub": {
    es: "Vidrios nuevos y usados para todas las marcas, modelos y años. Cotización gratis en 60 segundos. Técnicos certificados. Garantía por escrito.",
    en: "New & used glass for all brands, makes and years. Free quote in 60 seconds. Certified technicians. Written warranty.",
  },
  "hero.cta.primary": { es: "Agendar Cita Gratis →", en: "Book Free Appointment →" },
  "hero.cta.secondary": { es: "Llamar Ahora", en: "Call Now" },
  "hero.microcopy": {
    es: "⏱️ Toma 1 minuto · 🔒 Tu información está segura · 📲 Te llamaremos en menos de 1 min",
    en: "⏱️ Takes 1 minute · 🔒 Your info is safe · 📲 We'll call you in under 1 min",
  },
  "hero.response": { es: "Tiempo de respuesta", en: "Response time" },
  "hero.1min": { es: "1 min", en: "1 min" },
  "hero.confirmed": { es: "Cita confirmada hoy", en: "Appointment confirmed today" },
  "hero.mobile": { es: "Servicio móvil disponible", en: "Mobile service available" },
  "hero.ratedBy": { es: "Calificado por 312 clientes", en: "Rated by 312 customers" },
  "hero.trust.rating": { es: "4.9/5", en: "4.9/5" },
  "hero.trust.reviews": { es: "312 reseñas", en: "312 reviews" },
  "hero.trust.installs": { es: "5,000+", en: "5,000+" },
  "hero.trust.installsSub": { es: "Vidrios instalados", en: "Glasses installed" },
  "hero.trust.insurance": { es: "Aseguradoras", en: "Insurance" },
  "hero.trust.insuranceSub": { es: "Aceptadas", en: "Accepted" },
  "hero.trust.warranty": { es: "Garantía", en: "Warranty" },
  "hero.trust.warrantySub": { es: "De por vida", en: "Lifetime" },
  "hero.trust.sameDay": { es: "Mismo Día", en: "Same Day" },
  "hero.trust.sameDaySub": { es: "Si llamas antes 2pm", en: "If you call by 2pm" },

  // Benefits
  "benefits.kicker": { es: "Por qué V&V", en: "Why V&V" },
  "benefits.title": { es: "No solo cambiamos vidrios. Cambiamos tu experiencia.", en: "We don't just change glass. We change your experience." },
  "benefits.b1.t": { es: "Atención el Mismo Día", en: "Same-Day Service" },
  "benefits.b1.d": { es: "Tu parabrisas roto no puede esperar. Atendemos hoy mismo en San Diego y áreas cercanas. Llama antes de las 2pm para garantizar servicio el mismo día.", en: "Your broken windshield can't wait. We serve today in San Diego and surrounding areas. Call before 2pm to guarantee same-day service." },
  "benefits.b1.m": { es: "Sin letra pequeña.", en: "No fine print." },
  "benefits.b2.t": { es: "Cotización Gratis", en: "Free Quote" },
  "benefits.b2.d": { es: "Sin costo, sin compromiso. Te damos el precio exacto antes de empezar. Respondemos en menos de 1 minuto por WhatsApp o teléfono.", en: "No cost, no commitment. We give you the exact price before starting. We respond in under 1 minute via WhatsApp or phone." },
  "benefits.b2.m": { es: "Respuesta en 1 min.", en: "Reply in 1 min." },
  "benefits.b3.t": { es: "Todas las Marcas y Modelos", en: "All Makes & Models" },
  "benefits.b3.d": { es: "Desde Honda hasta BMW. Vidrios nuevos y usados disponibles. Si tiene vidrio, lo conseguimos y lo instalamos.", en: "From Honda to BMW. New and used glass available. If it has glass, we source it and install it." },
  "benefits.b3.m": { es: "Cobertura total.", en: "Full coverage." },
  "benefits.b4.t": { es: "Garantía por Escrito", en: "Written Warranty" },
  "benefits.b4.d": { es: "Respaldamos cada instalación. Si algo falla, lo arreglamos sin costo. Garantía de por vida en mano de obra y del fabricante en el vidrio.", en: "We back every installation. If something fails, we fix it free. Lifetime warranty on labor and manufacturer warranty on glass." },
  "benefits.b4.m": { es: "De por vida.", en: "For life." },

  // Services
  "services.kicker": { es: "Nuestros Servicios", en: "Our Services" },
  "services.title": { es: "Todo lo que tu vehículo necesita en vidrios automotrices.", en: "Everything your vehicle needs in auto glass." },
  "services.sub": { es: "Cotización gratis para cada servicio. Técnicos certificados. Garantía de por vida.", en: "Free quote for every service. Certified technicians. Lifetime warranty." },
  "services.s1.t": { es: "Reemplazo de Parabrisas", en: "Windshield Replacement" },
  "services.s1.d": { es: "Parabrisas new o usado, todas las marcas. Instalación profesional con adhesivos OEM. Listo para manejar en 1 hora.", en: "New or used windshield, all brands. Professional install with OEM adhesives. Ready to drive in 1 hour." },
  "services.s2.t": { es: "Reparación de Grietas", en: "Chip & Crack Repair" },
  "services.s2.d": { es: "Si la grieta es menor a 6 pulgadas, la reparamos sin reemplazar. Ahorra dinero y tiempo.", en: "If the crack is under 6 inches, we repair it without replacement. Save money and time." },
  "services.s3.t": { es: "Cristales Laterales", en: "Side Windows" },
  "services.s3.d": { es: "Ventanas laterales para todas las puertas. Cristales vandalizados o quebrados reemplazados el mismo día.", en: "Side windows for all doors. Vandalized or broken glass replaced same day." },
  "services.s4.t": { es: "Vidrio Trasero", en: "Back Glass" },
  "services.s4.d": { es: "Reemplazo de vidrio trasero incluyendo desempañador y calentamiento. Sellado perfecto garantizado.", en: "Back glass replacement including defroster and heater. Perfect seal guaranteed." },
  "services.s5.t": { es: "Vehículos Vandalizados", en: "Vandalized Vehicles" },
  "services.s5.d": { es: "Te robaron la ventana? Vamos a tu casa o trabajo y lo solucionamos hoy mismo. Trabajamos con tu aseguradora.", en: "Window broken into? We come to your home or work and fix it today. We work with your insurance." },
  "services.s6.t": { es: "Servicio Móvil", en: "Mobile Service" },
  "services.s6.d": { es: "Vamos a tu casa, trabajo o donde estés en San Diego County. Sin costo extra en la mayoría de zonas.", en: "We come to your home, work or wherever you are in San Diego County. No extra cost in most areas." },
  "services.from": { es: "Desde", en: "From" },
  "services.book": { es: "Agendar", en: "Book" },

  // How It Works
  "how.kicker": { es: "Proceso Simple", en: "Simple Process" },
  "how.title": { es: "De vidrio roto a vidrio nuevo en 3 pasos.", en: "From broken glass to new glass in 3 steps." },
  "how.s1.t": { es: "Cuéntanos tu vehículo", en: "Tell us your vehicle" },
  "how.s1.d": { es: "Subes una foto del daño y nos dices marca, modelo y año. Toma 1 minuto.", en: "Upload a photo of the damage and tell us make, model and year. Takes 1 minute." },
  "how.s1.m": { es: "Toma menos de 1 minuto.", en: "Takes under 1 minute." },
  "how.s2.t": { es: "Recibe tu cotización en 1 min", en: "Get your quote in 1 min" },
  "how.s2.d": { es: "Te contactamos por WhatsApp con precio exacto y disponibilidad. Sin compromiso.", en: "We contact you via WhatsApp with exact price and availability. No commitment." },
  "how.s2.m": { es: "Respuesta en 1 min.", en: "Reply in 1 min." },
  "how.s3.t": { es: "Agenda y nosotros vamos", en: "Book and we go to you" },
  "how.s3.d": { es: "Tú eliges día y hora. Vamos a tu casa, trabajo o nos visitas. Pago fácil con tarjeta, efectivo o seguro.", en: "You pick day and time. We come to your home, work or you visit us. Easy pay with card, cash or insurance." },
  "how.s3.m": { es: "Tú eliges dónde.", en: "You choose where." },
  "how.cta": { es: "Empezar ahora — Cotización gratis →", en: "Start now — Free quote →" },

  // Testimonials
  "test.kicker": { es: "Testimonios", en: "Testimonials" },
  "test.title": { es: "Conductores de San Diego que ya confían en V&V", en: "San Diego drivers who already trust V&V" },
  "test.sub": { es: "Calificado 4.9/5 por 312 clientes reales.", en: "Rated 4.9/5 by 312 real customers." },
  "test.banner": { es: "4.9/5 · Calificado por 312 clientes en Google", en: "4.9/5 · Rated by 312 customers on Google" },

  // Before/After
  "ba.kicker": { es: "Resultados Reales", en: "Real Results" },
  "ba.title.a": { es: "Resultados Reales.", en: "Real Results." },
  "ba.title.b": { es: "Antes y Después.", en: "Before & After." },
  "ba.sub": { es: "Arrastra el control amarillo para ver la transformación. Esto es lo que pasa cuando llamas a V&V Auto Glass.", en: "Drag the yellow handle to see the transformation. This is what happens when you call V&V Auto Glass." },
  "ba.before": { es: "Antes", en: "Before" },
  "ba.after": { es: "Después", en: "After" },

  // Brands
  "brands.kicker": { es: "Marcas", en: "Brands" },
  "brands.title": { es: "Trabajamos con TODAS las marcas", en: "We work with ALL brands" },
  "brands.sub": { es: "Si tiene vidrio, lo reemplazamos.", en: "If it has glass, we replace it." },
  "brands.cta": { es: "Pregúntanos, seguro la tenemos.", en: "Ask us, we likely have it." },

  // Expert (Victor)
  "expert.kicker": { es: "Conoce al Experto", en: "Meet the Expert" },
  "expert.title": { es: "Victor: 5+ años reparando vidrios en San Diego", en: "Victor: 5+ years repairing glass in San Diego" },
  "expert.role": { es: "Fundador & Técnico Certificado", en: "Founder & Certified Technician" },
  "expert.p1": { es: "Victor fundó V&V Auto Glass hace más de 5 años con una misión clara: ofrecer un servicio honesto, rápido y profesional a la comunidad de San Diego. Lo que empezó como un taller pequeño hoy es el #1 en reparación y reemplazo de vidrios automotrices en el condado.", en: "Victor founded V&V Auto Glass over 5 years ago with a clear mission: to offer honest, fast and professional service to the San Diego community. What started as a small shop is now the #1 in auto glass repair and replacement in the county." },
  "expert.p2": { es: "Con más de 5,000 instalaciones completadas, Victor personalmente supervisa cada trabajo. Está certificado en instalación OEM, trabaja con todas las aseguradoras mayores y usa solo materiales premium con garantía de por vida.", en: "With over 5,000 installations completed, Victor personally oversees every job. He's certified in OEM installation, works with all major insurance companies and uses only premium materials with lifetime warranty." },
  "expert.p3": { es: "Su filosofía es simple: trata cada auto como si fuera tuyo. Por eso cuando llamas a V&V, no solo recibes un precio, recibes el consejo de un experto que se preocupa por tu seguridad y la de tu familia.", en: "His philosophy is simple: treat every car as if it were yours. That's why when you call V&V, you don't just get a price, you get expert advice from someone who cares about your safety and your family's." },
  "expert.stat1": { es: "5+ años", en: "5+ years" },
  "expert.stat1l": { es: "de experiencia", en: "of experience" },
  "expert.stat2": { es: "5,000+", en: "5,000+" },
  "expert.stat2l": { es: "instalaciones", en: "installations" },
  "expert.stat3": { es: "100%", en: "100%" },
  "expert.stat3l": { es: "garantía de por vida", en: "lifetime warranty" },
  "expert.quote": { es: "\"Cada vidrio que instalo lleva mi nombre. Si no está perfecto, no sale del taller.\"", en: "\"Every glass I install carries my name. If it's not perfect, it doesn't leave the shop.\"" },
  "expert.cta": { es: "Habla con Victor →", en: "Talk to Victor →" },

  // Guarantee
  "guarantee.kicker": { es: "Garantía", en: "Warranty" },
  "guarantee.title": { es: "GARANTÍA DE POR VIDA", en: "LIFETIME WARRANTY" },
  "guarantee.desc": { es: "Respaldamos cada instalación con garantía de por vida en la mano de obra. Si el vidrio presenta fugas, ruidos o problemas de instalación, lo corregimos sin costo. Garantía del fabricante en el vidrio. Sin letra pequeña, sin excusas.", en: "We back every installation with lifetime warranty on labor. If the glass leaks, makes noise or has install issues, we fix it free. Manufacturer warranty on the glass. No fine print, no excuses." },
  "guarantee.moneyback": { es: "Si no estás 100% satisfecho, te devolvemos tu dinero.", en: "If you're not 100% satisfied, we refund your money." },
  "guarantee.p1": { es: "Garantía Escrita", en: "Written Warranty" },
  "guarantee.p2": { es: "Técnicos Certificados", en: "Certified Technicians" },
  "guarantee.p3": { es: "Materiales Premium", en: "Premium Materials" },

  // Booking form
  "book.kicker": { es: "Cotización Gratis", en: "Free Quote" },
  "book.title.a": { es: "Agenda tu cita en ", en: "Book your appointment in " },
  "book.title.b": { es: "1 minuto", en: "1 minute" },
  "book.sub": { es: "Sin compromiso · Respuesta en 1 min · Cotización exacta", en: "No commitment · Reply in 1 min · Exact quote" },
  "book.step": { es: "Paso", en: "Step" },
  "book.of": { es: "de 5", en: "of 5" },
  "book.takes": { es: "Toma 1 minuto", en: "Takes 1 minute" },
  "book.step1.t": { es: "Cuéntanos de tu vehículo", en: "Tell us about your vehicle" },
  "book.step1.s": { es: "Para darte un precio exacto, necesitamos marca, modelo y año.", en: "To give you an exact price, we need make, model and year." },
  "book.brand": { es: "Marca", en: "Make" },
  "book.brand.ph": { es: "Selecciona la marca", en: "Select make" },
  "book.model": { es: "Modelo", en: "Model" },
  "book.model.ph": { es: "Ej. Camry, Civic, F-150", en: "Eg. Camry, Civic, F-150" },
  "book.year": { es: "Año", en: "Year" },
  "book.year.ph": { es: "Selecciona el año", en: "Select year" },
  "book.step2.t": { es: "Sobre el daño", en: "About the damage" },
  "book.step2.s": { es: "¿Qué vidrio necesitas? Una foto nos ayuda a cotizar mejor.", en: "Which glass do you need? A photo helps us quote better." },
  "book.glassType": { es: "Tipo de vidrio", en: "Glass type" },
  "book.gt1": { es: "Parabrisas", en: "Windshield" },
  "book.gt2": { es: "Cristal lateral", en: "Side window" },
  "book.gt3": { es: "Vidrio trasero", en: "Back glass" },
  "book.gt4": { es: "Espejo lateral", en: "Side mirror" },
  "book.insurance": { es: "¿Tienes seguro?", en: "Do you have insurance?" },
  "book.yesIns": { es: "✓ Sí, tengo seguro", en: "✓ Yes, I have insurance" },
  "book.noIns": { es: "✗ No tengo", en: "✗ No, I don't" },
  "book.insHelp": { es: "Tramitamos el reclamo con tu aseguradora por ti.", en: "We file the claim with your insurance for you." },
  "book.photo": { es: "Foto del daño (opcional)", en: "Damage photo (optional)" },
  "book.photo.tap": { es: "Toca para subir foto", en: "Tap to upload photo" },
  "book.photo.hint": { es: "JPG, PNG · Máx 5MB", en: "JPG, PNG · Max 5MB" },
  "book.step3.t": { es: "¿Cuándo y dónde?", en: "When and where?" },
  "book.step3.s": { es: "Elige la urgencia y el lugar del servicio.", en: "Choose urgency and service location." },
  "book.when": { es: "¿Cuándo lo necesitas?", en: "When do you need it?" },
  "book.when1": { es: "🔥 Hoy", en: "🔥 Today" },
  "book.when2": { es: "Mañana", en: "Tomorrow" },
  "book.when3": { es: "Esta semana", en: "This week" },
  "book.where": { es: "¿Dónde?", en: "Where?" },
  "book.where1": { es: "Taller", en: "Shop" },
  "book.where2": { es: "Mi casa", en: "My home" },
  "book.where3": { es: "Mi trabajo", en: "My work" },
  "book.address": { es: "Dirección (servicio móvil)", en: "Address (mobile service)" },
  "book.address.ph": { es: "Ej. 1234 Main St, San Diego, CA 92101", en: "Eg. 1234 Main St, San Diego, CA 92101" },
  "book.addressHint": { es: "Sin costo extra en la mayoría de zonas de San Diego.", en: "No extra cost in most San Diego areas." },
  "book.step4.t": { es: "Elige fecha y hora", en: "Pick date and time" },
  "book.step4.s": { es: "Solo mostramos días con disponibilidad real.", en: "We only show days with real availability." },
  "book.scarcity": { es: "🔥 Solo 3 citas disponibles hoy. Reserva la tuya.", en: "🔥 Only 3 appointments left today. Book yours." },
  "book.date": { es: "Fecha", en: "Date" },
  "book.slot": { es: "Franja horaria", en: "Time slot" },
  "book.slot1": { es: "🌅 Mañana (8am–12pm)", en: "🌅 Morning (8am–12pm)" },
  "book.slot2": { es: "☀️ Tarde (12pm–6pm)", en: "☀️ Afternoon (12pm–6pm)" },
  "book.confirmWhatsapp": { es: "Te confirmamos por WhatsApp en 1 min.", en: "We confirm via WhatsApp in 1 min." },
  "book.step5.t": { es: "¿Cómo te contactamos?", en: "How do we contact you?" },
  "book.step5.s": { es: "Último paso. Te llamaremos o escribiremos en 1 minuto.", en: "Last step. We'll call or text you in 1 minute." },
  "book.name": { es: "Nombre completo", en: "Full name" },
  "book.name.ph": { es: "Ej. Juan Pérez", en: "Eg. John Smith" },
  "book.phone": { es: "Teléfono", en: "Phone" },
  "book.phoneHint": { es: "📲 Te llamaremos o escribiremos por WhatsApp.", en: "📲 We'll call or text you via WhatsApp." },
  "book.email": { es: "Email (opcional)", en: "Email (optional)" },
  "book.notes": { es: "Notas (opcional)", en: "Notes (optional)" },
  "book.notes.ph": { es: "Cuéntanos detalles del daño, color del auto, sensor de lluvia, etc.", en: "Tell us damage details, car color, rain sensor, etc." },
  "book.secure": { es: "🔒 Tu información está segura. No la compartimos con terceros.", en: "🔒 Your info is safe. We never share with third parties." },
  "book.back": { es: "Atrás", en: "Back" },
  "book.next": { es: "Continuar", en: "Continue" },
  "book.submit": { es: "Agendar Cita Gratis", en: "Book Free Appointment" },
  "book.sending": { es: "Enviando…", en: "Sending…" },
  "book.footer": { es: "Información segura · Sin compromiso · Cancela cuando quieras", en: "Secure info · No commitment · Cancel anytime" },
  "book.e1": { es: "🚗 Empecemos. Esto toma menos de 1 minuto.", en: "🚗 Let's start. This takes under 1 minute." },
  "book.e2": { es: "📸 Con una foto basta para cotizar exacto.", en: "📸 One photo is enough for an exact quote." },
  "book.e3": { es: "⚙️ ¡Casi listo! Dinos dónde y cuándo.", en: "⚙️ Almost there! Tell us where and when." },
  "book.e4": { es: "📅 ¡Ya casi! Solo unos datos más.", en: "📅 Almost done! Just a few more details." },
  "book.e5": { es: "📞 Último paso. Te llamaremos en 1 min.", en: "📞 Last step. We'll call you in 1 min." },
  "book.err.brand": { es: "Selecciona la marca.", en: "Select the make." },
  "book.err.model": { es: "Escribe el modelo.", en: "Enter the model." },
  "book.err.year": { es: "Selecciona el año.", en: "Select the year." },
  "book.err.glassType": { es: "Selecciona el tipo de vidrio.", en: "Select the glass type." },
  "book.err.photo": { es: "La foto no puede pesar más de 5MB.", en: "Photo can't exceed 5MB." },
  "book.err.when": { es: "Indica cuándo lo necesitas.", en: "Tell us when you need it." },
  "book.err.where": { es: "Indica dónde.", en: "Tell us where." },
  "book.err.address": { es: "Escribe tu dirección.", en: "Enter your address." },
  "book.err.serviceDate": { es: "Elige una fecha.", en: "Pick a date." },
  "book.err.serviceTime": { es: "Elige una franja horaria.", en: "Pick a time slot." },
  "book.err.name": { es: "Escribe tu nombre.", en: "Enter your name." },
  "book.err.phone": { es: "Teléfono inválido (10 dígitos).", en: "Invalid phone (10 digits)." },
  "book.toast.title": { es: "¡Cita agendada! 🎉", en: "Appointment booked! 🎉" },
  "book.toast.desc": { es: "Te contactaremos en menos de 1 min.", en: "We'll contact you in under 1 min." },
  "book.toast.fail": { es: "No se pudo agendar", en: "Couldn't book" },
  "book.confirm.title": { es: "¡Cita Agendada! 🎉", en: "Appointment Booked! 🎉" },
  "book.confirm.body": { es: "Gracias", en: "Thanks" },
  "book.confirm.body2": { es: ". Hemos recibido tu solicitud. Te contactaremos en 1 min para confirmar.", en: ". We received your request. We'll contact you in 1 min to confirm." },
  "book.confirm.summary": { es: "Resumen de tu cita", en: "Your appointment summary" },
  "book.confirm.vehicle": { es: "Vehículo", en: "Vehicle" },
  "book.confirm.glass": { es: "Vidrio", en: "Glass" },
  "book.confirm.insurance": { es: "Seguro", en: "Insurance" },
  "book.confirm.date": { es: "Fecha", en: "Date" },
  "book.confirm.slot": { es: "Horario", en: "Time" },
  "book.confirm.place": { es: "Lugar", en: "Place" },
  "book.confirm.name": { es: "Nombre", en: "Name" },
  "book.confirm.phone": { es: "Teléfono", en: "Phone" },
  "book.confirm.yes": { es: "Sí", en: "Yes" },
  "book.confirm.no": { es: "No", en: "No" },
  "book.confirm.whatsapp": { es: "Enviar confirmación por WhatsApp", en: "Send confirmation via WhatsApp" },
  "book.confirm.call": { es: "Llamar ahora:", en: "Call now:" },
  "book.confirm.footer": { es: "Te contactaremos en 1 min · Revisa tu WhatsApp", en: "We'll contact you in 1 min · Check your WhatsApp" },

  // FAQ
  "faq.kicker": { es: "Preguntas Frecuentes", en: "FAQ" },
  "faq.title": { es: "Resolvemos tus dudas", en: "We answer your questions" },
  "faq.q1": { es: "¿Cuánto cuesta reemplazar un parabrisas?", en: "How much does a windshield replacement cost?" },
  "faq.a1": { es: "El precio varía según el vehículo, normalmente entre $200 y $800. Trabajamos con tu aseguradora y ofrecemos vidrios nuevos y usados para ajustarnos a tu presupuesto. Cotización gratis en 1 minuto.", en: "Price varies by vehicle, typically $200–$800. We work with your insurance and offer new and used glass to fit your budget. Free quote in 1 minute." },
  "faq.q2": { es: "¿Aceptan seguros?", en: "Do you accept insurance?" },
  "faq.a2": { es: "Sí, trabajamos con todas las aseguradoras mayores. Tramitamos el reclamo por ti, sin que tengas que hacer llamadas ni papeleo. Solo danos tu número de póliza y nosotros nos encargamos del resto.", en: "Yes, we work with all major insurance companies. We file the claim for you, no calls or paperwork needed. Just give us your policy number and we handle the rest." },
  "faq.q3": { es: "¿Cuánto tarda la instalación?", en: "How long does installation take?" },
  "faq.a3": { es: "Entre 45 y 90 minutos según el vehículo. Después de la instalación, esperas 1 hora para que el adhesivo cure y puedes manejar. Te avisamos todo paso a paso.", en: "Between 45 and 90 minutes depending on the vehicle. After install, wait 1 hour for adhesive to cure and you can drive. We walk you through every step." },
  "faq.q4": { es: "¿Tienen vidrios usados?", en: "Do you have used glass?" },
  "faq.a4": { es: "Sí, ofrecemos vidrios nuevos y usados. Los usados son originales de fabricante, inspeccionados y garantizados. Excelentes para presupuestos ajustados o vehículos antiguos.", en: "Yes, we offer new and used glass. Used are OEM, inspected and warrantied. Great for tight budgets or older vehicles." },
  "faq.q5": { es: "¿Van a mi casa o trabajo?", en: "Do you come to my home or work?" },
  "faq.a5": { es: "Sí, servicio móvil gratis en la mayoría de San Diego County. Vamos a tu casa, trabajo o donde estés. Sin costo extra en la mayoría de zonas.", en: "Yes, free mobile service in most of San Diego County. We come to your home, work or wherever you are. No extra cost in most areas." },
  "faq.q6": { es: "¿Qué garantía ofrecen?", en: "What warranty do you offer?" },
  "faq.a6": { es: "Garantía de por vida en mano de obra. Si el vidrio presenta fugas, ruidos o problemas de instalación, lo corregimos sin costo. Garantía del fabricante en el vidrio.", en: "Lifetime warranty on labor. If the glass leaks, makes noise or has install issues, we fix it free. Manufacturer warranty on glass." },
  "faq.q7": { es: "¿Puedo manejar inmediatamente después?", en: "Can I drive immediately after?" },
  "faq.a7": { es: "No. Debes esperar 1 hora después de la instalación para que el adhesivo cure correctamente. Te avisamos cuando es seguro manejar.", en: "No. Wait 1 hour after installation for adhesive to cure properly. We tell you when it's safe to drive." },
  "faq.q8": { es: "¿Atienden el mismo día?", en: "Do you do same-day service?" },
  "faq.a8": { es: "Sí, llamando antes de las 2pm agendamos para el mismo día en la mayoría de casos. Tenemos técnicos disponibles en toda el área de San Diego.", en: "Yes, calling before 2pm we schedule same-day in most cases. We have technicians available across the San Diego area." },
  "faq.q9": { es: "¿Qué formas de pago aceptan?", en: "What payment methods do you accept?" },
  "faq.a9": { es: "Efectivo, todas las tarjetas (Visa, Mastercard, Amex, Discover), seguro y financiamiento disponible. Pago flexible para que no tengas excusas para arreglar tu auto.", en: "Cash, all cards (Visa, Mastercard, Amex, Discover), insurance and financing available. Flexible payment so you have no excuses to fix your car." },
  "faq.q10": { es: "¿Son licenciados y asegurados?", en: "Are you licensed and insured?" },
  "faq.a10": { es: "Sí, completamente licenciados en California y asegurados. Técnicos certificados en instalación OEM. Better Business Bureau A+.", en: "Yes, fully licensed in California and insured. Certified OEM install technicians. Better Business Bureau A+." },

  // Service Area / Map
  "area.kicker": { es: "Dónde Estamos", en: "Where We Are" },
  "area.title.a": { es: "Servimos todo ", en: "We serve all of " },
  "area.title.b": { es: "San Diego County", en: "San Diego County" },
  "area.sub": { es: "Visítanos en el taller o te visitamos en casa. Servicio móvil disponible en toda el área.", en: "Visit us at the shop or we visit you at home. Mobile service available across the area." },
  "area.address": { es: "Dirección", en: "Address" },
  "area.hours": { es: "Horario", en: "Hours" },
  "area.contact": { es: "Contacto", en: "Contact" },
  "area.directions": { es: "Cómo Llegar", en: "Get Directions" },
  "area.call": { es: "Llamar", en: "Call" },
  "area.zones": { es: "Zonas que cubrimos", en: "Areas we cover" },

  // CTA Banners
  "cta1.title": { es: "Tu parabrisas no va a esperar.", en: "Your windshield won't wait." },
  "cta1.sub": { es: "Cada minuto cuenta. Cotización gratis en 1 minuto.", en: "Every minute counts. Free quote in 1 minute." },
  "cta2.title": { es: "Mismo día. Cotización gratis.", en: "Same day. Free quote." },
  "cta2.sub": { es: "Si llamas antes de las 2pm, agendamos para hoy.", en: "Call before 2pm, we schedule for today." },
  "cta3.title": { es: "¿Listo para tu cotización gratis?", en: "Ready for your free quote?" },
  "cta3.sub": { es: "Sin compromiso · Respuesta en 1 min · Garantía de por vida", en: "No commitment · Reply in 1 min · Lifetime warranty" },
  "cta.primary": { es: "Agendar Cita Gratis →", en: "Book Free Appointment →" },
  "cta.secondary": { es: "Llamar ahora", en: "Call now" },
  "cta.micro": { es: "⏱️ Mismo día · 📲 Respuesta en 1 min · 🔒 Sin compromiso", en: "⏱️ Same day · 📲 Reply in 1 min · 🔒 No commitment" },

  // Sticky CTA
  "sticky.open": { es: "Abierto ahora", en: "Open now" },
  "sticky.call": { es: "Llama:", en: "Call:" },
  "sticky.book": { es: "Agendar Cita Gratis", en: "Book Free Appointment" },

  // ScrollDrive (carro ligado al scroll)
  "road.home": { es: "Inicio", en: "Top" },
  "road.book": { es: "Agendar", en: "Book" },
  "road.area": { es: "Ubicación", en: "Location" },
  "road.next": { es: "Ir a la siguiente sección", en: "Go to next section" },
  "road.finish": { es: "¡Ruta completa!", en: "Route complete!" },

  // WhatsApp float
  "wa.tip.title": { es: "Escríbenos por WhatsApp", en: "Text us on WhatsApp" },
  "wa.tip.body": { es: "Respuesta inmediata · Cotización gratis", en: "Instant reply · Free quote" },

  // Footer
  "footer.tagline": { es: "Reemplazo y reparación de vidrios automotrices en San Diego. Vidrios nuevos y usados para todas las marcas. Cotización gratis, servicio móvil y garantía de por vida.", en: "Auto glass replacement and repair in San Diego. New and used glass for all brands. Free quote, mobile service and lifetime warranty." },
  "footer.links": { es: "Enlaces", en: "Links" },
  "footer.services": { es: "Servicios", en: "Services" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.f1": { es: "Reemplazo de Parabrisas", en: "Windshield Replacement" },
  "footer.f2": { es: "Reparación de Grietas", en: "Chip Repair" },
  "footer.f3": { es: "Cristales Laterales", en: "Side Windows" },
  "footer.f4": { es: "Vidrio Trasero", en: "Back Glass" },
  "footer.f5": { es: "Vehículos Vandalizados", en: "Vandalized Vehicles" },
  "footer.f6": { es: "Servicio Móvil", en: "Mobile Service" },
  "footer.rights": { es: "© 2026 V&V Auto Glass. Todos los derechos reservados.", en: "© 2026 V&V Auto Glass. All rights reserved." },
  "footer.langSwitch": { es: "Idioma", en: "Language" },

  // Image alt texts
  "alt.hero": { es: "Técnico certificado reemplazando un parabrisas en San Diego", en: "Certified technician replacing a windshield in San Diego" },

  // Before/After pairs
  "ba.p1.v": { es: "Toyota Camry 2019", en: "Toyota Camry 2019" },
  "ba.p1.s": { es: "Reemplazo de parabrisas", en: "Windshield replacement" },
  "ba.p1.t": { es: "Atendido en 1h 20min", en: "Done in 1h 20min" },
  "ba.p1.q": { es: "Llegué con el parabrisas estallado y salí a manejar. Servicio impecable.", en: "Arrived with shattered windshield and drove out. Impeccable service." },
  "ba.p2.v": { es: "Honda Civic 2021", en: "Honda Civic 2021" },
  "ba.p2.s": { es: "Cristal lateral por vandalismo", en: "Side window — vandalism" },
  "ba.p2.t": { es: "Mismo día · 2h total", en: "Same day · 2h total" },
  "ba.p2.q": { es: "Me robaron la ventana en la noche. V&V la cambió en mi trabajo al día siguiente.", en: "Window broken into at night. V&V replaced it at my work the next day." },
  "ba.p3.v": { es: "Ford F-150 2018", en: "Ford F-150 2018" },
  "ba.p3.s": { es: "Reemplazo de vidrio trasero", en: "Back glass replacement" },
  "ba.p3.t": { es: "Servicio móvil · 1h 45min", en: "Mobile service · 1h 45min" },
  "ba.p3.q": { es: "El técnico vino a mi casa. Trabajo limpio, sellado perfecto, sin fugas.", en: "Tech came to my house. Clean work, perfect seal, no leaks." },

  // Testimonials content
  "test.t1.q": { es: "Vandalizaron mi camioneta en Chula Vista y V&V la tuvo lista el mismo día. Excelente servicio y precio justo.", en: "My truck was vandalized in Chula Vista and V&V had it ready the same day. Excellent service and fair price." },
  "test.t1.n": { es: "María G. · Chula Vista", en: "Maria G. · Chula Vista" },
  "test.t2.q": { es: "Una piedra destrozó mi parabrisas en la I-5. Los llamé y vinieron a mi trabajo en La Mesa. 5 estrellas.", en: "A rock shattered my windshield on I-5. Called them and they came to my work in La Mesa. 5 stars." },
  "test.t2.n": { es: "David Chen · La Mesa", en: "David Chen · La Mesa" },
  "test.t3.q": { es: "Cotización gratis en 1 minuto por WhatsApp. El mejor precio de San Diego. Instalación perfecta.", en: "Free quote in 1 min via WhatsApp. Best price in San Diego. Perfect installation." },
  "test.t3.n": { es: "Roberto M. · El Cajon", en: "Roberto M. · El Cajon" },
  "test.t4.q": { es: "Mi aseguradora lo cubrió todo. V&V tramitó el reclamo y yo no hice nada. Recomendadísimo.", en: "My insurance covered everything. V&V filed the claim and I did nothing. Highly recommended." },
  "test.t4.n": { es: "Jessica R. · National City", en: "Jessica R. · National City" },
  "test.t5.q": { es: "Vidrio trasero de mi Jeep reemplazado en casa. El técnico llegó puntual y limpio. Garantía de por vida, qué más pedir.", en: "Back glass on my Jeep replaced at home. Tech was on time and clean. Lifetime warranty, what more could I ask." },
  "test.t5.n": { es: "Miguel A. · Encinitas", en: "Miguel A. · Encinitas" },
  "test.t6.q": { es: "Probé 4 talleres en San Diego y V&V fue el único que respondió en menos de 1 minuto. Servicio rápido y honesto.", en: "Tried 4 shops in San Diego and V&V was the only one that replied in under 1 min. Fast and honest service." },
  "test.t6.n": { es: "Sarah K. · Downtown SD", en: "Sarah K. · Downtown SD" },
};

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Load saved language on mount only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("vv-lang") as Lang | null;
    if (saved === "es" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("vv-lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string) => {
      const entry = DICT[key];
      if (!entry) return key;
      return entry[lang] ?? entry.es ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
