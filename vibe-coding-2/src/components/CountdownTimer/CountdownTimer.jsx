// CountdownTimer.jsx — 마감일까지 실시간 카운트다운
//
// Props:
//   deadline: string — ISO 8601 (e.g. "2026-06-01T23:59:00")
//
// 표시 규칙:
//   - 24h 이상 남음 : "D-N" (빨간색 없음)
//   - 24h 미만      : "HH:MM:SS" 실시간 카운트다운 (빨간색)
//   - 기한 초과     : "기한 초과" (회색)

import { useEffect, useState } from 'react'

function calcRemaining(deadline) {
  const diff = new Date(deadline) - Date.now()
  return diff
}

export default function CountdownTimer({ deadline }) {
  const [remaining, setRemaining] = useState(() => calcRemaining(deadline))

  useEffect(() => {
    // 이미 초과된 경우 인터벌 불필요
    if (remaining <= 0) return

    const id = setInterval(() => {
      const r = calcRemaining(deadline)
      setRemaining(r)
      if (r <= 0) clearInterval(id)
    }, 1_000)

    return () => clearInterval(id)
  }, [deadline]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── 렌더 분기 ──────────────────────────────────────────────────────────────
  if (remaining <= 0) {
    return (
      <span style={{ ...chipStyle, color: 'var(--color-ink-tertiary)', background: 'var(--color-canvas-parchment)' }}>
        기한 초과
      </span>
    )
  }

  const totalSec = Math.floor(remaining / 1_000)
  const days     = Math.floor(totalSec / 86_400)
  const hours    = Math.floor((totalSec % 86_400) / 3_600)
  const mins     = Math.floor((totalSec % 3_600) / 60)
  const secs     = totalSec % 60

  const isUrgent = remaining < 24 * 60 * 60 * 1_000 // 24h 미만

  const label = isUrgent
    ? `${pad(hours)}:${pad(mins)}:${pad(secs)}`
    : `D-${days}`

  return (
    <span
      style={{
        ...chipStyle,
        color:      isUrgent ? '#c0392b' : 'var(--color-ink-secondary)',
        background: isUrgent ? '#fef0f0' : 'var(--color-canvas-parchment)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      ⏱ {label}
    </span>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(n) {
  return String(n).padStart(2, '0')
}

const chipStyle = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: 'var(--rounded-pill)',
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '0.01em',
}
