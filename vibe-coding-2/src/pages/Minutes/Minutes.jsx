// Minutes.jsx — 회의록 페이지 (/app/minutes)
// Task 4에서 MinuteForm · MinuteCard · MinuteList가 추가된다.

function Minutes() {
  return (
    <section aria-labelledby="minutes-heading">
      <h2
        id="minutes-heading"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        📝 회의록
      </h2>

      <div
        style={{
          backgroundColor: 'var(--color-canvas-parchment)',
          borderRadius: 'var(--rounded-lg)',
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
          color: 'var(--color-ink-secondary)',
          fontSize: 'var(--text-sm)',
        }}
      >
        회의록 작성 · 목록 기능은 Task 4에서 구현됩니다.
      </div>
    </section>
  )
}

export default Minutes
