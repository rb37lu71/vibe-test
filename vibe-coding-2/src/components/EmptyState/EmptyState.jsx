// EmptyState.jsx — 리스트/보드가 비어있을 때 표시되는 안내 컴포넌트
//
// Props:
//   title   : string — 주 안내 텍스트
//   desc    : string? — 보조 설명 텍스트
//   action  : ReactNode? — CTA 버튼 등 삽입 가능

export default function EmptyState({
  title,
  desc,
  action,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <span className="empty-state-rune" aria-hidden="true">EMPTY</span>

      {title && (
        <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--color-ink)' }}>
          {title}
        </p>
      )}

      {desc && (
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-ink-tertiary)', maxWidth: 280 }}>
          {desc}
        </p>
      )}

      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  )
}
