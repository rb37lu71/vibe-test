// DeleteConfirmButton.jsx — 삭제 버튼 + 인라인 확인 패턴
//
// 첫 클릭 → "삭제할까요? [취소] [삭제]" 인라인 표시
// 두 번째 클릭(삭제) → onConfirm 호출
//
// Props:
//   onConfirm()   : 삭제 확인 콜백
//   label         : 초기 버튼 텍스트 (기본: '삭제')
//   buttonStyle   : 초기 버튼에 적용할 추가 인라인 스타일

import { useState } from 'react'

export default function DeleteConfirmButton({ onConfirm, label = '삭제', buttonStyle }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--color-ink-secondary)', whiteSpace: 'nowrap' }}>
          삭제?
        </span>
        <button onClick={() => setConfirming(false)} style={cancelStyle}>
          취소
        </button>
        <button
          onClick={() => { setConfirming(false); onConfirm?.() }}
          style={confirmStyle}
        >
          삭제
        </button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} style={{ ...baseStyle, ...buttonStyle }}>
      {label}
    </button>
  )
}

const baseStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  borderRadius: 4,
  fontSize: 13,
  lineHeight: 1,
  color: 'var(--color-ink-secondary)',
}

const cancelStyle = {
  background: 'none',
  border: '1px solid var(--color-hairline)',
  cursor: 'pointer',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 11,
  color: 'var(--color-ink-secondary)',
}

const confirmStyle = {
  background: 'var(--color-danger)',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 11,
  color: '#fff',
  fontWeight: 600,
}
