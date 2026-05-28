// MinuteCard.jsx — 회의록 목록 아이템 카드
//
// Props:
//   minute   : Minute 객체 (id, date, attendees, content, createdAt)
//   onEdit(minute)  : 수정 콜백
//   onDelete(id)    : 삭제 콜백

import { useState } from 'react'
import DeleteConfirmButton from '../DeleteConfirmButton/DeleteConfirmButton'

export default function MinuteCard({ minute, onEdit, onDelete }) {
  const { id, date, attendees, content } = minute
  const [expanded, setExpanded] = useState(false)

  // 내용 미리보기: 3줄 넘어가면 접기
  const PREVIEW_LENGTH = 120
  const isLong = content.length > PREVIEW_LENGTH
  const displayContent = !isLong || expanded ? content : content.slice(0, PREVIEW_LENGTH) + '…'

  // 날짜 포맷: "2026-05-27" → "2026년 5월 27일"
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div
      style={{
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--rounded-md)',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* 날짜 + 액션 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>
          📅 {formattedDate}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => onEdit?.(minute)} style={iconBtnStyle} title="수정">✏️</button>
          <DeleteConfirmButton
            label="🗑️"
            onConfirm={() => onDelete?.(id)}
            buttonStyle={iconBtnStyle}
          />
        </div>
      </div>

      {/* 참석자 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {attendees.split(',').map((a, i) => (
          <span key={i} style={tagStyle}>{a.trim()}</span>
        ))}
      </div>

      {/* 내용 */}
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)', whiteSpace: 'pre-wrap' }}>
        {displayContent}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(p => !p)}
          style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 13, cursor: 'pointer', padding: 0 }}
        >
          {expanded ? '접기 ▲' : '더 보기 ▼'}
        </button>
      )}
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  borderRadius: 4,
  fontSize: 14,
  lineHeight: 1,
}

const tagStyle = {
  padding: '2px 8px',
  borderRadius: 'var(--rounded-pill)',
  background: 'var(--color-canvas-parchment)',
  fontSize: 12,
  color: 'var(--color-ink-secondary)',
}
