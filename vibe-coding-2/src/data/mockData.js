// mockData.js — 개발/데모용 샘플 데이터
//
// Context 초기화 시 localStorage가 비어있으면 아래 데이터를 seed 데이터로 쓸 수 있다.
// (단, 실제 Context 기본값은 빈 배열이므로 seed가 필요하면 Provider에서 명시적으로 주입)
//
// 사용 예 (개발 테스트):
//   import { MOCK_MEMBERS, MOCK_TASKS, MOCK_MINUTES } from '../../data/mockData'

// ── 팀원 (Members) ────────────────────────────────────────────────────────────

export const MOCK_MEMBERS = [
  {
    id: 'member-1',
    name: '김철수',
    role: '프론트엔드',
    points: 30,
    completedCount: 3,
  },
  {
    id: 'member-2',
    name: '이영희',
    role: '백엔드',
    points: 10,
    completedCount: 1,
  },
  {
    id: 'member-3',
    name: '박민준',
    role: 'UI/UX',
    points: -5,
    completedCount: 1,
  },
  {
    id: 'member-4',
    name: '최수진',
    role: 'PM',
    points: 20,
    completedCount: 2,
  },
]

// ── 태스크 (Tasks) ────────────────────────────────────────────────────────────
// deadline은 현재 시각 기준 상대 시간으로 설정 (mock이므로 고정 날짜 허용)

export const MOCK_TASKS = [
  {
    id: 'task-1',
    title: '랜딩 페이지 히어로 섹션 퍼블리싱',
    assigneeId: 'member-1',
    status: 'done',
    deadline: '2026-05-26T23:59:00',
    createdAt: '2026-05-20T09:00:00',
    completedAt: '2026-05-25T14:30:00',
  },
  {
    id: 'task-2',
    title: 'API 인증 엔드포인트 구현',
    assigneeId: 'member-2',
    status: 'in-progress',
    deadline: '2026-05-30T23:59:00',
    createdAt: '2026-05-21T10:00:00',
    completedAt: null,
  },
  {
    id: 'task-3',
    title: '칸반 보드 와이어프레임',
    assigneeId: 'member-3',
    status: 'done',
    deadline: '2026-05-20T23:59:00',
    createdAt: '2026-05-18T08:00:00',
    completedAt: '2026-05-22T11:00:00', // 기한 초과 완료 → -5pt
  },
  {
    id: 'task-4',
    title: 'README 및 프로젝트 일정 문서 작성',
    assigneeId: 'member-4',
    status: 'todo',
    deadline: '2026-06-01T23:59:00',
    createdAt: '2026-05-22T09:00:00',
    completedAt: null,
  },
  {
    id: 'task-5',
    title: '포인트 시스템 로직 코드 리뷰',
    assigneeId: 'member-1',
    status: 'todo',
    deadline: '2026-05-28T23:59:00',
    createdAt: '2026-05-25T09:00:00',
    completedAt: null,
  },
]

// ── 회의록 (Minutes) ──────────────────────────────────────────────────────────

export const MOCK_MINUTES = [
  {
    id: 'minute-1',
    date: '2026-05-27',
    attendees: '김철수, 이영희, 박민준, 최수진',
    content: `오늘 회의에서는 팀플 매니저 2차 스프린트 계획을 논의했습니다.

주요 결정 사항:
1. 칸반 보드는 컬럼 드래그 없이 버튼 방식으로 상태 변경
2. 포인트 규칙: 기한 내 완료 +10pt, 기한 초과 완료 -5pt
3. 회의록 입력은 단순 텍스트 에리어로 MVP 구현

다음 회의: 5월 29일 오후 2시`,
    createdAt: '2026-05-27T15:00:00',
  },
  {
    id: 'minute-2',
    date: '2026-05-23',
    attendees: '김철수, 최수진',
    content: `랜딩 페이지 디자인 리뷰 회의.

피드백:
- 히어로 섹션 카피 수정 필요 ("무임승차 없는 팀플" 문구 채택)
- CTA 버튼 색상 Action Blue(#0066cc) 통일
- 모바일 반응형 대응 확인 필요`,
    createdAt: '2026-05-23T16:30:00',
  },
]
