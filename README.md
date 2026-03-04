# DevPortfolio v3

React + TypeScript + Vite 기반 포트폴리오 웹사이트입니다.

## 핵심 포인트

- 다크모드/테마 토글 지원
- 프로젝트 목록/상세 페이지 분리
- Motion 기반 인터랙션 컴포넌트
- `src/data/projects.ts`, `src/data/profile.ts` 중심 데이터 관리

## 기술 스택

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Motion
- React Router 7

## 디렉터리

```text
src/
├── components/    # 재사용 UI 컴포넌트
├── data/          # 프로필/프로젝트 데이터
├── pages/         # 라우트 페이지
├── styles/        # 전역 스타일과 테마
└── lib/           # 유틸리티
```

## 실행

```bash
pnpm install
pnpm dev
```

## 검증

```bash
pnpm lint
pnpm build
```
