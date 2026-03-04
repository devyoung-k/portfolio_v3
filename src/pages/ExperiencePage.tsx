import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import { Briefcase, Flag, Rocket } from "lucide-react";

interface TimelineItem {
  type: "project" | "milestone";
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags?: string[];
}

const timeline: TimelineItem[] = [
  {
    type: "project",
    title: "APIGuard",
    subtitle: "Full-Stack Developer",
    period: "2025.01 - 현재",
    description:
      "API 헬스체크 SaaS를 설계하고 구현했습니다. 권한 모델, 결제 플랜, 알림 정책까지 운영 관점의 기능을 포함했습니다.",
    tags: ["Next.js", "Spring Boot", "PostgreSQL", "Redis"],
  },
  {
    type: "project",
    title: "Scriba",
    subtitle: "Solo Developer",
    period: "2025.01 - 2025.02",
    description:
      "실시간 음성 인식과 로컬 LLM을 연결한 데스크톱 회의록 앱을 만들었습니다. 오프라인 처리와 IPC 구조를 중점적으로 다뤘습니다.",
    tags: ["Electron", "whisper.cpp", "Ollama", "Vite"],
  },
  {
    type: "project",
    title: "찾아줘! (Find It)",
    subtitle: "Frontend Lead",
    period: "2024.10 - 2024.12",
    description:
      "공공 분실물 데이터를 통합 검색하는 서비스에서 프론트엔드 리드를 맡았습니다. 데이터 표준화와 캐싱 전략을 설계했습니다.",
    tags: ["React", "TypeScript", "React Query", "Supabase"],
  },
  {
    type: "project",
    title: "K-TYPE / ID Card Generator",
    subtitle: "Solo Developer",
    period: "2024.11 - 2025.01",
    description:
      "타이핑 분석 웹앱과 대량 ID 카드 생성 데스크톱 앱을 연달아 개발하며 입력 처리, 렌더링 성능, 배치 처리 경험을 쌓았습니다.",
    tags: ["React", "Electron", "TypeScript", "Supabase"],
  },
  {
    type: "milestone",
    title: "프로젝트 중심 성장",
    subtitle: "지속적인 개선",
    period: "진행 중",
    description:
      "프로토타입 완성보다 운영 단계에서의 안정성, 알림 품질, 사용자 피드백 반영 속도를 중요하게 두고 개선을 이어가고 있습니다.",
  },
];

const iconMap = {
  project: Briefcase,
  milestone: Flag,
};

const colorMap = {
  project: "from-emerald-500 to-blue-500",
  milestone: "from-amber-500 to-orange-500",
};

const labelMap = {
  project: "프로젝트",
  milestone: "마일스톤",
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
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
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
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
          isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
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

          <h3 className="text-foreground font-[Pretendard] mb-1">{item.title}</h3>
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
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="TIMELINE"
          title="프로젝트 타임라인"
          description="최근 작업과 기술 성장 흐름을 시간순으로 정리했습니다"
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
            경력/학력을 과장해 보이게 만드는 대신, 실제 구현한 프로젝트와 해결한 문제 중심으로 이력을 정리했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
