import { motion } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { Code2, Workflow, Monitor, BellRing, Users, Globe } from 'lucide-react';
import { profile } from '@/data/profile';

const highlights = [
  {
    key: 'problem-solving',
    icon: Workflow,
    title: '문제 중심 개발',
    description:
      '기능 구현 전에 문제와 실패 시나리오를 먼저 정리하고, 사용자 흐름 기준으로 우선순위를 결정합니다.',
  },
  {
    key: 'frontend',
    icon: Code2,
    title: '프론트엔드 구현',
    description:
      'React + TypeScript 기반으로 유지보수 가능한 구조를 만들고, 상태/비동기 흐름을 일관되게 다룹니다.',
  },
  {
    key: 'ai',
    icon: Monitor,
    title: 'AI 서비스 구축',
    description:
      'Brevoca에서 OpenAI STT/GPT 파이프라인을 설계하고, 프롬프트 엔지니어링으로 회의록 품질을 개선했습니다.',
  },
  {
    key: 'alerts',
    icon: BellRing,
    title: '운영 관점 설계',
    description:
      'APIGuard에서 알림 쿨다운과 실패 임계치를 설계해 운영 피로도를 낮추는 기능을 구현했습니다.',
  },
  {
    key: 'collaboration',
    icon: Users,
    title: '협업 경험',
    description:
      'Find It 프로젝트에서 프론트엔드 리드 역할을 맡아 구조 설계와 리뷰 기준을 정리했습니다.',
  },
  {
    key: 'global',
    icon: Globe,
    title: '확장을 고려한 설계',
    description:
      '새로운 기능을 붙이기 쉽도록 화면과 로직 구조를 나누어 개발했습니다.',
  },
] as const;

export function AboutPage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          sequence="01"
          badge="ABOUT"
          title="개발자 소개"
          description={`${profile.name}의 개발 방식과 주요 작업 흐름을 소개합니다`}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {highlights.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group"
            >
              <item.icon className="w-5 h-5 text-foreground/70 mb-5 group-hover:text-foreground transition-colors" />
              <h3 className="text-foreground mb-3 font-[Pretendard]">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-[0.9rem] leading-[1.8] font-[Pretendard]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
