import { useEffect, useRef } from 'react';

const DOT_SPACING = 60;
const HOVER_RADIUS = 150;
const OFFSCREEN_MOUSE = { x: -1000, y: -1000 };

type Palette = {
  baseAlpha: number;
  hoverAlpha: number;
  baseColor: string;
  hoverColor: string;
};

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseCanvas = document.createElement('canvas');
    const baseCtx = baseCanvas.getContext('2d');
    if (!baseCtx) return;

    const mouse = { ...OFFSCREEN_MOUSE };
    let frameId = 0;
    let framePending = false;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const hasFinePointer = window.matchMedia('(pointer: fine)');

    const getPalette = (): Palette => {
      const isDark = document.documentElement.classList.contains('dark');

      return isDark
        ? {
            baseAlpha: 0.06,
            hoverAlpha: 0.24,
            baseColor: '255,255,255',
            hoverColor: '16,185,129',
          }
        : {
            baseAlpha: 0.08,
            hoverAlpha: 0.2,
            baseColor: '15,23,42',
            hoverColor: '13,148,136',
          };
    };

    const syncCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseCanvas.width = Math.floor(width * dpr);
      baseCanvas.height = Math.floor(height * dpr);
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const renderBaseLayer = () => {
      const { baseAlpha, baseColor } = getPalette();

      baseCtx.clearRect(0, 0, width, height);
      baseCtx.fillStyle = `rgba(${baseColor},${baseAlpha})`;

      for (let x = 0; x <= width; x += DOT_SPACING) {
        for (let y = 0; y <= height; y += DOT_SPACING) {
          baseCtx.beginPath();
          baseCtx.arc(x, y, 1, 0, Math.PI * 2);
          baseCtx.fill();
        }
      }
    };

    const draw = () => {
      const { baseAlpha, hoverAlpha, hoverColor } = getPalette();
      const interactiveEnabled =
        hasFinePointer.matches && !prefersReducedMotion.matches;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(baseCanvas, 0, 0, width, height);

      if (!interactiveEnabled) return;

      const startCol = Math.max(
        0,
        Math.floor((mouse.x - HOVER_RADIUS) / DOT_SPACING),
      );
      const endCol = Math.min(
        Math.ceil(width / DOT_SPACING),
        Math.ceil((mouse.x + HOVER_RADIUS) / DOT_SPACING),
      );
      const startRow = Math.max(
        0,
        Math.floor((mouse.y - HOVER_RADIUS) / DOT_SPACING),
      );
      const endRow = Math.min(
        Math.ceil(height / DOT_SPACING),
        Math.ceil((mouse.y + HOVER_RADIUS) / DOT_SPACING),
      );

      for (let col = startCol; col <= endCol; col += 1) {
        for (let row = startRow; row <= endRow; row += 1) {
          const x = col * DOT_SPACING;
          const y = row * DOT_SPACING;
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= HOVER_RADIUS) continue;

          const t = 1 - dist / HOVER_RADIUS;
          const size = 1 + t * 2.5;
          const alpha = baseAlpha + (hoverAlpha - baseAlpha) * t;

          ctx.fillStyle = `rgba(${hoverColor},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const scheduleDraw = () => {
      if (framePending) return;

      framePending = true;
      frameId = window.requestAnimationFrame(() => {
        framePending = false;
        draw();
      });
    };

    const rebuild = () => {
      syncCanvasSize();
      renderBaseLayer();
      scheduleDraw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      scheduleDraw();
    };

    const handlePointerLeave = () => {
      mouse.x = OFFSCREEN_MOUSE.x;
      mouse.y = OFFSCREEN_MOUSE.y;
      scheduleDraw();
    };

    const handlePreferenceChange = () => {
      handlePointerLeave();
      rebuild();
    };

    const themeObserver = new MutationObserver(() => {
      rebuild();
    });

    rebuild();

    window.addEventListener('resize', rebuild);
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('pointerleave', handlePointerLeave);
    prefersReducedMotion.addEventListener('change', handlePreferenceChange);
    hasFinePointer.addEventListener('change', handlePreferenceChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      prefersReducedMotion.removeEventListener(
        'change',
        handlePreferenceChange,
      );
      hasFinePointer.removeEventListener('change', handlePreferenceChange);
      themeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
