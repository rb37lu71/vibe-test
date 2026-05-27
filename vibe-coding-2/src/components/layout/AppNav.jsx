// AppNav.jsx — 상단 탭 네비게이션
// 현재 활성 탭을 Action Blue(--color-primary)로 표시한다.

import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/app/board',       label: '📋 보드' },
  { to: '/app/minutes',     label: '📝 회의록' },
  { to: '/app/leaderboard', label: '🏆 리더보드' },
  { to: '/app/team',        label: '👥 팀원' },
]

function AppNav() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-hairline)',
        backgroundColor: 'var(--color-canvas)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* 서비스 로고 */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 var(--spacing-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'var(--text-lg)',
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
          }}
        >
          팀플 매니저
        </span>

        {/* 탭 목록 */}
        <nav aria-label="주요 메뉴">
          <ul
            style={{
              display: 'flex',
              gap: 'var(--spacing-xs)',
              listStyle: 'none',
            }}
          >
            {tabs.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '6px 14px',
                    borderRadius: 'var(--rounded-pill)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--color-canvas)' : 'var(--color-ink-secondary)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                    textDecoration: 'none',
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AppNav
