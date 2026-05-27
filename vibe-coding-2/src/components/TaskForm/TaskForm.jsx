// TaskForm.jsx — 태스크 생성 / 수정 모달 폼
//
// Props:
//   initialValues : Task 객체 (수정 시) | null (신규 생성 시)
//   members       : Member[] — 담당자 선택 옵션
//   onSubmit(data): 제출 콜백 — { title, assigneeId, deadline }
//   onClose()     : 닫기 콜백

import { useState } from 'react'

const EMPTY = { title: '', assigneeId: '', deadline: '', status: 'todo' }

export default function TaskForm({ initialValues, members = [], onSubmit, onClose }) {
  const [form, setForm] = useState(() =>
    initialValues
      ? {
          title:      initialValues.title,
          assigneeId: initialValues.assigneeId ?? '',
          status:     initialValues.status ?? 'todo',
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
      deadline:   new Date(`${form.deadline}T23:59:00`).toISOString(),
    })
  }

  return (
    /* 오버레이 */
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      style={overlayStyle}
    >
      <div style={modalStyle} role="dialog" aria-modal="true">
        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
          {initialValues ? '태스크 수정' : '새 태스크'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* 제목 */}
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
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="todo">할 일</option>
              <option value="in-progress">진행 중</option>
              <option value="done">완료</option>
            </select>
          </label>

          {/* 담당자 */}
          <label style={labelStyle}>
            담당자
            <select
              name="assigneeId"
              value={form.assigneeId}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">미배정</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
          </label>

          {/* 마감일 */}
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

          {/* 에러 메시지 */}
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--color-danger)' }}>{error}</p>
          )}

          {/* 버튼 행 */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>
              취소
            </button>
            <button type="submit" style={submitBtnStyle}>
              {initialValues ? '저장' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'var(--color-overlay)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 16,
}

const modalStyle = {
  background: 'var(--color-canvas)',
  borderRadius: 'var(--rounded-lg)',
  padding: '28px 24px',
  width: '100%',
  maxWidth: 440,
}

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
