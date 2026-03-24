import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { ExternalLink, Star, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '@/components/icons';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { projects, type ProjectCategory } from '@/data/projects';

const filterTabs: { key: ProjectCategory; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend', label: 'Frontend' },
];

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="PROJECTS"
          title="프로젝트"
          description="실제로 구현한 주요 프로젝트들을 소개합니다"
        />

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2.5 rounded-xl text-[0.875rem] transition-all font-[Pretendard] ${
                filter === tab.key
                  ? 'text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter === tab.key && (
                <motion.div
                  layoutId="project-tab-bg"
                  className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <TiltCard>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block bg-card border border-border rounded-2xl overflow-hidden group hover:border-emerald-500/20 transition-all"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-[0.7rem] font-[Pretendard]"
                        >
                          <Star className="w-3 h-3 fill-white" />
                          Featured
                        </motion.div>
                      )}

                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-[0.7rem] font-[Pretendard]">
                        {project.role}
                      </div>

                      <div className="absolute bottom-4 right-4 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          type="button"
                          disabled={!project.github}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!project.github) return;
                            window.open(project.github, '_blank');
                          }}
                          aria-label="Open GitHub"
                          className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={!project.demo}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!project.demo) return;
                            window.open(project.demo, '_blank');
                          }}
                          aria-label="Open Live Demo"
                          className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-foreground font-[Pretendard]">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                      </div>
                      <p className="text-muted-foreground text-[0.875rem] leading-[1.8] mb-5 font-[Pretendard]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-accent/60 text-muted-foreground text-[0.7rem] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
