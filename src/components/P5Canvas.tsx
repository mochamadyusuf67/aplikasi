import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

export type P5SketchFn = (p: p5, container: HTMLElement, extraProps?: Record<string, unknown>) => void;

interface P5CanvasProps {
  sketch: P5SketchFn;
  ariaLabel: string;
  className?: string;
  aspectRatio?: string; // e.g., '16/9', '4/3', '1/1'
  extraProps?: Record<string, unknown>;
  fallbackTitle?: string;
}

export const P5Canvas: React.FC<P5CanvasProps> = ({
  sketch,
  ariaLabel,
  className = '',
  aspectRatio = '16/9',
  extraProps,
  fallbackTitle = 'Ilustrasi Belajar',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isSubscribed = true;

    try {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      const instance = new p5((p) => {
        sketch(p, container, extraProps);
      }, container);

      p5InstanceRef.current = instance;
    } catch (err) {
      console.warn('p5 init error:', err);
      if (isSubscribed) setHasError(true);
    }

    return () => {
      isSubscribed = false;
      if (p5InstanceRef.current) {
        try {
          p5InstanceRef.current.remove();
        } catch {
          // Ignore removal errors
        }
        p5InstanceRef.current = null;
      }
    };
  }, [sketch, extraProps]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={ariaLabel}
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-amber-100 rounded-2xl border-4 border-amber-300 text-center ${className}`}
        style={{ aspectRatio }}
      >
        <div className="w-16 h-16 rounded-full bg-sky-400 flex items-center justify-center text-white text-2xl font-bold shadow-md mb-2">
          %
        </div>
        <div className="text-slate-800 font-bold text-lg font-fun">{fallbackTitle}</div>
        <div className="text-slate-600 text-sm mt-1">Ayo teruskan petualangan belajarmu!</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={`relative w-full h-full canvas-touch-none flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
