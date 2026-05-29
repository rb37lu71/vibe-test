// MemberForm.jsx — 팀원 추가 / 수정 모달 폼
//
// Props:
//   initialValues : Member 객체 (수정 시) | null (신규 추가 시)
//   onSubmit(data): 제출 콜백 — { name, role, intro }
//   onClose()     : 닫기 콜백

import { useState } from 'react'
import ModalShell from '../ModalShell/ModalShell'

const EMPTY = { name: '', role: '', intro: '' }

export default function MemberForm({ initialValues, onSubmit, onClose }) {
  const [form, setForm] = useState(() =>
    initialValues
      ? { name: initialValues.name, role: initialValues.role, intro: initialValues.intro ?? '' }
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
    if (!form.name.trim()) { setError('이름을 입력해주세요.'); return }
    if (!form.role.trim()) { setError('역할을 입력해주세요.'); return }
    onSubmit?.({ name: form.name.trim(), role: form.role.trim(), intro: form.intro.trim() })
  }

  return (
    <ModalShell onClose={onClose} maxWidth={400}>
      <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>
        {initialValues ? '팀원 수정' : '팀원 추가'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={labelStyle}>
          이름 *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="홍길동"
            style={inputStyle}
            autoFocus
          />
        </label>

        <label style={labelStyle}>
          역할 *
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="프론트엔드 / 백엔드 / PM …"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          한 줄 소개
          <input
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="간단한 소개를 입력하세요 (선택)"
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

// ── Styles ────────────────────────────────────────────────────────────────────

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
