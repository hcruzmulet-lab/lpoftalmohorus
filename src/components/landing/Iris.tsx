"use client";

import { useEffect, useRef } from "react";

const FIBERS = Array.from({ length: 72 }, (_, i) => (i * 360) / 72);
const MAX_SHIFT = 10;

/** Iris de la marca: disco violeta, fibras radiales y anillos dorados. El iris sigue al cursor. */
export function Iris({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const eyeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      eyeRef.current?.setAttribute(
        "transform",
        `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`
      );
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const box = svgRef.current?.getBoundingClientRect();
      if (!box) return;
      const dx = e.clientX - (box.left + box.width / 2);
      const dy = e.clientY - (box.top + box.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist / 600, 1) * MAX_SHIFT;
      target = { x: (dx / dist) * pull, y: (dy / dist) * pull };
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="-12 -12 224 224" className={className} aria-hidden="true">
      <g ref={eyeRef}>
        <circle cx="100" cy="100" r="100" fill="#7c3aed" />
        <g className="iris-fibers">
          {FIBERS.map((deg, i) => (
            <line
              key={deg}
              x1="100"
              y1={i % 2 ? 58 : 50}
              x2="100"
              y2={i % 3 ? 12 : 20}
              stroke="#fff"
              strokeOpacity={i % 2 ? 0.08 : 0.14}
              strokeWidth="0.8"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </g>
        <circle cx="100" cy="100" r="44" fill="#6425d6" />
        <circle cx="100" cy="100" r="44" fill="none" stroke="#d4a853" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="100" cy="100" r="94" fill="none" stroke="#d4a853" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
