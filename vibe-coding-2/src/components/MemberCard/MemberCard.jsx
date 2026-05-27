// MemberCard.jsx — 팀원 정보 + 포인트 카드
//
// Props:
//   member        : Member 객체 (id, name, role, points, completedCount)
//   rank          : number | null — 리더보드 순위 (없으면 미표시)
//   onEdit(member): 수정 콜백
//   onDelete(id)  : 삭제 콜백

export default function MemberCard({ member, rank, onEdit, onDelete }) {
  const { id, name, role, points, completedCount } = member

  const pointColor = points >= 0 ? 'var(--color-primary)' : '#c0392b'

  return (
    <div
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--rounded-md)',
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'relative',
      }}
    >
      {/* 순위 뱃지 */}
      {rank != null && (
        <span style={rankBadgeStyle(rank)}>{rank}</span>
      )}

      {/* 아바타 */}
      <div style={avatarStyle}>{name[0]}</div>

      {/* 이름 / 역할 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 2 }}>
          {name}
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-secondary)' }}>{role}</div>
      </div>

      {/* 포인트 */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: pointColor }}>
          {points >= 0 ? `+${points}` : points}pt
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-ink-tertiary)', marginTop: 2 }}>
          완료 {completedCount}건
        </div>
      </div>

      {/* 액션 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button onClick={() => onEdit?.(member)} style={iconBtnStyle} title="수정">✏️</button>
        <button onClick={() => onDelete?.(id)}   style={iconBtnStyle} title="삭제">🗑️</button>
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const avatarStyle = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: 'var(--color-primary)',
  color: '#fff',
  fontSize: 18,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

function rankBadgeStyle(rank) {
  const colors = {
    1: { bg: '#FFD700', color: '#7a5800' },
    2: { bg: '#C0C0C0', color: '#555' },
    3: { bg: '#CD7F32', color: '#fff' },
  }
  const { bg = 'var(--color-canvas-parchment)', color = 'var(--color-ink-secondary)' } = colors[rank] ?? {}

  return {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: bg,
    color,
    fontSize: 11,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  borderRadius: 4,
  fontSize: 13,
  lineHeight: 1,
}
