import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-9999 mix-blend-screen"
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    >
      <div className="w-100 h-100 rounded-full bg-gradient-radial from-emerald-500/8 via-teal-500/4 to-transparent blur-2xl" />
    </motion.div>
  );
}
