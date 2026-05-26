const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.3" x 7.5"
pres.title = 'ChatGPT 실무활용 강의';

// ── COLOR TOKENS ──────────────────────────────────────────────
const C = {
  canvas:           "faf9f5",
  surfaceSoft:      "f5f0e8",
  surfaceCard:      "efe9de",
  surfaceCardStrong:"e8e0d2",
  surfaceDark:      "181715",
  surfaceDarkElev:  "252320",
  terracotta:       "cc785c",
  terracottaPale:   "f0e6df",
  ink:              "141413",
  body:             "3d3d3a",
  muted:            "6c6a64",
  mutedSoft:        "8e8b82",
  onDark:           "faf9f5",
  hairline:         "e6dfd8",
};

// ── FONTS ─────────────────────────────────────────────────────
const F = {
  serif:  "Georgia",
  body:   "Calibri",
  code:   "Courier New",
};

// ── SIZES (pt) ────────────────────────────────────────────────
const SZ = {
  displayXL: 54,
  displayLG: 40,
  displayMD: 28,
  displaySM: 20,
  titleMD:   16,
  bodyMD:    13,
  bodySM:    11,
  label:     10,
  code:      12,
};

// ── SLIDE DIMENSIONS ─────────────────────────────────────────
const SW = 13.33; // slide width
const SH = 7.5;   // slide height
const TOTAL = 54;

// ── HELPER: slide number ──────────────────────────────────────
function addSlideNumber(slide, num) {
  const label = `${String(num).padStart(2,'0')} / ${TOTAL}`;
  // current number in terracotta
  slide.addText([
    { text: String(num).padStart(2,'0'), options: { color: C.terracotta, bold: false } },
    { text: ` / ${TOTAL}`, options: { color: C.mutedSoft, bold: false } },
  ], {
    x: SW - 1.5, y: SH - 0.45, w: 1.3, h: 0.3,
    fontFace: F.body, fontSize: SZ.label,
    align: "right", margin: 0,
  });
}

// ── HELPER: hairline under title ──────────────────────────────
function addTitleLine(slide, y) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: y, w: SW - 2, h: 0.01,
    fill: { color: C.hairline }, line: { color: C.hairline, width: 0 },
  });
}

// ── HELPER: content title + line ─────────────────────────────
function addContentTitle(slide, title, y0) {
  slide.addText(title, {
    x: 1, y: y0, w: SW - 2, h: 0.55,
    fontFace: F.serif, fontSize: SZ.displayMD,
    color: C.ink, bold: false, margin: 0,
  });
  addTitleLine(slide, y0 + 0.55);
}

// ── HELPER: body text list ────────────────────────────────────
function addBodyList(slide, items, x, y, w, h) {
  const runs = items.map((item, i) => {
    const isLast = i === items.length - 1;
    return { text: item, options: { breakLine: !isLast } };
  });
  slide.addText(runs, {
    x, y, w, h,
    fontFace: F.body, fontSize: SZ.bodyMD,
    color: C.body, valign: "top", margin: 0,
    paraSpaceAfter: 6,
  });
}

// ── SLIDE 1: COVER ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };

  // Section label
  s.addText("ChatGPT 업무 활용법 강의", {
    x: 1, y: 0.8, w: 10, h: 0.35,
    fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
    bold: true, charSpacing: 2, margin: 0,
  });

  // Main title
  s.addText("업무 기획, 콘텐츠 제작,\n마케팅, 이미지 생성까지", {
    x: 1, y: 1.3, w: 10, h: 2.8,
    fontFace: F.serif, fontSize: SZ.displayXL,
    color: C.ink, bold: false, margin: 0,
  });

  // Subtitle
  s.addText("AI를 업무에 바로 적용하는 실전 강의", {
    x: 1, y: 4.2, w: 8, h: 0.5,
    fontFace: F.body, fontSize: SZ.bodyMD, color: C.muted, margin: 0,
  });

  // Terracotta line
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 6.0, w: 0.56, h: 0.03,
    fill: { color: C.terracotta }, line: { color: C.terracotta, width: 0 },
  });

  // Instructor/date
  s.addText("2025", {
    x: 1, y: 6.15, w: 6, h: 0.35,
    fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft, margin: 0,
  });

  addSlideNumber(s, 1);
}

// ── SLIDE 2: WORKFLOW (6 steps) ───────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "오늘 강의에서 얻어갈 것", 0.5);

  const steps = ["ChatGPT 기본 이해", "주요 기능", "요금제와 설정", "프롬프트 작성법", "실무 활용 예시", "이미지 생성 AI"];
  const descs = ["개념과 작동 원리", "16가지 핵심 기능", "플랜별 차이·보안", "구조와 기법", "5가지 업무 유형", "프롬프트·검수"];
  const cardW = 1.8;
  const cardH = 2.2;
  const startX = 0.85;
  const gapX = 0.18;
  const cardY = 1.55;

  steps.forEach((step, i) => {
    const cx = startX + i * (cardW + gapX);
    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    // Step badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.15, y: cardY + 0.2, w: 0.5, h: 0.32,
      fill: { color: C.terracottaPale }, line: { color: C.terracottaPale, width: 0 },
    });
    s.addText(String(i + 1), {
      x: cx + 0.15, y: cardY + 0.2, w: 0.5, h: 0.32,
      fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    // Step title
    s.addText(step, {
      x: cx + 0.12, y: cardY + 0.65, w: cardW - 0.24, h: 0.65,
      fontFace: F.body, fontSize: SZ.bodySM + 1, color: C.ink,
      bold: true, margin: 0, wrap: true,
    });
    // Description
    s.addText(descs[i], {
      x: cx + 0.12, y: cardY + 1.35, w: cardW - 0.24, h: 0.7,
      fontFace: F.body, fontSize: SZ.label, color: C.muted,
      margin: 0, wrap: true,
    });
    // Arrow between cards
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: cx + cardW + 0.01, y: cardY + cardH / 2,
        w: gapX - 0.02, h: 0,
        line: { color: C.hairline, width: 1.5 },
      });
    }
  });

  addSlideNumber(s, 2);
}

// ── SLIDE 3: STATEMENT (surface-soft bg) ─────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.surfaceSoft };

  s.addText("AI 활용 능력이\n실무 생산성의 차이를 만든다", {
    x: 1.5, y: 2.2, w: SW - 3, h: 2.4,
    fontFace: F.serif, fontSize: SZ.displayLG,
    color: C.ink, align: "center", bold: false, margin: 0,
  });
  s.addText("ChatGPT 2022년 11월 출시 · 2026년 5월 기준 약 3년 5개월 경과", {
    x: 1.5, y: 4.8, w: SW - 3, h: 0.5,
    fontFace: F.body, fontSize: SZ.bodyMD,
    color: C.muted, align: "center", margin: 0,
  });

  addSlideNumber(s, 3);
}

// ── SLIDE 4: CONTENT (2-column list) ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "ChatGPT로 할 수 있는 일", 0.5);

  const col1 = [
    "– 초안 작성 (보고서·이메일·광고 문구)",
    "– 자료 요약 및 회의록 정리",
    "– 아이디어 발굴 (제목·기획·이벤트)",
    "– 문서 구조화 및 표 정리",
  ];
  const col2 = [
    "– 광고 문구 / 콘텐츠 기획",
    "– 고객 응대 문안 작성",
    "– 이미지 생성 (썸네일·배너·표지)",
    "– 데이터 정리 / 코드 자동화 보조",
  ];

  const listY = 1.35;
  const listH = 3.5;
  addBodyList(s, col1, 1, listY, 5.5, listH);
  addBodyList(s, col2, 7, listY, 5.5, listH);

  s.addText("핵심: 업무의 시작 속도를 크게 높여준다", {
    x: 1, y: SH - 0.85, w: SW - 2, h: 0.35,
    fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft,
    italic: true, margin: 0,
  });

  addSlideNumber(s, 4);
}

// ── SLIDE 5: COMPARISON ───────────────────────────────────────
function addComparison(s, title, leftLabel, leftItems, rightLabel, rightItems, slideNum) {
  s.background = { color: C.canvas };
  addContentTitle(s, title, 0.5);

  const colY = 1.4;
  const colH = SH - 2.2;
  const colW = (SW - 2.6) / 2;

  // Left card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: colY, w: colW, h: colH,
    fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
  });
  s.addText(leftLabel, {
    x: 1.2, y: colY + 0.2, w: colW - 0.3, h: 0.35,
    fontFace: F.body, fontSize: SZ.label, color: C.muted,
    bold: true, charSpacing: 1, margin: 0,
  });
  addBodyList(s, leftItems, 1.2, colY + 0.65, colW - 0.3, colH - 0.9);

  // Right card
  const rx = 1 + colW + 0.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: colY, w: colW, h: colH,
    fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
  });
  // Terracotta top border
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: colY, w: colW, h: 0.05,
    fill: { color: C.terracotta }, line: { color: C.terracotta, width: 0 },
  });
  s.addText(rightLabel, {
    x: rx + 0.2, y: colY + 0.2, w: colW - 0.3, h: 0.35,
    fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
    bold: true, charSpacing: 1, margin: 0,
  });
  const rightRuns = rightItems.map((item, i) => ({
    text: item, options: { breakLine: i < rightItems.length - 1 }
  }));
  s.addText(rightRuns, {
    x: rx + 0.2, y: colY + 0.65, w: colW - 0.3, h: colH - 0.9,
    fontFace: F.body, fontSize: SZ.bodyMD, color: C.ink,
    valign: "top", margin: 0, paraSpaceAfter: 6,
  });

  addSlideNumber(s, slideNum);
}

{
  const s = pres.addSlide();
  addComparison(s,
    "ChatGPT를 잘 쓰는 사람의 특징",
    "아쉬운 방식",
    ["– \"광고 문구 써줘\"", "– 결과를 그대로 사용", "– 형식 미지정", "– 한 번에 끝내려 함"],
    "잘 쓰는 방식",
    ["– 대상·채널·톤까지 함께 설명", "– 부족한 부분을 다시 수정", "– 표·대본·목록 형식 지정", "– 후속 질문으로 결과 개선"],
    5
  );
}

// ── SLIDE 6: STATEMENT ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };

  s.addText("ChatGPT는 정답 자판기가 아니다", {
    x: 1.5, y: 2.3, w: SW - 3, h: 1.6,
    fontFace: F.serif, fontSize: SZ.displayLG,
    color: C.ink, align: "center", bold: false, margin: 0,
  });
  s.addText("초안 생성과 정리에 강하지만, 모든 답이 사실이라는 보장은 없다", {
    x: 1.5, y: 4.1, w: SW - 3, h: 0.5,
    fontFace: F.body, fontSize: SZ.bodyMD,
    color: C.muted, align: "center", margin: 0,
  });

  addSlideNumber(s, 6);
}

// ── SECTION OPENER helper ─────────────────────────────────────
function addSectionOpener(pres, sectionNum, title, slideNum) {
  const s = pres.addSlide();
  s.background = { color: C.surfaceSoft };

  s.addText(sectionNum, {
    x: 0, y: 2.4, w: SW, h: 0.4,
    fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
    align: "center", bold: true, charSpacing: 2, margin: 0,
  });
  s.addText(title, {
    x: 1, y: 2.95, w: SW - 2, h: 1.8,
    fontFace: F.serif, fontSize: SZ.displayLG,
    color: C.ink, align: "center", bold: false, margin: 0,
  });

  addSlideNumber(s, slideNum);
  return s;
}

// ── SLIDE 7: SECTION OPENER ───────────────────────────────────
addSectionOpener(pres, "1부", "ChatGPT 이해하기", 7);

// ── SLIDE 8: CONTENT with 4 cards ────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "ChatGPT란 무엇인가", 0.5);

  s.addText("ChatGPT는 대화형 생성 AI다", {
    x: 1, y: 1.2, w: SW - 2, h: 0.4,
    fontFace: F.body, fontSize: SZ.bodyMD, color: C.muted, margin: 0,
  });

  const cards = [
    { term: "Chat / 대화형", desc: "이어서 수정하며 결과물을 만든다" },
    { term: "Generative / 생성", desc: "글·표·아이디어·이미지를 새로 만든다" },
    { term: "Pre-trained / 사전학습", desc: "방대한 데이터를 미리 학습한 상태" },
    { term: "Transformer / 구조", desc: "문맥을 보고 다음 표현을 예측한다" },
  ];
  const cardW = 2.7;
  const cardH = 2.5;
  const startX = 0.85;
  const gapX = 0.25;
  const cardY = 1.8;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    // Terracotta accent top
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: 0.04,
      fill: { color: C.terracotta }, line: { color: C.terracotta, width: 0 },
    });
    s.addText(card.term, {
      x: cx + 0.18, y: cardY + 0.25, w: cardW - 0.36, h: 0.7,
      fontFace: F.body, fontSize: SZ.titleMD, color: C.ink,
      bold: true, margin: 0, wrap: true,
    });
    s.addText(card.desc, {
      x: cx + 0.18, y: cardY + 1.05, w: cardW - 0.36, h: 1.3,
      fontFace: F.body, fontSize: SZ.bodyMD, color: C.body,
      margin: 0, wrap: true,
    });
  });

  addSlideNumber(s, 8);
}

// ── SLIDE 9: WORKFLOW (3 steps) ───────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "LLM이란 무엇인가", 0.5);

  const steps = ["데이터 학습", "문맥 이해", "답변 생성"];
  const descs = ["방대한 언어 데이터를 사전 학습", "지금까지의 대화 흐름을 파악", "가능성 높은 다음 표현을 생성"];
  const cardW = 3.2;
  const cardH = 2.4;
  const startX = 1.1;
  const gapX = 0.5;
  const cardY = 1.8;

  steps.forEach((step, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.18, y: cardY + 0.22, w: 0.55, h: 0.35,
      fill: { color: C.terracottaPale }, line: { color: C.terracottaPale, width: 0 },
    });
    s.addText(String(i + 1), {
      x: cx + 0.18, y: cardY + 0.22, w: 0.55, h: 0.35,
      fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(step, {
      x: cx + 0.18, y: cardY + 0.72, w: cardW - 0.36, h: 0.55,
      fontFace: F.body, fontSize: SZ.displaySM, color: C.ink,
      bold: true, margin: 0,
    });
    s.addText(descs[i], {
      x: cx + 0.18, y: cardY + 1.35, w: cardW - 0.36, h: 0.9,
      fontFace: F.body, fontSize: SZ.bodyMD, color: C.muted,
      margin: 0, wrap: true,
    });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: cx + cardW + 0.01, y: cardY + cardH / 2,
        w: gapX - 0.02, h: 0,
        line: { color: C.hairline, width: 1.5 },
      });
    }
  });

  s.addText("ChatGPT = LLM을 대화형으로 쓸 수 있게 만든 서비스", {
    x: 1, y: SH - 0.85, w: SW - 2, h: 0.35,
    fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft,
    italic: true, margin: 0,
  });

  addSlideNumber(s, 9);
}

// ── SLIDE 10: CONTENT ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "ChatGPT는 사람처럼 쓰되, 더 명확하게 시켜야 한다", 0.5);

  const items = [
    "– 내 업무 상황을 자동으로 알지는 못한다",
    "– 역할, 목표, 배경, 자료, 형식, 제약조건을 알려줘야 한다",
    "– 신입 직원에게 일을 맡기듯 구체적으로 설명해야 결과가 좋다",
  ];
  addBodyList(s, items, 1, 1.5, SW - 2, 3.5);

  addSlideNumber(s, 10);
}

// ── SLIDE 11: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "ChatGPT의 강점과 한계",
    "강점",
    ["– 빠른 초안 작성", "– 긴 자료 요약", "– 아이디어 발굴", "– 문체 변환", "– 표·체크리스트 정리", "– 반복 업무 템플릿화"],
    "한계 (주의)",
    ["– 사실 오류 가능성", "– 최신 정보 확인 필요", "– 전문 판단 대체 불가", "– 개인정보·기밀 관리 필요"],
    11
  );
}

// ── SLIDE 12: SECTION OPENER ──────────────────────────────────
addSectionOpener(pres, "2부", "ChatGPT 주요 기능과 설정", 12);

// ── SLIDE 13: FEATURE CHIP GRID ──────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "ChatGPT 주요 기능 한눈에 보기", 0.5);

  const chips = [
    "채팅", "모델 선택", "파일·이미지 첨부", "웹 검색",
    "이미지 생성", "데이터 분석", "Canvas", "Projects",
    "GPTs", "Tasks", "Deep Research", "Apps",
    "Agent", "Codex", "Memory", "Custom Instructions",
  ];
  const chipW = 2.6;
  const chipH = 0.52;
  const gapX = 0.22;
  const gapY = 0.22;
  const cols = 8;
  const rows = 2;
  const totalW = cols * chipW + (cols - 1) * gapX;
  const startX = (SW - totalW) / 2;
  const startY = 1.7;

  chips.forEach((chip, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (chipW + gapX);
    const cy = startY + row * (chipH + gapY);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: chipW, h: chipH,
      fill: { color: C.surfaceCard }, line: { color: C.hairline, width: 0.5 },
    });
    s.addText(chip, {
      x: cx, y: cy, w: chipW, h: chipH,
      fontFace: F.body, fontSize: SZ.label + 1, color: C.body,
      align: "center", valign: "middle", margin: 0,
    });
  });

  addSlideNumber(s, 13);
}

// ── SLIDE 14: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "기능 1 — 모델 선택과 채팅",
    "가벼운 작업",
    ["– 빠른 초안 작성", "– 간단한 질문", "– 빠른 모델 사용"],
    "복잡한 작업",
    ["– 긴 문서 분석", "– 전략 수립·논리 검토", "– 추론 강화 모델 사용"],
    14
  );
}

// ── SLIDE 15: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "기능 2 — 웹 검색 vs Deep Research",
    "웹 검색",
    ["– 최신 뉴스·정책 확인", "– 경쟁사 정보 확인", "– 빠른 팩트 체크"],
    "Deep Research",
    ["– 여러 출처 기반 보고서", "– 시장·트렌드 심층 조사", "– 경쟁사·고객 페르소나 분석"],
    15
  );
}

// ── SLIDE 16: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "기능 3 — Canvas vs Projects",
    "Canvas",
    ["– 긴 글·강의안 수정", "– 상세페이지·대본 편집", "– 문서를 옆에 열고 수정"],
    "Projects",
    ["– 업무 단위로 대화 묶기", "– 파일·지침 통합 관리", "– 반복 프로젝트 효율화"],
    16
  );
}

// ── SLIDE 17: 3 FEATURE CARDS ─────────────────────────────────
function addFeatureCards(s, title, cards, slideNum) {
  s.background = { color: C.canvas };
  addContentTitle(s, title, 0.5);

  const cardW = (SW - 2.6) / 3;
  const cardH = SH - 2.5;
  const gapX = 0.3;
  const startX = 1;
  const cardY = 1.6;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    s.addText(card.title, {
      x: cx + 0.2, y: cardY + 0.3, w: cardW - 0.4, h: 0.7,
      fontFace: F.body, fontSize: SZ.displaySM, color: C.ink,
      bold: true, margin: 0, wrap: true,
    });
    s.addText(card.desc, {
      x: cx + 0.2, y: cardY + 1.15, w: cardW - 0.4, h: cardH - 1.4,
      fontFace: F.body, fontSize: SZ.bodyMD, color: C.muted,
      margin: 0, wrap: true,
    });
  });

  addSlideNumber(s, slideNum);
}

{
  const s = pres.addSlide();
  addFeatureCards(s, "기능 4 — GPTs · Tasks · Apps", [
    { title: "GPTs / 맞춤형 챗봇", desc: "반복 업무용 GPT를 만들어 재사용" },
    { title: "Tasks / 예약 실행", desc: "매주 뉴스 요약, 반복 알림 자동화" },
    { title: "Apps / 앱 연결", desc: "Google Drive·Gmail·Slack 연동\n(보안 정책 확인 필수)" },
  ], 17);
}

// ── SLIDE 18: 3 FEATURE CARDS ─────────────────────────────────
{
  const s = pres.addSlide();
  addFeatureCards(s, "기능 5 — 이미지 생성 · Agent · Codex", [
    { title: "이미지 생성 / 시각 자료", desc: "상세페이지·썸네일·배너·강의 표지 시안" },
    { title: "Agent / 복합 작업", desc: "여러 단계를 거치는 자동화 작업" },
    { title: "Codex / 코드·자동화", desc: "업무 자동화 스크립트·데이터 정리 코드" },
  ], 18);
}

// ── SLIDE 19: TABLE ───────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "요금제별 차이 한눈에 보기", 0.5);

  const headerStyle = { fill: { color: C.surfaceCardStrong }, color: C.ink, bold: true, fontFace: F.body, fontSize: SZ.bodyMD };
  const rowStyle0  = { fill: { color: C.canvas },      color: C.body, fontFace: F.body, fontSize: SZ.bodyMD };
  const rowStyle1  = { fill: { color: C.surfaceCard }, color: C.body, fontFace: F.body, fontSize: SZ.bodyMD };

  const tableData = [
    [
      { text: "요금제",  options: headerStyle },
      { text: "대상",    options: headerStyle },
      { text: "주요 특징", options: headerStyle },
    ],
    [
      { text: "Free / Go",   options: rowStyle0 },
      { text: "가벼운 체험", options: rowStyle0 },
      { text: "기본 기능, 사용량 제한", options: rowStyle0 },
    ],
    [
      { text: "Plus",         options: rowStyle1 },
      { text: "개인 실무자 (기본 추천)", options: rowStyle1 },
      { text: "고급 모델·이미지·Deep Research·GPTs·Projects", options: rowStyle1 },
    ],
    [
      { text: "Pro",          options: rowStyle0 },
      { text: "사용량 많은 개인 전문가", options: rowStyle0 },
      { text: "긴 작업·고난도 분석·사용량 확대", options: rowStyle0 },
    ],
    [
      { text: "Business",     options: rowStyle1 },
      { text: "팀 단위",      options: rowStyle1 },
      { text: "관리자 기능·팀 워크스페이스·데이터 보호", options: rowStyle1 },
    ],
    [
      { text: "Enterprise",   options: rowStyle0 },
      { text: "대규모 조직",  options: rowStyle0 },
      { text: "보안·권한·규정 준수·조직 관리", options: rowStyle0 },
    ],
  ];

  s.addTable(tableData, {
    x: 1, y: 1.4, w: SW - 2, h: 4.5,
    border: { pt: 0.5, color: C.hairline },
    colW: [2.0, 3.0, 6.33],
    rowH: 0.65,
  });

  s.addText("※ 요금제와 기능 한도는 변경될 수 있으므로 도입 전 공식 페이지 확인 필요", {
    x: 1, y: SH - 0.85, w: SW - 2, h: 0.35,
    fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft,
    italic: true, margin: 0,
  });

  addSlideNumber(s, 19);
}

// ── SLIDE 20: CHECKLIST ───────────────────────────────────────
function addChecklist(s, title, items, caption, slideNum) {
  s.background = { color: C.canvas };
  addContentTitle(s, title, 0.5);

  const runs = items.map((item, i) => ({
    text: item, options: { breakLine: i < items.length - 1 }
  }));
  s.addText(runs, {
    x: 1, y: 1.4, w: SW - 2, h: SH - 2.5,
    fontFace: F.body, fontSize: SZ.bodyMD, color: C.body,
    valign: "top", margin: 0, paraSpaceAfter: 8,
  });

  if (caption) {
    s.addText(caption, {
      x: 1, y: SH - 0.85, w: SW - 2, h: 0.35,
      fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft,
      italic: true, margin: 0,
    });
  }
  addSlideNumber(s, slideNum);
}

{
  const s = pres.addSlide();
  addChecklist(s,
    "설정에서 꼭 확인할 것",
    [
      "– 언어 설정 확인",
      "– 음성 설정 확인",
      "– 맞춤형 지침 (Custom Instructions) 작성",
      "– Memory 저장 내용 확인 및 관리",
      "– 채팅 기록 참고 설정 확인",
      "– 연결된 앱 (Apps) 점검",
      "– Data Controls 설정 확인",
      "– 민감한 대화는 Temporary Chat 활용",
    ],
    null, 20
  );
}

// ── SLIDE 21: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "Memory와 맞춤형 지침",
    "맞춤형 지침",
    ["– 사용자가 직접 작성", "– 항상 반영할 기본 요청", "– 예: \"답변은 한국어로, 표로 정리\""],
    "Memory",
    ["– ChatGPT가 자동으로 기억", "– 선호·프로젝트·습관 저장", "– 저장 내용 주기적으로 확인·삭제"],
    21
  );
}

// ── SLIDE 22: CHECKLIST ───────────────────────────────────────
{
  const s = pres.addSlide();
  addChecklist(s,
    "개인정보와 보안 기본 원칙",
    [
      "– 고객 개인정보 (이름·전화·이메일·주소) 그대로 입력 금지",
      "– 계약 정보·매출·내부 전략 문서 주의",
      "– 내부 자료는 익명화하거나 요약해서 입력",
      "– 개인 계정에서 모델 개선 설정 확인",
      "– 민감한 대화는 Temporary Chat 또는 업무용 플랜 활용",
      "– 최종 결과물은 반드시 사람이 검토",
    ],
    null, 22
  );
}

// ── SLIDE 23: SECTION OPENER ──────────────────────────────────
addSectionOpener(pres, "3부", "프롬프트 기초", 23);

// ── SLIDE 24: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "프롬프트란 무엇인가",
    "단순 질문",
    ["– \"이거 정리해줘\"", "– 결과가 일반적", "– 맥락 부족"],
    "업무 요청문",
    ["– 대상·목적·형식·조건 포함", "– 원하는 결과물 명시", "– ChatGPT가 일 시작 전 필요한 정보 제공"],
    24
  );
}

// ── SLIDE 25: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "좋은 프롬프트는 무엇이 다른가",
    "나쁜 프롬프트",
    ["– \"상세페이지 써줘\"", "– \"유튜브 제목 만들어줘\"", "– \"이거 정리해줘\""],
    "좋은 프롬프트",
    ["– 누구를 대상으로 하는지 알려준다", "– 어떤 결과물이 필요한지 말한다", "– 참고 자료와 배경을 제공한다", "– 원하는 형식과 주의사항을 지정한다"],
    25
  );
}

// ── SLIDE 26: WORKFLOW (7 steps in 2 rows) ────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "실무 프롬프트 기본 구조", 0.5);

  const steps = ["역할", "목표", "맥락", "자료", "형식", "조건", "검토"];
  const descs = ["어떤 관점으로 답할지", "무엇을 만들지", "누구에게·어디에·왜", "참고 원문·정보 제공", "표·대본·목차·체크리스트", "분량·톤·금지 표현", "빠진 내용·오류·개선점"];

  const cardW = 2.75;
  const cardH = 2.0;
  const gapX  = 0.22;
  const gapY  = 0.25;
  const row1Y = 1.5;
  const row2Y = row1Y + cardH + gapY;
  const row1Count = 4;
  const row2Count = 3;

  steps.forEach((step, i) => {
    const isRow1 = i < row1Count;
    const col    = isRow1 ? i : i - row1Count;
    const count  = isRow1 ? row1Count : row2Count;
    const totalW = count * cardW + (count - 1) * gapX;
    const startX = (SW - totalW) / 2;
    const cx = startX + col * (cardW + gapX);
    const cy = isRow1 ? row1Y : row2Y;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.15, y: cy + 0.18, w: 0.5, h: 0.32,
      fill: { color: C.terracottaPale }, line: { color: C.terracottaPale, width: 0 },
    });
    s.addText(String(i + 1), {
      x: cx + 0.15, y: cy + 0.18, w: 0.5, h: 0.32,
      fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(step, {
      x: cx + 0.15, y: cy + 0.6, w: cardW - 0.3, h: 0.5,
      fontFace: F.body, fontSize: SZ.titleMD, color: C.ink,
      bold: true, margin: 0,
    });
    s.addText(descs[i], {
      x: cx + 0.15, y: cy + 1.15, w: cardW - 0.3, h: 0.7,
      fontFace: F.body, fontSize: SZ.label, color: C.muted,
      margin: 0, wrap: true,
    });
  });

  addSlideNumber(s, 26);
}

// ── CODE SLIDE helper ─────────────────────────────────────────
function addCodeSlide(s, title, code, caption, slideNum) {
  s.background = { color: C.canvas };
  addContentTitle(s, title, 0.5);

  const boxX = 1;
  const boxY = 1.35;
  const boxW = SW - 2;
  const capH = caption ? 0.45 : 0;
  const boxH = SH - boxY - 0.7 - capH;

  // Dark card
  s.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: boxH,
    fill: { color: C.surfaceDark }, line: { color: C.surfaceDark, width: 0 },
  });
  // Header bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: 0.35,
    fill: { color: C.surfaceDarkElev }, line: { color: C.surfaceDarkElev, width: 0 },
  });
  // Three dots
  [0, 0.22, 0.44].forEach(offset => {
    s.addShape(pres.shapes.OVAL, {
      x: boxX + 0.2 + offset, y: boxY + 0.1, w: 0.12, h: 0.12,
      fill: { color: C.mutedSoft }, line: { color: C.mutedSoft, width: 0 },
    });
  });
  // Code text
  s.addText(code, {
    x: boxX + 0.3, y: boxY + 0.5, w: boxW - 0.6, h: boxH - 0.7,
    fontFace: F.code, fontSize: SZ.code, color: C.onDark,
    valign: "top", margin: 0,
  });

  if (caption) {
    s.addText(caption, {
      x: boxX, y: boxY + boxH + 0.1, w: boxW, h: capH,
      fontFace: F.body, fontSize: SZ.bodySM, color: C.mutedSoft,
      italic: true, margin: 0,
    });
  }

  addSlideNumber(s, slideNum);
}

// ── SLIDE 27: CODE SLIDE ──────────────────────────────────────
{
  const s = pres.addSlide();
  addCodeSlide(s,
    "기본 프롬프트 템플릿",
    `너는 [역할]이다.\n\n목표:\n[무엇을 만들지 작성]\n\n상황:\n[대상, 사용 채널, 목적 작성]\n\n참고 자료:\n[필요한 자료 입력]\n\n요청:\n1. 핵심을 먼저 정리해줘.\n2. 필요한 구조를 잡아줘.\n3. 최종 결과물을 작성해줘.\n4. 마지막에 개선점이나 주의점을 알려줘.\n\n출력 형식:\n[표 / 문단 / 대본 / 슬라이드 / 체크리스트]\n\n조건:\n[분량, 톤, 금지 표현, 난이도, 주의사항]`,
    null, 27
  );
}

// ── SLIDE 28: WORKFLOW (4 steps) ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "프롬프트를 개선하는 방법", 0.5);

  const steps = ["초안 생성", "피드백", "수정 요청", "최종화"];
  const descs = ["첫 프롬프트로 결과 받기", "부족한 점 파악", "더 짧게·더 쉽게·더 설득력 있게", "실무 적용 가능성 점검"];
  const cardW = 2.7;
  const cardH = 2.8;
  const gapX  = 0.4;
  const totalW = 4 * cardW + 3 * gapX;
  const startX = (SW - totalW) / 2;
  const cardY  = 1.7;

  steps.forEach((step, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.surfaceCard }, line: { color: C.surfaceCard, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.18, y: cardY + 0.22, w: 0.55, h: 0.35,
      fill: { color: C.terracottaPale }, line: { color: C.terracottaPale, width: 0 },
    });
    s.addText(String(i + 1), {
      x: cx + 0.18, y: cardY + 0.22, w: 0.55, h: 0.35,
      fontFace: F.body, fontSize: SZ.label, color: C.terracotta,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(step, {
      x: cx + 0.18, y: cardY + 0.75, w: cardW - 0.36, h: 0.6,
      fontFace: F.body, fontSize: SZ.displaySM, color: C.ink,
      bold: true, margin: 0,
    });
    s.addText(descs[i], {
      x: cx + 0.18, y: cardY + 1.45, w: cardW - 0.36, h: 1.2,
      fontFace: F.body, fontSize: SZ.bodyMD, color: C.muted,
      margin: 0, wrap: true,
    });
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: cx + cardW + 0.01, y: cardY + cardH / 2,
        w: gapX - 0.02, h: 0,
        line: { color: C.hairline, width: 1.5 },
      });
    }
  });

  addSlideNumber(s, 28);
}

// ── SLIDE 29: SECTION OPENER ──────────────────────────────────
addSectionOpener(pres, "4부", "프롬프트 작성 기법", 29);

// ── SLIDES 30-34: CODE SLIDES ─────────────────────────────────
{
  const s = pres.addSlide();
  addCodeSlide(s, "Zero-shot Prompting — 예시 없이 바로 요청",
    "부동산 초보자를 위한\n유튜브 영상 제목을 10개 작성해줘.",
    "빠른 초안 · 아이디어 발굴에 적합 / 결과가 일반적일 수 있음", 30);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "One-shot / Few-shot Prompting — 예시를 제공해 톤을 맞춘다",
    `아래 예시와 같은 톤으로 제목을 작성해줘.\n\n예시:\n"부동산 공부, 이 순서로 안 하면 시간 낭비합니다"\n\n주제:\n초보자가 경매 공부를 시작하는 방법`,
    "기존 톤·형식·스타일을 맞출 때 효과적", 31);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "Role Prompting — 역할을 부여해 관점을 바꾼다",
    "너는 교육 상품 상세페이지 전문 마케터다.\n아래 강의 상품의 상세페이지 구조를 설계해줘.",
    "마케터·유튜브PD·교육기획자·고객 관점 등으로 변경 가능", 32);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "Think step by step — 단계별로 생각하게 한다",
    `이 상세페이지의 문제점을 단계별로 생각해줘.\n\n먼저 고객 관점의 판단 기준을 정리하고,\n그 기준에 따라 문제점과 개선안을 제안해줘.`,
    "복잡한 업무를 단계로 나눠 처리 / 판단 기준을 먼저 세우게 하는 방식", 33);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "Self-consistency — 여러 관점에서 검토해 종합한다",
    `이 상세페이지를 3가지 관점에서 검토해줘.\n\n1. 고객 설득 관점\n2. 브랜드 신뢰 관점\n3. 전환율 개선 관점\n\n마지막에는 세 관점을 종합해\n우선순위가 높은 개선안 5개를 정리해줘.`,
    "여러 관점 → 공통 핵심 도출 → 더 안정적인 결론", 34);
}

// ── SLIDE 35: SECTION OPENER ──────────────────────────────────
addSectionOpener(pres, "5부", "실제 업무 활용 프롬프트", 35);

// ── SLIDE 36: CHECKLIST ───────────────────────────────────────
{
  const s = pres.addSlide();
  addChecklist(s,
    "실무 적용 전에 먼저 정리할 것",
    [
      "– 이 결과물은 어디에 쓰는가?",
      "– 대상은 누구인가?",
      "– 고객이 가진 문제는 무엇인가?",
      "– 어떤 톤이 적합한가?",
      "– 반드시 포함해야 할 내용은?",
      "– 피해야 할 표현은?",
      "– 결과물은 어떤 형식이어야 하는가?",
    ],
    "ChatGPT를 잘 쓰는 사람은 그 전에 자기 업무를 잘 정리하는 사람이다", 36
  );
}

// ── SLIDES 37-43: CODE SLIDES ─────────────────────────────────
{
  const s = pres.addSlide();
  addCodeSlide(s, "업무 유형 1 — 콘텐츠 기획",
    `너는 교육 콘텐츠 기획자다.\n\n주제: [주제 입력]\n대상: [대상 입력]\n\n요청:\n1. 이 주제에서 사람들이 궁금해할 질문 10개를 뽑아줘.\n2. 콘텐츠 제목 후보를 10개 작성해줘.\n3. 오프닝에서 사용할 후킹 문장 5개를 작성해줘.\n4. 5분짜리 콘텐츠 구성안을 만들어줘.\n\n조건:\n과장된 표현은 피하고, 초보자도 이해하기 쉽게.`,
    null, 37);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "업무 유형 2 — 상세페이지·광고 문구",
    `너는 교육 상품 마케터다.\n\n상품: [상품 설명]\n대상: [고객 설명]\n\n요청:\n1. 고객이 느끼는 문제를 정리해줘.\n2. 상세페이지에 들어갈 섹션 구조를 제안해줘.\n3. 각 섹션별 핵심 문구를 작성해줘.\n4. 광고 문구 10개와 CTA 문구 5개를 작성해줘.\n5. 과장되거나 위험한 표현이 있는지 점검해줘.\n\n조건:\n수익 보장, 과도한 불안 자극, 단정적 표현은 피할 것.`,
    null, 38);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "업무 유형 3 — 강의·교육자료 제작",
    `너는 성인 교육 전문 커리큘럼 기획자다.\n\n주제: [강의 주제 입력]\n대상: [수강생 수준 입력]\n\n요청:\n1. 2시간 강의 목차를 설계해줘.\n2. 각 파트별 학습 목표를 작성해줘.\n3. 실습 과제 2개를 제안해줘.\n4. 초보자가 어려워할 용어를 정리해줘.\n5. 마지막에 강의 흐름이 자연스러운지 검토해줘.\n\n출력: 표 형식`,
    null, 39);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "업무 유형 4 — 고객 FAQ와 안내문",
    `너는 교육 서비스 CS 담당자다.\n\n상황: [고객 문의 상황 입력]\n\n요청:\n1. 고객이 궁금해할 질문 10개를 작성해줘.\n2. 각 질문에 대한 답변을 친절하게 작성해줘.\n3. 오해가 생길 수 있는 표현을 점검해줘.\n4. 더 명확한 안내 문구로 다듬어줘.\n\n조건:\n친절하지만 과장하지 말고, 확정되지 않은 내용은 단정하지 말 것.`,
    null, 40);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "업무 유형 5 — 자료 요약과 정리",
    `아래 자료를 업무에 바로 활용할 수 있게 정리해줘.\n\n요청:\n1. 핵심 내용을 5줄로 요약해줘.\n2. 중요한 키워드를 뽑아줘.\n3. 실행해야 할 일을 체크리스트로 정리해줘.\n4. 추가로 확인해야 할 질문을 작성해줘.\n\n출력:\n요약 / 키워드 / 실행 항목 / 확인 질문으로 나눠서 작성`,
    null, 41);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "실습 1 — 내 업무 프롬프트 만들기",
    `업무:\n대상:\n목적:\n참고 자료:\n원하는 결과물:\n출력 형식:\n조건:\n검토 기준:`,
    "업무 하나를 골라 이 템플릿에 채워보세요", 42);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "실습 2 — 결과물 개선하기",
    `방금 결과물을 검토해줘.\n\n검토 기준:\n1. 실무에서 바로 쓸 수 있는가\n2. 대상에게 이해하기 쉬운가\n3. 과장되거나 위험한 표현은 없는가\n4. 빠진 내용은 없는가\n5. 더 설득력 있게 만들 수 있는가\n\n출력:\n문제점 / 개선 방향 / 수정본`,
    null, 43);
}

// ── SLIDE 44: SECTION OPENER ──────────────────────────────────
addSectionOpener(pres, "6부", "이미지 생성 AI 활용", 44);

// ── SLIDE 45: CONTENT with image placeholder ─────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "이미지 생성 AI란 무엇인가", 0.5);

  const items = [
    "– 텍스트로 원하는 이미지를 설명하면 AI가 이미지를 만든다",
    "– 기존 이미지를 바탕으로 수정할 수도 있다",
    "– 상세페이지·썸네일·광고 배너·강의 표지 시안에 활용",
  ];
  addBodyList(s, items, 1, 1.5, 6.5, 3.5);

  // Right placeholder
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.9, y: 1.5, w: 4.4, h: 3.5,
    fill: { color: C.surfaceCardStrong }, line: { color: C.hairline, width: 0.5 },
  });
  s.addText("[이미지: 상세페이지·썸네일·광고 배너·강의 표지 시안 예시 4종]", {
    x: 7.9, y: 1.5, w: 4.4, h: 3.5,
    fontFace: F.body, fontSize: SZ.bodySM, color: C.muted,
    align: "center", valign: "middle", margin: 0, wrap: true,
  });

  addSlideNumber(s, 45);
}

// ── SLIDE 46: COMPARISON ─────────────────────────────────────
{
  const s = pres.addSlide();
  addComparison(s,
    "이미지 프롬프트는 시각 자료 요청서다",
    "막연한 요청",
    ["– \"예쁜 이미지 만들어줘\"", "– \"AI 관련 이미지\"", "– 결과 예측 불가"],
    "구체적인 요청",
    ["– 사용 목적·비율 명시", "– 주제·구도·스타일·색감 지정", "– 제외할 요소 명확히"],
    46
  );
}

// ── SLIDES 47-51: CODE SLIDES ─────────────────────────────────
{
  const s = pres.addSlide();
  addCodeSlide(s, "이미지 프롬프트 기본 구조",
    `[사용 목적]에 사용할 이미지를 생성해줘.\n\n비율: [16:9 / 1:1 / 4:5]\n\n주제: [무엇을 보여줄지]\n\n구도: [어디에 무엇을 배치할지]\n\n스타일: [사진풍 / 일러스트 / 3D / 미니멀]\n\n색감: [원하는 분위기와 색]\n\n조건:\n이미지 안에 글자는 넣지 말 것.\n로고나 실존 인물은 넣지 말 것.`,
    null, 47);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "이미지 예시 1 — 상세페이지 상단 이미지",
    `온라인 교육 상세페이지 상단에 사용할 이미지를 생성해줘.\n\n비율: 16:9 와이드\n주제: 직장인이 노트북으로 AI를 활용해 업무를 정리하는 장면\n구도: 왼쪽에는 노트북을 보는 실무자,\n      오른쪽에는 제목을 넣을 수 있는 넓은 여백\n스타일: 현실적인 기업 홍보 사진 느낌\n색감: 화이트, 네이비, 밝은 블루 중심\n조건: 이미지 안에 글자는 넣지 말 것.\n      특정 회사 로고를 넣지 말 것.`,
    null, 48);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "이미지 예시 2 — 유튜브 썸네일 배경",
    `유튜브 썸네일 배경 이미지를 생성해줘.\n\n비율: 16:9\n주제: AI를 활용해 업무 시간이 줄어드는 느낌\n구도: 오른쪽에는 놀란 표정의 직장인,\n      왼쪽에는 큰 제목을 넣을 수 있는 빈 공간\n스타일: 선명하고 눈에 잘 띄는 유튜브 썸네일 스타일\n색감: 블루와 옐로우 포인트, 대비 강하게\n조건: 이미지 안에 글자는 넣지 말 것.\n      얼굴과 손이 어색하지 않게 할 것.`,
    null, 49);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "이미지 예시 3 — 광고 배너 · 강의 표지",
    `AI 실무 활용 강의 홍보용 이미지를 생성해줘.\n\n비율: 1:1 정사각형\n주제: AI를 활용해 문서, 기획안, 콘텐츠를 빠르게 정리하는 업무 장면\n구도: 중앙에는 노트북과 문서,\n      상단에는 광고 문구를 넣을 수 있는 여백\n스타일: 깔끔한 기업 교육 광고 스타일\n색감: 화이트 배경, 네이비와 블루 포인트\n조건: 이미지 안에 글자는 넣지 말 것.\n      로봇이 과하게 강조된 이미지는 피할 것.`,
    null, 50);
}
{
  const s = pres.addSlide();
  addCodeSlide(s, "이미지 수정 프롬프트",
    `이 이미지의 전체 구도는 유지해줘.\n다만 오른쪽 여백을 더 넓혀서 제목을 넣기 쉽게 만들어줘.\n색감은 조금 더 밝고 신뢰감 있게 바꿔줘.\n이미지 안의 글자는 모두 제거해줘.`,
    "유지할 것 vs 바꿀 것을 명확히 구분해서 요청할 것", 51);
}

// ── SLIDE 52: CHECKLIST ───────────────────────────────────────
{
  const s = pres.addSlide();
  addChecklist(s,
    "이미지 결과물 검수 체크리스트",
    [
      "– 손과 얼굴이 어색하지 않은가",
      "– 이미지 안 텍스트가 틀리지 않았는가",
      "– 로고나 상표가 들어가지 않았는가",
      "– 실존 인물을 닮지 않았는가",
      "– 브랜드 톤과 맞는가",
      "– 제목을 넣을 여백이 충분한가",
      "– 상업용 사용 전 내부 검수 완료했는가",
    ],
    "이미지 생성 AI는 빠른 시안을 만드는 데 강하지만, 최종 사용 여부는 사람이 판단한다", 52
  );
}

// ── SLIDE 53: SUMMARY CONTENT ─────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.canvas };
  addContentTitle(s, "ChatGPT 사용 핵심 정리", 0.5);

  const items = [
    "– ChatGPT는 정답 자판기가 아니라 업무 보조 도구다",
    "– 좋은 결과는 좋은 요청에서 나온다",
    "– 맥락·자료·형식·조건을 알려줘야 한다",
    "– 첫 답변보다 후속 수정이 중요하다",
    "– 민감한 정보는 입력하지 않는다",
    "– 최종 결과물은 사람이 검토한다",
  ];
  addBodyList(s, items, 1, 1.4, SW - 2, 4.5);

  addSlideNumber(s, 53);
}

// ── SLIDE 54: FINAL CHECKLIST ─────────────────────────────────
{
  const s = pres.addSlide();
  addChecklist(s,
    "바로 적용할 업무 체크리스트",
    [
      "– 오늘 내 업무 하나를 고른다",
      "– 필요한 자료를 정리한다 (상품·고객·문서·예시)",
      "– 기본 프롬프트 템플릿에 넣는다",
      "– 결과물을 검토한다",
      "– 후속 질문으로 개선한다",
      "– 반복 업무는 템플릿으로 저장한다",
    ],
    "이 과정을 반복하면 ChatGPT가 나만의 업무 도구가 된다", 54
  );
}

// ── WRITE ────────────────────────────────────────────────────
pres.writeFile({ fileName: "/Users/lu71/Desktop/Project/project/ChatGPT_실무활용_강의.pptx" })
  .then(() => console.log("Done: /Users/lu71/Desktop/Project/project/ChatGPT_실무활용_강의.pptx"))
  .catch(err => { console.error(err); process.exit(1); });
