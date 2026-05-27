// FeatureSection.jsx — 4개 핵심 기능 소개
// 배경: 흰색(--color-canvas) — Problem과 교차

const features = [
  {
    emoji: '⏱️',
    title: '마감 타이머',
    desc: '태스크 카드에 남은 시간이 카운트다운으로 표시됩니다. 기한이 다가오면 색이 바뀌고, 초과하면 경고가 뜹니다.',
  },
  {
    emoji: '🏆',
    title: '포인트 시스템',
    desc: '제때 완료하면 포인트 +10, 기한을 넘기면 -5. 리더보드에서 팀원 기여도를 한눈에 확인하세요.',
  },
  {
    emoji: '📋',
    title: '칸반 보드',
    desc: 'To Do · In Progress · Done 세 컬럼으로 팀 전체 할 일을 한 화면에서 관리합니다.',
  },
  {
    emoji: '📝',
    title: '회의록',
    desc: '날짜·참석자·내용을 저장하고 팀원 누구나 언제든 다시 열람할 수 있습니다.',
  },
]

function FeatureSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-canvas)',
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
            marginBottom: 'var(--spacing-xs)',
          }}
        >
          팀플 매니저가 해결합니다
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-ink-secondary)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--spacing-2xl)',
            fontFamily: 'var(--font-body)',
          }}
        >
          설치 없이 브라우저에서 바로 — 4가지 핵심 기능
        </p>

        {/* 4개 기능 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}
        >
          {features.map(({ emoji, title, desc }) => (
            <div
              key={title}
              style={{
                backgroundColor: 'var(--color-canvas-parchment)',
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

export default FeatureSection
