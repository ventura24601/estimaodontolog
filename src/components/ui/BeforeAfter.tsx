import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

type Props = { before: React.ReactNode; after: React.ReactNode; label: string };

/** Slider de comparação arrastável (mouse, toque e teclado), com entrada animada. */
export function BeforeAfter({ before, after, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(100);
  const dragging = useRef(false);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setPos(50);
    const c = animate(100, 50, { duration: 1.6, ease: EASE, onUpdate: setPos });
    return () => c.stop();
  }, [inView, reduced]);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="Arraste"
      className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-media has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-4"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{before}</div>

      <span className="absolute left-4 top-4 rounded-full bg-base/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink backdrop-blur">Diagnóstico</span>
      <span className="absolute right-4 top-4 rounded-full bg-base/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink backdrop-blur">Conclusão</span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l border-base/90" />
        <div className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-base/80 bg-base/30 text-base backdrop-blur-md">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 1 1 6l5 5M16 1l5 5-5 5" /></svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar diagnóstico e conclusão: ${label}`}
        className="absolute inset-0 h-full w-full cursor-none opacity-0 focus-visible:opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
