// TaskForm.jsx — 태스크 생성 / 수정 모달 폼
//
// Props:
//   initialValues : Task 객체 (수정 시) | null (신규 생성 시)
//   members       : Member[] — 담당자 선택 옵션
//   onSubmit(data): 제출 콜백 — { title, assigneeId, status, deadline }
//   onClose()     : 닫기 콜백

import { useState } from 'react'
import ModalShell from '../ModalShell/ModalShell'
import { DIFFICULTY_OPTIONS, getDifficultyReward } from '../../utils/gamification'

const EMPTY = { title: '', assigneeId: '', deadline: '', status: 'todo', difficulty: 'normal' }

export default function TaskForm({ initialValues, members = [], onSubmit, onClose }) {
  const isDoneAlready = initialValues?.status === 'done'

  const [form, setForm] = useState(() =>
    initialValues
      ? {
          title:      initialValues.title,
          assigneeId: initialValues.assigneeId ?? '',
          status:     initialValues.status ?? 'todo',
          difficulty: initialValues.difficulty ?? 'normal',
          deadline:   initialValues.deadline
            ? initialValues.deadline.slice(0, 10)
            : '',
        }
      : EMPTY
  )
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('태스크 제목을 입력해주세요.')
      return
    }
    if (!form.deadline) {
      setError('마감일을 설정해주세요.')
      return
    }
    onSubmit?.({
      title:      form.title.trim(),
      assigneeId: form.assigneeId || null,
      status:     form.status,
      difficulty: form.difficulty,
      xpReward:   reward.xp,
      goldReward: reward.gold,
      damage:     reward.damage,
      questId:    initialValues?.questId ?? 'raid-forest-colossus',
      deadline:   new Date(`${form.deadline}T23:59:00`).toISOString(),
    })
  }

  const reward = getDifficultyReward(form.difficulty)

  return (
    <ModalShell onClose={onClose} maxWidth={440}>
      <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>
        {initialValues ? '태스크 수정' : '새 태스크'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={labelStyle}>
          제목 *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="태스크 제목 입력"
            style={inputStyle}
            autoFocus
          />
        </label>

        <label style={labelStyle}>
          상태
          {isDoneAlready ? (
            /* done 상태는 폼에서 되돌릴 수 없음 — 포인트 조작 방지 */
            <div style={{ ...inputStyle, color: 'var(--color-ink-tertiary)', background: 'var(--color-canvas-parchment)' }}>
              완료 (변경 불가)
            </div>
          ) : (
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="todo">할 일</option>
              <option value="in-progress">진행 중</option>
              <option value="done">완료</option>
            </select>
          )}
        </label>

        <label style={labelStyle}>
          담당자
          <select name="assigneeId" value={form.assigneeId} onChange={handleChange} style={inputStyle}>
            <option value="">미배정</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          난이도
          <select name="difficulty" value={form.difficulty} onChange={handleChange} style={inputStyle}>
            {DIFFICULTY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
          }}
          aria-label="퀘스트 보상 미리보기"
        >
          <RewardPreview label="XP" value={reward.xp} />
          <RewardPreview label="Gold" value={reward.gold} />
          <RewardPreview label="Damage" value={reward.damage} />
        </div>

        <label style={labelStyle}>
          마감일 *
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        {error && (
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-danger)' }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button type="button" onClick={onClose} style={cancelBtnStyle}>취소</button>
          <button type="submit" style={submitBtnStyle}>
            {initialValues ? '저장' : '추가'}
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function RewardPreview({ label, value }) {
  return (
    <div
      style={{
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--rounded-sm)',
        background: 'var(--color-canvas-parchment)',
        padding: '8px 10px',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--color-ink-tertiary)', fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ fontSize: 16, color: 'var(--color-ink)', fontWeight: 800 }}>
        +{value}
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--color-ink)',
}

const inputStyle = {
  padding: '9px 12px',
  borderRadius: 'var(--rounded-sm)',
  border: '1px solid var(--color-hairline)',
  fontSize: 15,
  color: 'var(--color-ink)',
  background: 'var(--color-canvas)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
}

const submitBtnStyle = {
  padding: '9px 22px',
  borderRadius: 'var(--rounded-pill)',
  border: 'none',
  background: 'var(--color-primary)',
  color: 'var(--color-canvas)',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
}

const cancelBtnStyle = {
  padding: '9px 22px',
  borderRadius: 'var(--rounded-pill)',
  border: '1px solid var(--color-hairline)',
  background: 'transparent',
  color: 'var(--color-ink-secondary)',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
}
