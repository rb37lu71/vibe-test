# 팀플 매니저 (Team Project Manager)

> **무임승차 없는 팀플** — 할 일 관리부터 포인트 시스템까지, 학교 팀 프로젝트를 위한 협업 도구

🔗 **Live:** https://vibe-coding-2-lac.vercel.app

---

## 주요 기능

| 페이지 | 기능 |
|--------|------|
| 📋 **할 일 보드** | 태스크 생성·수정·삭제, 칸반 3컬럼(To Do / In Progress / Done), 담당자·상태 필터, 마감 카운트다운 |
| 👥 **팀원** | 팀원 추가·수정·삭제, 역할별 필터 |
| 🏆 **리더보드** | 포인트 순위, 기한 내 완료 +10pt / 기한 초과 완료 −5pt |
| 📝 **회의록** | 회의록 작성·수정·삭제, 날짜·참석자·내용 기록 |
| 📅 **캘린더** | 월간 뷰, 일정 추가·수정·삭제 |
| 🏠 **대시보드** | 태스크 현황, 다가오는 마감, 팀 활동 요약 |

---

## 기술 스택

- **Framework**: React 18 + Vite
- **Routing**: React Router v7
- **State**: React Context + useReducer
- **Persistence**: localStorage
- **Styling**: Tailwind CSS v4 + CSS Variables (Design Tokens)
- **Deploy**: Vercel

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 (localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 프로젝트 구조

```
src/
  components/     # 재사용 UI 컴포넌트
    TaskCard/       - 칸반 태스크 카드 + 카운트다운
    TaskForm/       - 태스크 생성·수정 모달
    MemberCard/     - 팀원 카드 (포인트·순위)
    MemberForm/     - 팀원 추가·수정 모달
    MinuteCard/     - 회의록 카드 (펼치기/접기)
    MinuteForm/     - 회의록 작성·수정 모달
    CountdownTimer/ - 마감 D-N / HH:MM:SS 타이머
    PointToast/     - 포인트 적립·차감 알림
    FilterBar/      - 범용 필터 탭
    EmptyState/     - 빈 목록 안내
  pages/          # 라우트별 페이지
  context/        # TaskContext · TeamContext · MinuteContext · CalendarContext
  hooks/          # useLocalStorage
  styles/         # tokens.css · reset.css
```

---

## 포인트 규칙

- 기한 **내** 완료 → **+10pt**
- 기한 **초과** 완료 → **−5pt**
- Done 상태는 되돌릴 수 없음 (포인트 조작 방지)

---

## 개발 과정

OpenSpec (`openspec/changes/`) 워크플로우로 스펙 → 설계 → 구현 순으로 진행:

| Change | 내용 |
|--------|------|
| `complete-team-project-site` | 라우트 구조, 데이터 모델, Tasks·Team·Calendar·Dashboard 구현 |
| `session-3-gamification` | 포인트 시스템, 팀원 CRUD, 리더보드 |
| `session-4-minutes` | 회의록 CRUD |
