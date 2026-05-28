// MinuteForm.jsx — 회의록 작성 / 수정 모달 폼
//
// Props:
//   initialValues : Minute 객체 (수정 시) | null (신규 작성 시)
//   onSubmit(data): 제출 콜백 — { date, attendees, content }
//   onClose()     : 닫기 콜백

import { useState } from 'react'

const EMPTY = { date: '', attendees: '', content: '' }

export default function MinuteForm({ initialValues, onSubmit, onClose }) {
  const [form, setForm] = useState(() =>
    initialValues
      ? {
          date:      initialValues.date,
          attendees: initialValues.attendees,
          content:   initialValues.content,
        }
      : {
          ...EMPTY,
          // 기본값: 오늘 날짜
          date: new Date().toISOString().slice(0, 10),
        }
  )
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.date)            { setError('날짜를 선택해주세요.'); return }
    if (!form.attendees.trim()) { setError('참석자를 입력해주세요.'); return }
    if (!form.content.trim())  { setError('내용을 입력해주세요.'); return }
    onSubmit?.({
      date:      form.date,
      attendees: form.attendees.trim(),
      content:   form.content.trim(),
    })
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      style={overlayStyle}
    >
      <div style={modalStyle} role="dialog" aria-modal="true">
        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>
          {initialValues ? '회의록 수정' : '회의록 작성'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* 날짜 */}
          <label style={labelStyle}>
            날짜 *
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={inputStyle}
              autoFocus
            />
          </label>

          {/* 참석자 */}
          <label style={labelStyle}>
            참석자 *
            <input
              name="attendees"
              value={form.attendees}
              onChange={handleChange}
              placeholder="홍길동, 김철수, 이영희"
              style={inputStyle}
            />
            <span style={{ fontSize: 12, color: 'var(--color-ink-tertiary)', marginTop: 2 }}>
              쉼표로 구분해 입력하세요
            </span>
          </label>

          {/* 내용 */}
          <label style={labelStyle}>
            회의 내용 *
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="오늘 회의에서 논의된 내용을 기록하세요."
              rows={7}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </label>

          {error && (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--color-danger)' }}>{error}</p>
          )}

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>취소</button>
            <button type="submit" style={submitBtnStyle}>
              {initialValues ? '저장' : '작성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const overlayStyle = {
  position: 'fixed', inset: 0,
  background: 'var(--color-overlay)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000, padding: 16,
  overflowY: 'auto',
}

const modalStyle = {
  background: 'var(--color-canvas)',
  borderRadius: 'var(--rounded-lg)',
  padding: '28px 24px',
  width: '100%', maxWidth: 520,
  margin: 'auto',
}

const labelStyle = {
  display: 'flex', flexDirection: 'column', gap: 6,
  fontSize: 14, fontWeight: 500, color: 'var(--color-ink)',
}

const inputStyle = {
  padding: '9px 12px',
  borderRadius: 'var(--rounded-sm)',
  border: '1px solid var(--color-hairline)',
  fontSize: 15, color: 'var(--color-ink)',
  background: 'var(--color-canvas)',
  outline: 'none', width: '100%', boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
}

const submitBtnStyle = {
  padding: '9px 22px',
  borderRadius: 'var(--rounded-pill)',
  border: 'none',
  background: 'var(--color-primary)',
  color: 'var(--color-canvas)',
  fontSize: 15, fontWeight: 600, cursor: 'pointer',
}

const cancelBtnStyle = {
  padding: '9px 22px',
  borderRadius: 'var(--rounded-pill)',
  border: '1px solid var(--color-hairline)',
  background: 'transparent',
  color: 'var(--color-ink-secondary)',
  fontSize: 15, fontWeight: 500, cursor: 'pointer',
}
