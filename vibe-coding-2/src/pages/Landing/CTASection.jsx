// CTASection.jsx — 페이지 하단 재노출 CTA
// 배경: 파치먼트(--color-canvas-parchment)

import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-canvas-parchment)',
        padding: 'var(--spacing-section) var(--spacing-lg)',
        textAlign: 'center',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: 'var(--color-ink)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        지금 바로 팀을 만들어 보세요
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-ink-secondary)',
          marginBottom: 'var(--spacing-xl)',
        }}
      >
        로그인 없이, 설치 없이 — 브라우저 하나로 시작합니다
      </p>
      <Link
        to="/app/dashboard"
        style={{
          display: 'inline-block',
          padding: '15px 40px',
          borderRadius: 'var(--rounded-pill)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-canvas)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          textDecoration: 'none',
          transition: 'background-color var(--transition-fast)',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
      >
        지금 바로 시작하기
      </Link>
    </section>
  )
}

export default CTASection
