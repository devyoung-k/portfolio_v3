import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Star,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { GitHubIcon } from '@/components/icons';
import { projects } from '@/data/projects';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { ProjectThumbnail } from '@/components/ProjectThumbnail';

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
      <h2 className="text-foreground font-[Pretendard] text-section mb-8 flex items-center gap-2.5">
        <div className="w-1 h-6 rounded-full bg-foreground/40" />
        {title}
      </h2>
      <div className="space-y-8 border-l border-border pl-5">
        {groups.map((group, index) => (
          <motion.div
            key={`${group.title}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="grid sm:grid-cols-[6.5rem_1fr] gap-x-6 gap-y-2 items-baseline"
          >
            <h3 className="text-muted-foreground font-mono text-[0.7rem] tracking-wider uppercase">
              {group.title}
            </h3>
            <ul className="space-y-2 list-none">
              {group.items.map((item, itemIndex) => (
                <li
                  key={`${group.title}-${itemIndex}`}
                  className="text-foreground/85 text-[0.9rem] leading-[1.8] font-[Pretendard]"
                >
                  {item}
                </li>
              ))}
            </ul>
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
    const suggestions = projects.slice(0, 3);
    return (
      <section className="min-h-screen px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.2em] mb-4">
              404 · NOT FOUND
            </p>
            <h1 className="text-foreground font-[Pretendard] text-title mb-4">
              프로젝트를 찾을 수 없습니다.
            </h1>
            <p className="text-muted-foreground text-[0.95rem] leading-[1.8] mb-10 font-[Pretendard]">
              {slug ? `요청하신 “${slug}” 슬러그가 존재하지 않습니다.` : '존재하지 않는 경로입니다.'}{' '}
              아래 프로젝트 중 하나를 확인해보세요.
            </p>
          </motion.div>

          <div className="space-y-3 mb-10">
            {suggestions.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="flex items-start justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors group"
                >
                  <div className="min-w-0">
                    <h3 className="text-foreground font-[Pretendard] mb-1">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-[0.85rem] font-[Pretendard] line-clamp-1">
                      {p.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[0.85rem] font-[Pretendard]"
          >
            <ArrowLeft className="w-4 h-4" />
            전체 프로젝트 보기
          </Link>
        </div>
      </section>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <section className="min-h-screen pt-32 pb-20">
      {/* Typography hero */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 mb-10 text-muted-foreground hover:text-foreground transition-colors text-[0.85rem] font-[Pretendard]"
        >
          <ArrowLeft className="w-4 h-4" />
          프로젝트 목록
        </motion.button>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap items-center gap-2.5 mb-5"
        >
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand text-brand-foreground text-[0.7rem] font-[Pretendard]">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.7rem] font-mono">
            {project.role}
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="text-foreground font-[Pretendard] text-display mb-6"
        >
          {project.title}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground text-[1rem] leading-[1.85] font-[Pretendard] max-w-2xl"
        >
          {project.description}
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-border mb-12 aspect-[16/9] bg-card"
        >
          <ProjectThumbnail
            slug={project.slug}
            image={project.image}
            alt={project.title}
            className="w-full h-full"
          />
        </motion.div>

        {/* Meta info */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-baseline gap-x-8 gap-y-3 mb-12 py-4 border-y border-border"
        >
          {[
            { label: 'PERIOD', value: project.duration },
            { label: 'TEAM', value: project.team },
            { label: 'ROLE', value: project.role },
          ].map((meta) => (
            <span
              key={meta.label}
              className="flex items-baseline gap-2.5 font-[Pretendard]"
            >
              <span className="text-[0.65rem] font-mono tracking-wider text-muted-foreground/70">
                {meta.label}
              </span>
              <span className="text-foreground text-[0.875rem]">
                {meta.value}
              </span>
            </span>
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
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-brand-foreground text-[0.875rem] hover:shadow-lg hover:shadow-brand/25 transition-shadow font-[Pretendard]"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.repositoryLinks ? (
              project.repositoryLinks.map((repo) => (
                <a
                  key={repo.href}
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-[0.875rem] hover:bg-accent/50 transition-colors font-[Pretendard]"
                >
                  <GitHubIcon className="w-4 h-4" />
                  {repo.label}
                </a>
              ))
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-[0.875rem] hover:bg-accent/50 transition-colors font-[Pretendard]"
              >
                <GitHubIcon className="w-4 h-4" />
                Source Code
              </a>
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
                className="px-2.5 py-1 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.7rem] font-mono"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div {...fadeUp} transition={{ delay: 0.65 }} className="mb-16">
          <h2 className="text-foreground font-[Pretendard] text-section mb-5 flex items-center gap-2.5">
            <div className="w-1 h-6 rounded-full bg-foreground/40" />
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
            <h2 className="text-foreground font-[Pretendard] text-section mb-5 flex items-center gap-2.5">
              <div className="w-1 h-6 rounded-full bg-foreground/40" />
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
            <h2 className="text-foreground font-[Pretendard] text-section mb-8 flex items-center gap-2.5">
              <div className="w-1 h-6 rounded-full bg-foreground/40" />
              주요 성과
            </h2>
            <ul className="space-y-3 border-l border-border pl-5">
              {project.highlights.map((item, i) => (
                <motion.li
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-foreground/85 text-[0.9rem] leading-[1.8] font-[Pretendard]"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
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
          <h2 className="text-foreground font-[Pretendard] text-section mb-6 flex items-center gap-2.5">
            <div className="w-1 h-6 rounded-full bg-foreground/40" />
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
                <div className="px-6 py-5 border-b border-border">
                  <span className="inline-block px-2.5 py-1 mb-3 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.7rem] font-mono tracking-wider">
                    PROBLEM
                  </span>
                  <p className="text-muted-foreground text-[0.875rem] leading-[1.9] font-[Pretendard]">
                    {c.problem}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <span className="inline-block px-2.5 py-1 mb-3 rounded-md border border-border bg-card/40 text-foreground text-[0.7rem] font-mono tracking-wider">
                    SOLUTION
                  </span>
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
              className="group flex items-center gap-4 px-5 py-5 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-1 transition-all shrink-0" />
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
              className="group flex items-center justify-end gap-4 px-5 py-5 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all text-right"
            >
              <div className="min-w-0">
                <p className="text-muted-foreground text-[0.75rem] font-[Pretendard] mb-1">
                  다음 프로젝트
                </p>
                <p className="text-foreground text-[0.9rem] font-[Pretendard] truncate">
                  {nextProject.title}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </section>
  );
}
