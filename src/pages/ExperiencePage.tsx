import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { Flag, Rocket, GraduationCap, Building2 } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education' | 'milestone';
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags?: string[];
}

const timeline: TimelineItem[] = [
  {
    type: 'work',
    title: '(주) 경림테크',
    subtitle: '시스템운영팀',
    period: '2025.08 - 현재',
    description: 'MES 설계 및 운영.',
    tags: ['MES'],
  },
  {
    type: 'work',
    title: '(주) 그림',
    subtitle: '머신비전 SW 인턴',
    period: '2024.10 - 2025.01.24',
    description:
      '이차전지 전극 불량 검사 시스템의 검출 로직 개선, 통신, DB 연동 및 UI 개선을 담당했습니다.',
    tags: ['C++', 'MFC', 'UDP', 'PostgreSQL'],
  },
  {
    type: 'education',
    title: '멋쟁이사자처럼 프론트엔드스쿨 8기',
    subtitle: '멋쟁이사자처럼(Likelion)',
    period: '2023.10 - 2024.03',
    description: 'React·TypeScript·Next.js 심화 학습 및 팀 프로젝트 리딩 경험.',
    tags: ['React', 'TypeScript', 'Next.js', 'JavaScript'],
  },
  {
    type: 'education',
    title: 'UI/UX 디자인 및 웹 퍼블리싱 교육',
    subtitle: '대구대학교 산학협력단',
    period: '2022.12 - 2023.05',
    description: 'Figma·Photoshop 기반 UI 설계와 반응형 웹 퍼블리싱 실습.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    type: 'work',
    title: '대구대학교 AI센터 조교',
    subtitle: '대구대학교',
    period: '2021.12 - 2022.12',
    description: '강의·회의 운영 보조 및 연구비·행사 행정 지원.',
  },
  {
    type: 'milestone',
    title: '개발 여정의 시작 — 졸업 작품',
    subtitle: '대구대학교',
    period: '2021',
    description:
      '지폐 이미지를 직접 라벨링하고 YOLOv3로 학습해 지폐 인식 저금통을 제작.',
    tags: ['Python', 'YOLOv3', 'Image Labeling'],
  },
];

const iconMap = {
  work: Building2,
  education: GraduationCap,
  milestone: Flag,
};

const colorMap = {
  work: 'from-violet-500 to-purple-500',
  education: 'from-sky-500 to-cyan-500',
  milestone: 'from-amber-500 to-orange-500',
};

const labelMap = {
  work: '경력',
  education: '교육',
  milestone: '마일스톤',
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  const Icon = iconMap[item.type];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`relative flex items-start mb-8 md:mb-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full bg-card border-2 border-border flex items-center justify-center z-10"
      >
        <div
          className={`w-8 h-8 rounded-full bg-linear-to-br ${colorMap[item.type]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      <div
        className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
          isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
        }`}
      >
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/20 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md bg-linear-to-r ${colorMap[item.type]} text-white text-[0.65rem] font-[Pretendard]`}
            >
              {labelMap[item.type]}
            </span>
            <span className="text-[0.75rem] text-muted-foreground font-mono">
              {item.period}
            </span>
          </div>

          <h3 className="text-foreground font-[Pretendard] mb-1">
            {item.title}
          </h3>
          <p className="text-emerald-500/80 text-[0.85rem] mb-3 font-[Pretendard]">
            {item.subtitle}
          </p>
          <p className="text-muted-foreground text-[0.875rem] leading-[1.8] font-[Pretendard]">
            {item.description}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span
                  key={`${item.title}-${tag}`}
                  className="px-2.5 py-1 rounded-md bg-accent/60 text-muted-foreground text-[0.7rem] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="TIMELINE"
          title="경험 타임라인"
          description="경력과 교육 이력을 시간순으로 정리했습니다"
        />

        <div ref={containerRef} className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/40 md:-translate-x-px" />
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px bg-linear-to-b from-emerald-500 to-teal-500 md:-translate-x-px origin-top"
            style={{ height: lineHeight }}
          />

          {timeline.map((item, index) => (
            <TimelineCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-card border border-border flex items-center gap-3">
          <Rocket className="w-4 h-4 text-emerald-500 shrink-0" />
          <p className="text-muted-foreground text-[0.85rem] font-[Pretendard] leading-relaxed">
            실제 경험한 업무와 프로젝트, 해결한 문제 중심으로 이력을
            정리했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
