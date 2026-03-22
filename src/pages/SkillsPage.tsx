import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { Code2, Server, Database, Cloud, Wrench } from 'lucide-react';
import { projects } from '@/data/projects';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const categories: { key: SkillCategory; label: string; icon: typeof Code2 }[] =
  [
    { key: 'frontend', label: 'Frontend', icon: Code2 },
    { key: 'backend', label: 'Backend', icon: Server },
    { key: 'database', label: 'Database', icon: Database },
    { key: 'devops', label: 'DevOps', icon: Cloud },
    { key: 'tools', label: 'Tools', icon: Wrench },
  ];

const skills: Record<SkillCategory, Skill[]> = {
  frontend: [
    { name: 'React', level: 92, color: 'from-teal-400 to-teal-600' },
    { name: 'Next.js', level: 88, color: 'from-neutral-400 to-neutral-600' },
    { name: 'TypeScript', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'Tailwind CSS', level: 90, color: 'from-teal-400 to-teal-500' },
    { name: 'React Router', level: 87, color: 'from-red-400 to-rose-500' },
  ],
  backend: [
    { name: 'Spring Boot', level: 84, color: 'from-green-400 to-green-600' },
    { name: 'Node.js', level: 82, color: 'from-emerald-400 to-green-600' },
    { name: 'REST API', level: 90, color: 'from-indigo-400 to-blue-500' },
    { name: 'JWT / RBAC', level: 85, color: 'from-violet-400 to-indigo-500' },
  ],
  database: [
    { name: 'PostgreSQL', level: 88, color: 'from-blue-500 to-blue-700' },
    { name: 'Redis', level: 80, color: 'from-red-400 to-red-600' },
    { name: 'Supabase', level: 84, color: 'from-emerald-400 to-teal-600' },
    { name: 'React Query', level: 86, color: 'from-fuchsia-400 to-pink-600' },
  ],
  devops: [
    { name: 'Docker', level: 82, color: 'from-blue-400 to-teal-500' },
    { name: 'Vercel', level: 86, color: 'from-neutral-400 to-neutral-600' },
    { name: 'CI/CD', level: 78, color: 'from-green-400 to-emerald-500' },
    { name: 'Monitoring', level: 76, color: 'from-amber-400 to-orange-500' },
  ],
  tools: [
    { name: 'Git', level: 92, color: 'from-orange-400 to-red-500' },
    { name: 'VS Code', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'Postman', level: 86, color: 'from-orange-400 to-orange-600' },
    { name: 'Figma', level: 78, color: 'from-rose-400 to-red-500' },
  ],
};

export function SkillsPage() {
  const [active, setActive] = useState<SkillCategory>('frontend');

  const techCloud = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap((project) => project.tags)),
    ).slice(0, 24);
  }, []);

  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="SKILLS"
          title="기술 스택"
          description="주요 프로젝트에서 직접 사용한 기술만 추려서 정리했습니다"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2.5 rounded-xl text-[0.875rem] transition-all font-[Pretendard] flex items-center gap-2 ${
                  active === cat.key
                    ? 'text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                }`}
              >
                {active === cat.key && (
                  <motion.div
                    layoutId="skill-tab-bg"
                    className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {skills[active].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ x: 4 }}
                className="group p-4 rounded-xl bg-card/50 border border-transparent hover:border-border hover:bg-card transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-foreground text-[0.9rem] font-[Pretendard]">
                    {skill.name}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.07 }}
                    className="text-muted-foreground text-[0.8rem] font-mono tabular-nums"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 rounded-full bg-accent/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1,
                      delay: index * 0.07,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className={`h-full rounded-full bg-linear-to-r ${skill.color} relative`}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <p className="text-muted-foreground text-[0.85rem] mb-8 font-[Pretendard]">
            프로젝트에서 사용한 기술 태그
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {techCloud.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{
                  scale: 1.08,
                  y: -2,
                  borderColor: 'rgba(16,185,129,0.4)',
                }}
                className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground text-[0.8rem] hover:text-foreground transition-colors cursor-default font-mono"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
