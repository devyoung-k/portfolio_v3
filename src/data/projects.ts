export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'desktop';

type ProjectDetailGroup = {
  title: string;
  items: string[];
};

type ProjectDetail = {
  overview: string;
  responsibilities?: ProjectDetailGroup[];
  implementations?: ProjectDetailGroup[];
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  tags: string[];
  category: ProjectCategory[];
  github: string;
  demo: string;
  featured: boolean;
  role: string;
  duration: string;
  team: string;
  highlights: string[];
  challenges: { problem: string; solution: string }[];
  repositoryLinks?: { label: string; href: string }[];
  backendNote?: string;
  detail?: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'apiguard',
    title: 'APIGuard',
    description:
      '워크스페이스 기반 API 모니터링 SaaS입니다. 프론트엔드에서는 대시보드, 권한별 UI, 결제 흐름을 구현했고, 백엔드에서는 주기적 헬스체크와 알림, 플랜 정책을 구현했습니다.',
    longDescription:
      'APIGuard는 API 엔드포인트 상태를 주기적으로 점검하고 장애 대응 시간을 줄이기 위한 모니터링 SaaS입니다. 프론트엔드에서는 워크스페이스 기반 대시보드와 운영 UI를 구현했고, 백엔드에서는 스케줄러 기반 헬스체크, 실패 임계치 알림, 플랜 및 결제 정책을 처리하는 서버를 구현했습니다.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: [
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Spring Boot',
      'PostgreSQL',
      'Redis',
      'JWT',
    ],
    category: ['fullstack'],
    github: 'https://github.com/ksyee/apiguard-frontend',
    demo: '',
    featured: true,
    role: 'Frontend Developer with Backend Contributions',
    duration: '2025',
    team: '팀 프로젝트',
    repositoryLinks: [
      {
        label: 'Frontend Repo',
        href: 'https://github.com/ksyee/apiguard-frontend',
      },
    ],
    backendNote:
      '백엔드는 별도 비공개 저장소에서 개발했으며, 스케줄러 기반 헬스체크, Redis 알림 쿨다운, 플랜 및 결제 정책을 담당했습니다.',
    detail: {
      overview:
        'APIGuard는 API 엔드포인트 상태를 주기적으로 점검하고, 장애 시 빠르게 대응할 수 있도록 만든 모니터링 SaaS입니다. 프론트엔드에서는 워크스페이스 기반 대시보드, 역할별 운영 UI, 결제 화면을 구현했고, 백엔드에서는 주기적 헬스체크, 실패 임계치 기반 알림, 플랜 제한 정책과 결제 검증을 처리하는 서버를 구현했습니다.',
      responsibilities: [
        {
          title: 'Frontend',
          items: [
            '워크스페이스 기반 대시보드와 프로젝트/엔드포인트 관리 화면을 구현했습니다.',
            '권한별 UI 제어와 결제 흐름, 플랜 상태 확인 화면을 구성했습니다.',
            '다국어와 다크모드를 포함한 SaaS형 운영 UI를 구현했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            '스케줄러 기반 헬스체크와 통계 API를 제공하는 Spring Boot 서버를 구현했습니다.',
            '연속 실패 임계치 기반 알림과 Redis 쿨다운 로직을 구현했습니다.',
            '플랜 제한 정책과 Toss 결제 검증 로직을 서비스 레벨에서 처리했습니다.',
          ],
        },
      ],
      implementations: [
        {
          title: 'Frontend',
          items: [
            '워크스페이스 컨텍스트를 기준으로 프로젝트, 멤버, 역할 상태를 화면 전반에 반영했습니다.',
            '대시보드와 엔드포인트 상세 화면에서 업타임, 응답시간, 최근 점검 결과를 시각화했습니다.',
            'Axios 인터셉터로 JWT 자동 갱신 흐름을 구성하고, OWNER 전용 결제 UI를 연결했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            '활성 엔드포인트 중 점검 시점이 도래한 항목만 병렬 실행하는 헬스체크 스케줄러를 구현했습니다.',
            '응답 상태 코드와 응답시간을 기준으로 체크 결과를 저장하고, 통계 API로 재구성했습니다.',
            '최근 체크 결과의 연속 실패 횟수를 계산하고 Redis TTL 키로 중복 알림을 방지했습니다.',
            '엔드포인트 수, 최소 체크 주기, 알림 채널 수, 멤버 수를 플랜 정책으로 검증하고 결제 승인값도 서버에서 검증했습니다.',
          ],
        },
      ],
    },
    highlights: [
      '워크스페이스 기반 멀티 프로젝트와 RBAC 권한 체계 구현',
      '대시보드와 엔드포인트 상세 화면에서 모니터링 지표 시각화',
      '스케줄러 기반 헬스체크와 통계 API 구현',
      '연속 실패 임계치 기반 알림과 Redis 쿨다운 적용',
      '플랜 제한 정책과 Toss 결제 검증 로직 구현',
    ],
    challenges: [
      {
        problem:
          '단일 실패마다 알림을 보내면 노이즈가 커지고, 장애 상황에서 중복 알림이 누적될 수 있었습니다.',
        solution:
          '최근 체크 결과에서 연속 실패 횟수를 계산하고, Redis TTL 기반 쿨다운을 적용해 알림 신호를 정제했습니다.',
      },
      {
        problem:
          '플랜 제한을 프론트 안내만으로 처리하면 우회 가능성이 있고, 권한/플랜 분기가 늘수록 관리가 어려워졌습니다.',
        solution:
          '권한 체크 유틸과 정책 객체를 공통화하고, 백엔드 서비스에서도 엔드포인트 수·체크 주기·알림 채널 수를 함께 검증하도록 구성했습니다.',
      },
    ],
  },
  {
    id: 2,
    slug: 'find-it',
    title: '찾아줘! (Find It)',
    description:
      '공공 분실물 데이터를 더 쉽게 찾을 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드 구현을 중심으로, Spring Boot 백엔드 API 분리도 함께 진행했습니다.',
    longDescription:
      '공공 분실물 데이터를 더 쉽게 찾을 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드에서는 검색과 탐색 UX, 지도 시각화를 구현했고, 백엔드에서는 경찰청 Open API 응답을 파싱해 별도 API로 제공하는 구조를 도입했습니다.',
    image:
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: [
      'React',
      'TypeScript',
      'React Query',
      'Kakao Map API',
      'Spring Boot',
      'PostgreSQL',
    ],
    category: ['fullstack'],
    github: 'https://github.com/ksyee/find-it',
    demo: '',
    featured: true,
    role: 'Frontend Developer with Backend Contributions',
    duration: '2024',
    team: '팀 프로젝트',
    repositoryLinks: [
      {
        label: 'Frontend Repo',
        href: 'https://github.com/ksyee/find-it',
      },
    ],
    backendNote:
      '백엔드는 별도 비공개 저장소에서 개발했으며, Spring Boot 기반 API 서버 구현과 XML 응답 파싱, 검색 API 분리를 담당했습니다.',
    detail: {
      overview:
        'Find It은 공공 분실물 데이터를 더 쉽게 탐색할 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드에서는 검색 결과 조회, 필터링, 무한 스크롤, 지도 기반 위치 확인 흐름을 구현했고, 백엔드에서는 Spring Boot 기반 API 서버를 구축해 경찰청 Open API의 XML 응답을 파싱하고 일부 화면에서 활용할 수 있는 JSON API 구조를 분리했습니다.',
      responsibilities: [
        {
          title: 'Frontend',
          items: [
            '검색 결과 조회, 필터링, 무한 스크롤 등 탐색 중심의 UI를 구현했습니다.',
            'React Query를 활용해 검색 결과 조회와 캐싱 흐름을 구성했습니다.',
            'Kakao Map API를 연동해 보관 위치를 지도에서 확인할 수 있도록 구성했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            'Spring Boot 기반 분실물/습득물 API 서버를 구현했습니다.',
            '경찰청 Open API의 XML 응답을 파싱해 프론트엔드가 직접 XML을 다루지 않아도 되는 API 흐름을 분리했습니다.',
            '목록 조회와 일부 상세 조회에서 활용할 수 있는 검색 API 구조를 구성했습니다.',
          ],
        },
      ],
      implementations: [
        {
          title: 'Frontend',
          items: [
            '검색, 필터, 무한 스크롤 흐름을 연결해 탐색 UX를 구성했습니다.',
            '지도 기반 위치 시각화를 통해 보관 장소를 직관적으로 확인할 수 있게 했습니다.',
            '검색 상태와 데이터 요청 흐름을 React Query 중심으로 정리해 반복 조회 비용을 줄였습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            '경찰청 XML 응답을 서버에서 파싱하고 내부 DTO로 변환하는 흐름을 구현했습니다.',
            '분실물/습득물 목록 조회용 API와 상세 조회용 API를 별도로 구성했습니다.',
            '프론트엔드가 외부 API를 직접 호출하던 구조를 백엔드 API로 점진적으로 분리했습니다.',
          ],
        },
      ],
    },
    highlights: [
      'React Query를 활용한 검색 결과 조회와 캐싱 흐름 구성',
      '검색, 필터, 무한 스크롤 등 탐색 중심의 UI 구현',
      'Kakao Map API 연동으로 보관 위치 지도 시각화',
      'Spring Boot + PostgreSQL 기반 분실물/습득물 검색 API 서버 구현',
      '경찰청 Open API의 XML 응답을 서버에서 파싱해 내부 데이터 구조로 변환',
      '수집 데이터 DB 적재 및 검색/필터/날짜 조회 API 구성',
    ],
    challenges: [
      {
        problem:
          '경찰청 API가 XML 형태로 응답해 프론트엔드에서 바로 사용하기 어려웠습니다.',
        solution:
          'Spring Boot 서버에서 XML 응답을 파싱하고, 프론트엔드에서 재사용할 수 있는 JSON API 형태로 분리했습니다.',
      },
      {
        problem:
          '외부 API가 HTTP 기반이라 브라우저에서 직접 호출하기 어려웠습니다.',
        solution:
          '백엔드를 경유하는 구조를 도입해 일부 화면에서는 브라우저가 외부 API를 직접 호출하지 않도록 분리했습니다.',
      },
    ],
  },
  {
    id: 3,
    slug: 'k-type',
    title: 'K-TYPE',
    description:
      '타이핑에만 집중할 수 있는 미니멀한 환경의 한글 타이핑 연습 웹 애플리케이션. 실시간 속도(CPM) 및 정확도 분석을 제공합니다.',
    longDescription:
      '커스텀 키보드 제작 후 타건 연습과 한글 타이핑 실력 향상을 위해 개발한 웹 애플리케이션입니다. 불필요한 요소를 배제한 미니멀한 인터페이스로 타이핑에만 집중할 수 있으며, 실시간으로 입력 속도(CPM)와 정확도를 분석합니다. Supabase를 통해 다양한 한글 문장을 관리하고 제공합니다.',
    image:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: ['React', 'TypeScript', 'Supabase', 'Vite'],
    category: ['frontend'],
    github: 'https://github.com/ksyee/k-type',
    demo: '',
    featured: false,
    role: 'Solo Developer',
    duration: '2024',
    team: '1명',
    highlights: [
      '실시간 타이핑 분석 엔진 - CPM, 정확도 등 즉각적 피드백 제공',
      '한글 자모 분리/조합 기반 정확한 타이핑 검증 로직 구현',
      'Supabase를 활용한 문장 데이터 관리 및 랜덤 제공',
      '미니멀한 UI/UX 설계 - 타이핑에만 집중할 수 있는 직관적 인터페이스',
      '시각적 피드백 - 타이핑 오류 시 즉각적인 시각적 알림',
    ],
    challenges: [
      {
        problem:
          '한글은 자모 조합 중 상태와 완성 상태가 달라 일반적인 입력 판정으로 정확도 계산이 어려웠습니다.',
        solution:
          'CompositionEvent를 기반으로 조합 단계를 추적하고, 조합 완료 시점에 정확도 계산을 수행했습니다.',
      },
    ],
  },
  {
    id: 4,
    slug: 'scriba',
    title: 'Scriba',
    description:
      'AI 회의록 자동 생성 데스크톱 앱. 실시간 음성 녹음 -> 자동 텍스트 변환 -> AI 회의록 생성까지, 모든 처리가 로컬에서 이루어집니다.',
    longDescription:
      '회의 중 메모에 집중하느라 논의를 놓치는 문제를 해결하기 위해 만든 데스크톱 애플리케이션입니다. 실시간으로 음성을 녹음하고, whisper.cpp로 텍스트를 변환한 뒤, Ollama 로컬 LLM으로 회의록을 자동 생성합니다. 인터넷 연결 없이 모든 처리가 로컬에서 이루어져 개인정보 걱정 없이 사용할 수 있습니다.',
    image:
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: [
      'Electron',
      'React',
      'Vite',
      'TailwindCSS 4',
      'whisper.cpp',
      'Ollama',
    ],
    category: ['desktop'],
    github: 'https://github.com/ksyee/Scriba',
    demo: '',
    featured: true,
    role: 'Solo Developer',
    duration: '2025',
    team: '1명',
    highlights: [
      'Electron + electron-vite 기반 크로스 플랫폼 데스크톱 앱 구축',
      'Web Audio API -> PCM 16-bit mono 16kHz 실시간 오디오 변환 파이프라인',
      'whisper.cpp(@fugood/whisper.node)로 오프라인 음성 인식 구현',
      'Ollama REST API 스트리밍으로 로컬 LLM 기반 회의록 자동 생성',
      'contextBridge + IPC를 활용한 안전한 Renderer-Main 프로세스 통신',
      '완전 오프라인 처리로 프라이버시 보장',
    ],
    challenges: [
      {
        problem:
          '실시간 오디오를 whisper.cpp 포맷으로 변환하는 과정에서 처리 지연이 발생했습니다.',
        solution:
          '오디오 처리를 Main Process로 위임하고 청크 단위 IPC 처리로 지연을 완화했습니다.',
      },
      {
        problem:
          'LLM 응답이 스트리밍으로 전달되어 자연스러운 문서 생성 UX가 필요했습니다.',
        solution:
          '스트림 응답을 단계적으로 렌더링해 실시간 타이핑 효과를 구현했습니다.',
      },
    ],
  },
];
