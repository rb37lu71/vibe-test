// AppNav.jsx — 상단 탭 네비게이션
// 현재 활성 탭을 길드 우드 톤(--color-primary)으로 표시한다.

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const tabs = [
  { to: '/app/dashboard',   label: '대시보드' },
  { to: '/app/tasks',       label: '할 일' },
  { to: '/app/team',        label: '팀원' },
  { to: '/app/shop',        label: '상점' },
  { to: '/app/leaderboard', label: '리더보드' },
  { to: '/app/minutes',     label: '회의록' },
  { to: '/app/calendar',    label: '캘린더' },
]

function AppNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-hairline)',
        backgroundColor: 'var(--color-oak-dark)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="app-nav-inner">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'var(--text-lg)',
            color: 'var(--color-parchment)',
            letterSpacing: 0,
          }}
        >
          팀플 매니저
        </span>

        <div className="app-nav-right">
          <nav aria-label="주요 메뉴">
            <ul className="app-nav-list">
              {tabs.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '6px 14px',
                      borderRadius: 'var(--rounded-sm)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--color-oak-dark)' : 'var(--color-parchment)',
                      backgroundColor: isActive ? 'var(--color-brass)' : 'transparent',
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
          <div className="app-user-menu">
            <span>{user?.name ?? '길드원'}</span>
            <button type="button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppNav
