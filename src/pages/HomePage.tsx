import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { GitHubIcon } from '@/components/icons';
import { profile } from '@/data/profile';

const typewriterLines = [
  'const developer = {',
  `  name: "${profile.name}",`,
  `  role: "${profile.role}",`,
  '  buildsForUsers: true,',
  '};',
];

function TypeWriter() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= typewriterLines.length) {
      const timer = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(timer);
    }
    if (currentChar <= typewriterLines[currentLine].length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 40);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLine((line) => line + 1);
      setCurrentChar(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, done]);

  return (
    <div className="rounded-2xl bg-[#0f1a1f] border border-white/5 overflow-hidden shadow-2xl shadow-black/20">
      <div className="px-4 py-3 bg-white/5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <span className="text-white/30 text-[0.7rem] font-mono ml-2 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          developer.ts
        </span>
      </div>

      <div className="p-5 font-mono text-[0.8rem] leading-loose min-h-45">
        {typewriterLines.map((line, index) => {
          if (index > currentLine) return null;
          const text = index < currentLine ? line : line.slice(0, currentChar);
          const hasColon = text.includes(':');
          const parts = hasColon ? text.split(':') : [text];

          return (
            <div key={`${line}-${index}`} className="flex">
              <span className="text-white/20 w-6 shrink-0 select-none text-right mr-4">
                {index + 1}
              </span>
              <span className="whitespace-pre">
                {hasColon ? (
                  <>
                    <span className="text-sky-300">{parts[0]}</span>
                    <span className="text-white/60">:</span>
                    <span className="text-amber-300">
                      {parts.slice(1).join(':')}
                    </span>
                  </>
                ) : (
                  <span className="text-white/80">{text}</span>
                )}
                {index === currentLine && !done && (
                  <span className="inline-block w-0.5 h-[1em] bg-white/80 ml-px animate-pulse align-middle" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const stacks = [
  { label: 'React' },
  { label: 'TypeScript' },
  { label: 'Next.js' },
  { label: 'Node.js' },
  { label: 'PostgreSQL' },
  { label: 'Docker' },
];

export function HomePage() {
  const githubLink = profile.socials.find((social) => social.id === 'github');

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accent/60 border border-border/50 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[0.8rem] text-muted-foreground font-[Pretendard]">
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-foreground font-[Pretendard] text-display mb-6"
          >
            안녕하세요,
            <br />
            <span className="relative inline-block">
              {profile.heroRole}
              <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-brand/70 rounded-full" />
            </span>{' '}
            {profile.name}입니다.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:hidden mb-8"
          >
            <TypeWriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-[1.05rem] mb-8 max-w-lg font-[Pretendard] leading-[1.8]"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {stacks.map((stack, index) => (
              <motion.span
                key={stack.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.04 }}
                className="px-3 py-1.5 rounded-md border border-border bg-card/40 text-muted-foreground text-[0.75rem] font-mono cursor-default"
              >
                {stack.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-brand-foreground text-[0.9rem] hover:shadow-lg hover:shadow-brand/25 transition-shadow font-[Pretendard]"
            >
              프로젝트 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground text-[0.9rem] hover:bg-accent/50 transition-colors font-[Pretendard] backdrop-blur-sm"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub 보기
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4"
          >
            <span className="text-muted-foreground text-[0.8rem] font-[Pretendard]">
              Follow me
            </span>
            <div className="h-px w-8 bg-border" />
            <div className="flex gap-2">
              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={githubLink.label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block"
        >
          <TypeWriter />
        </motion.div>
      </div>
    </section>
  );
}
