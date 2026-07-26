"use client";

import { useState, useEffect } from "react";
import { Flame, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Props = {
  initialSlots?: number;
  className?: string;
  variant?: "dark" | "light";
};

export default function LiveSlotsCounter({
  initialSlots = 3,
  className = "",
  variant = "dark",
}: Props) {
  const { lang } = useI18n();
  const [slots, setSlots] = useState(initialSlots);
  const [viewers, setViewers] = useState(14);

  // Decrement slots periodically (simulates other people booking)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlots((s) => (s > 1 ? s - 1 : 3));
      setViewers(() => Math.floor(Math.random() * 12) + 8); // 8-19 viewers
    }, 28000);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center gap-2 ${isDark ? "bg-white/10 border-white/20" : "bg-vv-yellow/15 border-vv-yellow/40"} border rounded-full px-3 py-1.5 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Flame className={`h-3.5 w-3.5 ${isDark ? "text-vv-yellow" : "text-vv-yellow-deep"} shrink-0`} />
      <span className={`text-xs font-bold ${isDark ? "text-white" : "text-vv-black"}`}>
        {slots} {lang === "en" ? "slots left today" : "cupos hoy"}
      </span>
      <span className={`${isDark ? "text-white/30" : "text-vv-black/30"}`}>·</span>
      <Users className={`h-3 w-3 ${isDark ? "text-white/60" : "text-vv-black/60"} shrink-0`} />
      <span className={`text-[11px] ${isDark ? "text-white/60" : "text-vv-black/70"}`}>
        {viewers} {lang === "en" ? "viewing now" : "viendo ahora"}
      </span>
    </div>
  );
}
