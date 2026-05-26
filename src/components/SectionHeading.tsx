import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  sequence?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  badge,
  title,
  description,
  sequence,
  align = 'center',
}: SectionHeadingProps) {
  const isLeft = align === 'left';
  return (
    <div className={`mb-20 ${isLeft ? 'text-left' : 'text-center'}`}>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-baseline gap-2 text-muted-foreground text-[0.75rem] mb-6 font-mono tracking-[0.2em]"
      >
        {sequence && (
          <span className="text-foreground/40">{sequence}</span>
        )}
        {sequence && <span className="text-foreground/30">/</span>}
        <span>{badge}</span>
      </motion.span>
      <TextReveal
        as="h2"
        className="text-foreground font-[Pretendard] text-[2rem] md:text-[2.5rem] mb-5 leading-tight"
      >
        {title}
      </TextReveal>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-muted-foreground text-[1rem] font-[Pretendard] leading-relaxed ${
            isLeft ? 'max-w-xl' : 'max-w-xl mx-auto'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
