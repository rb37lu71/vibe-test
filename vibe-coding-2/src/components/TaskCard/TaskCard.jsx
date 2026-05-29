// TaskCard.jsx — 칸반 보드 개별 태스크 카드
//
// Props:
//   task   : Task 객체 (id, title, assigneeId, status, deadline, completedAt)
//   member : Member 객체 (name, role) — assigneeId로 조회된 담당자
//   onStatusChange(id, newStatus) : 상태 변경 콜백
//   onDelete(id)                  : 삭제 콜백
//   onEdit(task)                  : 수정 콜백

import CountdownTimer from '../CountdownTimer/CountdownTimer'
import DeleteConfirmButton from '../DeleteConfirmButton/DeleteConfirmButton'
import ClassPortrait from '../ClassPortrait/ClassPortrait'
import { getDifficultyReward } from '../../utils/gamification'

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
  const reward = getDifficultyReward(task.difficulty)
  const xp = task.xpReward ?? reward.xp
  const gold = task.goldReward ?? reward.gold
  const damage = task.damage ?? reward.damage

  return (
    <div
      className="task-card"
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

        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button
            onClick={() => onEdit?.(task)}
            style={iconBtnStyle}
            title="수정"
          >
            수정
          </button>
          <DeleteConfirmButton
            onConfirm={() => onDelete?.(id)}
            buttonStyle={iconBtnStyle}
          />
        </div>
      </div>

      {/* 담당자 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <ClassPortrait className={member?.className} name={member?.name} size="sm" />
        <span style={{ fontSize: 13, color: 'var(--color-ink-secondary)' }}>
          {member?.name ?? '미배정'} · {member?.role ?? '—'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 6,
        }}
        aria-label="퀘스트 보상"
      >
        <QuestStat label="난이도" value={reward.label} tone="difficulty" />
        <QuestStat label="XP" value={`+${xp}`} tone="xp" />
        <QuestStat label="Gold" value={`+${gold}`} tone="gold" />
        <QuestStat label="Damage" value={damage} tone="damage" />
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
          {nextStatus === 'done' ? '공격 완료' : `${STATUS_LABEL[nextStatus]}으로 이동`}
        </button>
      )}
    </div>
  )
}

function QuestStat({ label, value, tone }) {
  const colorByTone = {
    difficulty: 'var(--color-moss)',
    xp: 'var(--color-xp)',
    gold: 'var(--color-gold)',
    damage: 'var(--color-hp)',
  }

  return (
    <div
      style={{
        minWidth: 0,
        borderRadius: 'var(--rounded-sm)',
        background: 'var(--color-canvas-parchment)',
        border: '1px solid var(--color-hairline)',
        padding: '6px 7px',
      }}
    >
      <div
        style={{
          color: 'var(--color-ink-tertiary)',
          fontSize: 10,
          fontWeight: 800,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: colorByTone[tone] ?? 'var(--color-ink)',
          fontSize: 13,
          fontWeight: 900,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
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
