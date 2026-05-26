import type { ReactElement } from 'react';

type Slug = 'apiguard' | 'find-it' | 'k-type' | 'brevoca';

interface ProjectThumbnailProps {
  slug: string;
  className?: string;
}

function ApiGuardSchematic() {
  const rows = [
    { name: '/api/auth', latency: '142ms', status: 'ok', width: 92 },
    { name: '/api/payments', latency: '218ms', status: 'ok', width: 84 },
    { name: '/api/notify', latency: '—', status: 'fail', width: 38 },
    { name: '/api/users', latency: '96ms', status: 'ok', width: 88 },
    { name: '/api/health', latency: '54ms', status: 'ok', width: 95 },
  ];
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <rect width="800" height="500" fill="var(--card)" />
      <g fontFamily="ui-monospace, 'Fira Code', monospace" fontSize="13">
        <text x="48" y="60" fill="var(--muted-foreground)" fontSize="11" letterSpacing="2">
          STATUS · 24H
        </text>
        {rows.map((r, i) => {
          const y = 100 + i * 56;
          const isFail = r.status === 'fail';
          return (
            <g key={r.name}>
              <text x="48" y={y + 6} fill="var(--foreground)">
                {r.name}
              </text>
              <rect
                x={300}
                y={y - 10}
                width={r.width * 3.4}
                height="14"
                rx="2"
                fill={isFail ? 'var(--destructive)' : 'var(--brand)'}
                opacity={isFail ? 0.7 : 0.55}
              />
              <rect
                x={300 + r.width * 3.4}
                y={y - 10}
                width={(100 - r.width) * 3.4}
                height="14"
                rx="2"
                fill="var(--border)"
              />
              <text
                x="744"
                y={y + 6}
                fill={isFail ? 'var(--destructive)' : 'var(--muted-foreground)'}
                fontSize="11"
                textAnchor="end"
              >
                {r.latency}
              </text>
            </g>
          );
        })}
        <text x="48" y="460" fill="var(--muted-foreground)" fontSize="11" letterSpacing="2">
          UPTIME 99.81% · ALERT COOLDOWN 5m
        </text>
      </g>
    </svg>
  );
}

function FindItSchematic() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <rect width="800" height="500" fill="var(--card)" />
      <g fontFamily="ui-monospace, 'Fira Code', monospace">
        <rect
          x="48"
          y="48"
          width="704"
          height="44"
          rx="6"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <circle cx="72" cy="70" r="6" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
        <line x1="76" y1="74" x2="82" y2="80" stroke="var(--foreground)" strokeWidth="1.5" />
        <text x="100" y="76" fill="var(--muted-foreground)" fontSize="13">
          검색어: 지갑
        </text>
        <text x="744" y="76" fill="var(--muted-foreground)" fontSize="11" textAnchor="end">
          1,284 RESULTS
        </text>
      </g>
      <g>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = 48 + col * 180;
            const y = 124 + row * 116;
            const active = row === 0 && col === 1;
            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={x}
                  y={y}
                  width="164"
                  height="100"
                  rx="6"
                  fill="none"
                  stroke={active ? 'var(--brand)' : 'var(--border)'}
                  strokeWidth={active ? 1.5 : 1}
                />
                <circle
                  cx={x + 26}
                  cy={y + 26}
                  r="6"
                  fill={active ? 'var(--brand)' : 'var(--foreground)'}
                  opacity={active ? 1 : 0.4}
                />
                <rect x={x + 14} y={y + 56} width="120" height="6" rx="1" fill="var(--border)" />
                <rect x={x + 14} y={y + 70} width="80" height="6" rx="1" fill="var(--border)" />
              </g>
            );
          }),
        )}
      </g>
    </svg>
  );
}

function KTypeSchematic() {
  const row1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
  const row2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const row3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
  const keyW = 56;
  const gap = 8;
  const startY = 200;

  const drawRow = (chars: string[], y: number, offset = 0) =>
    chars.map((ch, i) => {
      const x = 48 + offset + i * (keyW + gap);
      return (
        <g key={`${y}-${i}`}>
          <rect
            x={x}
            y={y}
            width={keyW}
            height={keyW}
            rx="6"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={x + keyW / 2}
            y={y + keyW / 2 + 6}
            textAnchor="middle"
            fontFamily="'Pretendard Variable', sans-serif"
            fontSize="18"
            fill="var(--muted-foreground)"
          >
            {ch}
          </text>
        </g>
      );
    });

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <rect width="800" height="500" fill="var(--card)" />
      <g fontFamily="ui-monospace, 'Fira Code', monospace">
        <text x="48" y="64" fill="var(--muted-foreground)" fontSize="11" letterSpacing="2">
          CPM · LIVE
        </text>
        <text
          x="48"
          y="120"
          fontFamily="'Pretendard Variable', sans-serif"
          fontSize="52"
          fill="var(--foreground)"
          fontWeight="500"
        >
          428
        </text>
        <text x="156" y="120" fill="var(--muted-foreground)" fontSize="14">
          char / min
        </text>
        <text x="48" y="160" fill="var(--muted-foreground)" fontSize="11">
          accuracy 96.4% · 50ms tick
        </text>
      </g>
      {drawRow(row1, startY)}
      {drawRow(row2, startY + keyW + gap, 32)}
      {drawRow(row3, startY + (keyW + gap) * 2, 64)}
    </svg>
  );
}

function BrevocaSchematic() {
  const bars = Array.from({ length: 64 }, (_, i) => {
    const t = i / 64;
    const wave = Math.sin(t * 8) * Math.cos(t * 3) + Math.sin(t * 15) * 0.3;
    return Math.max(4, Math.abs(wave) * 60 + 8);
  });
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <rect width="800" height="500" fill="var(--card)" />
      <g fontFamily="ui-monospace, 'Fira Code', monospace">
        <text x="48" y="60" fill="var(--muted-foreground)" fontSize="11" letterSpacing="2">
          AUDIO · 12:48
        </text>
        <g transform="translate(48, 100)">
          {bars.map((h, i) => (
            <rect
              key={i}
              x={i * 10}
              y={70 - h / 2}
              width="6"
              height={h}
              rx="1"
              fill="var(--foreground)"
              opacity={0.35 + (i % 3) * 0.15}
            />
          ))}
        </g>
        <g transform="translate(48, 240)" fill="var(--brand)">
          <text fontSize="11" letterSpacing="2">
            ↓ TRANSCRIBE + SUMMARIZE
          </text>
        </g>
      </g>
      <g transform="translate(48, 280)">
        <rect width="704" height="50" rx="4" fill="none" stroke="var(--border)" />
        <rect x="14" y="14" width="100" height="6" rx="1" fill="var(--brand)" opacity="0.6" />
        <text
          x="14"
          y="40"
          fontFamily="'Pretendard Variable', sans-serif"
          fontSize="13"
          fill="var(--muted-foreground)"
        >
          # 결정 사항 · 액션 아이템
        </text>

        <rect y="64" width="704" height="50" rx="4" fill="none" stroke="var(--border)" />
        <rect x="14" y="78" width="60" height="6" rx="1" fill="var(--foreground)" opacity="0.5" />
        <text
          x="14"
          y="104"
          fontFamily="'Pretendard Variable', sans-serif"
          fontSize="13"
          fill="var(--muted-foreground)"
        >
          - API 응답 포맷 통일 (담당: 강선영)
        </text>

        <rect y="128" width="704" height="50" rx="4" fill="none" stroke="var(--border)" />
        <rect x="14" y="142" width="80" height="6" rx="1" fill="var(--foreground)" opacity="0.5" />
        <text
          x="14"
          y="168"
          fontFamily="'Pretendard Variable', sans-serif"
          fontSize="13"
          fill="var(--muted-foreground)"
        >
          - 로깅 기준 재정의 · 다음 회의 검토
        </text>
      </g>
    </svg>
  );
}

function DefaultSchematic() {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <rect width="800" height="500" fill="var(--card)" />
      <g stroke="var(--border)" strokeWidth="1" fill="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h-${i}`} x1="48" x2="752" y1={60 + i * 56} y2={60 + i * 56} />
        ))}
      </g>
    </svg>
  );
}

const map: Record<Slug, () => ReactElement> = {
  apiguard: ApiGuardSchematic,
  'find-it': FindItSchematic,
  'k-type': KTypeSchematic,
  brevoca: BrevocaSchematic,
};

export function ProjectThumbnail({ slug, className }: ProjectThumbnailProps) {
  const Schematic =
    (map as Record<string, () => ReactElement>)[slug] ?? DefaultSchematic;
  return (
    <div className={className}>
      <Schematic />
    </div>
  );
}
