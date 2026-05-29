// EventForm.jsx — 일정 생성 / 수정 모달 폼
//
// Props:
//   initialValues : Event 객체 | { title:'', date, time:'', assigneeId:'', description:'' }
//   members       : Member[] — 담당자 선택 옵션
//   onSubmit(data): 제출 콜백 — { title, date, time, assigneeId, description }
//   onClose()     : 닫기 콜백

import { useState } from 'react'
import ModalShell from '../ModalShell/ModalShell'

export default function EventForm({ initialValues, members, onSubmit, onClose }) {
  const [form, setForm] = useState(initialValues)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('일정 제목을 입력해주세요.')
      return
    }
    if (!form.date) {
      setError('날짜를 선택해주세요.')
      return
    }
    onSubmit({
      title:      form.title.trim(),
      date:       form.date,
      time:       form.time,
      assigneeId: form.assigneeId || null,
      description: form.description.trim(),
    })
  }

  return (
    <ModalShell onClose={onClose} maxWidth={460}>
      <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: 'var(--color-ink)' }}>
        {initialValues?.id ? '일정 수정' : '새 일정'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={labelStyle}>
          제목 *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
            autoFocus
          />
        </label>

        <label style={labelStyle}>
          날짜 *
          <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          시간
          <input type="time" name="time" value={form.time ?? ''} onChange={handleChange} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          담당자
          <select name="assigneeId" value={form.assigneeId ?? ''} onChange={handleChange} style={inputStyle}>
            <option value="">미지정</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          설명
          <textarea
            name="description"
            value={form.description ?? ''}
            onChange={handleChange}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </label>

        {error && (
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-danger)' }}>{error}</p>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="utility-button" onClick={onClose}>취소</button>
          <button type="submit" className="primary-button">저장</button>
        </div>
      </form>
    </ModalShell>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  fontSize: 14,
  fontWeight: 700,
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
