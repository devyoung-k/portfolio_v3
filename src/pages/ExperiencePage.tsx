import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';

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
    period: '2025.08 — 현재',
    description: 'MES 설계 및 운영.',
    tags: ['MES'],
  },
  {
    type: 'work',
    title: '(주) 그림',
    subtitle: '머신비전 SW 인턴',
    period: '2024.10 — 2025.01',
    description:
      '이차전지 전극 불량 검사 시스템의 검출 로직 개선, 통신, DB 연동 및 UI 개선을 담당했습니다.',
    tags: ['C++', 'MFC', 'UDP', 'PostgreSQL'],
  },
  {
    type: 'education',
    title: '멋쟁이사자처럼 프론트엔드스쿨 8기',
    subtitle: 'Likelion',
    period: '2023.10 — 2024.03',
    description: 'React·TypeScript·Next.js 심화 학습 및 팀 프로젝트 리딩 경험.',
    tags: ['React', 'TypeScript', 'Next.js', 'JavaScript'],
  },
  {
    type: 'education',
    title: 'UI/UX 디자인 및 웹 퍼블리싱 교육',
    subtitle: '대구대학교 산학협력단',
    period: '2022.12 — 2023.05',
    description: 'Figma·Photoshop 기반 UI 설계와 반응형 웹 퍼블리싱 실습.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    type: 'work',
    title: '대구대학교 AI센터 조교',
    subtitle: '대구대학교',
    period: '2021.12 — 2022.12',
    description: '강의·회의 운영 보조 및 연구비·행사 행정 지원.',
  },
  {
    type: 'milestone',
    title: 'YOLOv3 지폐 인식 저금통',
    subtitle: '대구대학교 졸업 작품',
    period: '2021',
    description:
      '지폐 이미지를 직접 라벨링하고 YOLOv3로 학습해 인식 저금통을 제작.',
    tags: ['Python', 'YOLOv3', 'Image Labeling'],
  },
];

const labelMap: Record<TimelineItem['type'], string> = {
  work: 'EMPLOYMENT',
  education: 'EDUCATION',
  milestone: 'MILESTONE',
};

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
          sequence="04"
          badge="TIMELINE"
          title="경험 타임라인"
          description="경력과 교육 이력을 시간순으로 정리했습니다"
          align="left"
        />

        <div ref={containerRef} className="relative pl-8 md:pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="absolute left-0 top-0 w-px bg-foreground/60 origin-top"
            style={{ height: lineHeight }}
          />

          <ol className="space-y-14">
            {timeline.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                className="relative"
              >
                <span className="absolute -left-[37px] md:-left-[45px] top-2 w-2.5 h-2.5 rounded-full bg-foreground/50 ring-4 ring-background" />

                <div className="flex flex-wrap items-baseline gap-x-3 mb-2 font-mono text-[0.7rem] tracking-wider">
                  <span className="text-foreground/80">{item.period}</span>
                  <span className="text-foreground/30">·</span>
                  <span className="text-muted-foreground">
                    {labelMap[item.type]}
                  </span>
                </div>

                <h3 className="text-foreground font-[Pretendard] text-[1.1rem] mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-[0.85rem] font-[Pretendard] mb-3">
                  {item.subtitle}
                </p>
                <p className="text-foreground/80 text-[0.9rem] leading-[1.8] font-[Pretendard]">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.title}-${tag}`}
                        className="px-2.5 py-1 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.7rem] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
