// ModalShell.jsx — 공통 모달 오버레이 + 컨테이너
//
// Props:
//   onClose()   : 닫기 콜백 (오버레이 영역 클릭 시 호출)
//   maxWidth    : number (기본 480) — 모달 최대 너비(px)
//   children    : 모달 내부 내용

export default function ModalShell({ onClose, maxWidth = 480, children }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: 'var(--color-canvas)',
          borderRadius: 'var(--rounded-lg)',
          padding: '28px 24px',
          width: '100%',
          maxWidth,
          margin: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
