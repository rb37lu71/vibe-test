// TaskCard.jsx — 칸반 보드 개별 태스크 카드
//
// Props:
//   task   : Task 객체 (id, title, assigneeId, status, deadline, completedAt)
//   member : Member 객체 (name, role) — assigneeId로 조회된 담당자
//   onStatusChange(id, newStatus) : 상태 변경 콜백
//   onDelete(id)                  : 삭제 콜백
//   onEdit(task)                  : 수정 콜백

import CountdownTimer from '../CountdownTimer/CountdownTimer'

const STATUS_LABEL = {
  'todo':        '할 일',
  'in-progress': '진행 중',
  'done':        '완료',
}

const NEXT_STATUS = {
  'todo':        'in-progress',
  'in-progress': 'done',
}

export default function TaskCard({ task, member, onStatusChange, onDelete, onEdit }) {
  const { id, title, status, deadline, completedAt } = task
  const isDone = status === 'done'
  const nextStatus = NEXT_STATUS[status]

  return (
    <div
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--rounded-md)',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* 제목 + 액션 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: isDone ? 'var(--color-ink-tertiary)' : 'var(--color-ink)',
            textDecoration: isDone ? 'line-through' : 'none',
            flex: 1,
            lineHeight: 1.4,
          }}
        >
          {title}
        </span>

        {/* 수정 / 삭제 — Done 상태에서는 수정·삭제 모두 숨김 처리 */}
        {!isDone && (
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <button
              onClick={() => onEdit?.(task)}
              style={iconBtnStyle}
              title="수정"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete?.(id)}
              style={iconBtnStyle}
              title="삭제"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {/* 담당자 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={avatarStyle}>{member?.name?.[0] ?? '?'}</div>
        <span style={{ fontSize: 13, color: 'var(--color-ink-secondary)' }}>
          {member?.name ?? '미배정'} · {member?.role ?? '—'}
        </span>
      </div>

      {/* 카운트다운 타이머 (완료 전에만 표시) */}
      {!isDone && deadline && (
        <CountdownTimer deadline={deadline} />
      )}

      {/* 완료 시각 */}
      {isDone && completedAt && (
        <span style={{ fontSize: 12, color: 'var(--color-ink-tertiary)' }}>
          완료: {new Date(completedAt).toLocaleString('ko-KR')}
        </span>
      )}

      {/* 상태 전진 버튼 (todo → in-progress → done) */}
      {nextStatus && (
        <button
          onClick={() => onStatusChange?.(id, nextStatus)}
          style={{
            alignSelf: 'flex-start',
            padding: '5px 12px',
            borderRadius: 'var(--rounded-pill)',
            border: '1px solid var(--color-primary)',
            background: 'transparent',
            color: 'var(--color-primary)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {STATUS_LABEL[nextStatus]}으로 이동 →
        </button>
      )}
    </div>
  )
}

// ── Local styles ──────────────────────────────────────────────────────────────

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  borderRadius: 4,
  fontSize: 14,
  lineHeight: 1,
}

const avatarStyle = {
  width: 22,
  height: 22,
  borderRadius: '50%',
  background: 'var(--color-primary)',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}
