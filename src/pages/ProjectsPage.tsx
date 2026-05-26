import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '@/components/SectionHeading';
import { ExternalLink, Star, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from '@/components/icons';
import { ProjectThumbnail } from '@/components/ProjectThumbnail';
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
          sequence="03"
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
                  ? 'text-brand-foreground shadow-lg shadow-brand/20'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter === tab.key && (
                <motion.div
                  layoutId="project-tab-bg"
                  className="absolute inset-0 bg-brand rounded-xl"
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
            {filtered.map((project, i) => {
              const isHero = i === 0 && project.featured;
              return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={isHero ? 'md:col-span-2' : ''}
              >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block bg-card border border-border rounded-2xl overflow-hidden group hover:border-foreground/20 transition-colors"
                  >
                    <div className={`relative ${isHero ? 'h-72 md:h-80' : 'h-52'} overflow-hidden border-b border-border`}>
                      <ProjectThumbnail
                        slug={project.slug}
                        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1"
                      />

                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand text-brand-foreground text-[0.7rem] font-[Pretendard]"
                        >
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </motion.div>
                      )}

                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md border border-border bg-background/80 backdrop-blur-sm text-muted-foreground text-[0.7rem] font-mono">
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
                          className="w-9 h-9 rounded-lg border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                          className="w-9 h-9 rounded-lg border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                      </div>
                      <p className="text-muted-foreground text-[0.875rem] leading-[1.8] mb-5 font-[Pretendard]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.7rem] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
