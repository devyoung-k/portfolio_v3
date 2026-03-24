import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-20">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.4 }}
        className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[0.8rem] mb-5 font-mono tracking-wider"
      >
        {badge}
      </motion.span>
      <TextReveal
        as="h2"
        className="text-foreground font-[Pretendard] text-[2rem] md:text-[2.5rem] mb-5 leading-snug"
      >
        {title}
      </TextReveal>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground max-w-xl mx-auto text-[1rem] font-[Pretendard] leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
