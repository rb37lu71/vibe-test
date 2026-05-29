// HeroSection.jsx — 랜딩 첫 번째 섹션
// 배경: 흰색(--color-canvas), CTA는 pill 버튼

import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-canvas)',
        padding: 'var(--spacing-section) var(--spacing-lg)',
        textAlign: 'center',
      }}
    >
      {/* 뱃지 */}
      <span
        style={{
          display: 'inline-block',
          padding: '4px 14px',
          borderRadius: 'var(--rounded-pill)',
          border: '1px solid var(--color-hairline)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-ink-secondary)',
          marginBottom: 'var(--spacing-lg)',
          letterSpacing: '0.04em',
          fontFamily: 'var(--font-body)',
        }}
      >
        학교 팀 프로젝트를 위한 협업 도구
      </span>

      {/* 헤드라인 */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-display)',
          fontWeight: 700,
          color: 'var(--color-ink)',
          letterSpacing: 0,
          lineHeight: 'var(--leading-tight)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        무임승차 없는 팀플,<br />지금 시작하세요
      </h1>

      {/* 서브헤드라인 */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--color-ink-secondary)',
          maxWidth: '540px',
          margin: '0 auto var(--spacing-xl)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        마감 타이머와 포인트로 팀원 모두의 기여를 투명하게 —
        길드 로그인 후 브라우저에서 바로 사용합니다
      </p>

      {/* CTA — pill 버튼 */}
      <Link
        to="/login"
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
        팀 보드 시작하기
      </Link>
    </section>
  )
}

export default HeroSection
