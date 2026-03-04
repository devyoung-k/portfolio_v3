import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, Terminal } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { TextReveal } from "@/components/TextReveal";
import { GitHubIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const typewriterLines = [
  "const developer = {",
  `  name: \"${profile.name}\",`,
  `  role: \"${profile.role}\",`,
  "  buildsForUsers: true,",
  "};",
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
    <div className="rounded-2xl bg-[#0f1a1f] border border-white/5 overflow-hidden shadow-2xl shadow-emerald-500/5">
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
          const hasColon = text.includes(":");
          const parts = hasColon ? text.split(":") : [text];

          return (
            <div key={`${line}-${index}`} className="flex">
              <span className="text-white/20 w-6 shrink-0 select-none text-right mr-4">
                {index + 1}
              </span>
              <span className="whitespace-pre">
                {hasColon ? (
                  <>
                    <span className="text-teal-400">{parts[0]}</span>
                    <span className="text-white/60">:</span>
                    <span className="text-amber-300">{parts.slice(1).join(":")}</span>
                  </>
                ) : (
                  <span className="text-emerald-400">{text}</span>
                )}
                {index === currentLine && !done && (
                  <span className="inline-block w-0.5 h-[1em] bg-emerald-400 ml-px animate-pulse align-middle" />
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
  { label: "React", color: "bg-teal-500/15 text-teal-400 border-teal-500/20" },
  { label: "TypeScript", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  { label: "Next.js", color: "bg-white/10 text-white/70 border-white/10" },
  { label: "Node.js", color: "bg-green-500/15 text-green-400 border-green-500/20" },
  { label: "PostgreSQL", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20" },
  { label: "Docker", color: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
];

export function HomePage() {
  const githubLink = profile.socials.find((social) => social.id === "github");

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-125 h-125 bg-emerald-500 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-teal-500 rounded-full blur-[160px] pointer-events-none"
      />

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

          <TextReveal
            as="h1"
            className="text-foreground font-[Pretendard] text-[2.5rem] md:text-[3.25rem] leading-[1.15] mb-3"
          >
            안녕하세요,
          </TextReveal>

          <TextReveal
            as="h1"
            delay={0.2}
            className="font-[Pretendard] text-[2.5rem] md:text-[3.25rem] leading-[1.15] bg-linear-to-r from-emerald-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent"
          >
            {profile.heroRole}
          </TextReveal>

          <TextReveal
            as="h1"
            delay={0.35}
            className="text-foreground font-[Pretendard] text-[2.5rem] md:text-[3.25rem] leading-[1.15] mb-6"
          >
            {`${profile.name}입니다.`}
          </TextReveal>

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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.06 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`px-3 py-1.5 rounded-lg border text-[0.75rem] font-mono cursor-default ${stack.color}`}
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
            <MagneticButton>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-[0.9rem] hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow font-[Pretendard]"
              >
                프로젝트 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground text-[0.9rem] hover:bg-accent/50 transition-all font-[Pretendard] backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" />
                연락하기
              </Link>
            </MagneticButton>
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
                <MagneticButton>
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={githubLink.label}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                </MagneticButton>
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
