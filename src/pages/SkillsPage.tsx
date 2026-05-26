import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { Code2, Server, Database, Cloud, Wrench } from 'lucide-react';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
type SkillTier = 'CORE' | 'WORKING' | 'FAMILIAR';

interface Skill {
  name: string;
  tier: SkillTier;
  evidence: string;
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
    {
      name: 'React',
      tier: 'CORE',
      evidence: 'APIGuard · Find It · Brevoca · Portfolio v3',
    },
    { name: 'TypeScript', tier: 'CORE', evidence: '모든 프로젝트 · strict mode' },
    {
      name: 'Next.js',
      tier: 'CORE',
      evidence: 'APIGuard · K-TYPE · Brevoca · App Router',
    },
    {
      name: 'Tailwind CSS',
      tier: 'CORE',
      evidence: '모든 프로젝트 · v4 기반 디자인 시스템',
    },
    { name: 'React Query', tier: 'WORKING', evidence: 'Find It · 검색 캐싱' },
    { name: 'Zustand', tier: 'WORKING', evidence: 'Find It · K-TYPE' },
    { name: 'React Router', tier: 'WORKING', evidence: 'Portfolio v3' },
  ],
  backend: [
    { name: 'REST API', tier: 'CORE', evidence: 'APIGuard · Find It · Brevoca' },
    {
      name: 'Spring Boot',
      tier: 'WORKING',
      evidence: 'APIGuard · Find It backend',
    },
    { name: 'Java', tier: 'WORKING', evidence: 'Find It backend · Java 21' },
    {
      name: 'Node.js',
      tier: 'WORKING',
      evidence: 'Brevoca · Next.js Route Handlers',
    },
    { name: 'JWT · RBAC', tier: 'WORKING', evidence: 'APIGuard · 권한 분기' },
    {
      name: 'OpenAI API',
      tier: 'WORKING',
      evidence: 'Brevoca · STT + GPT 파이프라인',
    },
  ],
  database: [
    {
      name: 'PostgreSQL',
      tier: 'WORKING',
      evidence: 'APIGuard · Find It · ON CONFLICT 배치 upsert',
    },
    {
      name: 'Supabase',
      tier: 'WORKING',
      evidence: 'Brevoca · Auth · DB · Storage',
    },
    { name: 'Redis', tier: 'FAMILIAR', evidence: 'APIGuard · 알림 쿨다운' },
    { name: 'Flyway', tier: 'FAMILIAR', evidence: 'Find It · 스키마 마이그레이션' },
  ],
  devops: [
    {
      name: 'Docker',
      tier: 'WORKING',
      evidence: 'APIGuard · Find It · Compose',
    },
    {
      name: 'GitHub Actions',
      tier: 'WORKING',
      evidence: 'APIGuard · Find It · PR 검증 + 자동 배포',
    },
    { name: 'Vercel', tier: 'WORKING', evidence: 'Find It · Portfolio v3' },
    {
      name: 'Prometheus',
      tier: 'FAMILIAR',
      evidence: 'Find It backend · 커스텀 메트릭',
    },
  ],
  tools: [
    { name: 'Git', tier: 'CORE', evidence: '브랜치 전략 · PR 리뷰' },
    { name: 'VS Code', tier: 'CORE', evidence: '일상 사용 · 디버거 + 확장' },
    { name: 'Postman', tier: 'WORKING', evidence: 'API 설계 · 테스트' },
    {
      name: 'Figma',
      tier: 'FAMILIAR',
      evidence: 'UI/UX 교육 · 자체 디자인 시안',
    },
  ],
};

const tierLabel: Record<SkillTier, string> = {
  CORE: '주력',
  WORKING: '실전 도입',
  FAMILIAR: '필요시 사용',
};

export function SkillsPage() {
  const [active, setActive] = useState<SkillCategory>('frontend');

  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          sequence="02"
          badge="SKILLS"
          title="기술 스택"
          description="자기평가 % 대신, 실제 프로젝트에서 어디까지 썼는지로 정리했습니다"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2.5 rounded-xl text-[0.875rem] transition-all font-[Pretendard] flex items-center gap-2 ${
                  active === cat.key
                    ? 'text-brand-foreground shadow-lg shadow-brand/20'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                }`}
              >
                {active === cat.key && (
                  <motion.div
                    layoutId="skill-tab-bg"
                    className="absolute inset-0 bg-brand rounded-xl"
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

        <div className="max-w-3xl mx-auto mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.75rem] font-mono text-muted-foreground">
          {(['CORE', 'WORKING', 'FAMILIAR'] as const).map((tier) => (
            <div key={tier} className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded ${
                  tier === 'CORE'
                    ? 'bg-brand text-brand-foreground'
                    : tier === 'WORKING'
                      ? 'border border-foreground/40 text-foreground'
                      : 'border border-border text-muted-foreground'
                }`}
              >
                {tier}
              </span>
              <span>{tierLabel[tier]}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto divide-y divide-border border-y border-border"
          >
            {skills[active].map((skill) => (
              <div
                key={skill.name}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[10rem_6rem_1fr] items-baseline gap-x-4 gap-y-1 py-4"
              >
                <span className="text-foreground text-[0.95rem] font-[Pretendard]">
                  {skill.name}
                </span>
                <span
                  className={`justify-self-end sm:justify-self-start px-2 py-0.5 rounded text-[0.7rem] font-mono tracking-wider ${
                    skill.tier === 'CORE'
                      ? 'bg-brand text-brand-foreground'
                      : skill.tier === 'WORKING'
                        ? 'border border-foreground/40 text-foreground'
                        : 'border border-border text-muted-foreground'
                  }`}
                >
                  {skill.tier}
                </span>
                <span className="col-span-2 sm:col-span-1 text-muted-foreground text-[0.85rem] font-[Pretendard] leading-relaxed">
                  {skill.evidence}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="max-w-3xl mx-auto mt-8 text-[0.7rem] font-mono tracking-wider text-muted-foreground/70">
          LEARNING · Rust · React Server Components · Kubernetes
        </p>
      </div>
    </section>
  );
}
