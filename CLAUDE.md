# Team Project Site

내부 팀 협업 도구. 할 일 관리, 팀원 소개, 일정 캘린더 기능을 제공하는 React 기반 싱글 페이지 앱.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: JavaScript (JSX)
- **Styling**: CSS Modules 또는 Tailwind CSS
- **Routing**: React Router v6
- **State**: React Context + useReducer (전역 상태 최소화)
- **Package manager**: npm

## Design System

`DESIGN.md` 의 Apple 디자인 시스템을 따른다.

- 배경: 흰색(`#ffffff`) ↔ 파치먼트(`#f5f5f7`) 타일 교차
- 인터랙션 색상은 Action Blue(`#0066cc`) 단일 사용
- 버튼: pill 형(`border-radius: 9999px`) 주요 CTA, utility rect(`border-radius: 8px`) 보조 액션
- 타이포: SF Pro / Inter, 17px 본문, display는 음수 letter-spacing
- 섀도는 카드/버튼에 쓰지 않음 — 이미지에만 `rgba(0,0,0,0.22) 3px 5px 30px`

## Project Structure

```
src/
  components/       # 재사용 UI 컴포넌트
    Nav/
    TaskCard/
    MemberCard/
    CalendarCell/
  pages/            # 라우트별 페이지 컴포넌트
    Dashboard/      # 메인 대시보드
    Tasks/          # 할 일 관리
    Team/           # 팀원 소개
    Calendar/       # 일정 캘린더
  context/          # React Context (전역 상태)
  hooks/            # 커스텀 훅
  styles/           # 전역 CSS 변수, reset
  App.jsx
  main.jsx
```

## Features

### 할 일 관리 (Tasks)
- 할 일 생성 / 수정 / 삭제
- 상태: `todo` | `in-progress` | `done`
- 담당자 배정, 마감일 설정
- 칸반 보드 또는 리스트 뷰

### 팀원 소개 (Team)
- 팀원 카드: 이름, 역할, 한 줄 소개, 아바타
- 역할별 필터링

### 일정 캘린더 (Calendar)
- 월간 뷰 기본
- 일정 추가 / 수정 / 삭제
- 날짜 클릭 시 해당일 일정 목록

## Development Commands

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
```

## Coding Conventions

- 컴포넌트 파일: PascalCase (`TaskCard.jsx`)
- 훅 파일: camelCase, `use` 접두사 (`useTaskList.js`)
- CSS 변수로 DESIGN.md 토큰 정의, 인라인 hex 금지
- props는 구조 분해 할당으로 받기
- 컴포넌트 당 하나의 책임 — 200줄 초과 시 분리 검토
- 주석은 WHY가 명확할 때만 작성

## CSS Token Setup

`src/styles/tokens.css` 에 DESIGN.md 토큰을 CSS 변수로 정의:

```css
:root {
  --color-primary: #0066cc;
  --color-canvas: #ffffff;
  --color-canvas-parchment: #f5f5f7;
  --color-ink: #1d1d1f;
  --color-surface-tile-dark: #272729;
  --color-hairline: #e0e0e0;

  --rounded-sm: 8px;
  --rounded-md: 11px;
  --rounded-lg: 18px;
  --rounded-pill: 9999px;

  --spacing-section: 80px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --font-display: "SF Pro Display", system-ui, -apple-system, sans-serif;
  --font-body: "SF Pro Text", system-ui, -apple-system, sans-serif;
}
```
