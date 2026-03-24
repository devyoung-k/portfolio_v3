import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotate({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 });
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={className}
    >
      <div className="relative overflow-hidden rounded-2xl h-full">
        {children}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
