// ProblemSection.jsx — 팀플에서 반복되는 4가지 고통 포인트
// 배경: 파치먼트(--color-canvas-parchment) — Hero와 교차

const problems = [
  {
    emoji: '💬',
    title: '흩어진 역할 분담',
    desc: '카카오톡·노션에 분산된 할 일, 누가 무엇을 맡았는지 한눈에 보이지 않는다.',
  },
  {
    emoji: '📄',
    title: '사라지는 회의록',
    desc: '기록은 한 명이 담당하고, 나중에 팀원들이 다시 찾기 어렵다.',
  },
  {
    emoji: '⏰',
    title: '강제 없는 마감',
    desc: '기한이 있어도 아무도 압박하지 않아 무임승차가 반복된다.',
  },
  {
    emoji: '⚖️',
    title: '불투명한 기여도',
    desc: '각자 얼마나 했는지 측정할 수단이 없어 팀 내 불만이 쌓인다.',
  },
]

function ProblemSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-canvas-parchment)',
        padding: 'var(--spacing-section) var(--spacing-lg)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* 섹션 제목 */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: 'var(--spacing-2xl)',
          }}
        >
          팀플, 이런 문제 겪어본 적 있나요?
        </h2>

        {/* 4개 카드 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}
        >
          {problems.map(({ emoji, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--rounded-lg)',
                padding: 'var(--spacing-xl)',
                border: '1px solid var(--color-hairline)',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                {emoji}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-ink-secondary)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
