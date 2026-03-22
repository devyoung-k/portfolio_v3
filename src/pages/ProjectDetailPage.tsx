import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Briefcase,
  Star,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GitHubIcon } from '@/components/icons';
import { projects } from '@/data/projects';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { MagneticButton } from '@/components/MagneticButton';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

function DetailGroupSection({
  title,
  groups,
}: {
  title: string;
  groups: { title: string; items: string[] }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-foreground font-[Pretendard] text-[1.35rem] mb-6 flex items-center gap-2.5">
        <div className="w-1 h-6 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
        {title}
      </h2>
      <div className="grid gap-5">
        {groups.map((group, index) => (
          <motion.div
            key={`${group.title}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl bg-card border border-border p-6"
          >
            <h3 className="text-foreground font-[Pretendard] mb-4">
              {group.title}
            </h3>
            <div className="grid gap-3">
              {group.items.map((item, itemIndex) => (
                <div
                  key={`${group.title}-${itemIndex}`}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-[0.875rem] leading-[1.8] font-[Pretendard]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-[4rem] mb-4">404</p>
          <p className="text-muted-foreground text-[1.1rem] mb-8 font-[Pretendard]">
            프로젝트를 찾을 수 없습니다.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-[0.9rem] font-[Pretendard]"
          >
            <ArrowLeft className="w-4 h-4" />
            프로젝트 목록으로
          </Link>
        </motion.div>
      </section>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <section className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/20 to-teal-900/20" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6 z-20"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-white text-[0.85rem] hover:bg-black/50 transition-colors font-[Pretendard]"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </button>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-[0.75rem] font-[Pretendard]">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-[0.75rem] font-[Pretendard]">
                {project.role}
              </span>
            </motion.div>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.4 }}
              className="text-white font-[Pretendard] text-[2rem] md:text-[3rem] leading-[1.15] mb-2"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        {/* Meta info */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: Calendar, label: '기간', value: project.duration },
            { icon: Users, label: '팀 구성', value: project.team },
            { icon: Briefcase, label: '역할', value: project.role },
          ].map((meta) => (
            <div
              key={meta.label}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <meta.icon className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-[0.75rem] font-[Pretendard]">
                  {meta.label}
                </p>
                <p className="text-foreground text-[0.85rem] font-[Pretendard]">
                  {meta.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Links */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.55 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <MagneticButton>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-[0.875rem] hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow font-[Pretendard]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </MagneticButton>
            )}
            {project.repositoryLinks ? (
              project.repositoryLinks.map((repo) => (
                <MagneticButton key={repo.href}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-[0.875rem] hover:bg-accent/50 transition-all font-[Pretendard]"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    {repo.label}
                  </a>
                </MagneticButton>
              ))
            ) : (
              <MagneticButton>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-[0.875rem] hover:bg-accent/50 transition-all font-[Pretendard]"
                >
                  <GitHubIcon className="w-4 h-4" />
                  Source Code
                </a>
              </MagneticButton>
            )}
          </div>
          {project.backendNote && (
            <p className="mt-4 text-muted-foreground text-[0.85rem] leading-[1.8] font-[Pretendard]">
              {project.backendNote}
            </p>
          )}
        </motion.div>

        {/* Tech stack */}
        <motion.div {...fadeUp} transition={{ delay: 0.6 }} className="mb-12">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.05 }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.8rem] font-mono"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div {...fadeUp} transition={{ delay: 0.65 }} className="mb-16">
          <h2 className="text-foreground font-[Pretendard] text-[1.35rem] mb-5 flex items-center gap-2.5">
            <div className="w-1 h-6 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
            프로젝트 개요
          </h2>
          <p className="text-muted-foreground text-[0.95rem] leading-loose font-[Pretendard]">
            {project.detail?.overview ?? project.longDescription}
          </p>
        </motion.div>

        {project.detail?.responsibilities && (
          <DetailGroupSection
            title="내 역할"
            groups={project.detail.responsibilities}
          />
        )}

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <motion.div
            {...fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-foreground font-[Pretendard] text-[1.35rem] mb-5 flex items-center gap-2.5">
              <div className="w-1 h-6 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
              스크린샷
            </h2>
            <div className="grid gap-4">
              {project.screenshots.map((src, i) => (
                <motion.div
                  key={`${src}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-border"
                >
                  <ImageWithFallback
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {project.detail?.implementations ? (
          <DetailGroupSection
            title="주요 구현"
            groups={project.detail.implementations}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-foreground font-[Pretendard] text-[1.35rem] mb-6 flex items-center gap-2.5">
              <div className="w-1 h-6 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
              <Lightbulb className="w-5 h-5 text-emerald-500" />
              주요 성과
            </h2>
            <div className="grid gap-3">
              {project.highlights.map((item, i) => (
                <motion.div
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 px-5 py-4 rounded-xl bg-card border border-border hover:border-emerald-500/20 transition-colors group"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-[0.875rem] leading-[1.7] font-[Pretendard] group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenges & Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-foreground font-[Pretendard] text-[1.35rem] mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            도전 과제 & 해결
          </h2>
          <div className="grid gap-6">
            {project.challenges.map((c, i) => (
              <motion.div
                key={`${c.problem}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-border bg-red-500/3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-[0.7rem] font-mono">
                      PROBLEM
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[0.875rem] leading-[1.9] font-[Pretendard]">
                    {c.problem}
                  </p>
                </div>
                <div className="px-6 py-5 bg-green-500/3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-[0.7rem] font-mono">
                      SOLUTION
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[0.875rem] leading-[1.9] font-[Pretendard]">
                    {c.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prev / Next navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border"
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 px-5 py-5 rounded-2xl bg-card border border-border hover:border-emerald-500/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-emerald-500 group-hover:-translate-x-1 transition-all shrink-0" />
              <div className="min-w-0">
                <p className="text-muted-foreground text-[0.75rem] font-[Pretendard] mb-1">
                  이전 프로젝트
                </p>
                <p className="text-foreground text-[0.9rem] font-[Pretendard] truncate">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 px-5 py-5 rounded-2xl bg-card border border-border hover:border-teal-500/20 transition-all text-right"
            >
              <div className="min-w-0">
                <p className="text-muted-foreground text-[0.75rem] font-[Pretendard] mb-1">
                  다음 프로젝트
                </p>
                <p className="text-foreground text-[0.9rem] font-[Pretendard] truncate">
                  {nextProject.title}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal-500 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </section>
  );
}
