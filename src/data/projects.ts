export type ProjectCategory = 'all' | 'fullstack' | 'frontend';

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
      'Radix UI',
      'Recharts',
      'next-intl',
      'Spring Boot',
      'PostgreSQL',
      'Redis',
      'JWT',
      'Docker',
      'GitHub Actions',
    ],
    category: ['fullstack'],
    github: 'https://github.com/devyoung-k/apiguard-frontend',
    demo: '',
    featured: true,
    role: 'Frontend Developer with Backend Contributions',
    duration: '2024.12 - 2026.03',
    team: '팀 프로젝트',
    repositoryLinks: [
      {
        label: 'Frontend Repo',
        href: 'https://github.com/devyoung-k/apiguard-frontend',
      },
      {
        label: 'Backend Repo',
        href: 'https://github.com/devyoung-k/apiguard-backend',
      },
    ],
    backendNote:
      '백엔드는 Spring Boot 기반으로 스케줄러 기반 헬스체크, Redis 알림 쿨다운, 플랜 및 결제 정책을 담당했으며, Docker Compose와 GitHub Actions를 통해 CI/CD 파이프라인을 구성했습니다.',
    detail: {
      overview:
        'APIGuard는 API 엔드포인트 상태를 주기적으로 점검하고, 장애 시 빠르게 대응할 수 있도록 만든 모니터링 SaaS입니다. 프론트엔드에서는 워크스페이스 기반 대시보드, 역할별 운영 UI, 결제 화면을 구현했고, 백엔드에서는 주기적 헬스체크, 실패 임계치 기반 알림, 플랜 제한 정책과 결제 검증을 처리하는 서버를 구현했습니다.',
      responsibilities: [
        {
          title: 'Frontend',
          items: [
            '워크스페이스 기반 대시보드와 프로젝트/엔드포인트 관리 화면을 구현했습니다.',
            '권한별 UI 제어와 결제 흐름, 플랜 상태 확인 화면을 구성했습니다.',
            'next-intl 기반 다국어와 다크모드를 포함한 SaaS형 운영 UI를 구현했습니다.',
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
            'Recharts를 활용해 대시보드와 엔드포인트 상세 화면에서 업타임, 응답시간, 최근 점검 결과를 시각화했습니다.',
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
            'Docker Compose 기반 배포 파이프라인과 GitHub Actions PR 검증/자동 배포를 구성했습니다.',
          ],
        },
      ],
    },
    highlights: [
      '워크스페이스 기반 멀티 프로젝트와 RBAC 권한 체계 구현',
      'Recharts 기반 대시보드에서 모니터링 지표 시각화',
      '스케줄러 기반 헬스체크와 통계 API 구현',
      '연속 실패 임계치 기반 알림과 Redis 쿨다운 적용',
      '플랜 제한 정책과 Toss 결제 검증 로직 구현',
      'Docker Compose + GitHub Actions CI/CD 파이프라인 구성',
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
      '공공 분실물 데이터를 더 쉽게 찾을 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드에서는 FSD 아키텍처 기반 탐색 UI를, 백엔드에서는 경찰청 API 연동과 스케줄러 기반 데이터 수집을 구현했습니다.',
    longDescription:
      '공공 분실물 데이터를 더 쉽게 찾을 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드에서는 Feature-Sliced Design 아키텍처 기반으로 검색, 필터, 지도 시각화 UI를 구현하고, 백엔드에서는 Spring Boot 기반 DDD 구조로 경찰청 Open API 데이터를 수집·가공하는 서버를 구현했습니다. PostgreSQL ON CONFLICT 기반 배치 upsert와 스케줄러 기반 자동 동기화로 데이터를 관리하고, Docker + GitHub Actions CI/CD로 EC2에 배포했습니다.',
    image:
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Query',
      'Zustand',
      'Kakao Map API',
      'Spring Boot',
      'Java',
      'PostgreSQL',
      'Flyway',
      'Docker',
      'GitHub Actions',
      'Prometheus',
      'Vercel',
    ],
    category: ['fullstack'],
    github: 'https://github.com/devyoung-k/find-it',
    demo: '',
    featured: true,
    role: 'Frontend Developer with Backend Contributions',
    duration: '2024.09 - 2025.11',
    team: '팀 프로젝트',
    repositoryLinks: [
      {
        label: 'Frontend Repo',
        href: 'https://github.com/devyoung-k/find-it',
      },
      {
        label: 'Backend Repo (Private)',
        href: 'https://github.com/devyoung-k/findit-server',
      },
    ],
    backendNote:
      '백엔드는 별도 비공개 저장소에서 Spring Boot + Java 21 기반으로 개발했으며, DDD 계층 구조로 경찰청 API 연동, 스케줄러 기반 데이터 수집, API Key 인증, Prometheus 모니터링을 구현했습니다.',
    detail: {
      overview:
        'Find It은 공공 분실물 데이터를 더 쉽게 탐색할 수 있도록 검색 경험을 개선한 서비스입니다. 프론트엔드에서는 Feature-Sliced Design 아키텍처를 채택해 entities, features, widgets, pages 단위로 코드를 분리했고, React Query 기반 캐싱과 전역 프로그레스바로 로딩 UX를 통일했습니다. 백엔드에서는 Spring Boot 기반 DDD 계층 구조(presentation, application, domain, infrastructure)로 경찰청 API 데이터를 수집·가공하는 REST API 서버를 구현했습니다.',
      responsibilities: [
        {
          title: 'Frontend',
          items: [
            '검색 결과 조회, 필터링, 무한 스크롤 등 탐색 중심의 UI를 구현했습니다.',
            'React Query를 활용해 검색 결과 조회와 캐싱 흐름을 구성했습니다.',
            'Kakao Map API를 연동해 보관 위치를 지도에서 확인할 수 있도록 구성했습니다.',
            'Feature-Sliced Design 아키텍처를 도입해 도메인별 코드 분리와 재사용성을 확보했습니다.',
            '전역 프로그레스바를 도입해 페이지 전환 시 로딩 UX를 통일했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            '경찰청 Open API 연동과 XML/JSON 듀얼 파싱 클라이언트를 구현했습니다.',
            '스케줄러 기반 데이터 자동 수집과 PostgreSQL 배치 upsert를 구현했습니다.',
            '분실물/습득물 검색, 필터링, 날짜 범위 조회 등 REST API를 설계했습니다.',
            'DDD 계층 구조로 도메인 로직과 인프라를 분리하고, Flyway로 스키마를 관리했습니다.',
            'Docker + GitHub Actions CI/CD 파이프라인으로 EC2 배포를 자동화했습니다.',
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
            'sessionStorage 기반 스크롤 위치 복원으로 목록 ↔ 상세 전환 시 UX를 개선했습니다.',
            'Vercel Web Analytics를 적용해 사용자 트래픽과 행동 패턴을 추적했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            '경찰청 API의 XML/JSON 응답을 자동 감지해 JAXB 또는 Jackson으로 파싱하는 듀얼 파서를 구현했습니다.',
            'PostgreSQL ON CONFLICT 기반 배치 upsert로 JPA 개별 저장 대비 대량 데이터 수집 성능을 개선했습니다.',
            '자정/정오 스케줄러와 애플리케이션 시작 시 최근 7일치 데이터를 자동 수집하는 동기화 로직을 구현했습니다.',
            'API Key 인증 필터와 Spring Security 기반 엔드포인트 보호를 구성했습니다.',
            'Micrometer + Prometheus 기반 커스텀 메트릭과 헬스 인디케이터로 서버 상태를 모니터링했습니다.',
            'Spring Retry로 외부 API 호출 실패 시 자동 재시도(3회, 1초 백오프)를 적용했습니다.',
            'AWS SSM Parameter Store에서 시크릿을 주입하는 커스텀 EnvironmentPostProcessor를 구현했습니다.',
          ],
        },
      ],
    },
    highlights: [
      'Feature-Sliced Design 아키텍처로 도메인별 코드 분리',
      'React Query를 활용한 검색 결과 조회와 캐싱 흐름 구성',
      '검색, 필터, 무한 스크롤 등 탐색 중심의 UI 구현',
      'Kakao Map API 연동으로 보관 위치 지도 시각화',
      'DDD 계층 구조(presentation/application/domain/infrastructure)로 백엔드 설계',
      '경찰청 API XML/JSON 듀얼 파싱과 스케줄러 기반 자동 데이터 수집',
      'PostgreSQL ON CONFLICT 배치 upsert로 대량 데이터 수집 최적화',
      'API Key 인증과 Prometheus 기반 모니터링 구성',
      'Docker + GitHub Actions CI/CD로 EC2 자동 배포',
    ],
    challenges: [
      {
        problem:
          '경찰청 API가 요청 조건에 따라 XML 또는 JSON 형태로 응답해 단일 파서로 처리할 수 없었습니다.',
        solution:
          '응답 본문을 먼저 읽어 JSON 여부를 판별한 뒤 Jackson 또는 JAXB로 분기 파싱하는 듀얼 파서를 구현하고, BOM 문자 제거 등 전처리도 적용했습니다.',
      },
      {
        problem:
          '경찰청 API에서 대량 데이터를 수집할 때 JPA 개별 저장 방식으로는 성능 병목이 발생했습니다.',
        solution:
          'PostgreSQL의 ON CONFLICT 구문을 활용한 네이티브 배치 upsert를 구현해 중복 데이터는 갱신하고 신규 데이터만 삽입하는 효율적인 수집 구조를 만들었습니다.',
      },
      {
        problem:
          '페이지 전환 시 각 화면마다 다른 로딩 처리 방식이 있어 사용자 경험이 일관되지 않았습니다.',
        solution:
          'RouteProgressProvider를 도입해 전역 프로그레스바로 로딩 UX를 통일하고, 모바일 헤더와의 z-index 충돌도 해결했습니다.',
      },
      {
        problem:
          '목록에서 상세 페이지로 이동 후 뒤로가기 시 스크롤 위치가 초기화되어 탐색 흐름이 끊겼습니다.',
        solution:
          'sessionStorage를 활용한 스크롤 위치 복원 로직을 구현해 목록 ↔ 상세 전환 시 자연스러운 UX를 제공했습니다.',
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
      '커스텀 키보드 제작 후 타건 연습과 한글 타이핑 실력 향상을 위해 개발한 웹 애플리케이션입니다. 불필요한 요소를 배제한 미니멀한 인터페이스로 타이핑에만 집중할 수 있으며, 50ms 간격으로 실시간 입력 속도(CPM)와 정확도를 분석합니다. Atomic Design 패턴으로 컴포넌트를 구조화하고, Zustand로 상태를 관리합니다.',
    image:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    category: ['frontend'],
    github: 'https://github.com/devyoung-k/k-type',
    demo: '',
    featured: false,
    role: 'Solo Developer',
    duration: '2024.07 - 2025.10',
    team: '1명',
    highlights: [
      '50ms 간격 실시간 CPM 측정과 정확도 즉각 피드백 제공',
      '한글 자모 분리/조합 기반 정확한 타이핑 검증 로직 구현',
      'Atomic Design 패턴(atoms/molecules)으로 컴포넌트 구조화',
      'Zustand를 활용한 CPM, 기록, 리포트, 문장 상태 분리 관리',
      '미니멀한 UI/UX 설계 - 타이핑에만 집중할 수 있는 직관적 인터페이스',
    ],
    challenges: [
      {
        problem:
          '한글은 자모 조합 중 상태와 완성 상태가 달라 일반적인 입력 판정으로 정확도 계산이 어려웠습니다.',
        solution:
          'CompositionEvent를 기반으로 조합 단계를 추적하고, 자모 배열 비교 유틸리티를 구현해 조합 완료 시점에 정확도 계산을 수행했습니다.',
      },
    ],
  },
  {
    id: 4,
    slug: 'brevoca',
    title: 'Brevoca',
    description:
      'AI 회의록 자동 생성 웹 서비스입니다. 음성 파일 업로드 또는 브라우저 녹음 후 OpenAI STT로 텍스트를 변환하고, GPT로 주제별 회의록을 자동 생성합니다.',
    longDescription:
      '회의 중 메모에 집중하느라 논의를 놓치는 문제를 해결하기 위해 만든 AI 회의록 웹 서비스입니다. 음성 파일 업로드 또는 브라우저 녹음을 통해 OpenAI STT로 텍스트를 변환하고, GPT로 주제·결정 사항·액션 아이템 중심의 회의록을 자동 생성합니다. 워크스페이스 기반 멀티유저 구조와 초대 시스템을 지원하며, DOCX 내보내기로 문서화까지 처리합니다.',
    image:
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop&q=60',
    screenshots: [],
    tags: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS 4',
      'Supabase',
      'OpenAI API',
    ],
    category: ['fullstack'],
    github: 'https://github.com/devyoung-k/Brevoca',
    demo: '',
    featured: true,
    role: 'Solo Developer',
    duration: '2026.02 - 2026.03',
    team: '1명',
    detail: {
      overview:
        'Brevoca는 회의 음성을 텍스트로 변환하고 AI가 주제별 회의록을 자동 생성하는 웹 서비스입니다. 모노레포(apps/web + packages/contracts) 구조로 개발했으며, Supabase를 활용한 인증·DB·스토리지와 OpenAI STT/GPT 파이프라인을 결합했습니다. 워크스페이스 기반 멀티유저, 초대 시스템, 용어집 관리, DOCX 내보내기를 지원합니다.',
      responsibilities: [
        {
          title: 'Full Stack',
          items: [
            '모노레포 구조 설계와 Next.js Route Handlers 기반 API 구현을 담당했습니다.',
            'Supabase Auth/DB/Storage 연동과 마이그레이션 관리를 수행했습니다.',
            'OpenAI STT + GPT 파이프라인 구축과 프롬프트 엔지니어링을 담당했습니다.',
            '워크스페이스 기반 멀티유저 구조와 초대/권한 시스템을 구현했습니다.',
          ],
        },
      ],
      implementations: [
        {
          title: 'Frontend',
          items: [
            '브라우저 녹음과 파일 업로드 두 가지 방식의 오디오 입력 UI를 구현했습니다.',
            '회의 처리 상태를 폴링으로 추적하는 processing 화면을 구성했습니다.',
            '회의록 결과를 마크다운 형태로 렌더링하고 DOCX 내보내기를 지원합니다.',
            '워크스페이스 전환, 멤버 관리, 초대 흐름 UI를 구현했습니다.',
          ],
        },
        {
          title: 'Backend',
          items: [
            'Next.js Route Handlers로 회의 생성, 조회, 삭제, 작업 상태 관리 API를 구현했습니다.',
            'OpenAI STT로 음성을 텍스트로 변환하고, GPT로 주제·결정·액션 아이템 중심의 요약을 생성했습니다.',
            'Supabase Storage에 오디오를 직접 업로드하는 구조로 서버 부하를 줄였습니다.',
            'Supabase 마이그레이션으로 워크스페이스, 초대, 용어집, 오디오 청크 등의 스키마를 관리했습니다.',
          ],
        },
      ],
    },
    highlights: [
      '모노레포(apps/web + packages/contracts) 구조 설계',
      'OpenAI STT → GPT 회의록 자동 생성 파이프라인 구축',
      '워크스페이스 기반 멀티유저와 초대 시스템 구현',
      'Supabase Storage 직접 업로드로 오디오 처리 최적화',
      '주제·결정 사항·액션 아이템 중심의 프롬프트 엔지니어링',
      '회의록 DOCX 내보내기 기능 구현',
      'Supabase 마이그레이션 기반 스키마 관리 (10+ migrations)',
    ],
    challenges: [
      {
        problem:
          '대용량 오디오 파일 업로드 시 서버 요청 크기 제한에 걸려 업로드가 실패했습니다.',
        solution:
          '서버를 경유하지 않고 Supabase Storage에 직접 업로드하는 구조로 전환해 서버 부하와 크기 제한 문제를 해결했습니다.',
      },
      {
        problem:
          'LLM이 생성한 회의록의 품질이 일관되지 않아 핵심 결정 사항이나 액션 아이템이 누락되는 경우가 있었습니다.',
        solution:
          '주제별 구조화, 결정 사항, 액션 아이템을 명시적으로 요구하는 프롬프트를 설계하고, 오디오 전처리에서 무음 구간을 제거해 트랜스크립션 품질을 개선했습니다.',
      },
      {
        problem:
          '음성 인식 처리 중 네트워크 오류나 타임아웃으로 작업이 실패하는 경우가 있었습니다.',
        solution:
          '트랜스크립션 재시도 로직과 AbortController 기반 작업 취소 흐름을 구현해 안정성을 확보했습니다.',
      },
    ],
  },
];
