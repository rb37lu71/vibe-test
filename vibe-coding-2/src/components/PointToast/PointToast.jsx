// PointToast.jsx — 포인트 획득/차감 알림 토스트
//
// 사용법:
//   부모에서 `delta` 값을 props로 내려주면 자동으로 2.5초 후 사라진다.
//   delta > 0: 초록(적립) / delta < 0: 빨강(차감)
//
// Props:
//   delta    : number  — 변동 포인트 (+10 / -5 등)
//   message  : string  — 직접 표시할 보상 메시지
//   name     : string  — 대상 팀원 이름 (e.g. "김철수")
//   onDismiss: () => void — 사라진 후 부모에 알리는 콜백

import { useEffect } from 'react'

const AUTO_DISMISS_MS = 2_500

export default function PointToast({ delta = 0, message, name, onDismiss }) {
  const isPositive = message ? true : delta > 0

  useEffect(() => {
    const id = setTimeout(() => onDismiss?.(), AUTO_DISMISS_MS)
    return () => clearTimeout(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const label   = message ?? (isPositive ? `+${delta}pt 적립!` : `${delta}pt 차감`)
  const bgColor = isPositive ? 'var(--color-success)' : 'var(--color-danger)'

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        background: bgColor,
        color: 'var(--color-canvas)',
        padding: '12px 24px',
        borderRadius: 'var(--rounded-pill)',
        fontSize: 15,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        animation: 'fadeInUp 0.25s ease',
        // fadeInUp은 아래 주입된 <style> 태그로 정의
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      {name} · {label}
    </div>
  )
}
