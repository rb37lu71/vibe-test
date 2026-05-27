// AppLayout.jsx — /app/* 공통 레이아웃
// AppNav + 메인 콘텐츠 영역으로 구성된다.

import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'

function AppLayout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-canvas)' }}>
      <AppNav />
      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'var(--spacing-xl) var(--spacing-lg)',
        }}
      >
        {/* 각 페이지 컴포넌트가 여기에 렌더링된다 */}
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
