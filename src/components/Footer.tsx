import { GitHubIcon } from './icons';
import { MagneticButton } from './MagneticButton';
import { profile } from '@/data/profile';

export function Footer() {
  const githubLink = profile.socials.find((social) => social.id === 'github');

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[0.85rem] font-[Pretendard]">
            Designed &amp; Developed by {profile.name}
          </p>
          <div className="flex items-center gap-3">
            {githubLink && (
              <MagneticButton>
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/30 transition-all"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
