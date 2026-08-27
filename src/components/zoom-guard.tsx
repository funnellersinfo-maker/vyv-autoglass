"use client";

import { useEffect } from "react";

/**
 * Bloquea el zoom con gestos en móviles:
 * - iOS Safari ignora user-scalable=no → bloquea gesturestart/change/end nativos
 * - Bloquea touchmove con 2+ dedos (pellizco) como respaldo universal
 * El scroll normal con un dedo NO se ve afectado.
 */
export function ZoomGuard() {
  useEffect(() => {
    const blockGesture = (e: Event) => e.preventDefault();
    const blockMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener("gesturestart", blockGesture, { passive: false });
    document.addEventListener("gesturechange", blockGesture, { passive: false });
    document.addEventListener("gestureend", blockGesture, { passive: false });
    document.addEventListener("touchmove", blockMultiTouch, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", blockGesture);
      document.removeEventListener("gesturechange", blockGesture);
      document.removeEventListener("gestureend", blockGesture);
      document.removeEventListener("touchmove", blockMultiTouch);
    };
  }, []);

  return null;
}
