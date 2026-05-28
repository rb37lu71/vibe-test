// MemberCard.jsx — 팀원 정보 + 포인트 카드
import DeleteConfirmButton from '../DeleteConfirmButton/DeleteConfirmButton'
import { getLevelProgress } from '../../utils/gamification'
//
// Props:
//   member        : Member 객체 (id, name, role, points, completedCount)
//   rank          : number | null — 리더보드 순위 (없으면 미표시)
//   onEdit(member): 수정 콜백
//   onDelete(id)  : 삭제 콜백

export default function MemberCard({ member, rank, onEdit, onDelete, onWorkModeChange }) {
  const {
    id,
    name,
    role,
    intro,
    avatarInitials,
    points,
    completedCount,
    xp,
    gold,
    hp,
    maxHp,
    reliability,
    workMode,
  } = member

  const pointColor = points >= 0 ? 'var(--color-primary)' : 'var(--color-danger)'
  const levelProgress = getLevelProgress(xp)

  return (
    <div
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--rounded-md)',
        padding: '18px 20px',
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
        alignItems: 'start',
        gap: 16,
        position: 'relative',
      }}
    >
      {/* 순위 뱃지 */}
      {rank != null && (
        <span style={rankBadgeStyle(rank)}>{rank}</span>
      )}

      {/* 아바타 */}
      <div style={avatarStyle}>{avatarInitials ?? name[0]}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 2 }}>
          {name} <span style={{ color: 'var(--color-brass)', fontSize: 13 }}>Lv.{levelProgress.level}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-secondary)' }}>{role}</div>
        {intro && (
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-ink-tertiary)' }}>
            {intro}
          </p>
        )}
        <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
          <MiniBar label="XP" value={levelProgress.current} max={levelProgress.needed} percent={levelProgress.percent} color="var(--color-xp)" />
          <MiniBar label="HP" value={hp ?? 0} max={maxHp ?? 100} percent={Math.round(((hp ?? 0) / (maxHp ?? 100)) * 100)} color="var(--color-hp)" />
          <MiniBar label="신뢰도" value={reliability ?? 0} max={100} percent={reliability ?? 0} color="var(--color-moss)" />
        </div>
      </div>

      {/* 포인트 */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: pointColor }}>
          {gold ?? 0}G
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-ink-tertiary)', marginTop: 2 }}>
          완료 {completedCount}건
        </div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end', marginTop: 10 }}>
          <button
            onClick={() => onWorkModeChange?.(id, 'work')}
            style={modeButtonStyle(workMode === 'work')}
          >
            업무
          </button>
          <button
            onClick={() => onWorkModeChange?.(id, 'rest')}
            style={modeButtonStyle(workMode === 'rest')}
          >
            휴식
          </button>
        </div>
      </div>

      {/* 액션 */}
      {(onEdit || onDelete) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {onEdit && (
            <button onClick={() => onEdit(member)} style={iconBtnStyle} title="수정">수정</button>
          )}
          {onDelete && (
            <DeleteConfirmButton
              onConfirm={() => onDelete(id)}
              buttonStyle={iconBtnStyle}
            />
          )}
        </div>
      )}
    </div>
  )
}

function MiniBar({ label, value, max, percent, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: 'var(--color-ink-secondary)', fontWeight: 800 }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--color-ink-tertiary)' }}>{value}/{max}</span>
      </div>
      <div
        style={{
          height: 7,
          borderRadius: 'var(--rounded-pill)',
          background: 'var(--color-canvas-parchment)',
          overflow: 'hidden',
          border: '1px solid var(--color-hairline)',
        }}
      >
        <div style={{ width: `${percent}%`, height: '100%', background: color }} />
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
  color: 'var(--color-canvas)',
  fontSize: 18,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

function modeButtonStyle(active) {
  return {
    padding: '5px 8px',
    borderRadius: 'var(--rounded-sm)',
    border: '1px solid var(--color-hairline)',
    background: active ? 'var(--color-moss)' : 'var(--color-canvas)',
    color: active ? 'var(--color-canvas)' : 'var(--color-ink-secondary)',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
  }
}

function rankBadgeStyle(rank) {
  const colors = {
    1: { bg: 'var(--color-warning-soft)', color: 'var(--color-warning)' },
    2: { bg: 'var(--color-canvas-parchment)', color: 'var(--color-ink-secondary)' },
    3: { bg: 'var(--color-success-soft)', color: 'var(--color-success)' },
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
