import { motion } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Code2, Workflow, Monitor, BellRing, Users, Globe } from 'lucide-react';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';

const highlights = [
  {
    key: 'problem-solving',
    icon: Workflow,
    title: '문제 중심 개발',
    description:
      '기능 구현 전에 문제와 실패 시나리오를 먼저 정리하고, 사용자 흐름 기준으로 우선순위를 결정합니다.',
    gradient: 'from-teal-500 to-blue-500',
  },
  {
    key: 'frontend',
    icon: Code2,
    title: '프론트엔드 구현',
    description:
      'React + TypeScript 기반으로 유지보수 가능한 구조를 만들고, 상태/비동기 흐름을 일관되게 다룹니다.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    key: 'desktop',
    icon: Monitor,
    title: '데스크톱 앱 경험',
    description:
      'Scriba, ID Card Generator처럼 Electron 앱을 개발하며 로컬 환경 제약과 성능 이슈를 직접 해결했습니다.',
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    key: 'alerts',
    icon: BellRing,
    title: '운영 관점 설계',
    description:
      'APIGuard에서 알림 쿨다운과 실패 임계치를 설계해 운영 피로도를 낮추는 기능을 구현했습니다.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    key: 'collaboration',
    icon: Users,
    title: '협업 경험',
    description:
      'Find It 프로젝트에서 프론트엔드 리드 역할을 맡아 구조 설계와 리뷰 기준을 정리했습니다.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    key: 'global',
    icon: Globe,
    title: '확장을 고려한 설계',
    description:
      '새로운 기능을 붙이기 쉽도록 화면과 로직 구조를 나누어 개발했습니다.',
    gradient: 'from-emerald-500 to-teal-500',
  },
] as const;

const domainCount = new Set(
  projects.flatMap((project) =>
    project.category.filter((value) => value !== 'all'),
  ),
).size;

const collaborativeProjectCount = projects.filter(
  (project) => !project.team.startsWith('1명'),
).length;

const stats = [
  { value: `${projects.length}개`, label: '등록 프로젝트', icon: '📁' },
  { value: `${domainCount}개`, label: '주요 분야', icon: '🧭' },
  {
    value: `${collaborativeProjectCount}개`,
    label: '협업 프로젝트',
    icon: '🤝',
  },
  {
    value: `${projects.filter((project) => project.featured).length}개`,
    label: 'Featured 프로젝트',
    icon: '⭐',
  },
] as const;

export function AboutPage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="ABOUT"
          title="개발자 소개"
          description={`${profile.name}의 개발 방식과 주요 작업 흐름을 소개합니다`}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.15 } }}
              className="text-center p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/20 transition-all group cursor-default"
            >
              <span className="text-2xl mb-3 block">{stat.icon}</span>
              <AnimatedCounter
                value={stat.value}
                className="block text-[2.5rem] bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent font-[Pretendard]"
              />
              <p className="text-muted-foreground text-[0.85rem] mt-1 font-[Pretendard]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <TiltCard className="h-full">
                <div className="p-6 bg-card border border-border h-full rounded-2xl hover:border-emerald-500/20 transition-all group">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-foreground mb-3 font-[Pretendard]">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-[0.9rem] leading-[1.8] font-[Pretendard]">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
