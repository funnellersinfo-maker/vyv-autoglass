"use client";

export default function DopamineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated yellow radial glows */}
      <div
        className="vv-mesh-bg absolute inset-0 opacity-90"
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="vv-grid-overlay absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      {/* Floating glass particles */}
      {[
        { top: "18%", left: "8%", size: 120, delay: "0s", dur: "7s" },
        { top: "65%", left: "82%", size: 180, delay: "1.2s", dur: "9s" },
        { top: "40%", left: "60%", size: 90, delay: "0.6s", dur: "6.5s" },
        { top: "78%", left: "20%", size: 140, delay: "2.1s", dur: "8s" },
      ].map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full float-slow"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(255,214,10,0.10) 0%, transparent 70%)",
            filter: "blur(8px)",
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
      {/* Bottom fade to white section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
