---
version: 1.0
name: AI-Lecture-PPT-Design-System
description: >
  A warm editorial design system for AI workflow lecture slides.
  Anchored on a tinted cream canvas with terracotta accent, serif display
  headlines, and structured light-mode surfaces. Inspired by Anthropic's
  Claude brand language — deliberately warm and editorial where most AI
  presentations use cold blue gradients and glowing icons.
  Target context: 강의 슬라이드 / PPTX / 16:9 (1920x1080)

colors:
  terracotta: "#cc785c"
  terracotta-deep: "#a9583e"
  terracotta-pale: "#f0e6df"
  terracotta-tint: "#faf0eb"
  canvas: "#faf9f5"
  surface-soft: "#f5f0e8"
  surface-card: "#efe9de"
  surface-card-strong: "#e8e0d2"
  surface-dark: "#181715"
  surface-dark-elevated: "#252320"
  ink: "#141413"
  body: "#3d3d3a"
  body-strong: "#252523"
  muted: "#6c6a64"
  muted-soft: "#8e8b82"
  on-terracotta: "#ffffff"
  on-dark: "#faf9f5"
  on-dark-soft: "#a09d96"
  hairline: "#e6dfd8"
  success: "#5db872"
  accent-teal: "#5db8a6"
  accent-amber: "#e8a55a"

typography:
  display-xl:
    fontFamily: "Noto Serif KR, Tiempos Headline, Georgia, serif"
    fontSize: 72pt
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -1.5px
    use: "커버 슬라이드 메인 타이틀"
  display-lg:
    fontFamily: "Noto Serif KR, Tiempos Headline, Georgia, serif"
    fontSize: 52pt
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -1px
    use: "섹션 타이틀, 주요 주장형 헤드라인"
  display-md:
    fontFamily: "Noto Serif KR, Tiempos Headline, Georgia, serif"
    fontSize: 36pt
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.5px
    use: "슬라이드 본문 타이틀"
  display-sm:
    fontFamily: "Noto Serif KR, Tiempos Headline, Georgia, serif"
    fontSize: 26pt
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.3px
    use: "카드 헤드라인, 단계 타이틀"
  title-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 20pt
    fontWeight: 500
    lineHeight: 1.4
    use: "카드 본문 강조, 부제"
  body-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 17pt
    fontWeight: 400
    lineHeight: 1.6
    use: "본문 텍스트 (최대 3줄)"
  body-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14pt
    fontWeight: 400
    lineHeight: 1.55
    use: "캡션, 출처, 각주"
  label:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12pt
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.2px
    use: "섹션 레이블, 배지 (대문자)"
  code:
    fontFamily: "JetBrains Mono, Fira Code, ui-monospace, monospace"
    fontSize: 16pt
    fontWeight: 400
    lineHeight: 1.65
    use: "명령어, 코드 블록"

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 56px
  xxl: 80px
  slide-margin: 96px
  slide-top: 72px
  slide-bottom: 56px

rounded:
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  pill: 9999px

canvas:
  width: 1920px
  height: 1080px
  aspect: "16:9"
  safe-zone: "96px margin on all sides"

components:
  section-label:
    backgroundColor: transparent
    textColor: "{colors.terracotta}"
    typography: "{typography.label}"
    letterSpacing: 1.2px
    use: "슬라이드 타이틀 위 카테고리 레이블"
  step-badge:
    backgroundColor: "{colors.terracotta-pale}"
    textColor: "{colors.terracotta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    use: "워크플로우 카드 상단 스텝 번호"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.lg}"
    padding: 40px
  comparison-column:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 48px
    accent-bar: "4px top border in {colors.terracotta} for highlighted column"
  code-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 40px
    header-bar:
      backgroundColor: "{colors.surface-dark-elevated}"
      height: 36px
  hairline-divider:
    color: "{colors.hairline}"
    thickness: 1px
    terracotta-variant: "2px / 40px width / terracotta color"
  slide-number:
    position: "bottom-right: 40px 96px"
    current: "{typography.label} / {colors.terracotta}"
    total: "{typography.label} / {colors.muted-soft}"
    format: "04 / 18"
---

## Overview

이 디자인 시스템은 **AI PPT 제작 워크플로우 강의**를 위한 슬라이드 제작 기준입니다.
Claude 브랜드 언어에서 출발하되, 강의 슬라이드의 맥락에 맞게 재구성했습니다.

**핵심 원칙:**

1. **한 장 = 하나의 주장** — 정보를 담지 말고, 논점을 전달할 것
2. **크림 캔버스 + 테라코타** — 따뜻하고 지적인 에디토리얼 톤을 유지
3. **어둡게 만들지 말 것** — 라이트 모드가 기본. 다크 서피스는 코드 카드에만 제한

---

## Colors

### 서피스 팔레트

| 역할 | 토큰 | 값 | 용도 |
|---|---|---|---|
| 배경 기본 | `canvas` | #faf9f5 | 모든 슬라이드 기본 배경 |
| 배경 소프트 | `surface-soft` | #f5f0e8 | 섹션 구분 밴드 |
| 카드 배경 | `surface-card` | #efe9de | 피처 카드, 비교 열 |
| 카드 강조 | `surface-card-strong` | #e8e0d2 | 강조 카드 |
| 다크 서피스 | `surface-dark` | #181715 | 코드/터미널 카드 (제한 사용) |

### 포인트 컬러 — Terracotta

| 역할 | 토큰 | 값 |
|---|---|---|
| 주요 액센트 | `terracotta` | #cc785c |
| 눌림/강조 | `terracotta-deep` | #a9583e |
| 옅은 배경 | `terracotta-pale` | #f0e6df |
| 매우 연한 틴트 | `terracotta-tint` | #faf0eb |

Terracotta 사용 범위:
- 슬라이드 번호, 섹션 레이블, 핵심 단어 하이라이트, 스텝 번호 → 사용
- 인용 커버 슬라이드 배경 → 전체 강의 최대 2장
- 본문 텍스트 전체, 연속 슬라이드 배경 → 금지

### 텍스트 팔레트

| 역할 | 토큰 | 값 |
|---|---|---|
| 헤드라인 | `ink` | #141413 |
| 강조 본문 | `body-strong` | #252523 |
| 본문 | `body` | #3d3d3a |
| 보조 | `muted` | #6c6a64 |
| 캡션 | `muted-soft` | #8e8b82 |

---

## Typography

### 폰트 패밀리

| 계층 | 패밀리 | 대체 폰트 |
|---|---|---|
| 디스플레이 (제목) | Noto Serif KR | Tiempos Headline, Georgia |
| 본문·UI | Pretendard | Inter, -apple-system |
| 코드·명령어 | JetBrains Mono | Fira Code, D2Coding |

Noto Serif KR은 한글 세리프로 지적이고 따뜻한 에디토리얼 톤을 유지합니다.
Pretendard는 가독성 높은 한글 휴머니스트 산세리프입니다.
이 조합이 "전형적인 AI 발표 자료" 느낌을 탈피시킵니다.

### 타입 위계

| 토큰 | 크기 | 웨이트 | 적용 위치 |
|---|---|---|---|
| `display-xl` | 72pt | 400 | 커버 슬라이드 타이틀 |
| `display-lg` | 52pt | 400 | 섹션 오프너, 주장형 타이틀 |
| `display-md` | 36pt | 400 | 일반 슬라이드 타이틀 |
| `display-sm` | 26pt | 400 | 카드 헤드라인, 단계 타이틀 |
| `title-md` | 20pt | 500 | 카드 부제, 강조 라벨 |
| `body-md` | 17pt | 400 | 슬라이드 본문 (최대 3줄) |
| `body-sm` | 14pt | 400 | 캡션, 출처 |
| `label` | 12pt | 500 | 배지, 레이블 (대문자+자간) |
| `code` | 16pt | 400 | 코드 블록 |

### 원칙

- 디스플레이 폰트는 weight 400 — 볼드 세리프는 과하게 느껴짐
- 네거티브 레터스페이싱 필수 — display-xl은 -1.5px, display-md는 -0.5px
- 본문은 최대 3줄 — 4줄 이상은 다음 슬라이드로 분리
- 세리프 제목 + 산세리프 본문 + 모노 코드 — 계층적 혼용

---

## Slide Layouts (레이아웃 규칙)

### 슬라이드 여백

```
상단: 72px   /   하단: 56px   /   좌우: 96px
콘텐츠 최대 너비: 1728px (1920 - 96×2)
```

### 슬라이드 번호

```
위치: 우하단 (bottom 40px, right 96px)
형식: "04 / 18"
현재 번호: label / terracotta
구분자+전체: label / muted-soft
```

---

## Slide Types (슬라이드 유형별 규칙)

### 1. COVER — 커버 슬라이드

배경: `canvas`  
레이아웃: 좌측 70% 텍스트 영역, 우측은 여백 또는 일러스트

```
[SECTION LABEL]          ← label / terracotta / 대문자 / 자간 1.2px

메인 타이틀              ← display-xl / ink / serif / 최대 2줄
서브타이틀               ← body-md / muted / 1줄

─────────────            ← terracotta 2px 수평선 / 40px

강사명 · 날짜            ← body-sm / muted-soft
```

규칙:
- 타이틀은 주장형 문장 또는 질문형
- 배경 이미지 사용 시 오버레이 opacity 15% 이하 (라이트 모드 유지)

---

### 2. STATEMENT — 주장형 슬라이드

배경: `canvas` 또는 `surface-soft`  
레이아웃: 수직·수평 중앙 정렬

```
메인 문장                ← display-lg / ink / 최대 2줄
서포트 문장              ← body-md / muted / 최대 2줄
```

규칙:
- 본문 없이 타이틀 하나로 완결
- 강조 키워드에만 terracotta 색상 적용
- `surface-soft` 배경일 때 좌측 4px terracotta vertical bar 사용 가능

---

### 3. CONTENT — 본문 슬라이드

배경: `canvas`  
레이아웃: 좌상단 타이틀 → 1px hairline → 본문

```
슬라이드 타이틀          ← display-md / ink
─────────────────────────  1px hairline
본문                     ← body-md / body / 최대 3줄
보조 텍스트 (선택)        ← body-sm / muted
```

규칙:
- 본문 최대 3줄
- 불릿 최대 3개 항목
- 불릿 기호: `–` 또는 `·` (일반 `•` 비권장)
- 아이콘 사용 시 라인 스타일만

---

### 4. COMPARISON — 2열 비교 슬라이드

배경: `canvas`  
레이아웃: 타이틀 → 2열 카드 (gap 32px)

```
슬라이드 타이틀          ← display-md / ink

┌──────────────────┐  ┌──────────────────┐
│ [레이블]          │  │ ★ [레이블]        │← label
│ ──── 일반 열      │  │ ──── terracotta   │← 4px 상단 바
│                  │  │                  │
│ 내용 · body-md   │  │ 내용 · body-md    │
│ 최대 4줄         │  │ 최대 4줄          │
└──────────────────┘  └──────────────────┘
  surface-card bg       surface-card-strong bg
```

규칙:
- 두 열 높이 통일
- 강조 열(우열)에만 terracotta 4px 상단 바
- 두 열 모두 어두운 배경 금지

---

### 5. WORKFLOW — 단계형 슬라이드

배경: `canvas`  
레이아웃: 타이틀 → 수평 단계 카드 (3~5단계 권장)

```
슬라이드 타이틀

[01]        →    [02]        →    [03]        →    [04]
step-badge       step-badge       step-badge       step-badge

단계 타이틀      단계 타이틀      단계 타이틀      단계 타이틀
display-sm       display-sm       display-sm       display-sm

설명 2줄         설명 2줄         설명 2줄         설명 2줄
body-sm/muted    body-sm/muted    body-sm/muted    body-sm/muted

surface-card 카드 배경 / rounded-lg / padding 32px
```

화살표: `hairline` 색상, 1.5px, terracotta 삼각 head  
강조 단계: `surface-card-strong` + 좌측 4px terracotta border  
완료 단계: `surface-soft` + `muted` 텍스트

---

### 6. CODE — 코드/명령어 슬라이드

배경: `canvas` (슬라이드 배경은 항상 밝게 유지)  
코드 영역: `surface-dark` 카드

```
슬라이드 타이틀          ← display-md / ink / canvas 배경

┌──────────────────────────────────────────┐
│ ● ● ●                      terminal.sh  │  ← surface-dark-elevated / 36px
│──────────────────────────────────────────│
│                                          │
│  $ npx getdesign@latest add claude       │  ← code / on-dark
│                                          │
│  ✓ DESIGN.md installed                   │  ← accent-teal
│    → DESIGN.md                           │  ← muted-soft
│                                          │
└──────────────────────────────────────────┘
  surface-dark / rounded-lg / padding 40px
```

구문 강조:
- 기본: `on-dark` (#faf9f5)
- 문자열/값: `accent-amber` (#e8a55a)
- 주석: `on-dark-soft` (#a09d96)
- 강조: `terracotta` (#cc785c)

규칙:
- 슬라이드 배경 전체를 어둡게 만들지 않음
- 코드 줄 최대 60자 (초과 시 줄바꿈 표시 `↩`)
- 강조할 줄: 좌측 3px terracotta border + 해당 줄 배경 약간 밝게

---

### 7. QUOTE — 인용/임팩트 슬라이드

**버전 A — 다크 포인트 (전체 강의 최대 2장):**

배경: `terracotta` (#cc785c)

```
"                        ← 인용 부호 80pt / opacity 30% / on-terracotta

인용문 최대 2줄          ← display-md / on-terracotta / weight 400

출처                     ← body-sm / on-terracotta / opacity 70%
```

**버전 B — 라이트 (권장):**

배경: `canvas`

```
│ 인용문                 ← display-md / ink
│ 최대 2줄
← 좌측 8px terracotta vertical bar

출처                     ← body-sm / muted
```

---

### 8. IMAGE — 이미지 포함 슬라이드

**레이아웃 A — 이미지 우측 50%:**
```
좌측 50%: 타이틀 + 본문 (canvas 배경)
우측 50%: 이미지 (rounded-xl 클립, surface-soft 주변 배경)
```

**레이아웃 B — 이미지 전체 배경:**
```
배경: 이미지
오버레이: canvas 색상 / opacity 최대 20% (라이트 모드 유지)
텍스트: surface-card 반투명 카드 위에 배치
```

규칙:
- 이미지 위 오버레이를 어둡게 만들지 않음
- 스크린샷: rounded-lg 클립 + hairline 1px 테두리
- 이미지 캡션: body-sm / muted-soft / 이미지 하단 8px

---

## Slide Sequence Rules (흐름 규칙)

### 서피스 리듬

같은 배경 모드를 3장 이상 연속 사용 금지. 권장 흐름:

```
Cover (canvas)
  ↓
Statement (surface-soft)
  ↓
Content (canvas)
  ↓
Workflow (canvas + surface-card 카드)
  ↓
Code (canvas bg + surface-dark 카드)
  ↓
Comparison (canvas + surface-card 2열)
  ↓
Quote (canvas 라이트 버전 권장 / terracotta 버전 희소)
```

### 타이틀 패턴

| 슬라이드 유형 | 패턴 | 예시 |
|---|---|---|
| 개념 소개 | [주어]는 [동사]한다 | "Design.md는 일관성을 만든다" |
| 비교 | [A]와 [B]의 차이 | "프롬프트 방식과 시스템 방식의 차이" |
| 워크플로우 | [동사]하는 방법 | "Claude Code로 슬라이드 만드는 방법" |
| 인사이트 | 주장형 선언 | "도구보다 워크플로우가 먼저다" |
| 코드 | [도구명] + [행위] | "Claude Code로 슬라이드 생성하기" |

---

## Do's and Don'ts

### Do

- 모든 슬라이드 배경은 `canvas` (#faf9f5). 순백 금지
- 한 슬라이드 = 하나의 주장. 내용이 넘치면 슬라이드 분리
- 제목은 주장형 — "AI 도구 소개" (X) → "AI 도구가 기획 시간을 줄인다" (O)
- 세리프 타이틀 — Noto Serif KR weight 400, 네거티브 레터스페이싱 유지
- 코드/명령어는 반드시 code-card 컴포넌트 안에
- Terracotta는 포인트만 — 강조 단어, 레이블, 번호에만
- 다크 카드를 사용할 때도 슬라이드 배경은 밝게 유지
- 본문 3줄 이하 — 읽는 슬라이드 아닌 보는 슬라이드

### Don't

- 파란 그라디언트 배경 금지 — 전형적인 AI PPT의 반대를 지향
- 아이콘 남발 금지 — 개념 보조 목적에만
- 볼드 세리프 금지 — weight 400 고정
- 4열 이상 비교 금지 — 2열 구조로 단순화
- 본문 4줄 이상 금지
- Terracotta 배경 슬라이드 3장 이상 금지
- 이미지 위 어두운 오버레이 금지
- 코드를 텍스트 상자에 날것으로 배치 금지

---

## Color Usage Reference

```
canvas          80%  슬라이드 배경 기본
surface-card    40%  카드 배경
surface-soft    20%  섹션 강조 배경
surface-dark    10%  코드 카드 전용
terracotta       5%  포인트 액센트만
```

---

## Font Substitution

| 이상적 | 현실적 대체 | PPTX 안전 폰트 |
|---|---|---|
| Noto Serif KR | KoPubWorld 바탕 | 바탕체 |
| Pretendard | Noto Sans KR | 나눔고딕, 맑은 고딕 |
| JetBrains Mono | D2Coding | Courier New |

PPTX 배포 시 폰트 임베딩 필수. 또는 PDF export 권장.

---

## Build Reference (build_pptx.py 연동)

```python
# DESIGN.md 토큰 참조 예시
COLORS = {
    "canvas":               "#faf9f5",
    "terracotta":           "#cc785c",
    "terracotta_deep":      "#a9583e",
    "terracotta_pale":      "#f0e6df",
    "surface_soft":         "#f5f0e8",
    "surface_card":         "#efe9de",
    "surface_card_strong":  "#e8e0d2",
    "surface_dark":         "#181715",
    "surface_dark_elevated":"#252320",
    "ink":                  "#141413",
    "body":                 "#3d3d3a",
    "muted":                "#6c6a64",
    "muted_soft":           "#8e8b82",
    "on_dark":              "#faf9f5",
    "on_dark_soft":         "#a09d96",
    "hairline":             "#e6dfd8",
    "accent_amber":         "#e8a55a",
    "accent_teal":          "#5db8a6",
}

FONTS = {
    "display": "Noto Serif KR",
    "body":    "Pretendard",
    "code":    "JetBrains Mono",
}

SLIDE = {
    "width_emu":    9144000,   # 1920px at 96dpi in EMU
    "height_emu":   5143500,   # 1080px
    "margin_emu":   457200,    # 96px
    "top_emu":      342900,    # 72px
    "bottom_emu":   266700,    # 56px
}

FONT_SIZES = {
    "display_xl": 72,
    "display_lg": 52,
    "display_md": 36,
    "display_sm": 26,
    "title_md":   20,
    "body_md":    17,
    "body_sm":    14,
    "label":      12,
    "code":       16,
}

ROUNDED = {
    "sm":  914,     # 6px in EMU (approx)
    "md":  1524,    # 10px
    "lg":  2134,    # 14px
    "xl":  3048,    # 20px
}

# 슬라이드 유형별 레이아웃 함수 인터페이스
# add_cover_slide(prs, title, subtitle, label="")
# add_statement_slide(prs, title, support="")
# add_content_slide(prs, title, body_lines, caption="")
# add_comparison_slide(prs, title, left_col, right_col)
#   left_col / right_col = {"label": str, "title": str, "body": [str], "highlight": bool}
# add_workflow_slide(prs, title, steps)
#   steps = [{"number": "01", "title": str, "body": str, "highlight": bool}]
# add_code_slide(prs, title, code_text, filename="", highlights=[])
# add_quote_slide(prs, quote, source="", dark=False)
# add_image_slide(prs, title, body, image_path, layout="right")
```
