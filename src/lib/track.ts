/**
 * V&V — capa de eventos lista para GA4 / GTM.
 *
 * Static-export friendly: solo hace push a `window.dataLayer`
 * (el estándar de GTM/GA4). Cuando el negocio conecte GTM o gtag.js,
 * estos eventos empiezan a fluir sin cambiar una línea de código.
 *
 * Eventos (convención GA4: snake_case + parámetros planos):
 *  - vv_cta_book        → click en "Agendar" (hero, sticky, banner, etc.)
 *  - vv_call_click      → click en cualquier enlace tel:
 *  - vv_whatsapp_click  → apertura de WhatsApp (float, footer, area, experto)
 *  - vv_quote_whatsapp  → envío del estimado del cotizador por WhatsApp
 *  - vv_milestone_click → click en un hito de la carretera ScrollDrive
 *  - vv_road_advance    → click en el carro (siguiente sección)
 */

type VVParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: VVParams = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };

  // dataLayer — GTM/GA4 lo consumen automáticamente.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Si algún día se integra gtag.js directo, también lo alimentamos.
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  if (process.env.NODE_ENV !== "production") {
    // Trazabilidad en dev sin ensuciar producción.
    console.debug("[VV track]", payload);
  }
}

/** Helpers semánticos reutilizables (mantienen nombres consistentes). */
export const trackBook = (source: string) =>
  track("vv_cta_book", { source });

export const trackCall = (source: string) =>
  track("vv_call_click", { source });

export const trackWhatsApp = (source: string, detail?: string) =>
  track("vv_whatsapp_click", { source, detail });

export const trackMilestone = (sectionId: string, sectionName: string) =>
  track("vv_milestone_click", { section_id: sectionId, section_name: sectionName });

export const trackRoadAdvance = (fromPercent: number) =>
  track("vv_road_advance", { from_percent: fromPercent });
